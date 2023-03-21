<template>
  <v-app>
    <v-main>
     <navbar></navbar>
     <RouterView></RouterView>
    </v-main>
  </v-app>
</template>

<script>
import { RouterLink, RouterView } from "vue-router";
import navbar from './components/navbar.vue'

export default {
  name: 'App',
components:{
  navbar
}

}
</script>
