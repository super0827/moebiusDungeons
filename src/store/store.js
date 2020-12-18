import Vue from 'vue'
import Vuex from 'vuex'

import gameData from '@/store/modules/gameData'
import playerData from '@/store/modules/playerData'
import monsterData from '@/store/modules/monsterData'
import shopkeepData from '@/store/modules/shopkeepData'
import leaderboardData from '@/store/modules/leaderboardData'
import authData from '@/store/modules/authData'

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    gameData,
    playerData,
    monsterData,
    shopkeepData,
    leaderboardData,
    authData
  },
});

