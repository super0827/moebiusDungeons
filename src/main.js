import Vue from 'vue'
import App from './App.vue'
import { store } from './store/store'

Vue.config.productionTip = false;

import SoundPlugin from '@/plugins/SoundPlugin';
Vue.use(SoundPlugin);

new Vue({
  render: h => h(App),
  store,
}).$mount('#app')
