<template>
    <v-container>
      <v-row>
        <v-col cols="12" md="8" sm="4" v-for="(salsa, idx) in salsas" :key="idx" >
          <v-card class="color">
            <v-card-title>
              <v-avatar>
                <v-img :src="salsa.img"> </v-img>
              </v-avatar>
              {{ salsa.name }}
            </v-card-title>
          </v-card>
        </v-col>
        <v-row id="btn">
        <v-btn rounded color="#375B83" @click="retroceder()">
          <a id="colores"><v-icon>mdi-arrow-left</v-icon> Back</a>
        </v-btn>
      </v-row>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import producto from "../services/productos.js";
  export default {
  name: "Button",
  methods: {
    retroceder() {
      this.$router.go(-1);
    }
    },
    data() {
      return {
        productos: [],
        salsas: [],
      };
    },
    async created() {
      const result = await producto.addProduct();
      this.productos = result;
      this.productos.filter((el) => {
        if (el.categorias === "Salsas") {
          this.salsas.push(el);
        }
      });
    },
  };
  </script>
  
  <style>
  .color{
      background-color: #8F5678;
      color: white;
  }
  </style>