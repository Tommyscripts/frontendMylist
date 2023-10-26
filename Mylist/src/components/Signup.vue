<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="10" md="6" class="mx-auto">
        <v-card class="pa-4 ma-4 fondo">
          <v-card-title style="color: rgb(75, 142, 38);">Signup</v-card-title>
          <v-text-field
          style="color: rgb(75, 142, 38);"
            class="custom-input"
            label="Nombre"
            placeholder="Nombre"
            v-model="newUser.name"
            filled
            rounded
            dense
          ></v-text-field>
          <v-text-field
          style="color: rgb(75, 142, 38);"
            class="custom-input"
            label="Username"
            placeholder="Username"
            v-model="newUser.username"
            filled
            rounded
            dense
          ></v-text-field>
          <v-text-field
          style="color: rgb(75, 142, 38);"
            class="custom-input"
            label="Email"
            placeholder="Email"
            :rules="emailRules"
            v-model="newUser.email"
            filled
            rounded
            dense
          ></v-text-field>
          <v-text-field
          style="color: rgb(75, 142, 38);"
            class="custom-input"
            label="Password"
            :type="visible ? 'text' : 'password'"
            :rules="passwordRules"
            placeholder="Password"
            v-model="newUser.password"
            filled
            rounded
            dense
            :append-icon="visible ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="visible = !visible"
          ></v-text-field>
          <v-text-field
          style="color: rgb(75, 142, 38);"
            class="custom-input"
            label="Confirmar Password"
            :type="visible ? 'text' : 'password'"
            :rules="passwordRules"
            placeholder="Password"
            v-model="newUser.confirmPassword"
            filled
            rounded
            dense
            :append-icon="visible ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="visible = !visible">
          </v-text-field>
          <v-card-actions>
            <v-btn
              elevation="2"
              color="#001D3D"
              class="custom-button"
              rounded
              dark
              @click="retroceder"
            >
              <v-icon class="custom-icon" color="rgb(75, 142, 38)">mdi-arrow-left</v-icon>
              <span style="color: rgb(75, 142, 38);">Volver</span>
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              elevation="2"
              color="#001D3D"
              class="custom-button"
              rounded
              dark
              @click="signupUser"
            >
              <v-icon class="custom-icon" color="rgb(75, 142, 38)">mdi-check</v-icon>
              <span style="color: rgb(75, 142, 38);">Aceptar</span>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { useAuthStore } from "@/stores/store";
import api from "@/services/api.js";

export default {
  data() {
    return {
      emailRules: [
        (value) => !!value || "Introduce tu email",
        (value) =>
          value.match(/^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/) ||
          "Error en el email",
      ],
      passwordRules: [
        (value) =>
          value.length >= 6 || "El Password debe tener más de 6 caracteres",
      ],
      visible: false,
      newUser: {
        name: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      authStore: useAuthStore(),
    };
  },
  methods: {
    retroceder() {
      this.$router.go(-1);
    },
    async signupUser() {
      if (this.newUser.password !== this.newUser.confirmPassword) {
        alert("Las contraseñas no coinciden");
        return;
      }

      const response = await api.signup(this.newUser);
      if (response.error) {
        alert("Error al crear cuenta");
      } else {
        this.authStore.login(response.token, response.email);
        this.$router.push({ name: "home" });
      }
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
