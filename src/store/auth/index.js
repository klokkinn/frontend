import Axios from 'axios'

import config from '~/app.config'
import { User } from './models'

const axios = Axios.create({
  baseURL: config.GATEKEEPER_URL,
  withCredentials: true
})

const state = () => ({
  user: new User()
})

const actions = {
  async refresh({ commit, getters }) {
    try {
      if (getters.isAuthenticated) return

      const { data } = await axios.request({
        url: '/userinfo',
        method: 'GET'
      })

      const user = new User(data)

      if (user.isValid()) commit('user', user)
    } catch (error) {
      if (error.response && error.response.status === 401) commit('resetUser')
      else throw error
    }
  },
  async login(context, redirectTo = `${config.BASE_URL}`) {
    const encodedRedirect = encodeURIComponent(redirectTo)

    window.location.href = `${config.GATEKEEPER_URL}/login?redirect=${encodedRedirect}`
  },
  async logout({ commit }) {
    try {
      await axios.request({
        url: 'logout',
        method: 'POST'
      })

      commit('resetUser')
    } catch (error) {
      console.error(error)
    }
  }
}

const mutations = {
  user(state, user) {
    state.user = user
  },
  resetUser(state) {
    state.user = new User()
  }
}

const getters = {
  isAuthenticated: state => state.user.isValid()
}

export default {
  namespaced: true,
  actions,
  getters,
  mutations,
  state
}
