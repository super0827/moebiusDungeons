const state = () => ({
    phase: "Loading",
    isEntering: true,
    helper: false,
    helperName:'',
    duration: 1000,
    combatLocked: false,
    turnTailUsed: false,
    leaderboard:[],
    debugShow: false,
    location: 'roads',
    locationRanks: {
        'roads': 1,
        'caves': 2,
        'forest': 2,
        'hills': 3,
        'ruins': 3,
        'tower': 4,
    }
})

const mutations = {
    mutate(state, payload) {
        state[payload.property] = payload.with;
    },
    toggle(state, payload) {
        state[payload.property] = !state[payload.property];
    },
    toggleHelp(state){
        state.helper = !state.helper
    },
    addToLeaderboard(state, payload){
        state.leaderboard.push(payload)
    },
    clearLeaderboard(state){
      state.leaderboard = [];  
    }
}

const getters = {
    // HEALTH BAR CALCULATOR
    healthBar: (state, getters, rootState, rootGetters) => {
        const player = rootGetters['playerData/calcHealth']
        const monster = rootGetters['monsterData/calcHealth']
        const hpPool =  monster + player
        if (monster <= 0) return 100
        else if (player <= 0) return 0
        else return (player / hpPool) * 100; 
    },

    //ARMOR BAR CALCULATOR
    playerAttackVsArmor: (state, getters, rootState, rootGetters) => {
        const player = rootGetters['playerData/calcAttackMax']
        const monster = rootGetters['monsterData/calcArmor']

        const armPool = player + monster;

       if (monster <= 0) return 100;
       else if (player <= 0) return 5;
       else return (player / armPool) * 100
    },

    //ATTACK BAR CALCULATOR
    playerArmorVsAttack: (state, getters, rootState, rootGetters) => {
        const player = rootGetters['playerData/calcArmor']
        const monster = rootGetters['monsterData/calcAttackMax']
        if (monster <= 0) return 100
        else if (player <= 1) return 5
        else if (rootState['monsterData'].info.attackType === 'magical') return 5;
        else if ((player / monster) * 100 >= 100) return 100;
        else return (player / monster) * 100;
    },
}

const actions = {
    loadSavedGame({state, commit}, payload){
        commit('mutate', {property:'phase', with:payload})
    },
    changeLocation({state, commit}, payload) {
        commit('mutate', {property:'phase', with:payload.phase})
        commit('mutate', {property:'location', with:payload.location})
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
}
        