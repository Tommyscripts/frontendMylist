<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12" md="8" sm="4" class="mx-auto">
          <v-card class="pa-4 ma-4 fondo">
            <v-card-title style="color: rgb(75, 142, 38);">Soporte</v-card-title>
            <v-form @submit.prevent="submitForm">
              <v-text-field style="color: rgb(75, 142, 38);" label="Nombre" placeholder="Escribe aquí tu nombre"
                v-model="formData.name" filled rounded dense :value="user ? user.name : formData.name"
                :readonly="user !== null"></v-text-field>
              <v-text-field style="color: rgb(75, 142, 38);" label="Email" placeholder="Escribe aquí tu correo"
                v-model="formData.email" filled rounded dense></v-text-field>
              <v-textarea style="color: rgb(75, 142, 38);" label="Escribe tu mensaje"
                placeholder="Escribe tu mensaje aquí." v-model="formData.comments" filled rounded dense></v-textarea>
              <v-btn rounded type="submit" color="#001D3D" class="custom-button">
                <v-icon class="custom-icon">mdi-send</v-icon>
                <span style="color: rgb(75, 142, 38);">Enviar</span>
              </v-btn>
            </v-form>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <div v-if="showSuccessOverlay" class="success-overlay">
      <p>¡Correo enviado con éxito!</p>
    </div>
  </div>
</template>

<script>
import emailjs from 'emailjs-com';

export default {
  data() {
    return {
      formData: {
        name: "",
        email: "",
        comments: "",
      },
      showSuccessOverlay: false, // Estado para mostrar el overlay de éxito
    };
  },
  computed: {
    user() {
      // Debes proporcionar la lógica para obtener el usuario logeado aquí
      return {
        name: "Nombre del Usuario", // Reemplaza con el nombre real del usuario
      };
    },
  },
  methods: {
    submitForm() {
      const emailParams = {
        to_name: 'Destinatario',
        from_name: this.formData.name,
        message: this.formData.comments,
      };

      emailjs
        .send('YOUR_EMAILJS_SERVICE_ID', 'template_276i72g', emailParams, 'YOUR_EMAILJS_USER_ID')
        .then((response) => {
          ('Correo electrónico enviado:', response);
          this.showSuccessOverlay = true; // Mostrar el overlay de éxito
        })
        .catch((error) => {
          console.error('Error al enviar el correo electrónico:', error);
          // Puedes mostrar un mensaje de error o tomar otras medidas según tus necesidades
        });
    },
  },
};
</script>

<style scoped>
.fondo {
  background-color: rgba(58, 55, 108, 0.7);
}

.custom-button {
  background-color: #001D3D;
}

.custom-icon {
  color: rgb(75, 142, 38);
}

.success-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.success-overlay p {
  font-size: 24px;
  color: green;
}
</style>
