const state = () => ({
   user: {
       loggedIn: false,
       data: null,
   }
})

const mutations = {
    SET_LOGGED_IN(state, value) {
        state.user.loggedIn = value;
    },
    SET_USER(state, data) {
      state.user.data = data;
    },
    SET_NAME(state, value) {
      state.user.data.displayName = value;
    }
}

const getters = {
    user(state){
        return state.user
      }
}

const actions = {
    fetchUser({ commit }, user) {
        commit("SET_LOGGED_IN", user !== null);
        if (user) {
          commit('gameData/mutate', {property: 'phase', with:'CharacterSelect'}, {root:true})
          commit("SET_USER", {
            displayName: user.displayName,
            email: user.email
          });
        } else {
          commit("SET_USER", null);
          commit('gameData/mutate', {property: 'phase', with:'Login'}, {root:true})
        }
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
}
        