<template>
    <v-container>
      <v-container>
        <v-row class="pa=10">
          <v-col cols="12" md="8" sm="4" class="mx-auto">
            <v-row>
              <v-spacer></v-spacer>
              <v-col cols="12" sm="6" md="3" class="mx-5">
                <v-sheet> Nombre: <br />{{ users.username }} </v-sheet>
              </v-col>
              <v-spacer></v-spacer>
              <v-col cols="12" sm="6" md="3" class="mx-5">
                <v-sheet> Email: <br />{{ users.email }} </v-sheet>
              </v-col>
              <v-spacer></v-spacer>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
      <v-container>

      </v-container>
    <v-container class="mx-auto">
 
  </v-container>
      <v-container>
        <v-row>
            <v-btn rounded color="#375B83"  @click="retroceder()">
      <a id="colores"><v-icon>mdi-arrow-left</v-icon> Back</a>
    </v-btn>
        </v-row>
  
        <v-row style="height: 150px" class="mt-8">
          <v-btn rounded color="#375B83"  @click="borrarCuenta()">
      <a id="colores"><v-icon>mdi-close-octagon-outline</v-icon>  Eliminar Cuenta</a>
    </v-btn>
        </v-row>
      </v-container>
    </v-container>
  
  </template>
  <script>
  import { RouterLink } from "vue-router";
  import api from '../services/api.js'
  export default {

    name: "Button",
    methods: {
      retroceder() {
        this.$router.go(-1);
      },
      borrarCuenta() {
        this.$router.push({ name: "delete" });
      },
    },
    data() {
      return {
        users: {},
      };
    },
    async created() {
      const result = await api.getUser();
      this.users = result;
    },
  };
  </script>
  
  <style scoped>
  #text {
    font-family: "Montserrat", sans-serif;
    font-size: calc(16px+1vw);
    font-weight: bold;
  }
  </style>
  