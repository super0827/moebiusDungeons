import { shuffle } from 'lodash.shuffle'

const state = () => ({
    phase: "StartScreen",
    isEntering: true,
    helper: false,
    duration: 1000,
    combatLocked: false,
    turnTailUsed: false,
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
    }
}

const actions = {
}

const getters = {
    // HEALTH BAR CALCULATOR
    healthBar: (state, getters, rootState, rootGetters) => {
        const monster = rootGetters['monsterData/calcHealth']
        const player = rootGetters['playerData/calcHealth']
        const hpPool =  monster + player
        if (monster <= 0) return 100
        else if (player <= 0) return 0
        else return (player / hpPool) * 100; 
    },

    //ARMOR BAR CALCULATOR
    armorBar: (state, getters, rootState, rootGetters) => {
        const monster = rootGetters['monsterData/calcArmor']
        const player = rootGetters['playerData/calcArmor']
        const armPool =  monster + player
        if (monster <= 0) return 100
        else if (player <= 0) return 0
        else return (player / armPool) * 100
    },

    //ATTACK BAR CALCULATOR
    attackBar: (state, getters, rootState, rootGetters) => {
        const monster = rootGetters['monsterData/calcAttackMax']
        const player = rootGetters['playerData/calcAttackMax']
        const armPool =  monster + player
        if (monster <= 0) return 100
        else if (player <= 0) return 0
        else return (player / armPool) * 100
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    getters
}
        