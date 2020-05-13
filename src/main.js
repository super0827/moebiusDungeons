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
      this.$sound.pause(store.state.music, {fade: 2000, volume:0 });
    }
  },
  watch: {
    helper: function(val){
      if (value == true) {
        this.$sound.pause(store.state.music, {fade:1000, volume:.1});
      }
      else {
        this.$sound.pause(store.state.music, {fade:1000, volume:1});
      }
    }
    //if true turn down music volume to .1
    //if false turn up music volume to 1
  },
  computed: mapState([
    'isEntering',
    'phase',
    'music',
    'player',
    'helper'
  ]),
})

new Vue({
  render: h => h(App),
  store,
}).$mount('#app')
