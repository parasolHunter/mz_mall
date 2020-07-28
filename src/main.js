import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Skeleton from './components/v-skeleton/skeleton'
import './cube-ui'
import 'amfe-flexible'
// 引入css中的静态样式
import './common/stylus/index.styl'

import i18n from './i18n/i18n'
import {Locale} from 'cube-ui'

import vpay from 'vpay'

Vue.use(vpay);

Vue.config.productionTip = false
new Vue({
	i18n,
    router,
    store,
    Skeleton,
    render: h => h(App)
}).$mount('#app')
