<template>
<v-container>
    <v-row>
        <v-col>

        </v-col>
    </v-row>
    <v-row>
        <v-col>
            <v-btn class="ml-4" rounded color="#375B83" @click="retroceder()">
          <a id="colores"><v-icon>mdi-arrow-left</v-icon> Back</a>
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