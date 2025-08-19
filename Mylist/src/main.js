import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import { createPinia } from 'pinia'
import { setupGlobalAlerts } from './plugins/globalAlerts'

const pinia = createPinia()
loadFonts()

const app = createApp(App)
app.use(pinia)
// inicializar overrides globales que usan Pinia
setupGlobalAlerts(pinia)
app.use(router)
app.use(vuetify)
app.mount('#app')
 