import { defineStore } from 'pinia'

export const useToastStore = defineStore('toast', {
  state: () => ({
    show: false,
    message: '',
    color: 'info',
    timeout: 4000,
  }),
  actions: {
    open(message, color = 'info', timeout = 4000) {
      this.message = message
      this.color = color
      this.timeout = timeout
      this.show = true
    },
    close() {
      this.show = false
    }
  }
})

export default useToastStore
