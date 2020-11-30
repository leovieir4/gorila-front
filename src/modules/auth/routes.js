export default [
  {
    path: '/',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */'./pages/Login')
  }
]
