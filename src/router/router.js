import Vue from 'vue'
import Router from 'vue-router'
import RouterList from './routerList/routerList'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: RouterList
})
