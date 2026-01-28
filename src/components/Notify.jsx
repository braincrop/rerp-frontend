'use client'

import { toast } from 'react-toastify'
import { Icon } from '@iconify/react'

const isClient = typeof window !== 'undefined'

export default function Notify(status = 'error', message = '') {
  if (!isClient || !message) return

  const commonOptions = {
    position: 'top-right',
    style: {
      color: '#fff',
      fontSize: '15px',
    },
  }

  if (status === 'success') {
    toast.success(message, {
      ...commonOptions,
      icon: <Icon icon="mdi:check-circle-outline" width={18} />,
    })
  } else {
    toast.error(message, {
      ...commonOptions,
      icon: <Icon icon="mdi:alert-circle-outline" width={18} />,
    })
  }
}
