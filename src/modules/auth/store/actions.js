import * as types from './mutations-types'
import services from '@/http'
import * as storage from '../storage'
import { Promise } from 'core-js'
export const ActionDoLogin = ({ dispatch }, payload) => {
  return services.auth.login(payload).then((result) => {
    const { body } = result
    const { res = body.body } = body
    const { accessToken, id } = res
    dispatch('ActionSetToken', accessToken)
    dispatch('ActionSetUser', id)
  })
}
export const ActionCreateUser = ({ dispatch }, payload) => {
  return services.auth.signup(payload)
}
export const ActionInserTinvestment = async ({ dispatch }, payload) => {
  const response = await services.auth.investmentsInsert(payload)
  return response
}
export const ActionInvestmentsDelete = ({ dispatch }, payload) => {
  storage.setHeaderId(payload)
  return services.auth.investmentsDelete(payload)
}
export const ActionLoadToken = ({ dispatch }) => {
  dispatch('ActionSetToken', storage.getLocalToken())
  dispatch('ActionSetUser', storage.getLocalUserId())
  return true
}
export const ActionLoadTickets = ({ dispatch }) => {
  return new Promise((resolve, reject) => {
    try {
      resolve(services.auth.tickets())
    } catch (err) {
      console.log(err)
    }
  })
}
export const ActionLoadInvestments = ({ dispatch }) => {
  return new Promise((resolve, reject) => {
    try {
      resolve(services.auth.investments())
    } catch (err) {
      console.log(err)
    }
  })
}
export const ActionSetUser = ({ commit }, payload) => {
  storage.setLocalUserId(payload)
  storage.setHeaderIUserId(payload)
  commit(types.SET_USER, payload)
}

export const ActionSetToken = ({ commit }, payload) => {
  storage.setLocalToken(payload)
  storage.setHeaderToken(payload)
  commit(types.SET_TOKEN, payload)
}
export const ActionSetTickets = ({ commit }, payload) => {
  storage.setLocalTickets(payload)
}
export const ActionGetTickets = ({ commit }) => {
  return storage.getLocalTickets()
}
export const ActionGetLocalUserId = () => {
  return new Promise((resolve) => {
    return resolve(storage.getLocalUserId())
  })
}
