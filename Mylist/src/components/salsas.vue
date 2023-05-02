<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="4" sm="6" v-for="(salsa, idx) in salsas" :key="idx">
        <v-card class="color">
          <v-card-title class="d-flex">
            <v-avatar>
              <v-img :src="salsa.img"> </v-img>
            </v-avatar>
            {{ salsa.name }}
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
                    @click="agregarProducto(list.name, salsa._id)"
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
      salsas: [],
      lists: [],
      idList: "",
    };
  },
  async created() {
    // addProduct es un .get para mostrar los productos
    const result = await producto.addProduct();
    this.productos = result;
    this.productos.filter((el) => {
      if (el.categorias === "Salsas") {
        this.salsas.push(el);
      }
    });
    const user = await api.getUser();
    this.lists = user.listas;
  },
  methods: {
    retroceder() {
      this.$router.go(-1);
    },
    async agregarProducto(name, id) {
  let listaEncontrada;

  // Buscar la lista por su nombre
  this.lists.forEach((el) => {
    if (el.name === name) {
      listaEncontrada = el;
    }
  });

  // Buscar el producto en la lista
  let productoExistente = listaEncontrada.productos.find(
    (producto) => producto === id
  );

  // Verificar si el producto ya existe en alguna de las dos últimas listas
  let productoExistenteEnOtraLista = false;
  if (name !== "Todos los productos") {
    const casa = this.lists.find((el) => el.name === "Lista de casa");
    const compra = this.lists.find((el) => el.name === "Lista de compra");
    if (casa && casa.productos.includes(id)) {
      alert(`El producto ya se encuentra en la lista "Productos de casa"`);
      productoExistenteEnOtraLista = true;
    }
    if (compra && compra.productos.includes(id)) {
      alert(`El producto ya se encuentra en la lista "Productos de compra"`);
      productoExistenteEnOtraLista = true;
    }
  }

  // Si el producto ya existe en alguna de las dos últimas listas, retornar sin hacer nada más
  if (productoExistenteEnOtraLista) {
    return productoExistente;
  }

  // Si el producto ya existe en la lista, mostrar mensaje de error
  if (productoExistente) {
    alert(`El producto ya se encuentra en la lista`);
    return productoExistente;
  }

  // Si el producto no existe en la lista, agregarlo
  const respond = await api.createListAdd(listaEncontrada._id, id);
  listaEncontrada.productos.push(respond);
  alert("El producto ha sido agregado a la lista");
  return respond;
}

  },
};
</script>
  
  <style scoped>
  .color{
      background-color: #8F5678;
      color: white;
  }
  </style>