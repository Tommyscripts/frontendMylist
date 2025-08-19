<template>
  <transition name="toast-slide">
    <div v-if="toast.show" class="toast-wrap">
      <div :class="['toast-card', toast.color]">
        <div class="toast-left">
          <div class="icon-circle">
            <v-icon size="28">{{ icon }}</v-icon>
          </div>
        </div>
        <div class="toast-center">
          <div class="toast-title">{{ title }}</div>
          <div class="toast-text">{{ toast.message }}</div>
        </div>
        <div class="toast-right">
          <v-btn small class="toast-btn" @click="toast.close()">Aceptar</v-btn>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { useToastStore } from '../stores/toast'
import { computed } from 'vue'

export default {
  name: 'Toast',
  setup() {
    const toast = useToastStore()

    const icon = computed(() => {
      switch (toast.color) {
        case 'success':
          return 'mdi-check'
        case 'error':
          return 'mdi-close-circle'
        case 'warning':
          return 'mdi-alert'
        default:
          return 'mdi-information'
      }
    })

    const title = computed(() => {
      switch (toast.color) {
        case 'success':
          return '¡Hecho!'
        case 'error':
          return 'Error'
        case 'warning':
          return 'Atención'
        default:
          return 'Info'
      }
    })

    return { toast, icon, title }
  }
}
</script>

<style scoped>
.toast-wrap {
  position: fixed;
  top: 18px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
}
.toast-card {
  display: flex;
  align-items: center;
  min-width: 360px;
  max-width: 820px;
  border-radius: 14px;
  padding: 12px 16px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.35);
  color: white;
}
.toast-left { margin-right: 12px }
.icon-circle{
  width:48px;height:48px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:rgba(255,255,255,0.12)
}
.toast-title { font-weight:700; font-size:16px }
.toast-text { opacity:0.95; margin-top:2px }
.toast-right { margin-left: 12px }
.toast-btn{ background: rgba(255,255,255,0.12); color:white }

/* colores por tipo */
.success{ background: linear-gradient(90deg,#2ecc71,#27ae60) }
.error{ background: linear-gradient(90deg,#ff6b6b,#ff3b30) }
.warning{ background: linear-gradient(90deg,#f6c23e,#f39c12) }
.info{ background: linear-gradient(90deg,#3399ff,#007bff) }

/* animación */
.toast-slide-enter-active{ animation: toast-in 360ms cubic-bezier(.2,.8,.2,1) }
.toast-slide-leave-active{ animation: toast-out 260ms cubic-bezier(.4,.0,.2,1) }
@keyframes toast-in{ from{ transform: translateY(-20px) scale(.98); opacity:0 } to{ transform: translateY(0) scale(1); opacity:1 } }
@keyframes toast-out{ from{ transform: translateY(0); opacity:1 } to{ transform: translateY(-12px); opacity:0 } }
</style>
