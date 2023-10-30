<template >
    <v-container>
      <v-row>
        <v-col cols="12" md="8" sm="4" class="mx-auto" >
          <div v-if="store.isLoggedIn"  id="colores">
     <a id="text" class="d-flex justify-center">Bienvenido/a</a>
      <br>
      <br>
      <div class="d-flex justify-center">
        Aqui podrás crear varias listas de compra y productos, desde los productos
        que tenemos en casa, a la lista de la compra, listas personalizadas. Todos
        los productos están separado por categorías. Para ello necesitarás crear una
        cuenta.
  
      </div>
        <br>
        <br>
  
      <v-divider></v-divider>
      <br>
      <br>
    </div>
    <div v-else id="colores">
     <a id="text" class="d-flex justify-center">Bienvenido/a</a>
      <br>
      <br>
      <div class="d-flex justify-center">
        Aqui podrás crear varias listas de compra y productos, desde los productos
        que tenemos en casa, a la lista de la compra, listas personalizadas. Todos
        los productos están separado por categorías. Para ello necesitarás crear una
        cuenta.
      </div>
        <br>
        <br>
      <div  class="d-flex justify-center">
        <v-btn rounded color="#375B83">
          <RouterLink :to="{ name: 'signup' }" style="text-decoration: none">
        <a id="colores">Crear una cuenta ahora</a>
          </RouterLink>
      </v-btn>
      </div>
  
      <v-divider></v-divider>
      <br>
      <br>
    </div>
        </v-col>
      </v-row>
  
    </v-container>
    
  </template>
  
  <script>
  // Components
  import { RouterLink } from "vue-router";
  import { useAuthStore } from "../stores/store";
  import api from "../services/api";
  export default {
    name: "HomeView",
    data(){
      return {
        store:useAuthStore()
      }
    }
  };
  </script>
  <style>
  #text{
    color: #4ba435;
    font-size: 3vh;
    font-weight: bold;
    text-align: justify;
  }
  #colores {
    color: #4ba435;
  
  }
  </style>