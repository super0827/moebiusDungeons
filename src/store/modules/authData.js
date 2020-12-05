import firebase from "firebase/app";
import 'firebase/firestore'

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
      state.user.data = {...state.user.data, displayName: payload.displayName};
      state.user.data = {...state.user.data, email: payload.email};
      if(payload.admin) {
        state.user.data = {...state.user.data, admin: payload.admin}
      }
    },
    LOG_OUT_USER(state) {
      state.user.data = null
    }
}

const getters = {
    userIcon: state => {
      const userIcon = "https://avatars.dicebear.com/api/human/" + state.user.data.email.slice(1,3)+ "sprtgen.svg"
      return userIcon;
    },
    adminAllowed: state => {
      return state.user.data.save.admin
    }
}

const actions = {
    updateSavedGame({state, rootGetters}) {
      var db = firebase.firestore();
      var userPath = db.collection('users').doc(state.user.data.email);

      userPath.set(
        {
          saveExists: true,
          saveState: {
            monster: rootGetters['monsterData/snapshot'] ,
            player: rootGetters['playerData/snapshot'],
            shopPick: rootGetters['shopkeepData/snapshot'],
            leaderBoard: rootGetters['leaderboardData/snapshot']
          },
        },
        {merge: true}
      )
    },
    loadSavedGame({state, dispatch, rootState}){
      var db = firebase.firestore();
      var userPath = db.collection('users').doc(state.user.data.email);
      userPath.get().then(function(doc){
        if (doc.exists) {
          if(doc.data().saveExists) {
            dispatch('leaderboardData/loadSavedGame', state.user.data.save.saveState.leaderBoard, {root:true})
            dispatch('gameData/loadSavedGame', state.user.data.save.saveState.player.currentPhase, {root:true})
            if( rootState['gameData'].phase === 'DungeonPhase'){
              dispatch('playerData/loadSavedGame', state.user.data.save.saveState.player, {root:true})
              dispatch('monsterData/loadSavedGame', state.user.data.save.saveState.monster, {root:true})
            }
            else if ( rootState['gameData'].phase === 'ShopSelect' || rootState['gameData'].phase === 'ShopPhase'){
              dispatch('playerData/loadSavedGame', state.user.data.save.saveState.player, {root:true})
              
              if(doc.data().saveState.shopPick.shopChoice || doc.data().saveState.shopPick.inventory) {
                dispatch('shopkeepData/loadSavedGame', state.user.data.save.saveState.shopPick, {root:true})
              }
            }
          }
        }
      })
    },
    deleteSavedGame({state, dispatch}) {
      var db = firebase.firestore();
      var userPath = db.collection('users').doc(state.user.data.email);
      
      userPath.set({
        saveExists: false,
        saveState: {
          monster: null, 
          player: null,
          shopPick: null,
          leaderboard: null,
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
            commit("SET_SAVED_GAME", doc.data())
          }
        }
        else {
          userPath.set({
            saveExists: false,
            saveState: {},
          })
        }
      })
    },
    fetchLeaderboard({commit}) {
      var db = firebase.firestore();
      var leaderboards = db.collection('leaderboard').orderBy("highScore", "desc").limit(10);

      leaderboards.get().then(function(snapshot){
        snapshot.forEach(function(doc){
          commit('gameData/addToLeaderboard', {name:doc.id, data: doc.data()}, {root:true})
        })
      })
    },
    updateLeaderboard({state, rootGetters}) {
      var db = firebase.firestore();
      var userPath = db.collection('leaderboard').doc(state.user.data.displayName);

      userPath.get().then(function(doc){
        if (doc.exists) {
          console.log('highScore = ' + rootGetters['leaderboardData/highScore'])
          console.log(doc.data())
          console.log('existing leaderboard highScore = ' + doc.data().highScore)
          if(rootGetters['leaderboardData/highScore'] > doc.data().highScore) {
              userPath.set(
                rootGetters['leaderboardData/snapshot']
              )
            }
          }
        if (!doc.exists){
          userPath.set(
            rootGetters['leaderboardData/snapshot']
          )
        }
        })
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
}
        