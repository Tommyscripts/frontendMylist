<template>
    <v-container>
        <v-row>
        <v-col cols="12" v-for="(list,idx) in lists" :key="idx" >
            <v-card
    class="mx-auto"
    max-width="344"
    color="#375B83">
    <v-card-title id="colores">          
           {{list.name}}
           <v-avatar >
        <v-img :src="list.img" >
        </v-img>
        </v-avatar>
    </v-card-title>
  </v-card>
        </v-col>
    </v-row>
    </v-container> 
</template>



<script>
import api from '../services/list.js'

  export default {

    async created() {
    const result = await api.getList();
    this.lists = result;
 
  },
  data() {
    return {
        lists: []
    }
  },
  }

</script>

<style  scoped>
  #colores {
    color: #4ba435;
    display: flex;
    justify-items: auto;
    
  }
</style>