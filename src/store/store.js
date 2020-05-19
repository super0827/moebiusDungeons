import Vue from 'vue'
import Vuex from 'vuex'

import gameData from './modules/gameData'
import musicData from './modules/musicData'
import playerData from './modules/playerData'
import monsterData from './modules/monsterData'
import shopkeepData from './modules/shopkeepData'
import leaderboardData from './modules/leaderboardData'

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    gameData,
    musicData,
    playerData,
    monsterData,
    shopkeepData,
    leaderboardData
  },
});

// newShopkeep() {
// this.playerLog = [];
// this.monsterLog = [];
// let randomNumber = Math.floor(Math.random() * Math.floor(this.characters.shopKeeps.length));
// this.state.shopkeep = this.characters.shopKeeps[randomNumber];
// this.state.shopkeep.items = shuffle(this.state.shopkeep.items);
// this.state.shopInventory = this.state.shopkeep.items.slice(0,3);
// console.log(`new shop is ${this.state.shopkeep.name}`)
// },
