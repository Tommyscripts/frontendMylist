<template>
    <v-overlay :value="show">
      <v-card>
        <v-card-title>
          Auth Overlay
        </v-card-title>
        <v-card-text>
          <component :is="showLogin ? 'LoginView' : 'SignupView'" />
        </v-card-text>
        <v-card-actions>
          <v-btn @click="showLogin = !showLogin">Switch to {{ showLogin ? 'Signup' : 'Login' }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-overlay>
  </template>
  
  <script>
  import LoginView from "../components/Login.vue";
  import SignupView from "../components/Signup.vue";
  
  export default {
    props: {
      show: Boolean,
    },
    data() {
      return {
        showLogin: true, // Mostrar la vista de inicio de sesión por defecto
      };
    },
    components: {
      LoginView,
      SignupView,
    },
  };
  </script>
  