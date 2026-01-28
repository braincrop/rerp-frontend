'use client'

import { toast } from 'react-toastify'
import { Icon } from '@iconify/react'

const isClient = typeof window !== 'undefined'

export default function Notify(status, message) {
  if (!isClient || !message) return

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
}
