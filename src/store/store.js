import Vue from 'vue'
import Vuex from 'vuex'


// import shuffle from 'lodash.shuffle';

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    player: {type: Object},
    playerTraits: [],
    playerTraitsTemp: [],
    monster: {type: Object},
    shopkeep: {type: Object},
    gameStats: {type: Object},
    shopInventory: [],
    monsterRoster: 0,
    phase: "StartScreen",
    finalBoss: false,
    isEntering: true,
    playerDealtDamage: 0,
    playerafterArmorDealtDamage: 0,
    monsterDealtDamage: 0,
    monsterafterArmorDealtDamage: 0,
    playerLog: [],
    monsterLog: [],
    magicAttack: false,
    duration: 1000,
  },
  mutations: {
    enterAnimation(state, bool) {
        state.isEntering = bool;
    },
    changePhase(state, newPhase) {
        state.phase = newPhase;
    }
  },
  getters: {
    flavor: state => state.flavor
  },
})