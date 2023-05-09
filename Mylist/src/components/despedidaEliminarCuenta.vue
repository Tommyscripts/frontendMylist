<template>
<v-container>
    <v-row>
        <v-col cols="12" md="4" sm="6" class="mx-auto">
            <v-card-item>
                Se ha confirmado la eliminación de tu perfil, esperamos veros pronto.
            </v-card-item>
            <v-img src="https://lallavedelaspalabras.files.wordpress.com/2019/08/despedida-rana-gustavo.jpg?w=640">

            </v-img>

        </v-col>
    </v-row>
    <v-row>
        <v-col>
            <v-btn class="ml-4" rounded color="#375B83" :to="{ name: 'home' }">
          <a id="colores"><v-icon>mdi-home-variant</v-icon> Home</a>
        </v-btn>
        </v-col>
    </v-row>
</v-container>
</template>

<script>
export default {
    name: "Button",
        methods: {
    retroceder() {
      this.$router.go(-1);
    },
}
}
</script>

<style lang="scss" scoped>

</style>