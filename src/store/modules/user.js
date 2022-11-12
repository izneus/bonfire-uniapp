import { getTokenSync, removeTokenSync, setTokenSync } from '@/utils/auth'
import { getInfo, login, logout } from '@/api/login'

const state = {
  token: getTokenSync(),
  name: ''
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  }
}

const actions = {
  login ({ commit }, userInfo) {
    // const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ ...userInfo }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setTokenSync(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  logout ({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        removeTokenSync()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  getInfo ({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo().then(response => {
        const { data } = response
        if (!data) {
          reject('Verification failed, please Login again.')
        }
        const { username } = data
        commit('SET_NAME', username)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  }
}

const getters = {
  token: state => state.user.token,
  name: state => state.user.name
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
