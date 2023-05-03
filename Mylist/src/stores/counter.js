// Importamos las funciones `ref` y `computed` de Vue y la función `defineStore` de Pinia
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

// Definimos un store de contador llamado `useCounterStore` usando la función `defineStore`
export const useCounterStore = defineStore('counter', () => {
  // Creamos una variable reactiva `count` y la inicializamos en 0 usando la función `ref`
  const count = ref(0)

  // Creamos una variable computada `doubleCount` que multiplica el valor de `count` por 2
  const doubleCount = computed(() => count.value * 2)

  // Definimos una función `increment` que aumenta el valor de `count` en uno cada vez que se llama
  function increment() {
    count.value++
  }

  // Devolvemos un objeto con las variables reactivas y la función `increment`
  return { count, doubleCount, increment }
})
