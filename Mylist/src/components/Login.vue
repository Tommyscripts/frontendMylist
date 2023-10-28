<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="10" md="6" class="mx-auto">
        <v-card class="pa-4 ma-4 fondo">
          <v-card-title style="color: rgb(75, 142, 38);">Login</v-card-title>
          <v-text-field
          style="color: rgb(75, 142, 38);"
            class="custom-input"
            label="Email"
            placeholder="Email"
            v-model="email"
            filled
            rounded
            dense
            @keydown.enter.prevent="userLogin"
          ></v-text-field>
          <v-text-field
          style="color: rgb(75, 142, 38);"
            class="custom-input"
            label="Password"
            :type="visible ? 'text' : 'password'"
            placeholder="Password"
            v-model="password"
            filled
            rounded
            dense
            :append-icon="visible ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="visible = !visible"
            @keydown.enter.prevent="userLogin"
          ></v-text-field>
          <v-card-actions>
            <v-btn
              elevation="2"
              color="#001D3D"
              class="custom-button"
              rounded
              dark
              @click="userLogin"
            >
              <v-icon class="custom-icon">mdi-check</v-icon>
              <span style="color: rgb(75, 142, 38);">Aceptar</span>
            </v-btn>
            <v-spacer></v-spacer>
            <RouterLink :to="{ name: 'signup' }" style="text-decoration: none">
              <v-btn
                elevation="2"
                color="#001D3D"
                class="custom-button"
                rounded
                dark
              >
                <v-icon class="custom-icon">mdi-account-outline</v-icon>
                <span style="color: rgb(75, 142, 38);">Nueva Cuenta</span>
              </v-btn>
            </RouterLink>
          </v-card-actions>
          <v-card-actions>
            <v-btn
              elevation="2"
              color="#001D3D"
              class="custom-button"
              rounded
              dark
              @click="retroceder"
            >
              <v-icon class="custom-icon">mdi-arrow-left</v-icon>
              <span style="color: rgb(75, 142, 38);">Volver</span>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { RouterLink } from "vue-router";
import { useAuthStore } from "../stores/store";
import api from "../services/api";

export default {
  data() {
    return {
      visible: false,
      email: "",
      password: "",
      error: "",
      authStore: useAuthStore(),
    };
  },
  methods: {
    async userLogin() {
      const user = {
        email: this.email,
        password: this.password,
      };
      const respond = await api.login(user);
      if (respond.error) {
        alert("password or email wrong");
      } else {
        this.authStore.login(respond.token, respond.email);
        this.$router.push({ name: "home" });
      }
    },
    retroceder() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
.fondo {
  background-color: rgba(58, 55, 108, 0.7);
}

.custom-input {
  background-color: rgba(58, 55, 108, 0.7);
  color: white;
}

.custom-button {
  background-color: #001D3D;
}

.custom-icon {
  color: rgb(75, 142, 38);
}
</style>
