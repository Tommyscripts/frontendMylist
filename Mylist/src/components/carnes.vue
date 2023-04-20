<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="8" sm="4" v-for="(carne, idx) in carnes" :key="idx" >
        <v-card class="color">
          <v-card-title>
            <v-avatar>
              <v-img :src="carne.img"> </v-img>
            </v-avatar>
            {{ carne.name }}
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import producto from "../services/productos.js";
export default {
  data() {
    return {
      productos: [],
      carnes: [],
    };
  },
  async created() {
    const result = await producto.addProduct();
    this.productos = result;
    this.productos.filter((el) => {
      if (el.categorias === "Carnes") {
        this.carnes.push(el);
      }
    });
  },
};
</script>

<style>
.color{
    background-color: #BB6A3D;
    color: white;
}
</style>
