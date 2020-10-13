import firebase from "firebase";

const state = () => ({
   user: {
       loggedIn: false,
       data: null,
   },
})

const mutations = {
    SET_SAVED_GAME(state, payload){
      state.user.data = {...state.user.data, save: payload}
    },

    SET_LOGGED_IN(state, value) {
        state.user.loggedIn = value;
    },
    SET_USER(state, payload) {
      console.log(`user has been authenticated - set displayName and email - FROM authData`)
      state.user.data = {...state.user.data, displayName: payload.displayName},
      state.user.data = {...state.user.data, email: payload.email}
    },
    LOG_OUT_USER(state) {
      state.user.data = null
    }
}

const getters = {
    userIcon: state => {
      const userIcon = "https://api.adorable.io/avatars/40/" + state.user.data.email + ".png"
      return userIcon;
    }
}

const actions = {
    updateSavedGame({state, rootGetters}) {
      console.log(`Updating Saved Game from Auth Data`)
      console.log(rootGetters['monsterData/snapshot'])
      var db = firebase.firestore();
      var userPath = db.collection('users').doc(state.user.data.email);

      userPath.set(
        {
          saveExists: true,
          saveState: {
            monster: { ...rootGetters['monsterData/snapshot'] },
            player: { ...rootGetters['playerData/snapshot'] }
          },
        }
      )
    },
    deleteSavedGame({state}) {
      var db = firebase.firestore();
      var userPath = db.collection('users').doc(state.user.data.email);
      
      userPath.set({
        saveExists: false,
        saveState: {
          monster: null, 
          player: null, 
        },
      })
    },
    fetchUser({ commit }, user) {
        //set login state based on user truthyness
        commit("SET_LOGGED_IN", user != null);
        if (user.displayName != null) {
          //sets display name and email in the case that the display name exists immediately after registration
          commit('SET_USER', user)
        }
        commit('gameData/mutate', {property: 'phase', with:'SavedGame'}, {root:true})
    },
    detectUser({ commit }, thisUser) {
      //get ref to firestore
      var db = firebase.firestore();
      var userPath = db.collection('users').doc(thisUser.email);

      userPath.get().then(function(doc){
        if (doc.exists) {
          if(doc.data().saveExists) {
            console.log(`Loading save data to User`)
            commit("SET_SAVED_GAME", doc.data())
          }
        }
        else {
          console.log(`user did not exist : creating new data`)
          //create new save instance document on firebase
          userPath.set({
            saveExists: false,
            saveState: {},
          })
        }
      })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
}
        