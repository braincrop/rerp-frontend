export function decodeJwt(token) {
  try {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    )

    return JSON.parse(jsonPayload)
  } catch (err) {
    console.error('Invalid token')
    return null
  }
}
export const getDecodedToken = () => {
  if (typeof window === 'undefined') return null
  const token = localStorage.getItem('token')
  if (!token) return null

  return decodeJwt(token)
}
export const getUserRole = () => {
  const decoded = getDecodedToken()
  const role =
    decoded?.role ||
    decoded?.Role ||
    decoded?.userRole ||
    decoded?.user_role ||
    null

  return role ? String(role).toLowerCase().trim() : null
}