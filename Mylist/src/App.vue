<template>
  <v-app >
    <v-main class="body">
     <navbar></navbar>
    <Toast />
    <NiceDialog />
     <RouterView></RouterView>
    </v-main>
  </v-app>
</template>

<script>
import { RouterLink, RouterView } from "vue-router";
import navbar from './components/navbar.vue'
import Toast from './components/Toast.vue'
import NiceDialog from './components/NiceDialog.vue'

export default {
  name: 'App',
components:{
  navbar
  ,Toast
 ,NiceDialog
}

}
</script>
<style>
.body{
  background-color: #363b6a;
}
</style>
