import Vue from 'vue'
import App from './App.vue'
// import clickMixin from './mixins/clickMixin'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
