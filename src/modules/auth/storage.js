import { setXtoken, setUserId, setId } from '@/http'

export const setHeaderToken = token => setXtoken(token)
export const getLocalToken = () => localStorage.getItem('token')
export const deleteLocalToken = () => localStorage.removeItem('token')
export const setLocalToken = token => localStorage.setItem('token', token)
export const setHeaderId = id => setId(id)
export const setHeaderIUserId = userId => setUserId(userId)
export const getLocalUserId = () => localStorage.getItem('userId')
export const deleteLocalUserId = () => localStorage.removeItem('userId')
export const setLocalUserId = userId => localStorage.setItem('userId', userId)

export const getLocalTickets = () => localStorage.getItem('Tickets')
export const setLocalTickets = Tickets => localStorage.setItem('Tickets', Tickets)
