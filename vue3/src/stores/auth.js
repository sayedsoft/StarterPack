import {defineStore} from "pinia";
import $api from "@/composables/useRequest";
import accessToken from "@/composables/useToken";
import {useRouter} from "vue-router";

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoggedIn: !!accessToken(), // If token present loggedIn true ... Else Middleware doesnt work on page reload
    token: accessToken() || null, // Get Token Form Cookie or set it to null
    user: null
  }),
  getters: {
    isAuthenticated: (state) => {
      return !!(state.token && (state.user && state.user.id))
    },
  },
  actions: {
    async register(payload) {
      const notifyPayload = {showSuccess: true, showError: true, successMessage: 'Registered Successfully!'}
      const response = await $api.post('/register', payload, notifyPayload);
      if (response.message === 'success') {
        this.setTokenUser(response.data?.token, response.data?.user) // Set the User and the Token ,...
        $api.setAuthorization()
      }
      return response
    },
    async login(payload) {
      const notifyPayload = {showSuccess: true, showError: true, successMessage: 'Logged In Successfully!'}
      const response = await $api.post('/login', payload, notifyPayload);
      if (response.message === 'success') {
        this.setTokenUser(response.data?.token, response.data?.user) // Set the User and the Token ,...
        $api.setAuthorization()
      }
      return response
    },
    setTokenUser(token = null, user = {}) {
      this.token = token // set token in store ...
      this.user = user // set the user data to store ...
      this.isLoggedIn = !!(token && user && user.id) // set the isLoggedIn State to true if user and token is available ...
      accessToken(token) // Set The Token ...
    },
    async getUser() {
      if (!accessToken()) return {}
      const notifyPayload = {
        showSuccess: false,
        showError: false,
        successMessage: 'Success!',
        errorMessage: 'Some Error Occurred!'
      }

      const response = await $api.get('/user', notifyPayload);
      if (response.message === 'success')
        this.setTokenUser({token: accessToken(), user: response.data})
      else
        this.clearAuth()
      return response
    },
    async logout() {
      const options = {showSuccess: true, showError: false, successMessage: 'Logout Successful!', errorMessage: 'Error logging out!'}
      await $api.post('logout', {}, options)
      this.clearAuth()

      const router = useRouter()
      await router.push('/')
    },
    clearAuth() {
      this.token = null
      this.user = null
      this.isLoggedIn = false

      if (import.meta.server) return
      accessToken('') // Clearing the Cookie ...
    }
  }
})