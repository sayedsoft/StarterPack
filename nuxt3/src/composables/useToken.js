export default function accessToken(token = useCookie('token').value || null, clear = false) {
  const savedToken = useCookie('token')
  if (clear) savedToken.value = '' // Remove Token From cookie ...
  else savedToken.value = token // Set Token to the cookie ...
  return savedToken.value || null // Return the current cookie value ...
}