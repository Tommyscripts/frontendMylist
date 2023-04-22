<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="8" sm="4" v-for="(arroz, idx) in arroces" :key="idx">
        <v-card class="color">
          <v-card-title class="d-flex">
            <v-avatar>
              <v-img :src="arroz.img"> </v-img>
            </v-avatar>
            {{ arroz.name }}
            <v-card-item>
              <v-menu open-on-hover>
                <template v-slot:activator="{ props }">
                  <v-btn
                    color="rgba(0,0,0,0)"
                    v-bind="props"
                    icon="mdi-plus"
                    size="x-small"
                  ></v-btn>
                </template>
                <v-list nav>
                  <v-list-item
                    v-for="(list, index) in lists.slice(1)"
                    :key="index"
                    @click="agregarProducto(list.name, arroz._id)"
                  >
                    <v-list-item-title>
                      {{ list.name }}
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-card-item>
          </v-card-title>
        </v-card>
      </v-col>
      <v-row id="btn">
        <v-btn rounded color="#375B83" @click="retroceder()">
          <a id="colores"><v-icon>mdi-arrow-left</v-icon> Back</a>
        </v-btn>
      </v-row>
    </v-row>
  </v-container>
</template>

<script>
import producto from "../services/productos.js";
import api from "../services/api.js";
import listas from "../services/list.js"

export default {
  name: "Button",
  methods: {
    retroceder() {
      this.$router.go(-1);
    },
  },
  data() {
    return {
      productos: [],
      arroces: [],
      lists: [],
    };
  },
  async created() {
    const result = await producto.addProduct();
    this.productos = result;
    this.productos.filter((el) => {
      if (el.categorias === "Arroces") {
        this.arroces.push(el);
      }
    });
     const user = await api.getUser()
     this.lists = user.listas
  },
  

};
</script>

<style>
.color {
  background-color: #3f91be;
  color: white;
}
</style>
