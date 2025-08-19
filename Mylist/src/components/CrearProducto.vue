<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="7" class="mt-10 mx-auto">
        <v-text-field label="Img" :rules="rules" hide-details="auto" v-model="newProducts.img"
          style="color: rgb(75, 142, 38);"></v-text-field>
        <v-text-field label="Name" :rules="rules" v-model="newProducts.name"
          style="color: rgb(75, 142, 38);"></v-text-field>
        <v-select label="Select" :items="categorias" v-model="newProducts.categorias" style="color: rgb(75, 142, 38);">
        </v-select>
        <v-btn elevation="2" color="#375B83" rounded dark :rules="rules" @click.prevent="addNewProduct" @keydown.enter.prevent="addNewProduct" id="colores">
        <v-icon> mdi-check </v-icon>
             Añadir</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import products from "../services/productos";
import { useDialogStore } from '../stores/dialog'

export default {
  data() {
    return {
      newProducts: {
        img: "",
        name: "",
        categorias: "",
      },
      rules: [
        (value) => !!value || "Required.",
        (value) => (value && value.length >= 3) || "Min 3 characters",
      ],
      categorias: [
        "Carnes",
        "Pescados",
        "Congelados",
        "Arroces",
        "Lacteos y huevos",
        "Pasta",
        "Verduras",
        "Frutas",
        "Embutidos",
        "Panaderia",
        "Frutos secos",
        "Salsas",
        "Encurtidos",
        "Café y azúcar",
        "Bollería",
        "Limpieza",
        "Bebidas"
      ],
    };
  },
  created() {
    this.dialog = useDialogStore()
  },
  methods: {
    async addNewProduct() {
      try {
        const response = await products.createProduct(this.newProducts);

        await this.dialog.open({ title: 'Producto creado', text: 'El producto ha sido creado', type: 'success', confirmText: 'Aceptar' })
        return response;
      } catch {
        await this.dialog.open({ title: 'Error', text: 'Error al crear el producto', type: 'error', confirmText: 'Aceptar' })
      }
    },
  },
};
</script>
<style scoped>
#text {
  background-color: #001D3D;
  color: #37da48;
  font-size: 3vh;
  font-weight: bold;
  text-align: justify;
}

#colores {
  background-color: #001D3D;
  color: #37da48;
}
</style>
