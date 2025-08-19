<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="7" class="mt-10 mb-4 mx-auto">
        <v-text-field
          label="Nombre"
          placeholder="Nombre"
          filled
          rounded
          dense
          v-model="newUser.name"
          style="color: rgb(75, 142, 38);"
        ></v-text-field>
        <v-text-field
          label="Username"
          placeholder="Username"
          filled
          rounded
          dense
          v-model="newUser.username"
          style="color: rgb(75, 142, 38);"
        ></v-text-field>
        <v-text-field
          label="Email"
          placeholder="Email"
          :rules="emailRules"
          filled
          rounded
          dense
          v-model="newUser.email"
          style="color: rgb(75, 142, 38);"
        ></v-text-field>
        <v-text-field
          label="Password"
          :type="visible ? 'text' : 'password'"
          :rules="passwordRules"
          placeholder="Password"
          filled
          rounded
          dense
          :append-icon="visible ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="visible = !visible"
          v-model="newUser.password"
          style="color: rgb(75, 142, 38);"
        ></v-text-field>
        <v-text-field
          label="Confirmar Password"
          :type="visible ? 'text' : 'password'"
          :rules="passwordRules"
          placeholder="Password"
          filled
          rounded
          dense
          :append-icon="visible ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="visible = !visible"
          style="color: rgb(75, 142, 38);"
        ></v-text-field>
        <v-row class="pt-9">
          <v-btn
            elevation="2"
            id="colores"
            class="button-color" 
            rounded
            dark
            @click="signupUser()"
          >
            <v-icon id="colores">mdi-check</v-icon>
            Aceptar
          </v-btn>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { useAuthStore } from "@/stores/store";
import api from "@/services/api.js";
import { useDialogStore } from '../stores/dialog'

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
        role: "admin",
      },
  authStore: useAuthStore(),
  dialog: useDialogStore(),
    };
  },
  methods: {
    retroceder() {
      this.$router.go(-1);
    },
    async signupUser() {
      // Si el campo de confirm password no existe (no vinculado) saltamos validación
      if (this.newUser.password && this.newUser.confirmPassword && this.newUser.password !== this.newUser.confirmPassword) {
        await this.dialog.open({ title: 'Error', text: 'Las contraseñas no coinciden', type: 'error', confirmText: 'Aceptar' })
        return;
      }

      const response = await api.signup(this.newUser);
      if (response.error) {
        await this.dialog.open({ title: 'Error', text: 'Error al crear cuenta', type: 'error', confirmText: 'Aceptar' })
      } else {
        await this.dialog.open({ title: 'Cuenta creada', text: 'Cuenta de administrador creada', type: 'success', confirmText: 'Aceptar' })
        this.$router.push({ name: "home" });
      }
    },
  },
};
</script>

<style scoped>
.bg-green {
  background-color:  #001D3D; /* Cambiar al color que deseas */
  color: #37da48; /* Cambiar al color que deseas */
}

.button-color {
  background-color:  #001D3D; /* Cambiar al color que deseas */
  color: #37da48; /* Cambiar al color que deseas */
}
</style>
