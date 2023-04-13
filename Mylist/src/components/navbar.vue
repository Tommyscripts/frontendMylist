<template>
  <v-row >
    <v-col>
      <div >
      <v-app-bar
        color="#001D3D">
        <v-app-bar-nav-icon id="colores" variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

        <v-toolbar-title id="colores" >My list</v-toolbar-title>

        <v-spacer></v-spacer>

      </v-app-bar>

      <v-navigation-drawer
        v-model="drawer"
        location="top"
        temporary
        id="colores"
        color="#001D3D"
      >
        <v-list>
          <v-list-item
            
            rounded
            dark
            :to="{ name: 'home' }" >
            Home
          </v-list-item>
          <v-list-item
            
            rounded
            dark>
            Soporte
          </v-list-item>

          <div v-if="!store.isLoggedIn">
            <v-list-item
              
              rounded
              dark
              :to="{ name: 'login' }"
            >
              Login
            </v-list-item>
          </div>
          <div v-if="store.isLoggedIn && role === auth">
            <v-list-item
             
              rounded
              dark
              :to="{name:'admin'}"
            >
              Admin Site
            </v-list-item>
          </div>
          <div v-if="store.isLoggedIn">
            <v-list-item
              
              rounded
              dark
              :to="{name:'profile'}"
            >
              Profile
            </v-list-item>
            <v-divider></v-divider>

            <v-list-item
              
              rounded
              dark
              @click="logout()"
            >
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
import { RouterLink } from "vue-router";
import { useAuthStore } from "../stores/store";
import api from "../services/api";

export default {
    name: 'navbar',

    data: () => ({
    drawer: false,
    group: null,
    store: useAuthStore(),
    role: "",
    auth: "admin"
  }),
  methods: {
    logout() {
      this.store.logout();
      this.$router.push({ name: "home" });
    },
  },
  async created() {
    const rol = await api.getUser();
    this.role = rol.role;
  },
    watch: {
      group () {
        this.drawer = false
      },
    },
  }
</script>
<style>
#colores{
  color: #001D3D;
}
</style>