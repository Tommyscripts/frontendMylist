<template>
<v-container>
    <v-row>
        <v-col>
            <DespedidaEliminarCuenta></DespedidaEliminarCuenta>
        </v-col>
    </v-row>
</v-container>
</template>

<script>
import DespedidaEliminarCuenta from '../components/despedidaEliminarCuenta.vue';


export default {
    setup() {
        return {};
    },
    components: { DespedidaEliminarCuenta }
}
</script>

<style lang="scss" scoped>

</style>