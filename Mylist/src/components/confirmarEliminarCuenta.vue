<template>
  <v-container>
    <v-row>
      <v-col >
        <v-col cols="12" md="4" sm="6" class="mx-auto">
          <v-card-item class="fondo">
            ¿De verdad quieres dejarnos?
            <v-spacer></v-spacer>
            Todos tus datos serán borrados y no seran recuperables una vez
            eliminada la cuenta.
          </v-card-item>
          <v-img
            src="https://cdn.pixabay.com/photo/2015/08/20/14/00/frog-897418_1280.jpg"
          >
          </v-img>
        </v-col>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="4" sm="6">
        <v-btn class="ml-4" rounded color="#375B83" @click="retroceder()">
          <a id="colores"><v-icon>mdi-alpha-x-circle</v-icon> No</a>
        </v-btn>
        <v-btn class="ml-4" rounded color="#375B83" @click="deleteUser"  >
          <a id="colores"><v-icon>mdi-alpha-v-circle</v-icon> Yes</a>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import api from "../services/api.js"
import listas from "../services/list.js"

export default {
    data: () => ({
        casa: "",
        compra:"",

  }),
  name: "Button",
  methods: {
    retroceder() {
      this.$router.go(-1);
    },
    async deleteUser() {   
      await api.deleteUser();
      await listas.deleteList(this.compra)
      await listas.deleteList(this.casa)
      this.$router.push({ name: "Despedida" });
    },
  },
 async created(){
   const respond = await api.getLista()
   this.compra= respond[1]
   this.casa=respond[2]
   console.log(this.compra)
   console.log(this.casa)
   
 }

};
</script>

<style scoped>
.fondo {
  color: white;
}
</style>
