import Vue from 'vue'
import App from './App.vue'
import { store } from './store/store'
import { mapState } from 'vuex'

Vue.config.productionTip = false;

//credit for this plugin goes to eli-crow on github
//thanks for helping with the project dude!
import SoundPlugin from '@/plugins/SoundPlugin';
Vue.use(SoundPlugin);

//this export is in the global space to save time and stay concise
//nearly if not all components mounted directly to App need these
//computed properties to function properly
export const mixinGlobalState = {
  computed : mapState({
    isEntering: state => state.gameData.isEntering,
    helper: state => state.gameData.helper,
  }),
}

//apply mixinGlobals to the Vue instance
Vue.mixin(mixinGlobalState);

new Vue({
  render: h => h(App),
  store,
}).$mount('#app')
