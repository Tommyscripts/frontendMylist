<template>
    <v-container>
      <v-row>
        <v-col cols="12" md="8" sm="4" v-for="(congelado, idx) in congelados" :key="idx" >
          <v-card class="color">
            <v-card-title>
              <v-avatar>
                <v-img :src="congelado.img"> </v-img>
              </v-avatar>
              {{ congelado.name }}
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
        congelados: [],
      };
    },
    async created() {
      const result = await producto.addProduct();
      this.productos = result;
      this.productos.filter((el) => {
        if (el.categorias === "Congelados") {
          this.congelados.push(el);
        }
      });
    },
  };
  </script>
  
  <style>
  .color{
      background-color: #415A9B;
      color: white;
  }
  </style>