<template>
    <div class="back" id="colores">
   <a id="text" class="d-flex justify-center">Bienvenido/a</a>
    <br>
    <br>
    <div class="d-flex justify-center">
      Aqui podrás crear varias listas de compra y productos, desde los productos
      que tenemos en casa, a la lista de la compra, listas personalizadas. Todos
      los productos están separado por categorías. Para ello necesitarás crear una
      cuenta.

    </div>
      <br>
      <br>
    <div class="d-flex justify-center">
      <v-btn rounded color="#375B83">
      <a id="colores">Crear una cuenta ahora</a>
    </v-btn>
    </div>

    <v-divider></v-divider>
    <br>
    <br>
    <v-btn rounded color="#375B83"  @click="retroceder()">
      <a id="colores"><v-icon>mdi-arrow-left</v-icon> Back</a>
    </v-btn>
  </div>
</template>

<script>
// Components
export default {
  name: "HomeView",
  methods: {
    retroceder() {
      this.$router.go(-1);
    },
  },
};
</script>
<style>
#text{
  color: #4ba435;
  font-size: 3vh;
  font-weight: bold;
  text-align: justify;
}
#colores {
  color: #4ba435;
}
.back {
  background-color: #363b6a;
  height: 100vh;
}



</style>
