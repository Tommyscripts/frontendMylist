<template>
  <v-container>
    <v-row>
      <v-col>
        <ConfirmarEliminarCuenta></ConfirmarEliminarCuenta>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ConfirmarEliminarCuenta from "../components/confirmarEliminarCuenta.vue";

export default {
  components: { ConfirmarEliminarCuenta },
};
</script>

<style lang="scss" scoped></style>
