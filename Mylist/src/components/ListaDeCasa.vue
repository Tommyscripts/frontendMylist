<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="8" sm="4"> </v-col>
      <v-row id="btn">
        <v-btn rounded color="#375B83" @click="retroceder()">
          <a id="colores"><v-icon>mdi-arrow-left</v-icon> Back</a>
        </v-btn>
      </v-row>
    </v-row>
  </v-container>
</template>

<script>
import listas from "../services/list.js";
export default {
    methods: {
    retroceder() {
      this.$router.go(-1);
    },
},
  data() {
    return {
      productos: [],
      casas: [],
      lists: [],
    };
  },
  async created() {

    const result = await listas.getList();
    this.productos = result;
    this.productos.filter((el) => {
      if (el.categorias === "Lista de casa") {
        return result;
      }
    });

  },
};
</script>

<style></style>
