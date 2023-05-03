<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="4" sm="6"   >
     
          <v-card-title id="color">{{ casa.name }} </v-card-title>
          <v-card-item
            v-for="(producto, idx) in casa.productos"
            :key="idx"
            id="color2"
           >
            <v-avatar>
              <v-img :src="producto.img"> </v-img>
            </v-avatar>
            {{ producto.name }}
            <v-btn class="ml-4" rounded color="#375B83" > <a id="colores">No me queda</a> </v-btn>
          </v-card-item>

      
      </v-col>
    </v-row>

    <v-row>
      <v-col >
        <v-btn  rounded color="#375B83" @click="retroceder()">
        <a id="colores"><v-icon>mdi-arrow-left</v-icon> Back</a>
      </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import api from "../services/api.js";
export default {
  methods: {
    retroceder() {
      this.$router.go(-1);
    },
  },
  data() {
    return {
      lists: [],
      casa: {},
    };
  },
  async created() {
    const result = await api.getUser();
    this.lists = result.listas;
    this.lists.filter((el) => {
      if (el.name === "Lista de casa") {
        this.casa = el;
      }
    });
  },
};
</script>

<style scoped>
#color {
  background-color: #4c8f67;
  color: white;
 
}
#color2 {
  background-color: #3e7554;
  color: white;
}
#colores{
  color:white;
}
</style>
