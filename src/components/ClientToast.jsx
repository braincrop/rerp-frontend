'use client'

import { useEffect, useState } from 'react'
import { Alert } from 'reactstrap'

export default function ClientToast() {
  const [toasts, setToasts] = useState([])

  useEffect(() => {
    const handler = (e) => {
      const toast = e.detail
      setToasts((prev) => [...prev, toast])
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== toast.id))
      }, 3000)
    }

    window.addEventListener('app-toast', handler)
    return () => window.removeEventListener('app-toast', handler)
  }, [])

  return (
    <div
      style={{
        position: 'fixed',
        top: 25,
        right: 20,
        zIndex: 9999,
        minWidth: 280,
      }}
    >
      {toasts.map((toast) => (
        <Alert
          key={toast.id}
          color={toast.status === 'success' ? 'success' : 'danger'}
          className="mb-2 shadow"
          style={toast.status === 'success' ? {backgroundColor:'#08bb67',color:'#fff '} : {backgroundColor:'#d31313',color:'#fff '}}
        >
          <strong className="me-2">
            {toast.status === 'success' ? '✅' : '⚠️'}
          </strong>
          {toast.message}
        </Alert>
      ))}
    </div>
  )
}
