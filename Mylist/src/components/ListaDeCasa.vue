<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="4" sm="6">
        <v-card-title id="color">{{ casa.name }} </v-card-title>
        <v-card-item
          v-for="(producto, idx) in casa.productos"
          :key="idx"
          class="d-flex align-center justify-space-between"
          id="color2"
        >
          <div class="d-flex align-center">
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
export default {
  data() {
    return {
      lists: [],
      casa: {},
      compra: "",
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
        // Elimina el producto de la lista de casa
        const removed = await api.updateListaRemoveCasa(this.casa._id,id,this.compra);

        // Agrega el producto a la lista de compra
         const added = await api.createListAdd(this.compra,id);
      

         // Elimina el producto de la lista sin necesidad de actualizar la página
         this.casa.productos = this.casa.productos.filter(p => p._id !== id);

        return  (removed,added );
      } catch (error) {
        console.error(error);
      }
    },
    async eliminarProducto(id) {
      try {
        const removed = await lista.delteProductoById(id, this.casa._id);


        // Elimina el producto de la lista sin necesidad de actualizar la página
        this.casa.productos = this.casa.productos.filter(p => p._id !== id);

        return { removed };
      } catch (error) {
        console.error(error);
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
</style>
