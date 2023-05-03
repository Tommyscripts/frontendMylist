<template>
  <v-container>
    <v-row>
      <v-col cols="12" v-for="(list, idx) in lists" :key="idx">
        <v-card class="mx-auto" max-width="344" :class="list.color" :to="list.route">
          <v-card-title>
            {{ list.name }}
            <v-avatar>
              <v-img :src="list.img"> </v-img>
            </v-avatar>
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import api from "../services/list.js";

export default {
/*async created() {
    const result = await api.getList();
    this.listas = result;
  },*/
  data() {
    return {
      listas: [],
      lists: [
        {
          name: "Todos los productos",
          color: "red",
          img: "https://cdn-icons-png.flaticon.com/512/1312/1312307.png",
          route:"/categorias",
        },
        {
          name: "Lista de compra",
          color: "blue",
          img: "https://cdn-icons-png.flaticon.com/512/2203/2203183.png",
          route:"/listadelacompra"
        },
        {
          name: "Lista de casa",
          color: "green",
          img: "https://cdn-icons-png.flaticon.com/512/619/619153.png",
          route:"/listadecasa"
        },
      ],
    };
  },
};
</script>

<style scoped>
#colores {
  color: #4ba435;
  display: flex;
  justify-items: auto;
}
.red {
  background-color: #532323;
  color: white;
}
.blue {
  background-color: #696d31;
  color: white;
}
.green {
  background-color: #3e7554;
  color: white;
}
</style>
