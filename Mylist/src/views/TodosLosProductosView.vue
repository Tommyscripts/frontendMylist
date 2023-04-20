<template>
  <v-container>
    <v-row>
        <v-col>
            <TodosLosProductos></TodosLosProductos>
        </v-col>
    </v-row>
  </v-container>
</template>

<script>
import TodosLosProductos from '../components/todoslosproductos.vue'

    export default {
        components:{
            TodosLosProductos
        }
    }
</script>

<style>

</style>