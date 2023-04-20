<template>
  <v-container>
    <v-row class="pa-10">
      <v-col cols="12" md="8" sm="4" class="mx-auto">
        <v-row>
          <v-spacer></v-spacer>
          <v-col cols="12" md="8" sm="4" class="mx-auto">
            <v-sheet> Nombre de usuario: <br />{{ users.username }} </v-sheet>
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="12" md="8" sm="4" class="mx-auto">
            <v-sheet> Email: <br />{{ users.email }} </v-sheet>
          </v-col>
          <v-spacer></v-spacer>
        </v-row>
        <Listas />
      </v-col>
    </v-row>
    <v-col>
      <v-row id="btn">
        <v-btn rounded color="#375B83" @click="retroceder()">
          <a id="colores"><v-icon>mdi-arrow-left</v-icon> Back</a>
        </v-btn>
        <v-space></v-space>
      </v-row>
      <v-row id="btn">
        <v-btn rounded color="#375B83" @click="borrarCuenta()">
          <a id="colores"
            ><v-icon>mdi-close-octagon-outline</v-icon> Eliminar Cuenta</a
          >
        </v-btn>
      </v-row>
    </v-col>
  </v-container>
</template>
<script>
import { RouterLink } from "vue-router";
import api from "../services/api.js";
import Listas from "./Listas.vue";
export default {
  components: {
    Listas,
  },

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

<style>
#text {
  font-family: "Montserrat", sans-serif;
  font-size: calc(16px+1vw);
  font-weight: bold;
}
#btn {
  justify-content: space-between;
  display: contents;
}
</style>
