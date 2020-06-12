import Vue from 'vue'
import App from './App.vue'
import { store } from './store/store'
import { mapState, mapGetters } from 'vuex'
import gumroad from './plugins/gumroad.js'

Vue.config.productionTip = false;

//this export is in the global space to save time and stay concise
//nearly if not all components mounted directly to App need these
//computed properties to function properly
export const mixinGlobalState = {
  computed: {
    ...mapState({
      isEntering: state => state.gameData.isEntering,
      helper: state => state.gameData.helper,
      combatLocked: state => state.gameData.combatLocked,
    }),
  },
  methods: {
    wholeNumber(value) {
      return `${Math.ceil(value)}`;
    },
  }
}

Vue.use(gumroad);

//apply mixinGlobals to the Vue instance
Vue.mixin(mixinGlobalState);

new Vue({
  render: h => h(App),
  store,
}).$mount('#app')
