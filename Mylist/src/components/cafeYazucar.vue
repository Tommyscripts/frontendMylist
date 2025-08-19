<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="4" sm="6" v-for="(cafe, idx) in cafes" :key="idx">
        <v-card class="color">
          <v-card-title class="d-flex">
            <v-avatar>
              <v-img :src="cafe.img"> </v-img>
            </v-avatar>
            {{ cafe.name }}
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
                    @click="agregarProducto(list.name, cafe._id)"
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
    </v-row>
    <v-row id="btn">
        <v-btn rounded color="#375B83" @click="retroceder()">
          <a id="colores"><v-icon>mdi-arrow-left</v-icon> Back</a>
        </v-btn>
      </v-row>
  </v-container>
</template>

<script>
import producto from "../services/productos.js";
import api from "../services/api.js";
import listas from "../services/list.js";
import { tryAddProductToList } from '../services/listUtils'
import { useDialogStore } from '../stores/dialog'

export default {
  name: "Button",
  data() {
    return {
      productos: [],
      cafes: [],
      lists: [],
      idList: "",
      dialog: useDialogStore(),
    };
  },
  async created() {
    // addProduct es un .get para mostrar los productos
    const result = await producto.addProduct();
    if (Array.isArray(result)) {
      this.productos = result;
      this.productos.forEach((el) => { if (el.categorias === "Café y azúcar") this.cafes.push(el) })
    } else {
      console.error('producto.addProduct no devolvió un array', result);
      this.productos = [];
      this.cafes = [];
    }
    const user = await api.getUser();
    this.lists = user.listas;
  },
  methods: {
    retroceder() {
      this.$router.go(-1);
    },
    async agregarProducto(name, id) {
      return await tryAddProductToList(this.lists, name, id, this.dialog)
    }


  },
};
</script>
  
  <style scoped>
  .color{
      background-color: #6D3A33;
      color: white;
  }
  </style>