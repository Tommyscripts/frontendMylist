<template>
  <v-col cols="12" sm="7" class="mt-10 mx-auto">
    <v-text-field
      label="Img"
      :rules="rules"
      hide-details="auto"
      v-model="newProducts.img"
      class="bg-green"
    ></v-text-field>
    <v-text-field
      label="Name"
      :rules="rules"
      v-model="newProducts.name"
      class="bg-green"
    ></v-text-field>
    <v-select
      label="Select"
      :items="categorias"
      v-model="newProducts.categorias"
      class="bg-green"
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
      ],
    };
  },
  methods: {
    async addNewProduct() {
  try {
    // Comprobar si el producto ya existe
    let productoExistente = this.products.find((producto) => producto.name === this.newProducts.name);
    if (productoExistente) {
      console.log(`El producto ${this.newProducts.name} ya existe`);
      alert(`El producto ${this.newProducts.name} ya existe`);
      return;
    }
    
    // Si el producto no existe, crearlo
    const response = await products.createProduct(this.newProducts);
    console.log(this.newProducts);
    alert("El producto ha sido creado");
    return response;
  } catch {
    alert("El producto ya existe");
  }
}

  },
};
</script>
<style>
#text {
  color: #4ba435;
  font-size: 3vh;
  font-weight: bold;
  text-align: justify;
}
#colores {
  color: #4ba435;
}
</style>
