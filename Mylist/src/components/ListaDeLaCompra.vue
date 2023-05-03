<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="4" sm="6" >
        <v-card-title class="color">{{ compra.name }} </v-card-title>
        <v-card-item v-for="(producto,idx) in compra.productos" :key="idx" class="color2">
          <v-avatar>
            <v-img :src="producto.img">
            </v-img>
          </v-avatar>
          {{ producto.name }}
          <v-btn class="ml-4" rounded color="#375B83" @click="removeProducto(producto._id)" > <a id="colores">Comprado </a> </v-btn>
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
export default {
  data() {
    return {
      lists: [],
      compra:{},
    };
  },
  async created() {
    const result = await api.getUser();
    this.lists = result.listas;
    this.lists.filter((el) => {
        if (el.name === "Lista de compra") {
          this.compra=el
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
        const removed = await api.updateListaRemoveCompra(id);
        console.log(
          `Producto eliminado de la lista de casa: ${id}`
        );

        // Agrega el producto a la lista de compra
         const added = await api.createListAdd(id);
         console.log(`Producto agregado a la lista de compra: ${id}`);

        return { removed };
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style scoped>
.color{
  background-color: #8d9342;
  color: white;
}
.color2{
  background-color: #696d31;
  color: white;
}
#colores{
  color:white;
}
</style>
