import { shuffle } from 'lodash.shuffle'

const state = () => ({
    phase: "DungeonPhase",
    isEntering: true,
    helper: false,
    duration: 1000,
})

const mutations = {
    mutate(state, payload) {
        state[payload.property] = payload.with;
    },
    
    toggleHelp(state){
        state.helper = !state.helper
    }
}

const action = {

}

const getters = {
    // HEALTH BAR CALCULATOR
    healthBar: (state, getters, rootState) => {
        const monster = rootState.monsterData.info.health
        const player = rootState.playerData.info.health
        const hpPool =  monster + player
        if (monster <= 0) return 100
        else if (player <= 0) return 0
        else return (player / hpPool) * 100; 
    },

    //ARMOR BAR CALCULATOR
    armorBar: (state, getters, rootState) => {
        const monster = rootState.monsterData.info.armor
        const player = rootState.playerData.info.armor
        const armPool =  monster + player
        if (monster <= 0) return 100
        else if (player <= 0) return 0
        else return (player / armPool) * 100
    },

    //ATTACK BAR CALCULATOR
    attackBar: (state, getters, rootState) => {
        const monster = rootState.monsterData.info.attackMax
        const player = rootState.playerData.info.attackMax
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
        