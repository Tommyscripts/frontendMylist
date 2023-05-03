<template>
<v-container>
    <v-row>
        <v-col cols="12" >
            <ListaDeLaCompra></ListaDeLaCompra>
        </v-col>
    </v-row>
</v-container>
</template>

<script>
import ListaDeLaCompra from '../components/ListaDeLaCompra.vue';

    export default {
    components: { ListaDeLaCompra }
}
</script>

<style lang="scss" scoped>

</style>