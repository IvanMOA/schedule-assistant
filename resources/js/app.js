import '../css/app.css'

document.addEventListener('alpine:init', () => {
  console.log('Init alpine')
  Alpine.store('toast', {
    message: null,
  })
})
document.addEventListener('htmx:responseError', (event) => {
  const toastStore = Alpine.store('toast')
  toastStore.message = errorMessage(event.detail.xhr.response)
  const TOAST_DURATION = 3000
  setTimeout(() => {
    toastStore.message = null
  }, TOAST_DURATION)
})
function errorMessage(responseBody) {
  try {
    const json = JSON.parse(responseBody)
    return json?.error?.message || 'Error desconocido'
  } catch (e) {
    return 'Error desconocido'
  }
}
