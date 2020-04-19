import Vue from 'vue'
import App from './App.vue'

import SoundPlugin from '@/plugins/SoundPlugin';
Vue.use(SoundPlugin);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
