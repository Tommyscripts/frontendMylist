<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="8" sm="4" class="mx-auto">
        <v-card id="fondo">
          <v-form
            action="https://formsubmit.co/e78cf6db1dea690a57f2f966583aceff"
            method="POST"
          >
            <v-label for="Nombre">Nombre</v-label>
            <v-textarea
              placeholder="Escribe aqui tu nombre"
              class="bg-green"
              type="name"
              name="name"
              id="formulario"
            >
            </v-textarea>
            <v-label for="email">Email </v-label>
            <v-textarea
              placeholder="Escribe aqui tu correo"
              type="email"
              class="bg-green"
              name="email"
              id="formulario"
            ></v-textarea>
            <v-label for="comments">Escribe tu mensaje</v-label>
            <v-textarea
              type="comments"
              name="comments"
              method="POST"
              class="bg-green"
              placeholder="Puede clickar en el correo para mandarme un email, o rellenar este campo y darle al boton enviar. Además de tener mi github y mi linkedin."
              variant="outlined"
            ></v-textarea>
            <v-btn
              rounded
              type="submit"
              value="enviar"
              color="#375B83"
              class="amber--text text--darken-1"
              id="colores"
              >Enviar</v-btn>
            <input type="hidden" name="_next" value="" />
            <input type="hidden" name="_captcha" value="false" />
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {};
</script>

<style>
#formulario {
  max-height: 0.2px;
}
#fondo {
  background-color: #363b6a;
}
</style>
