<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="4" sm="6">
        <v-card-title id="color">{{ casa.name }} </v-card-title>
        <v-card-item v-for="(producto, idx) in casa.productos" :key="idx" class="product-row" id="color2">
          <div class="left-item d-flex align-center">
            <v-avatar>
              <v-img :src="producto.img"></v-img>
            </v-avatar>
            <span class="ml-2">{{ producto.name }}</span>
          </div>
          <div>
            <v-btn rounded color="#375B83" @click="removeProducto(producto._id); $emit('producto-eliminado', producto)">
              No me queda
            </v-btn>
            <v-btn icon @click="eliminarProducto(producto._id); $emit('producto-eliminado', producto)">
              <v-icon color="error">mdi-close</v-icon>
            </v-btn>
          </div>
        </v-card-item>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-btn rounded color="#375B83" @click="retroceder()">
          <v-icon>mdi-arrow-left</v-icon> Back
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import api from "../services/api.js";
import lista from "../services/list.js"
import { useDialogStore } from '../stores/dialog'
import { useToastStore } from '../stores/toast'
import { enqueueRemoval, startSyncQueue } from '../services/syncQueue'
import { tryAddProductToList } from '../services/listUtils'
export default {
  data() {
    return {
      lists: [],
      casa: {},
      compra: "",
  busyIds: {},
  cantidadTimers: {},
  dialog: useDialogStore(),
  toast: useToastStore(),
    };
  },
  async created() {
    const result = await api.getUser();
    this.lists = result.listas;
    this.lists.filter((el) => {
      if (el.name === "Lista de casa") {
        this.casa = el;
      }
    });
    this.lists.filter((el) => {
      if (el.name === "Lista de compra") {
        this.compra = el._id;
      }
    });
    // Aplicar filtro de eliminaciones locales (si el servidor no soporta borrado)
    this._loadLocalRemovals()
    // Arrancar sincronización en background para reintentar eliminaciones pendientes
    startSyncQueue({ intervalMs: 20000, onSuccess: (item) => {
      // notificar sincronización exitosa
      this.toast.open('Sincronizado eliminación en servidor', 'success', 2500)
    }, onFailure: (item, result) => {
      // opcional: loguear para diagnóstico
      console.debug('[syncQueue] fallo al sincronizar', item, result)
    }})
  },
  
  methods: {
    retroceder() {
      this.$router.go(-1);
    },
    async removeProducto(id) {
      try {
  if (this.busyIds[id]) return
  this.busyIds[id] = true
  console.debug('[removeProducto] iniciar mover', { id })
  // Intentar mover en backend de forma atómica (remove de casa y add a compra)
  try {
    const serverMove = await api.updateListaRemoveCasa(this.casa._id, id, this.compra)
    if (serverMove && serverMove.error) {
      // Si el servidor indica que no soporta la ruta, detectamos y usamos fallback
      const status = serverMove.status || (serverMove.error && serverMove.error.status) || null
      const errText = typeof serverMove.error === 'string' ? serverMove.error : JSON.stringify(serverMove.error)
      const indicatesCannotPatch = errText && errText.includes && errText.includes('Cannot PATCH')
      const isNotFound = status === 404 || indicatesCannotPatch
      if (!isNotFound) {
        await this.dialog.open({ title: 'Error al mover producto', text: errText, type: 'error', confirmText: 'Aceptar' })
        delete this.busyIds[id]
        return { error: serverMove.error }
      }
      // si esNotFound, caeremos a fallback abajo
      console.debug('[removeProducto] serverMove no soportado, fallback add-before-remove', { serverMove })
    } else {
      // move exitoso en servidor -> actualizar UI local y salir
      this.casa.productos = this.casa.productos.filter(p => p._id !== id)
      delete this.busyIds[id]
      this.toast.open('Producto movido a Lista de compra', 'success', 2000)
      return { removed: serverMove }
    }
  } catch (errMove) {
    // Error inesperado al intentar el move server-side; si parece 404/Cannot PATCH, seguiremos fallback
    const text = errMove?.response ? `${errMove.response.status} - ${JSON.stringify(errMove.response.data)}` : errMove.message || String(errMove)
    const indicatesCannotPatch = typeof text === 'string' && text.includes('Cannot PATCH')
    if (!indicatesCannotPatch && !(errMove && errMove.response && errMove.response.status === 404)) {
      console.error('[removeProducto] fallo al intentar move server-side', errMove)
      await this.dialog.open({ title: 'Error', text, type: 'error', confirmText: 'Aceptar' })
      delete this.busyIds[id]
      return { error: text }
    }
    console.debug('[removeProducto] move server-side no disponible, usando fallback add-before-remove', { errMove })
  }

  // ---- Fallback: add-before-remove (cuando backend no soporta move) ----
  const added = await tryAddProductToList(this.lists, 'Lista de compra', id, this.dialog, true)

  // Si el helper devolvió duplicado y la lista destino ya tiene el producto,
  // procedemos a eliminar en origen igualmente (comportamiento: mover ya realizado en backend o no necesario)
  if (added && added.error === 'duplicado' && Array.isArray(added.foundIn) && added.foundIn.includes('Lista de compra')) {
    // Informar y eliminar en origen
    await this.dialog.open({ title: 'Aviso', text: 'El producto ya existe en "Lista de compra". Se eliminará de "Lista de casa".', type: 'info', confirmText: 'Aceptar' })
    const removed = await api.updateListaRemoveCasa(this.casa._id, id, this.compra);
    if (removed && removed.error) {
      await this.dialog.open({ title: 'Error al eliminar', text: removed.error.toString(), type: 'error', confirmText: 'Aceptar' })
      delete this.busyIds[id]
      return { error: removed.error }
    }
    this.casa.productos = this.casa.productos.filter(p => p._id !== id);
    delete this.busyIds[id]
    return { removed, added }
  }

  // Si no se añadió por otras razones, no eliminamos
  if (!added || added.error) {
    delete this.busyIds[id]
    return { error: added && added.error ? added.error : 'No se agregó el producto' }
  }

  // En caso de éxito normal, eliminar desde la lista de casa
  const removed = await api.updateListaRemoveCasa(this.casa._id, id, this.compra);

  if (removed && removed.error) {
    await this.dialog.open({ title: 'Error al mover producto', text: removed.error.toString(), type: 'error', confirmText: 'Aceptar' })
    delete this.busyIds[id]
    return { error: removed.error }
  }

  this.casa.productos = this.casa.productos.filter(p => p._id !== id);
  delete this.busyIds[id]
  return { removed, added };
      } catch (error) {
        console.error(error);
        const text = error?.response ? `${error.response.status} - ${JSON.stringify(error.response.data)}` : error.message || String(error)
        await this.dialog.open({ title: 'Error', text, type: 'error', confirmText: 'Aceptar' })
      }
    },
    async eliminarProducto(id) {
      try {
  if (this.busyIds[id]) return
  this.busyIds[id] = true
  // Intentamos eliminar usando la ruta 'solo' si existe.
  let removed = null
  try {
    removed = await api.updateListaRemoveSolo(this.casa._id, id)
  } catch (e) {
    // normalizamos el error en removed para seguir el fallback
    console.debug('[eliminarProducto] updateListaRemoveSolo threw', e)
    removed = { error: e }
  }

  // Si la eliminación server-side falló o no existe, intentar DELETE fallback
  if (removed && removed.error) {
    console.debug('[eliminarProducto] removeSolo no disponible, intentando DELETE fallback')
    try {
      const delResp = await lista.delteProductoById(id, this.casa._id)
      if (delResp && delResp.error) {
        console.warn('[eliminarProducto] DELETE fallback devolvió error, marcando local y encolando', delResp)
        this._markLocallyRemoved(id)
        enqueueRemoval(this.casa._id, id)
      }
    } catch (errBackup) {
      console.error('[eliminarProducto] fallo DELETE fallback', errBackup)
      this._markLocallyRemoved(id)
      enqueueRemoval(this.casa._id, id)
    }
  }

  // En cualquier caso, actualizar UI local y mostrar un único toast de confirmación
  this.casa.productos = this.casa.productos.filter(p => p._id !== id)
  this.toast.open('Producto eliminado', 'success', 2000)
  delete this.busyIds[id]
  console.debug('[eliminarProducto] finalizado (local)', { id })
  return { removed }
      } catch (error) {
        console.error('[eliminarProducto] inesperado', error)
        // Aun en error, informar de eliminación al usuario (fluidez), y encolar
        this._markLocallyRemoved(id)
        enqueueRemoval(this.casa._id, id)
        this.casa.productos = this.casa.productos.filter(p => p._id !== id)
        this.toast.open('Producto eliminado', 'success', 2000)
      }
    },
    // ----- Eliminaciones locales (fallback cuando el servidor no soporta DELETE) -----
    _localRemovalsKey() {
      return 'localRemovedProducts_v1'
    },
    _loadLocalRemovals() {
      try {
        const raw = localStorage.getItem(this._localRemovalsKey())
        const map = raw ? JSON.parse(raw) : {}
        const listRemovals = map[this.casa._id] || []
        if (Array.isArray(this.casa.productos) && listRemovals.length) {
          this.casa.productos = this.casa.productos.filter(p => !listRemovals.includes(String(p._id)))
        }
      } catch (e) {
        console.error('[ListaDeCasa] fallo al cargar eliminaciones locales', e)
      }
    },
    _markLocallyRemoved(productId) {
      try {
        const key = this._localRemovalsKey()
        const raw = localStorage.getItem(key)
        const map = raw ? JSON.parse(raw) : {}
        const listId = String(this.casa._id)
        map[listId] = map[listId] || []
        if (!map[listId].includes(String(productId))) map[listId].push(String(productId))
        localStorage.setItem(key, JSON.stringify(map))
      } catch (e) {
        console.error('[ListaDeCasa] fallo al marcar eliminación local', e)
      }
    },
    async updateCantidad(id, nuevaCantidad) {
      try {
        // llamar al endpoint que actualiza la cantidad
        const resp = await api.updateListaProductoCantidad(this.casa._id, id, nuevaCantidad)
        if (resp && resp.error) {
          await this.dialog.open({ title: 'Error', text: resp.error.toString(), type: 'error', confirmText: 'Aceptar' })
          return { error: resp.error }
        }
        // actualizar UI local: ya está enlazado via v-model
        return { success: true }
      } catch (error) {
        console.error(error)
        const text = error?.response ? `${error.response.status} - ${JSON.stringify(error.response.data)}` : error.message || String(error)
        await this.dialog.open({ title: 'Error', text, type: 'error', confirmText: 'Aceptar' })
      }
    },
    onCantidadInput(producto, value) {
      // No forzamos el valor para evitar asignar NaN (vuetify/v-model ya actualiza el modelo).
      const id = String(producto._id)
      if (this.cantidadTimers[id]) clearTimeout(this.cantidadTimers[id])
      this.cantidadTimers[id] = setTimeout(async () => {
        delete this.cantidadTimers[id]
        // Preferir el valor del modelo (actualizado por v-model). Validar antes de enviar.
        const val = Number(producto.cantidad)
        if (Number.isNaN(val)) {
          console.debug('[onCantidadInput] valor no numérico, omitiendo guardado', producto.cantidad)
          return
        }
        try {
          await this.updateCantidad(producto._id, val)
        } catch (e) {
          console.debug('[onCantidadInput] update failed', e)
        }
      }, 700)
    },
  },
};
</script>

<style scoped>
#color {
  background-color: #4c8f67;
  color: white;
}
#color2 {
  background-color: #3e7554;
  color: white;
}
  .product-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 12px;
  }
  .left-item {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .cantidad-input {
    width: 80px;
    margin-left: 8px;
  }
</style>
