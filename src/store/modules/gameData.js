import { shuffle } from 'lodash.shuffle'

const state = () => ({
    phase: "DungeonPhase",
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

        const reducedDamage = player - monster;

        if (reducedDamage <= 0) return 5
        else if (monster === 0) return 100
        else if (monster > player) return 5
        else return (reducedDamage * 10)
    },

    //ATTACK BAR CALCULATOR
    playerArmorVsAttack: (state, getters, rootState, rootGetters) => {
        const player = rootGetters['playerData/calcArmor']
        const monster = rootGetters['monsterData/calcAttackMax']
        const armVsMonAtk =  monster + player
        const monsterType = rootState['monsterData'].info.attackType
        console.log(`Monster Type = ${monsterType}`)
        if (monster <= 0) return 100
        else if (player <= 1) return 5
        else if (rootState['monsterData'].info.attackType === 'magical') return 5;
        else if ((player / monster) * 100 >= 100) return 100;
        else return (player / monster) * 100;
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    getters
}
        