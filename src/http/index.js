import Vue from 'vue'
import VueResource from 'vue-resource'
import services from './services'
Vue.use(VueResource)

const http = Vue.http

http.options.root = 'http://localhost:5050/api/'

Object.keys(services).map(service => {
  services[service] = Vue.resource('', {}, services[service])
})

const setXtoken = token => {
  http.headers.common['x-access-token'] = token
}
const setUserId = user => {
  http.headers.common.userid = user
}
const setId = id => {
  http.headers.common.id = id
}
export default services
export { http, setXtoken, setUserId, setId }
