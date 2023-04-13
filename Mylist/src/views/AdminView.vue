<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="5" md="3">
        <!--  <v-card width="256" class="mt-6"> -->
        <!-- <v-navigation-drawer permanent rigth> -->
        <!-- <v-system-bar></v-system-bar> -->
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
        <v-divider></v-divider>
        <v-list nav dense>
          <v-list-item-group color="primary">
            <v-list-item @click.prevent="setHome()">
              <v-list-item-icon>
                <v-icon rounded color="#375B83" >mdi-shield-home</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title rounded color="#375B83" >Inicio</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <!--             <v-list-item @click.prevent="setUpRest()">
                    <v-list-item-icon>
                      <v-icon>mdi-home-edit-outline</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title
                        >Actualizar Restaurante</v-list-item-title
                      >
                    </v-list-item-content>
                  </v-list-item> -->

            <v-list-item @click.prevent="setAddProduct()">
              <v-list-item-icon>
                <v-icon rounded color="#375B83" >mdi-store-plus</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title rounded color="#375B83" >Añadir producto</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item @click.prevent="setAdmin()">
              <v-list-item-icon rounded color="#375B83" >
                <v-icon rounded color="#375B83" >mdi-security</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title rounded color="#375B83" >Set Admin</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
        <!--     </v-navigation-drawer> -->
        <!--  </v-card> -->
      </v-col>

      <!--  <UpdateRestaurant v-if="updateRest" /> -->
      <CrearProducto v-if="products" />
      <CrearAdmin v-if="admin"></CrearAdmin>
      <v-row>
            <v-btn rounded color="#375B83"  @click="retroceder()">
      <a id="colores"><v-icon>mdi-arrow-left</v-icon> Back</a>
    </v-btn>
        </v-row>
    </v-row>
  </v-container>
</template>

<script>
import api from "@/services/api";
import { useAuthStore } from "@/stores/store";
import CrearProducto from "../components/CrearProducto.vue";
import CrearAdmin from"../components/CrearAdmin.vue"

export default {
  components: {
    CrearProducto,
    CrearAdmin
  },
  data() {
    return {
      user: "",
      email: "",
      home: true,
      products: false,
      admin: false,
      store: useAuthStore(),
    };
  },
  methods: {
    setAddProduct() {
      this.hoome = !this.home;
      this.products = !this.products;
    },
    setHome() {
      this.home = !this.home;
      this.product = false;
    },
    setAdmin() {
      this.admin = !this.admin;
      this.home = false;
    },
  },
  async created() {
    this.email = this.store.email;
    const userA = await api.getUser(this.store.token);
    this.user = userA.name;
  },
};
</script>
