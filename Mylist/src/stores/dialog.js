import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useDialogStore = defineStore('dialog', () => {
  const state = reactive({
    show: false,
    title: '',
    text: '',
    type: 'info', // success, error, warning, info
    confirmText: 'Aceptar',
    cancelText: 'Cancelar',
    showCancel: false,
    resolve: null,
  })

  function open({ title = '', text = '', type = 'info', confirmText = 'Aceptar', cancelText = 'Cancelar', showCancel = false } = {}) {
    state.title = title
    state.text = text
    state.type = type
    state.confirmText = confirmText
    state.cancelText = cancelText
    state.showCancel = showCancel
    state.show = true

    return new Promise((resolve) => {
      state.resolve = resolve
    })
  }

  function confirm() {
    if (state.resolve) state.resolve(true)
    state.show = false
    state.resolve = null
  }

  function cancel() {
    if (state.resolve) state.resolve(false)
    state.show = false
    state.resolve = null
  }

  return { state, open, confirm, cancel }
})

export default useDialogStore
