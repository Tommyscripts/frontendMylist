<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="4" sm="6" >
        <v-card-title class="color"> Lista de compra </v-card-title>
        <v-card-item class="color2" v-for="(producto,idx) in compra.productos" :key="idx" style="display:flex; justify-content:space-between; align-items:center;">
          <div style="display:flex; align-items:center;">
            <v-avatar>
              <v-img :src="producto.img">
              </v-img>
            </v-avatar>
            <span>{{ producto.name }}</span>
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

        // Primero intentar añadir en la lista destino (Lista de casa)
        const added = await tryAddProductToList(this.lists, 'Lista de casa', id, this.dialog)
        if (!added || added.error) {
          // Si no se añadió, no eliminamos de la lista de compra
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
        return { removed, added }
      } catch (error) {
        console.error(error);
        const text = error?.response ? `${error.response.status} - ${JSON.stringify(error.response.data)}` : error.message || String(error)
        await this.dialog.open({ title: 'Error', text, type: 'error', confirmText: 'Aceptar' })
      }
    },
    async eliminar(id) {
      try {
        // Usar el endpoint PATCH existente para eliminar de lista de compra
        const removed = await api.updateListaRemoveCompra(this.compra._id, id);

        if (removed && removed.error) {
          const extra = removed.status ? ` (${removed.status})` : ''
          const url = removed.url ? `\nURL: ${removed.url}` : ''
          await this.dialog.open({ title: 'Error al eliminar', text: `${removed.error}${extra}${url}`, type: 'error', confirmText: 'Aceptar' })
          return { error: removed.error }
        }

        // Elimina el producto de la lista sin necesidad de actualizar la página
        this.compra.productos = this.compra.productos.filter(p => p._id !== id);

        return { removed };
      } catch (error) {
        console.error(error);
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
#colores {
  color: white;
}
</style>
