// 'use client'

// import { createContext, use, useCallback, useEffect, useMemo, useState } from 'react'
// import { toggleDocumentAttribute } from '@/utils/layout'
// import useQueryParams from '@/hooks/useQueryParams'
// import useLocalStorage from '@/hooks/useLocalStorage'
// const ThemeContext = createContext(undefined)
// const useLayoutContext = () => {
//   const context = use(ThemeContext)
//   if (!context) {
//     throw new Error('useLayoutContext can only be used within LayoutProvider')
//   }
//   return context
// }

// // const getPreferredTheme = (): ThemeType => (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')

// const LayoutProvider = ({ children }) => {
//   const queryParams = useQueryParams()
//   const override = !!(queryParams.layout_theme || queryParams.topbar_theme || queryParams.menu_theme || queryParams.menu_size)
//   const INIT_STATE = {
//     theme: 'dark',
//     topbarTheme: 'dark',
//     menu: {
//       theme: 'dark',
//       size: 'default',
//     },
//   }
//   const [settings, setSettings] = useLocalStorage('__REBACK_NEXT_CONFIG__',INIT_STATE,true,)
//   const [offcanvasStates, setOffcanvasStates] = useState({
//     showThemeCustomizer: false,
//     showActivityStream: false,
//     showBackdrop: false,
//   })

//   // update settings
//   const updateSettings = (_newSettings) =>
//     setSettings({
//       ...settings,
//       ..._newSettings,
//     })

//   // update theme mode
//   const changeTheme = () => {
//     updateSettings({
//       theme: 'dark',
//       topbarTheme: 'dark',
//       menu: {
//         ...settings.menu,
//         theme: 'dark',
//       },
//     })
//   }

//   // change topbar theme
//   const changeTopbarTheme = (newTheme) => {
//     updateSettings({
//       topbarTheme: newTheme,
//     })
//   }

//   // change menu theme
//   const changeMenuTheme = (newTheme) => {
//     updateSettings({
//       menu: {
//         ...settings.menu,
//         theme: newTheme,
//       },
//     })
//   }

//   // change menu theme
//   const changeMenuSize = (newSize) => {
//     updateSettings({
//       menu: {
//         ...settings.menu,
//         size: newSize,
//       },
//     })
//   }

//   // toggle theme customizer offcanvas
//   const toggleThemeCustomizer = () => {
//     setOffcanvasStates({
//       ...offcanvasStates,
//       showThemeCustomizer: !offcanvasStates.showThemeCustomizer,
//     })
//   }

//   // toggle activity stream offcanvas
//   const toggleActivityStream = () => {
//     setOffcanvasStates({
//       ...offcanvasStates,
//       showActivityStream: !offcanvasStates.showActivityStream,
//     })
//   }
//   const themeCustomizer = {
//     open: offcanvasStates.showThemeCustomizer,
//     toggle: toggleThemeCustomizer,
//   }
//   const activityStream = {
//     open: offcanvasStates.showActivityStream,
//     toggle: toggleActivityStream,
//   }

//   // toggle backdrop
//   const toggleBackdrop = useCallback(() => {
//     const htmlTag = document.getElementsByTagName('html')[0]
//     if (offcanvasStates.showBackdrop) htmlTag.classList.remove('sidebar-enable')
//     else htmlTag.classList.add('sidebar-enable')
//     setOffcanvasStates({
//       ...offcanvasStates,
//       showBackdrop: !offcanvasStates.showBackdrop,
//     })
//   }, [offcanvasStates.showBackdrop])

//   useEffect(() => {
//     toggleDocumentAttribute('data-bs-theme', settings.theme)
//     toggleDocumentAttribute('data-topbar-color', settings.topbarTheme)
//     toggleDocumentAttribute('data-sidebar-color', settings.menu.theme)
//     toggleDocumentAttribute('data-sidebar-size', settings.menu.size)
//     return () => {
//       toggleDocumentAttribute('data-bs-theme', settings.theme, true)
//       toggleDocumentAttribute('data-topbar-color', settings.topbarTheme, true)
//       toggleDocumentAttribute('data-sidebar-color', settings.menu.theme, true)
//       toggleDocumentAttribute('data-sidebar-size', settings.menu.size, true)
//     }
//   }, [settings])
//   const resetSettings = () => updateSettings(INIT_STATE)
//   return (
//     <ThemeContext.Provider
//       value={useMemo(
//         () => ({
//           ...settings,
//           themeMode: settings.theme,
//           changeTheme,
//           changeTopbarTheme,
//           changeMenu: {
//             theme: changeMenuTheme,
//             size: changeMenuSize,
//           },
//           themeCustomizer,
//           activityStream,
//           toggleBackdrop,
//           resetSettings,
//         }),
//         [settings, offcanvasStates],
//       )}>
//       {children}
//       {offcanvasStates.showBackdrop && <div className="offcanvas-backdrop fade" onClick={toggleBackdrop} />}
//     </ThemeContext.Provider>
//   )
// }
// export { LayoutProvider, useLayoutContext }

