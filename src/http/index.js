import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)

const http = Vue.http

http.options.root = 'https://api-gorila-one.herokuapp.com/api/'

export { http }
