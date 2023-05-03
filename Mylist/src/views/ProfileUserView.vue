<template>
  <v-container>
<v-row>
  <v-col cols="12">
    <Profile></Profile>
  </v-col>
</v-row>
  </v-container>

  
  </template>
  <script>
  import api from '../services/api.js';
  import { RouterLink } from "vue-router";
  import Profile from '../components/profileuser.vue'
  export default{
    components:{
      Profile
    }
  }

</script>
  