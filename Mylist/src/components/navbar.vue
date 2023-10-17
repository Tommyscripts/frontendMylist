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

            <v-list-item rounded dark :to="{name: 'soporte'}"> 
              Soporte 
            </v-list-item>

            <div v-if="!store.isLoggedIn">
              <v-list-item rounded dark :to="{ name: 'login' }">
                Login
              </v-list-item>
            </div>
            <div v-if="store.isLoggedIn && role === auth">
              <v-list-item rounded dark :to="{ name: 'admin' }">
                Admin Site
              </v-list-item>
            </div>
            <div v-if="store.isLoggedIn">
              <v-list-item rounded dark :to="{ name: 'profile' }">
                Profile
              </v-list-item>
              <v-divider></v-divider>
              <v-list-item rounded dark @click="logout()">
                Log Out
              </v-list-item>
            </div>
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
    store: useAuthStore(),
    role: "",
    auth: "admin",
  }),
  methods: {
    logout() {
      this.store.logout();
      this.$router.push({ name: "home" });
    },
  },
  async getUserData() {
  try {
    const userData = await api.getUser();
    this.role = userData.role;
    this.isLoading = false;
    window.location.reload(); // Recargar la página después de iniciar sesión
  } catch (error) {
    // Manejo de errores, por ejemplo, mostrar un mensaje de error
    console.error('Error al obtener los datos del usuario:', error);
  }
},

  watch: {
    group() {
      this.drawer = false;
    },
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
