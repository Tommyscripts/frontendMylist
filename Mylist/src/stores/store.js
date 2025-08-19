import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core' // conecta piña con localStorage
import api from '../services/api'


export const useAuthStore = defineStore('auth', {
  state: () => {
    return {
      token: useStorage('token', null),
      email: useStorage('email', null)
      ,
      role: useStorage('role', null)
    }
  },
  getters: {
    isLoggedIn() {
      return this.token != null
    },
    userEmail() {
      return this.email
    },
  },
  actions: {
    logout() {
      this.token = null
      this.email = null
      this.role = null
    },
    login(token, email) {
      this.token = token
      this.email = email
    },
    async loadUser() {
      // intenta obtener los datos del perfil del servidor y rellenar role/email
      if (!this.token) return null
      try {
        const data = await api.getUser()
        if (data && data.email) this.email = data.email
        if (data && data.role) this.role = data.role
        return data
      } catch (error) {
        return null
      }
    }
  },
})