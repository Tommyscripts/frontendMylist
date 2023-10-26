<template>
  <v-container>
    <v-row class="pa-5">
      <v-col cols="12" class="mx-auto">
        <v-row>
          <v-spacer></v-spacer>
          <v-col cols="12" class="mx-auto">
            <v-sheet class="colores"> Bienvenido/a: {{ users.username }} </v-sheet>
          </v-col>
        </v-row>
        <Listas />
      </v-col>
    </v-row>
    <v-col>
      <v-row>
        <v-btn class="ml-4 mt-2" rounded color="#375B83" @click="retroceder">
          <a id="colores"><v-icon>mdi-arrow-left</v-icon> Back</a>
        </v-btn>
        <v-btn class="ml-4 mt-2" rounded color="#375B83" @click="borrarCuenta">
          <a id="colores"><v-icon>mdi-close-octagon-outline</v-icon> Eliminar Cuenta</a>
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
      this.$router.push({ name: "ConfirmarEliminar" });
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
.colores {
  background-color: #363b6a;
  color: white;
  font-family: "Montserrat", sans-serif;
  font-size: calc(16px + 1vw);
  font-weight: bold;
}
#text {
  font-family: "Montserrat", sans-serif;
  font-size: calc(16px + 1vw);
  font-weight: bold;
}
.btn {
  justify-content: space-between;
  margin-left: 5px;
  display: contents;
}
</style>
