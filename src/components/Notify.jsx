
export default function Notify(status, message) {
  if (typeof window === 'undefined') return
  if (!message) return

  window.dispatchEvent(
    new CustomEvent('app-toast', {
      detail: {
        id: Date.now(),
        status,
        message,
      },
    })
  )
}
