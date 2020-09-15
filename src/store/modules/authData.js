import firebase from "firebase";

const state = () => ({
   user: {
       loggedIn: false,
       data: null,
   },
})

const mutations = {
    SET_LOGGED_IN(state, value) {
        state.user.loggedIn = value;
    },
    SET_USER(state, name) {
      console.log(`Setting User: name is ${name}`)
      state.user.data = {...state.user.data, displayName: name}
    },
    LOG_OUT_USER(state) {
      state.user.data = null
    }
}

const getters = {
    user(state){
        return state.user
      }
}

const actions = {
    fetchUser({ commit, dispatch }, user) {
        console.log(`User in authData is:`)
        console.log(user)
        commit("SET_LOGGED_IN", user != null);
        if (user.displayName != null) {
          commit('SET_USER', user.displayName)
        }
        commit('gameData/mutate', {property: 'phase', with:'CharacterSelect'}, {root:true})
    },
    fetchUsername({commit}) {
      // console.log(`running fetchUsername`)
      // let user =  firebase.auth().currentUser;
      // let db = firebase.firestore();
      // let userRef = db.collection("users").doc(user.email);

      // userRef.get().then(function(doc) {
      //   if (doc.exists) {
      //     let info = doc.data()
      //     commit("SET_USER", info)
      //   }
      //   else {
      //     // doc.data() will be undefined in this case
      //     console.log("No such document!");
      //   }
      // })
    },
    createUser({commit, dispatch}, user) {
      console.log(`creating user via firestore`)
      let db = firebase.firestore();
      db.collection('users').doc(user.email).set({
        displayName: user.name,
        profile_picture: 'https://api.adorable.io/avatars/70/' + user.email + '.png'
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
        