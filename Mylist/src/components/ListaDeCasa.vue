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
            <v-text-field
              v-model.number="producto.cantidad"
              type="number"
              min="1"
              class="cantidad-input"
              dense
              hide-details
              @change="updateCantidad(producto._id, producto.cantidad)"
            />
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
import { tryAddProductToList } from '../services/listUtils'
export default {
  data() {
    return {
      lists: [],
      casa: {},
      compra: "",
  busyIds: {},
  dialog: useDialogStore(),
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
  // Intentar añadir en la lista destino (Lista de compra)
  const added = await tryAddProductToList(this.lists, 'Lista de compra', id, this.dialog, true)

        // Si el helper devolvió duplicado y la lista destino ya tiene el producto,
        // procedemos a eliminar en origen igualmente (comportamiento: mover ya realizado en backend o no necesario)
        if (added && added.error === 'duplicado' && Array.isArray(added.foundIn) && added.foundIn.includes('Lista de compra')) {
          // Informar y eliminar en origen
          await this.dialog.open({ title: 'Aviso', text: 'El producto ya existe en "Lista de compra". Se eliminará de "Lista de casa".', type: 'info', confirmText: 'Aceptar' })
            const removed = await api.updateListaRemoveCasa(this.casa._id, id, this.compra);
          if (removed && removed.error) {
            await this.dialog.open({ title: 'Error al eliminar', text: removed.error.toString(), type: 'error', confirmText: 'Aceptar' })
            return { error: removed.error }
          }
          this.casa.productos = this.casa.productos.filter(p => p._id !== id);
            delete this.busyIds[id]
            return { removed, added }
        }

        // Si no se añadió por otras razones, no eliminamos
        if (!added || added.error) {
          return { error: added && added.error ? added.error : 'No se agreg\u00f3 el producto' }
        }

  // En caso de éxito normal, eliminar desde la lista de casa
  const removed = await api.updateListaRemoveCasa(this.casa._id, id, this.compra);

        if (removed && removed.error) {
          await this.dialog.open({ title: 'Error al mover producto', text: removed.error.toString(), type: 'error', confirmText: 'Aceptar' })
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
  // Intentamos eliminar usando la ruta 'solo' si existe. Nota: las funciones en api.js
  // normalizan errores y pueden devolver un objeto { error, status } en lugar de lanzar.
  let removed = await api.updateListaRemoveSolo(this.casa._id, id);

  // Si la respuesta indica error, comprobamos si es 404 / "Cannot PATCH" y hacemos fallback
  if (removed && removed.error) {
    const status = removed.status || (removed.error && removed.error.status) || null
    const errText = typeof removed.error === 'string' ? removed.error : JSON.stringify(removed.error)
    const indicatesCannotPatch = errText && errText.includes && errText.includes('Cannot PATCH')
    const isNotFound = status === 404 || indicatesCannotPatch
    console.debug('[eliminarProducto] removeSolo devolvió error', { removed, status, indicatesCannotPatch })
      if (isNotFound) {
      // Intento de respaldo: usar la ruta DELETE que borra el producto de la lista sin moverlo
      try {
        await this.dialog.open({ title: 'Aviso', text: 'El servidor no soporta la ruta de eliminación directa; se usará ruta alternativa (DELETE).', type: 'info', confirmText: 'Aceptar' })
        // lista.delteProductoById espera (productId, listId) según comentarios en src/services/list.js
        removed = await lista.delteProductoById(id, this.casa._id)
      } catch (errBackup) {
        console.error('[eliminarProducto] fallo fallback deleteProductoById', errBackup)
        const text = errBackup?.response ? `${errBackup.response.status} - ${JSON.stringify(errBackup.response.data)}` : errBackup.message || String(errBackup)
        await this.dialog.open({ title: 'Error al eliminar', text, type: 'error', confirmText: 'Aceptar' })
        delete this.busyIds[id]
        return { error: text }
      }
    } else {
      await this.dialog.open({ title: 'Error al eliminar', text: errText, type: 'error', confirmText: 'Aceptar' })
      delete this.busyIds[id]
      return { error: errText }
    }
  }

  // Actualizar UI local
  this.casa.productos = this.casa.productos.filter(p => p._id !== id);
  delete this.busyIds[id]
  console.debug('[eliminarProducto] eliminado', { id, removed })
  return { removed };
      } catch (error) {
        console.error(error);
        const text = error?.response ? `${error.response.status} - ${JSON.stringify(error.response.data)}` : error.message || String(error)
        await this.dialog.open({ title: 'Error', text, type: 'error', confirmText: 'Aceptar' })
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
