<template>
  <v-row id="ancho">
    <v-col cols="12">
      <div>
        <v-app-bar color="#001D3D">
          <v-app-bar-nav-icon
            id="colores"
            variant="text"
            @click.stop="drawer = !drawer"
          ></v-app-bar-nav-icon>

          <v-toolbar-title id="colores">My list</v-toolbar-title>
        </v-app-bar>

        <v-navigation-drawer
          v-model="drawer"
          location="top"
          temporary
          id="colores"
          color="#001D3D"
        >
          <v-list>
            <v-list-item rounded dark :to="{ name: 'home' }">
              Home
            </v-list-item>

            <v-list-item rounded dark :to="{ name: 'soporte' }">
              Soporte
            </v-list-item>

            <v-list-item rounded dark :to="{ name: 'login' }" v-if="!store.isLoggedIn">
              Login
            </v-list-item>

            <v-list-item rounded dark :to="{ name: 'admin' }" v-if="store.isLoggedIn && role === 'admin'">
              Admin Site
            </v-list-item>

            <v-list-item rounded dark :to="{ name: 'profile' }" v-if="store.isLoggedIn">
              Profile
            </v-list-item>

            <v-divider v-if="store.isLoggedIn"></v-divider>

            <v-list-item rounded dark @click="logout" v-if="store.isLoggedIn">
              Log Out
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import { useAuthStore } from "../stores/store";
import api from "../services/api";

export default {
  name: "navbar",

  data: () => ({
    drawer: false,
    group: null,
    role: "",
  }),

  computed: {
    store() {
      return useAuthStore();
    },
  },

  methods: {
    logout() {
      this.store.logout();
      this.$router.push({ name: "home" });
    },
    async getUserData() {
      try {
        this.isLoading = true;
        const userData = await api.getUser();
        this.role = userData.role; // Asegúrate de que "userData.role" sea la propiedad correcta que contiene el rol
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        // Manejo de errores, por ejemplo, mostrar un mensaje de error
        console.error('Error al obtener los datos del usuario:', error);
      }
    },
  },

  watch: {
    group() {
      this.drawer = false;
    },
  },

  created() {
    this.getUserData(); // Llama a getUserData al crear el componente
  },
};
</script>

<style>
#colores {
  color: #001d3d;
}
#ancho {
  max-width: 90%;
}
</style>