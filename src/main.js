import Vue from 'vue'
import Vuelidate from 'vuelidate'
import Paginate from 'vuejs-paginate'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

Vue.use(Vuelidate)
Vue.component('Paginate', Paginate)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
