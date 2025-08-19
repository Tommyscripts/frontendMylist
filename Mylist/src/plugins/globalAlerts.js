import { useToastStore } from '../stores/toast'

export function setupGlobalAlerts(pinia) {
  // Guardar el alert nativo antes de sobrescribir
  if (!window.__native_alert) window.__native_alert = window.alert

  // Reemplaza window.alert por una versión que usa nuestro toast store
  // Recibimos la instancia de pinia para poder llamar al store fuera de componentes
  window.alert = function (message) {
    try {
      const toast = useToastStore(pinia)
      // mostrar como info por defecto
      toast.open(String(message), 'info', 4500)
    } catch (e) {
      // Si algo falla, fallback al alert nativo guardado
      console.warn('No se pudo mostrar toast, fallback alert nativo:', e)
      if (window.__native_alert) window.__native_alert(message)
    }
  }
}
