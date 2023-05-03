<template>
<v-container>
    <v-row>
        <v-col cols="12">
            <ListaDeCasa></ListaDeCasa>
        </v-col>
    </v-row>
</v-container>

</template>

<script>
import ListaDeCasa from '../components/ListaDeCasa.vue';


    export default {
    components: { ListaDeCasa }
}
</script>

<style lang="scss" scoped>

</style>