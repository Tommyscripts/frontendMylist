<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="4" sm="6" v-for="(carne, idx) in carnes" :key="idx">
        <v-card id="color">
          <v-card-title class="d-flex">
            <v-avatar>
              <v-img :src="carne.img"> </v-img>
            </v-avatar>
            {{ carne.name }}
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
                    @click="agregarProducto(list.name, carne._id)"
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
import { useToastStore } from '../stores/toast'
import { useDialogStore } from '../stores/dialog'

export default {
  name: "Button",
  data() {
    return {
      productos: [],
      carnes: [],
      lists: [],
      idList: "",
  toast: useToastStore(),
  dialog: useDialogStore(),
    };
  },
  async created() {
    // addProduct es un .get para mostrar los productos
    const result = await producto.addProduct();
    // validar que result sea un array
    if (Array.isArray(result)) {
      this.productos = result;
      this.productos.forEach((el) => {
        if (el.categorias === "Carnes") this.carnes.push(el);
      });
    } else {
      console.error('productos.addProduct no devolvió un array', result);
      // manejar caso de error (por ejemplo, mostrar mensaje o dejar arrays vacíos)
      this.productos = [];
      this.carnes = [];
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
#color {
  background-color: #bb6a3d;
  color: white;
}
</style>
