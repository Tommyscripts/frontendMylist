<template>
  <Profile></Profile>
  
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
  