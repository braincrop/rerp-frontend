'use client'

import { createContext, useContext, useState } from 'react'
import { Alert } from 'reactstrap'

const AlertContext = createContext()

export function AlertProvider({ children }) {
  const [alert, setAlert] = useState(null)

  const showAlert = (type, message) => {
    setAlert({ type, message })
    setTimeout(() => setAlert(null), 3000)
  }

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {alert && (
        <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 9999 }}>
          <Alert color={typeToColor(alert.type)} fade>
            {alert.message}
          </Alert>
        </div>
      )}
      {children}
    </AlertContext.Provider>
  )
}

const typeToColor = (type) => {
  if (type === 'success') return 'success'
  if (type === 'error') return 'danger'
  if (type === 'warning') return 'warning'
  return 'info'
}

export const useAlert = () => useContext(AlertContext)
