export default function accessToken(token = localStorage.getItem('token') || null) {
  localStorage.setItem('token', token)
  const savedToken = localStorage.getItem('token')
  return savedToken || null
}
