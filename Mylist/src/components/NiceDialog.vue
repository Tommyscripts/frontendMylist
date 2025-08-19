<template>
  <v-dialog v-model="dialog.state.show" max-width="680">
    <v-card :class="['dialog-card', dialog.state.type]">
      <v-card-title class="d-flex align-center">
        <v-avatar class="me-3" size="40" color="white">
          <v-icon :color="iconColor">{{ icon }}</v-icon>
        </v-avatar>
        <div>
          <div class="dialog-title">{{ dialog.state.title }}</div>
        </div>
      </v-card-title>

      <v-card-text>
        <div class="dialog-text">{{ dialog.state.text }}</div>
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn v-if="dialog.state.showCancel" variant="text" @click="dialog.cancel()">{{ dialog.state.cancelText }}</v-btn>
        <v-btn color="white" class="btn-accept" @click="dialog.confirm()">{{ dialog.state.confirmText }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { useDialogStore } from '../stores/dialog'
import { computed, watch } from 'vue'
import { useToastStore } from '../stores/toast'

export default {
  name: 'NiceDialog',
  setup() {
    const dialog = useDialogStore()
    const toast = useToastStore()

    // Si un diálogo de tipo 'success' se abre, lo convertimos en toast y cerramos el modal
    watch(() => dialog.state.show, (val) => {
      if (val) {
        // cerrar cualquier toast visible para que no compita con el modal
        try { toast.close() } catch (e) {}
        if (dialog.state.type === 'success') {
          try {
            toast.open(dialog.state.text || dialog.state.title, 'success', 2000)
          } catch (e) {}
          // cerrar diálogo inmediatamente
          dialog.confirm()
        }
      }
    })

    const icon = computed(() => {
      switch (dialog.state.type) {
        case 'success': return 'mdi-check'
        case 'error': return 'mdi-close-circle'
        case 'warning': return 'mdi-alert'
        default: return 'mdi-information'
      }
    })
    const iconColor = computed(() => dialog.state.type === 'error' ? 'red' : 'black')
    return { dialog, icon, iconColor }
  }
}
</script>

<style scoped>
.dialog-card { border-radius: 12px; }
.dialog-title { font-weight:700 }
.dialog-text { opacity:0.95; white-space:pre-wrap; word-break:break-word; overflow:auto; max-height:320px; }
.btn-accept { background: linear-gradient(90deg,#6a11cb,#2575fc); color:white }
/* mejorar spacing dentro del diálogo */
.dialog-card > * { padding-left: 16px; padding-right: 16px }
</style>
