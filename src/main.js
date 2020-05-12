import Vue from 'vue'
import App from './App.vue'
import { store } from './store/store'

Vue.config.productionTip = false;

import SoundPlugin from '@/plugins/SoundPlugin';
import { mapState } from 'vuex';
Vue.use(SoundPlugin);

//animation and bkg music handling
Vue.mixin({
  created: function () {
    store.commit('mutate', {property: 'isEntering', with: true});
    if(this.$options.music) {
      store.commit('mutate', {property: 'music', with: this.$options.music});
      this.$sound.play(store.state.music, {fade: 2000});
    }
  },
  beforeDestroy: function () {
    store.commit('mutate', {property: 'isEntering', with: false});
    if(this.$options.music) {
      this.$sound.pause(store.state.music, {fade: 2000});
    }
  },
  computed: mapState([
    'isEntering',
    'phase',
    'music'
  ]),
})

new Vue({
  render: h => h(App),
  store,
}).$mount('#app')
