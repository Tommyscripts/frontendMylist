<template>
    <v-container>
      <v-row>
        <v-col cols="12" md="8" sm="4" v-for="(pescado, idx) in pescados" :key="idx" >
          <v-card class="color">
            <v-card-title>
              <v-avatar>
                <v-img :src="pescado.img"> </v-img>
              </v-avatar>
              {{ pescado.name }}
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
        pescados: [],
      };
    },
    async created() {
      const result = await producto.addProduct();
      this.productos = result;
      this.productos.filter((el) => {
        if (el.categorias === "Pescados") {
          this.pescados.push(el);
        }
      });
    },
  };
  </script>
  
  <style>
  .color{
      background-color: #494F60;
      color: white;
  }
  </style>