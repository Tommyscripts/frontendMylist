<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="4" sm="6" >
        <v-card-title class="color"> Lista de compra </v-card-title>
        <v-card-item class="color2" v-for="(producto,idx) in compra.productos" :key="idx" style="display:flex; justify-content:space-between; align-items:center;">
                <div class="left-item d-flex align-center">
                  <v-avatar>
                    <v-img :src="producto.img" />
                  </v-avatar>
                  <span class="product-name ml-2">{{ producto.name }}</span>
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
            <v-btn color="#375B83" class="mr-2" v-if="!producto.comprado" @click="comprar(producto._id, idx)">
              <span style="color:white">Comprado</span>
            </v-btn>
            <v-btn icon color="#FFFFFF" class="ml-2" fab small @click="eliminar(producto._id)">
              <v-icon color="red">mdi-close</v-icon>
            </v-btn>
          </div>
        </v-card-item>
      </v-col>
    </v-row>
    <v-row id="btn">
      <v-btn rounded color="#375B83" @click="retroceder()">
        <a id="colores"><v-icon>mdi-arrow-left</v-icon> Back</a>
      </v-btn>
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
      compra: {},
      casa: "",
  busyIds: {},
  dialog: useDialogStore(),
    };
  },
  async created() {
    const result = await api.getUser();
    this.lists = result.listas;
    this.lists.filter((el) => {
      if (el.name === "Lista de compra") {
        this.compra = el;
      }
    });
    this.lists.filter((el) => {
      if (el.name === "Lista de casa") {
        this.casa = el._id;
      }
    });
  },
  methods: {
    retroceder() {
      this.$router.go(-1);
    },
    async comprar(id, idx) {
      try {
        const productoIndex = this.compra.productos.findIndex(
          (producto) => producto._id === id
        );
        const producto = this.compra.productos[productoIndex];
        if (producto.comprado) {
          return;
        }

  // Marcar busy para evitar doble-click
  if (this.busyIds[id]) return
  this.busyIds[id] = true
  console.debug('[comprar] iniciar mover', { id, idx })
  // Primero intentar añadir en la lista destino (Lista de casa)
  const added = await tryAddProductToList(this.lists, 'Lista de casa', id, this.dialog, true)
        if (!added || added.error) {
          // Si estaba duplicado en la lista destino, procedemos a eliminar en origen igualmente
          if (added && added.error === 'duplicado' && Array.isArray(added.foundIn) && added.foundIn.includes('Lista de casa')) {
            await this.dialog.open({ title: 'Aviso', text: 'El producto ya existe en "Lista de casa". Se eliminará de "Lista de compra".', type: 'info', confirmText: 'Aceptar' })
            const removed = await api.updateListaRemoveCompra(this.compra._id, id);
            if (removed && removed.error) {
              await this.dialog.open({ title: 'Error al eliminar', text: removed.error.toString(), type: 'error', confirmText: 'Aceptar' })
              return { error: removed.error }
            }
            this.compra.productos = this.compra.productos.filter(p => p._id !== id);
            return { removed, added }
          }
          // Si no se añadió por otra razón, no eliminamos de la lista de compra
          return { error: added && added.error ? added.error : 'No se agreg\u00f3 el producto' }
        }

  // Ahora eliminar desde la lista de compra en el backend
  const removed = await api.updateListaRemoveCompra(this.compra._id, id);

        if (removed && removed.error) {
          await this.dialog.open({ title: 'Error al mover producto', text: removed.error.toString(), type: 'error', confirmText: 'Aceptar' })
          return { error: removed.error }
        }

  this.compra.productos[productoIndex].comprado = true;
  this.$emit("productoComprado", id);
  this.compra.productos.splice(idx, 1);
  delete this.busyIds[id]
  console.debug('[comprar] mover completado', { id, removed, added })
  return { removed, added }
      } catch (error) {
        console.error(error);
        const text = error?.response ? `${error.response.status} - ${JSON.stringify(error.response.data)}` : error.message || String(error)
        await this.dialog.open({ title: 'Error', text, type: 'error', confirmText: 'Aceptar' })
      }
    },
    async eliminar(id) {
      try {
  // Eliminar solo de la lista actual sin intentar mover
  const removed = await api.updateListaRemoveCompra(this.compra._id, id);

        if (removed && removed.error) {
          const extra = removed.status ? ` (${removed.status})` : ''
          const url = removed.url ? `\nURL: ${removed.url}` : ''
          await this.dialog.open({ title: 'Error al eliminar', text: `${removed.error}${extra}${url}`, type: 'error', confirmText: 'Aceptar' })
          return { error: removed.error }
        }

        // Actualizar UI local
  this.compra.productos = this.compra.productos.filter(p => p._id !== id);
  // Vue 3: replace Vue2 helper this.$delete with plain delete
  delete this.busyIds[id]
  console.debug('[eliminar] eliminado', { id, removed })
  return { removed };
      } catch (error) {
        console.error(error);
        const text = error?.response ? `${error.response.status} - ${JSON.stringify(error.response.data)}` : error.message || String(error)
        await this.dialog.open({ title: 'Error', text, type: 'error', confirmText: 'Aceptar' })
      }
    },
    async updateCantidad(id, nuevaCantidad) {
      try {
        const resp = await api.updateListaProductoCantidad(this.compra._id, id, nuevaCantidad)
        if (resp && resp.error) {
          await this.dialog.open({ title: 'Error', text: resp.error.toString(), type: 'error', confirmText: 'Aceptar' })
          return { error: resp.error }
        }
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
.color {
  background-color: #8d9342;
  color: white;
}
.color2 {
  background-color: #696d31;
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
#colores {
  color: white;
}
</style>
