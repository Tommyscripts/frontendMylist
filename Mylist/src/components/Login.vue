<template>
  <v-container>
    <v-row >
    <v-col cols="12" sm="10" md="6" class="mx-auto">
      <v-card class="pa-4 ma-4">
        <v-card-title>Login</v-card-title>
        <v-text-field
          label="Email"
          placeholder="Email"
          v-model="email"
          filled
          rounded
          dense
          @keydown.enter.prevent="userLogin"
        ></v-text-field>
        <v-text-field
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
            class="amber--text text--darken-1"
            rounded
            dark
            @click="userLogin"
          >
            <v-icon color="#40667B"> mdi-check </v-icon>
            Aceptar
          </v-btn>
          <v-spacer></v-spacer>

          <RouterLink :to="{ name: 'signup' }" style="text-decoration: none">
            <v-btn
              elevation="2"
              color="#001D3D"
              class="amber--text text--darken-1"
              rounded
              dark
            >
              <v-icon color="#40667B"> mdi-account-outline </v-icon>
              Nueva Cuenta
            </v-btn>
          </RouterLink>
        </v-card-actions>
        <v-card-actions>
          <v-btn
            elevation="2"
            color="#001D3D"
            class="amber--text text--darken-1"
            rounded
            dark
            @click="retroceder()"
          >
            <v-icon color="#40667B" class="mr-1"> mdi-arrow-left</v-icon>
            Volver
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
        this.$router.push({ name: "profile" });
      }
    },
    retroceder() {
      this.$router.go(-1);
    },
  },
};
</script>