'use client'

import {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { usePathname } from 'next/navigation'
import { toggleDocumentAttribute } from '@/utils/layout'
import useLocalStorage from '@/hooks/useLocalStorage'

/* ---------------- CONTEXT ---------------- */

const ThemeContext = createContext(undefined)

export const useLayoutContext = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useLayoutContext must be used within LayoutProvider')
  }
  return context
}

/* ---------------- PROVIDER ---------------- */

const INIT_STATE = {
  theme: 'dark',
  topbarTheme: 'dark',
  menu: {
    theme: 'dark',
    size: 'default',
  },
}

const LayoutProvider = ({ children }) => {
  const pathname = usePathname()

  const [settings, setSettings] = useLocalStorage(
    '__REBACK_NEXT_CONFIG__',
    INIT_STATE,
    true
  )

  const [offcanvasStates, setOffcanvasStates] = useState({
    showThemeCustomizer: false,
    showActivityStream: false,
    showBackdrop: false,
  })

  /* ---------------- SETTINGS ---------------- */

  const updateSettings = (newSettings) => {
    setSettings((prev) => ({
      ...prev,
      ...newSettings,
    }))
  }

  const changeTheme = () => {
    updateSettings({
      theme: 'dark',
      topbarTheme: 'dark',
      menu: {
        ...settings.menu,
        theme: 'dark',
      },
    })
  }

  const changeTopbarTheme = (newTheme) => {
    updateSettings({ topbarTheme: newTheme })
  }

  const changeMenuTheme = (newTheme) => {
    updateSettings({
      menu: {
        ...settings.menu,
        theme: newTheme,
      },
    })
  }

  const changeMenuSize = (newSize) => {
    updateSettings({
      menu: {
        ...settings.menu,
        size: newSize,
      },
    })
  }

  /* ---------------- SIDEBAR / BACKDROP ---------------- */

  const toggleBackdrop = useCallback(() => {
    const html = document.documentElement
    setOffcanvasStates((prev) => {
      if (prev.showBackdrop) {
        html.classList.remove('sidebar-enable')
      } else {
        html.classList.add('sidebar-enable')
      }

      return {
        ...prev,
        showBackdrop: !prev.showBackdrop,
      }
    })
  }, [])

  /* 🔥 Auto close sidebar on route change */
  useEffect(() => {
    setOffcanvasStates((prev) => ({
      ...prev,
      showBackdrop: false,
    }))
    document.documentElement.classList.remove('sidebar-enable')
  }, [pathname])

  /* ---------------- HTML ATTRIBUTES ---------------- */

  useEffect(() => {
    toggleDocumentAttribute('data-bs-theme', settings.theme)
    toggleDocumentAttribute('data-topbar-color', settings.topbarTheme)
    toggleDocumentAttribute('data-sidebar-color', settings.menu.theme)
    toggleDocumentAttribute('data-sidebar-size', settings.menu.size)

    return () => {
      toggleDocumentAttribute('data-bs-theme', settings.theme, true)
      toggleDocumentAttribute('data-topbar-color', settings.topbarTheme, true)
      toggleDocumentAttribute('data-sidebar-color', settings.menu.theme, true)
      toggleDocumentAttribute('data-sidebar-size', settings.menu.size, true)
    }
  }, [settings])

  /* ---------------- MEMO VALUE ---------------- */

  const contextValue = useMemo(
    () => ({
      ...settings,
      themeMode: settings.theme,
      changeTheme,
      changeTopbarTheme,
      changeMenu: {
        theme: changeMenuTheme,
        size: changeMenuSize,
      },
      toggleBackdrop,
      resetSettings: () => updateSettings(INIT_STATE),
    }),
    [settings]
  )

  /* ---------------- RENDER ---------------- */

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
      {offcanvasStates.showBackdrop && (
        <div
          className=""
          onClick={toggleBackdrop}
        />
      )}
    </ThemeContext.Provider>
  )
}

export { LayoutProvider }
