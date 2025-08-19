<template>
    <v-container>
      <v-row>
        <v-col cols="12" md="4" sm="6" v-for="(bebida, idx) in bebidas" :key="idx">
          <v-card class="color">
            <v-card-title class="d-flex">
              <v-avatar>
                <v-img :src="bebida.img"> </v-img>
              </v-avatar>
              {{ bebida.name }}
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
                      @click="agregarProducto(list.name, bebida._id)"
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
  import { useDialogStore } from '../stores/dialog'
  
  export default {
    name: "Button",
    data() {
      return {
        productos: [],
        bebidas: [],
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
          this.productos.forEach((el) => {
            if (el.categorias === "Bebidas") this.bebidas.push(el);
          });
        } else {
          console.error('producto.addProduct no devolvió un array', result);
          this.productos = [];
          this.bebidas = [];
        }
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
      (producto) => producto._id === id
    );
  
    // Verificar si el producto ya existe en alguna de las dos últimas listas
    let productoExistenteEnOtraLista = false;
    if (name !== "Todos los productos") {
      const casa = this.lists.find((el) => el.name === "Lista de casa");
      const compra = this.lists.find((el) => el.name === "Lista de compra");
      if (casa && casa.productos.find((producto) => producto._id === id)) {
        await this.dialog.open({ title: 'Atención', text: 'El producto ya se encuentra en la lista "Productos de casa"', type: 'warning', confirmText: 'Aceptar' })
        productoExistenteEnOtraLista = true;
      }
      if (compra && compra.productos.find((producto) => producto._id === id)) {
        await this.dialog.open({ title: 'Atención', text: 'El producto ya se encuentra en la lista "Productos de compra"', type: 'warning', confirmText: 'Aceptar' })
        productoExistenteEnOtraLista = true;
      }
    }
  
    // Si el producto ya existe en alguna de las dos últimas listas, retornar sin hacer nada más
    if (productoExistenteEnOtraLista) {
      return productoExistente;
    }
  
    // Si el producto ya existe en la lista, mostrar mensaje de error
      if (productoExistente) {
        await this.dialog.open({ title: 'Producto duplicado', text: 'El producto ya se encuentra en la lista', type: 'warning', confirmText: 'Aceptar' })
        return productoExistente;
      }
  
    // Si el producto no existe en la lista, agregarlo
    const respond = await api.createListAdd(listaEncontrada._id, id);
  listaEncontrada.productos.push(respond);
  await this.dialog.open({ title: 'Producto agregado', text: 'El producto ha sido agregado a la lista', type: 'success', confirmText: 'Aceptar' })
    return respond;
  }
  
  
    },
  };
  </script>
  
  <style scoped>
  .color {
    background-color: #3f91be;
    color: white;
  }
  </style>
  