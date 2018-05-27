import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'landing-page',
            component: require('@/components/LandingPage').default
        },
        {
            path: '/upload',
            name: 'upload',
            component: require('@/view/upload').default
        },
        {
            path: '/tuku',
            name: 'tuku',
            component: require('@/view/tuku').default
        },
        {
            path: '/login',
            name: 'login',
            component: require('@/view/login').default
        },
        {
            path: '/list',
            name: 'list',
            component: require('@/view/list').default
        },
        {
            path: '/setting',
            name: 'setting',
            component: require('@/view/setting').default
        },
        /*{
          path: '*',
          redirect: '/'
        }*/
    ]
})
