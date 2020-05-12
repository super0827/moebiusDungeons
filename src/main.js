import Vue from 'vue'
import App from './App.vue'
import { store } from './store/store'

Vue.config.productionTip = false;

import SoundPlugin from '@/plugins/SoundPlugin';
import { mapState } from 'vuex';
Vue.use(SoundPlugin);


//global mixins
Vue.mixin({
  beforeCreate: function () {
    store.commit('enterAnimation', true);
  },
  beforeDestroy: function () {
    store.commit('enterAnimation', false);
  },
  computed: mapState([
    'isEntering',
    'phase'
  ]),
})

new Vue({
  render: h => h(App),
  store,
}).$mount('#app')
