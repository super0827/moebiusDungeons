import Vue from 'vue'
import Vuex from 'vuex'
import shuffle from 'lodash.shuffle';

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
    music:null,
    duration: 1000,
  },
  mutations: {
    mutate(state, payload) {
      state[payload.property] = payload.with;
    }
  },
  getters: {
    flavor: state => state.flavor
  },
})