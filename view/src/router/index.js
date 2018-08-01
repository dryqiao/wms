import Vue from 'vue'
import Router from 'vue-router'
import main from '@/components/main'
import eqt from '@/components/eqt'
Vue.use(Router)

export default new Router({
    routes: [{
        path: '/main',
        name: 'main',
        component: main
    }, {
        path: '/eqt',
        name: 'eqt',
        component: eqt
    }]
})
