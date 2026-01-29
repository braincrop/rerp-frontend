'use client'

import { toast } from 'react-toastify'
import { Icon } from '@iconify/react'

export default function Notify(status, message) {
  if (typeof window === 'undefined') return
  if (!message) return

  try {
    if (status === 'success') {
      toast.success(message, {
        icon: <Icon icon="mdi:check-circle-outline" width={18} />,
        position: 'top-right',
        style: { color: '#fff', fontSize: '15px' },
      })
    } else {
      toast.error(message, {
        icon: <Icon icon="mdi:alert-circle-outline" width={18} />,
        position: 'top-right',
        style: { color: '#fff', fontSize: '15px' },
      })
    }
  } catch (err) {
    // 🔒 Never crash Redux / SSR
    console.error('Notify error (ignored):', err)
  }
}
