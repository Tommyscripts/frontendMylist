<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="8" sm="4" v-for="(bolleria, idx) in bollerias" :key="idx">
        <v-card class="color">
          <v-card-title class="d-flex">
            <v-avatar>
              <v-img :src="bolleria.img"> </v-img>
            </v-avatar>
            {{ bolleria.name }}
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
                    @click="agregarProducto(list.name, bolleria._id)"
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
import listas from "../services/list.js";

export default {
  name: "Button",
  data() {
    return {
      productos: [],
      bollerias: [],
      lists: [],
      idList: "",
    };
  },
  async created() {
    // addProduct es un .get para mostrar los productos
    const result = await producto.addProduct();
    this.productos = result;
    this.productos.filter((el) => {
      if (el.categorias === "Bollería") {
        this.bollerias.push(el);
      }
    });
    const user = await api.getUser();
    console.log(user);
    this.lists = user.listas;
  },
  methods: {
    retroceder() {
      this.$router.go(-1);
    },
    async agregarProducto(name, id) {
      this.lists.filter((el) => {
        if (el.name === name) {
          this.idList = el._id.toLocaleString();
        }
      });
      const respond = await api.createListAdd(this.idList, id);
      return respond;
    },
  },
};
</script>
  
  <style>
  .color{
      background-color: #8F7C56;
      color: white;
  }
  </style>