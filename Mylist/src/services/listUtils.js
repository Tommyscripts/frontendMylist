import api from './api'
import { useToastStore } from '../stores/toast'

// Map para operaciones pendientes: key = `${listName}:${productId}` -> Promise
const pendingAdds = new Map()

/**
 * Intenta añadir un producto a una lista. Muestra diálogos según resultado.
 * @param {Array} lists - array de listas del usuario
 * @param {String} listName - nombre de la lista destino
 * @param {String} productId - id del producto
 * @param {Object} dialog - store/dialog con método open
 * @returns {Object|null} - el objeto agregado o null si no se agregó
 */
/**
 * tryAddProductToList(lists, listName, productId, dialog, allowIfInOtherList=false)
 * allowIfInOtherList: when true (used for explicit move actions), do not block if the product
 * exists in the other list (origin); only block if it already exists in the destination.
 */
export async function tryAddProductToList(lists, listName, productId, dialog, allowIfInOtherList = false) {
  // Evitar llamadas concurrentes para el mismo producto+lista (serializar adds por destino)
  const key = `${listName}:${String(productId)}`
  if (pendingAdds.has(key)) {
    // Reutilizamos la misma promesa para evitar duplicados por doble-click
    try {
      const toast = useToastStore()
      toast.open('Operación ya en curso para este producto...', 'info', 1500)
    } catch (e) { /* pincheo si Pinia no está listo */ }
    return await pendingAdds.get(key)
  }

  // Obtener listas frescas desde el backend para evitar comprobaciones basadas en caché local
  let freshLists = lists
  try {
    const user = await api.getUser()
    if (user && user.listas) freshLists = user.listas
  } catch (e) {
    // si falla el fetch, seguimos con las lists pasadas
  }

  // helper para obtener id canonico de distintos shapes
  const getId = (p) => {
    if (!p && p !== 0) return null
    // Si el elemento es ya el id (string o number)
    if (typeof p === 'string' || typeof p === 'number') return String(p)
    if (p._id) return String(p._id)
    if (p.id) return String(p.id)
    if (p.producto) {
      if (p.producto._id) return String(p.producto._id)
      if (p.producto.id) return String(p.producto.id)
      // si producto es id simple
      if (typeof p.producto === 'string' || typeof p.producto === 'number') return String(p.producto)
    }
    if (p.productoId) return String(p.productoId)
    return null
  }

  // helper para deduplicar arrays por id canónico
  const uniqueById = (arr) => {
    if (!Array.isArray(arr)) return arr
    const seen = new Set()
    const out = []
    for (const it of arr) {
      // key: preferred canonical id, fallback to JSON representation
      const id = getId(it) || JSON.stringify(it)
      if (!id) continue
      if (!seen.has(id)) {
        seen.add(id)
        out.push(it)
      }
    }
    return out
  }

  let listaEncontrada = freshLists.find((l) => l.name === listName)
  if (!listaEncontrada) {
    await dialog.open({ title: 'Error', text: 'Lista no encontrada', type: 'error', confirmText: 'Aceptar' })
    return null
  }

  // Si el producto ya existe en la lista destino (comparando varios posibles campos)
  console.debug('[listUtils] listaEncontrada.productos sample', Array.isArray(listaEncontrada.productos) ? listaEncontrada.productos.slice(0,3) : listaEncontrada.productos)
  const existeEnDestino = Array.isArray(listaEncontrada.productos) && listaEncontrada.productos.find(p => getId(p) === String(productId))

  // Si ya existe en la lista destino -> bloquear siempre
  if (existeEnDestino) {
    const texto = `El producto ya se encuentra en la lista "${listName}"`
    await dialog.open({ title: 'Duplicado', text: texto, type: 'warning', confirmText: 'Aceptar' })
    return { error: 'duplicado', foundIn: [listName] }
  }

  // Si no se permite añadir cuando el producto existe en la otra lista, comprobarla
  if (!allowIfInOtherList) {
    let encontradoEn = []
    const casa = freshLists.find((el) => el.name === 'Lista de casa')
    const compra = freshLists.find((el) => el.name === 'Lista de compra')
    if (casa && Array.isArray(casa.productos) && casa.productos.find((p) => getId(p) === String(productId))) encontradoEn.push('Lista de casa')
    if (compra && Array.isArray(compra.productos) && compra.productos.find((p) => getId(p) === String(productId))) encontradoEn.push('Lista de compra')
    if (encontradoEn.length) {
      const texto = encontradoEn.length === 1
        ? `El producto ya se encuentra en la lista "${encontradoEn[0]}"`
        : `El producto ya se encuentra en las listas "${encontradoEn.join(' y ')}"`
      await dialog.open({ title: 'Duplicado', text: texto, type: 'warning', confirmText: 'Aceptar' })
      return { error: 'duplicado', foundIn: encontradoEn }
    }
  }

  // Creamos una promesa que realizará la operación y la guardamos en pendingAdds
  const op = (async () => {
    // Agregar vía API
    const respond = await api.createListAdd(listaEncontrada._id, productId)

    // Tras la adición, solicitar nuevamente al backend la lista para obtener la forma canónica del objeto
    try {
      const userAfter = await api.getUser()
      const freshAfter = (userAfter && userAfter.listas) ? userAfter.listas : freshLists
      const listaAfter = freshAfter.find(l => l.name === listName) || listaEncontrada
      // buscar el objeto añadido por id canonico
      const canonical = Array.isArray(listaAfter.productos) ? listaAfter.productos.find(p => getId(p) === String(productId)) : null

      // Asegurar array y añadir el objeto normalizado solo si no existe ya localmente
      if (!Array.isArray(listaEncontrada.productos)) listaEncontrada.productos = []
      const alreadyLocal = listaEncontrada.productos.find(p => getId(p) === String(productId))
      if (canonical) {
        const canonicalId = getId(canonical)
        const existingIds = new Set((listaEncontrada.productos || []).map(p => getId(p)).filter(Boolean))
        if (!existingIds.has(canonicalId)) {
          // asegurar campo cantidad por defecto y push
          const itemToPush = { ...(canonical || {}), cantidad: (canonical && (canonical.cantidad || canonical.cantidad === 0)) ? canonical.cantidad : 1 }
          listaEncontrada.productos.push(itemToPush)
        }
      }

      try { const toast = useToastStore(); toast.open('Añadido correctamente', 'success', 2000) } catch(e){}
      return canonical || respond
    } catch (e) {
      // Si falla la relectura, normalizamos la respuesta anterior lo mejor posible y la devolvemos
      let addedObj = null
      if (respond && typeof respond === 'object') {
        if (respond._id) addedObj = respond
        else if (respond.producto) addedObj = respond.producto
        else addedObj = respond
      } else {
        addedObj = respond
      }
      // fallback: push solo si no existe localmente
      if (!Array.isArray(listaEncontrada.productos)) listaEncontrada.productos = []
      const alreadyLocal = listaEncontrada.productos.find(p => getId(p) === String(productId))
      if (!alreadyLocal) {
        addedObj.cantidad = (addedObj && (addedObj.cantidad || addedObj.cantidad === 0)) ? addedObj.cantidad : 1
        // comprobar por id robustamente antes de push
        const addedId = getId(addedObj)
        const existingIds = new Set((listaEncontrada.productos || []).map(p => getId(p)).filter(Boolean))
        if (!existingIds.has(addedId)) listaEncontrada.productos.push(addedObj)
      }
      // limpiar duplicados por si acaso
      listaEncontrada.productos = uniqueById(listaEncontrada.productos)
      try { const toast = useToastStore(); toast.open('Añadido correctamente', 'success', 2000) } catch(e){}
      return addedObj
    }
  })()

  pendingAdds.set(key, op)
  try {
    const res = await op
    return res
  } finally {
    pendingAdds.delete(key)
  }
}
