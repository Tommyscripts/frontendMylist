<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="8" sm="4" class="mx-auto">
        <v-list>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="text-h6">
                {{ user }}
              </v-list-item-title>
              <v-list-item-subtitle>{{ email }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-list nav dense>
          <v-list-item-group color="primary">
            <v-list-item @click.prevent="toggleOverlay('home')">
              <v-list-item-icon>
                <v-icon rounded color="#375B83">mdi-shield-home</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title rounded color="#375B83">Inicio</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item @click.prevent="toggleOverlay('products')">
              <v-list-item-icon>
                <v-icon color="#375B83" rounded dark>mdi-store-plus</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title rounded color="#375B83">Añadir producto</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item @click.prevent="toggleOverlay('admin')">
              <v-list-item-icon rounded color="#375B83">
                <v-icon color="#375B83" rounded dark>mdi-security</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title rounded color="#375B83">Set Admin</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
        <CrearProducto v-if="overlayOpen === 'products'" />
        <CrearAdmin v-if="overlayOpen === 'admin'"></CrearAdmin>
        <v-row class="pa-10">
          <v-btn rounded color="#375B83" @click="retroceder()">
            <a id="colores"><v-icon>mdi-arrow-left</v-icon> Back</a>
          </v-btn>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import api from "@/services/api";
import { useAuthStore } from "@/stores/store";
import CrearProducto from "../components/CrearProducto.vue";
import CrearAdmin from "../components/CrearAdmin.vue";

export default {
  components: {
    CrearProducto,
    CrearAdmin,
  },
  data() {
    return {
      user: "",
      email: "",
      overlayOpen: "home", // Variable para rastrear el overlay abierto
      store: useAuthStore(),
    };
  },
  methods: {
    toggleOverlay(overlayName) {
      this.overlayOpen = overlayName;
    },
    retroceder() {
      this.$router.go(-1);
    },
  },

  async created() {
    this.email = this.store.email;
    const userA = await api.getUser(this.store.token);
    this.user = userA.name;
  },
};
</script>
