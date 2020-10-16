import Vue from 'vue'
import App from '@/App.vue'
import { store } from '@/store/store'
import { mapState, mapGetters } from 'vuex'
import * as firebase from "firebase";

Vue.config.productionTip = false;

const firebaseConfig = {
  apiKey: "AIzaSyC8sd8gfr_MtwT-8O3DtI-nGd9T7ZRaNdA",
  authDomain: "moebiusdungeons-9b2b6.firebaseapp.com",
  databaseURL: "https://moebiusdungeons-9b2b6.firebaseio.com",
  projectId: "moebiusdungeons-9b2b6",
  storageBucket: "moebiusdungeons-9b2b6.appspot.com",
  messagingSenderId: "693173770123",
  appId: "1:693173770123:web:18d34ac1e8825fc2dc418e"
};

firebase.initializeApp(firebaseConfig);

// listener for when auth status changes, managed by firebase
firebase.auth().onAuthStateChanged( function(user) {
  if (user != null){
    //If user exists, get user info
    store.dispatch('authData/fetchUser', user, {root:true})
    store.dispatch('authData/detectUser', user, {root:true})
    store.commit('authData/SET_SAVED_GAME', user, {root:true})

  }
  else {
    //if no user set all info to null and false
    store.commit("authData/LOG_OUT_USER", null, {root:true})
    store.commit("authData/SET_LOGGED_IN", false, {root:true})
    store.commit("gameData/mutate", {property: 'phase', with: 'Login'}, {root:true})
  }
});

//this export is in the global space to save time and stay concise
//nearly, if not all components mounted directly to App need these
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

//apply mixinGlobals to the Vue instance
Vue.mixin(mixinGlobalState);

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
