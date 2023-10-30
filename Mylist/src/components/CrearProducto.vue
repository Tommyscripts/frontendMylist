<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="7" class="mt-10 mx-auto">
    <v-text-field
      label="Img"
      :rules="rules"
      hide-details="auto"
      v-model="newProducts.img"
      style="color: rgb(75, 142, 38);"
    ></v-text-field>
    <v-text-field
      label="Name"
      :rules="rules"
      v-model="newProducts.name"
      style="color: rgb(75, 142, 38);"
    ></v-text-field>
    <v-select
      label="Select"
      :items="categorias"
      v-model="newProducts.categorias"
      style="color: rgb(75, 142, 38);"
    >
    </v-select>
    <v-btn
      elevation="2"
      color="#375B83"
      rounded
      dark
      :rules="rules"
      @click.prevent="addNewProduct"
      @keydown.enter.prevent="addNewProduct"
      id="colores"
    >
      <v-icon id="colores"> mdi-check </v-icon>
      Añadir</v-btn
    >
  </v-col>

    </v-row>
  </v-container>
  
</template>

<script>
import products from "../services/productos";

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
  methods: {
    async addNewProduct() {
      try {
        const response = await products.createProduct(this.newProducts);
        console.log(this.newProducts);
        return response, alert("El producto ha sido creado");
      } catch {
        alert("Error al crear el producto");
      }
    },
  },
};
</script>
<style scoped>
#text {
  color: #5279d6;
  font-size: 3vh;
  font-weight: bold;
  text-align: justify;
}
#colores {
  color: #5279d6;
}
</style>
