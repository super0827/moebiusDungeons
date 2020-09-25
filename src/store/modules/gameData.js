const state = () => ({
    phase: "Loading",
    isEntering: true,
    helper: false,
    duration: 1000,
    combatLocked: false,
    turnTailUsed: false,
    tracker: {
        monsterDefeated: [],
        damageDealt: 0,
        damageBlocked: 0,
        maxHealth: 0,
        maxArmor:0,
        maxDamage:0,
        coinsLooted: 0,
        coinsSpent: 0,
        mettleUsed: 0,
        difficultyScale:1
    }
})

const mutations = {
    mutate(state, payload) {
        state[payload.property] = payload.with;
    },
    addToTracker(state, payload) {
        if(payload.what != "monsterDefeated"){
            state.tracker[payload.what] += payload.with
        } 
        else {
            state.tracker[payload.what].push(payload.with)    
        }
    },
    toggle(state, payload) {
        state[payload.property] = !state[payload.property];
    },
    toggleHelp(state){
        state.helper = !state.helper
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

export default {
    namespaced: true,
    state,
    mutations,
    getters
}
        