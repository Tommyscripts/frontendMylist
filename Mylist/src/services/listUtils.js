import api from './api'

/**
 * Intenta añadir un producto a una lista. Muestra diálogos según resultado.
 * @param {Array} lists - array de listas del usuario
 * @param {String} listName - nombre de la lista destino
 * @param {String} productId - id del producto
 * @param {Object} dialog - store/dialog con método open
 * @returns {Object|null} - el objeto agregado o null si no se agregó
 */
export async function tryAddProductToList(lists, listName, productId, dialog) {
  let listaEncontrada = lists.find((l) => l.name === listName)
  if (!listaEncontrada) {
    await dialog.open({ title: 'Error', text: 'Lista no encontrada', type: 'error', confirmText: 'Aceptar' })
    return null
  }

  // Si el producto ya existe en la lista destino
  const existeEnDestino = listaEncontrada.productos && listaEncontrada.productos.find(p => p._id === productId)
  // Comprobar en las dos listas principales
  let encontradoEn = []
  const casa = lists.find((el) => el.name === 'Lista de casa')
  const compra = lists.find((el) => el.name === 'Lista de compra')
  if (casa && casa.productos.find((p) => p._id === productId)) encontradoEn.push('Productos de casa')
  if (compra && compra.productos.find((p) => p._id === productId)) encontradoEn.push('Productos de compra')

  if (encontradoEn.length) {
    // Mostrar un único diálogo que indique en qué lista(s) está
    const texto = encontradoEn.length === 1
      ? `El producto ya se encuentra en la lista "${encontradoEn[0]}"`
      : `El producto ya se encuentra en las listas "${encontradoEn.join(' y ')}"`
    await dialog.open({ title: 'Duplicado', text: texto, type: 'warning', confirmText: 'Aceptar' })
    return existeEnDestino || null
  }

  if (existeEnDestino) {
    await dialog.open({ title: 'Producto duplicado', text: 'El producto ya se encuentra en la lista', type: 'warning', confirmText: 'Aceptar' })
    return existeEnDestino
  }

  // Agregar vía API
  const respond = await api.createListAdd(listaEncontrada._id, productId)
  // Asegurar array
  if (!Array.isArray(listaEncontrada.productos)) listaEncontrada.productos = []
  listaEncontrada.productos.push(respond)
  await dialog.open({ title: 'Producto agregado', text: 'El producto ha sido agregado a la lista', type: 'success', confirmText: 'Aceptar' })
  return respond
}
