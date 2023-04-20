<template>
    <v-container>
      <v-row>
        <v-col cols="12" md="8" sm="4" v-for="(arroz, idx) in arroces" :key="idx" >
          <v-card class="color">
            <v-card-title>
              <v-avatar>
                <v-img :src="arroz.img"> </v-img>
              </v-avatar>
              {{ arroz.name }}
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
        arroces: [],
      };
    },
    async created() {
      const result = await producto.addProduct();
      this.productos = result;
      this.productos.filter((el) => {
        if (el.categorias === "Arroces") {
          this.arroces.push(el);
        }
      });
    },
  };
  </script>
  
  <style>
  .color{
      background-color: #3F91BE;
      color: white;
  }
  </style>
  