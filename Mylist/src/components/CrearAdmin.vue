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
        class="bg-green"
      ></v-text-field>
      <v-text-field
        label="Username"
        placeholder="Username"
        filled
        rounded
        dense
        v-model="newUser.username"
        class="bg-green"
      ></v-text-field>
      <v-text-field
        label="Email"
        placeholder="Email"
        :rules="emailRules"
        filled
        rounded
        dense
        v-model="newUser.email"
        class="bg-green"
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
        class="bg-green"
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
        class="bg-green"
      ></v-text-field>
      <v-row class="pt-9">
        <v-btn
          elevation="2"
          id="colores"
          color="#375B83"
          rounded
          dark
          @click="signupUser()"
        >
          <v-icon  id="colores"> mdi-check </v-icon>
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
      };
    },
    methods: {
      retroceder() {
        this.$router.go(-1);
      },
      async signupUser() {
        const response = await api.signup(this.newUser);
        if (response.error) {
          alert("Error al crear cuenta");
        } else {
          this.$router.push({ name: "home" });
        }
      },
    },
  };
  </script>
  
  <style>
  #text{
    color: #4ba435;
    font-size: 3vh;
    font-weight: bold;
    text-align: justify;
  }
  #colores {
    color: #4ba435;
  }
  </style>
  