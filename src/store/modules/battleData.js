import PlayerSounds from '@/plugins/PlayerSounds.js'
import MonsterSounds from '@/plugins/MonsterSounds.js'
import UiSounds from '@/plugins/UiSounds.js'

const state = () => ({

});

const mutations = {

}

const getters = {

}

const actions = {
    CHECK_HP({state, commit, dispatch, rootState}, payload){
        if(state.info.baseHealth > 0){
            dispatch('ROLL_DAMAGE')
        }
        else if (state.info.baseHealth <= 0) {
            dispatch('RESET_ANIMATIONS')
            commit('toggleAnimation', {property: 'isDead'})
            let randomTrack = Math.floor(Math.random() * (3) + 1)
            UiSounds['victory' + randomTrack].play()
            commit('playerData/addCoins', state.info.coins, {root:true})
            commit('leaderboardData/incrementByValue', {property:'totalCoins', with:state.info.coins}, {root:true})
            
            setTimeout(() => {
            commit('gameData/mutate', {property:'phase', with:'ShopSelect'}, {root:true})
            setTimeout(() => {
                commit('leaderboardData/addToList', {property: 'monstersKilled', with:state.info.name}, {root:true})
            }, 300)
            }, 1500)
        }
    },
    ROLL_DAMAGE({commit, state, getters}) {
        const randomRoll = Math.floor(Math.random() * (getters.calcAttackMax) + 1)
        commit('mutate', {property:'thisDamage', with:randomRoll})
        let randomAttackSound = Math.floor(Math.random() * (3) + 1)
        if (state.info.attackType === 'physical') {
          PlayerSounds['playerMelee' + randomAttackSound].play();
        }
        else if (state.info.attackType === 'magical') {
          PlayerSounds['playerMagic' + randomAttackSound].play();
        }
      },
      //RUNS WHEN TRADE BLOWS IS CLICKED
      TRADE_BLOWS({dispatch, commit, getters, rootState}){
          if (!rootState.gameData.combatLocked) {
            //LOCK COMBAT
            commit('gameData/toggle', {property:'combatLocked'}, {root: true});
            //ROLL FOR DAMAGE
            dispatch('ROLL_DAMAGE')
            //DEAL THAT DAMAGE
            dispatch('DEAL_DAMAGE')
            //WAIT THEN RUN TRADE BLOWS FOR MONSTERS
            setTimeout(() => {
              dispatch('monsterData/TRADE_BLOWS', null, {root:true})
            },1500)
          }
      },
      LOG_UPDATE({commit, state}, payload) {
        commit('addToLog', {id:state.logNum + 'player', message:payload});
        commit('incrementLog')
      },
      DEAL_DAMAGE({commit, dispatch, getters, rootState}) {
          commit('toggleAnimation', {property:'attacking'});
          // if(getters.calcArmor >= rootState['monsterData'].info.baseAttackMax && rootState['monsterData'].info.attackType === 'physical'){
          //   dispatch('LOG_UPDATE', `THE MONSTER IS NO MATCH FOR YOU.`)
          //   commit('monsterData/toggleAnimation', {property: 'hurt'}, {root:true})
          //   commit('monsterData/toggleAnimation', {property: 'portEffect'}, {root:true})
          //   commit('monsterData/toggleAnimation', {property: 'redShine'}, {root:true})
          //   commit('monsterData/takeDamage', {damage: rootState['monsterData'].info.baseHeath}, {root:true})
    
          // }
          // else if (getters.calcArmor < rootState['monsterData'].info.baseAttackMax && rootState['monsterData'].info.attackType === 'physical') {
            if (getters.thisAdjDamage > 0) {
              dispatch('LOG_UPDATE', `DEALT ${getters.thisAdjDamage} DAMAGE`)
              commit('monsterData/toggleAnimation', {property: 'hurt'}, {root:true})
              commit('monsterData/toggleAnimation', {property: 'portEffect'}, {root:true})
              commit('monsterData/toggleAnimation', {property: 'redShine'}, {root:true})
              commit('monsterData/takeDamage', {damage: getters.thisAdjDamage}, {root:true})
              commit('leaderboardData/incrementByValue', {property:'totalDamageDealt', with:getters.thisAdjDamage}, {root:true})      }
              else if(getters.thisAdjDamage <= 0) {
                dispatch('LOG_UPDATE', `ATTACK BLOCKED`)
                commit('monsterData/toggleAnimation', {property: 'blocking'}, {root: true})
                commit('monsterData/toggleAnimation', {property: 'portEffect'}, {root:true})
                commit('monsterData/toggleAnimation', {property: 'purpleShine'}, {root:true})
              }
            // }
          },
      RUN_SPECIAL({state, commit, getters, dispatch, rootState}){
        if (state.info.mettle > 0 && !rootState.gameData.combatLocked){
          // LOCK COMBAT
          commit('gameData/toggle', {property:'combatLocked'}, {root: true});
          commit('toggleAnimation', {property: 'portEffect'})
    
          if(state.info.name === 'swordsman') {
            commit('toggleAnimation', {property: 'goldShine'})
            commit('toggleAnimation', {property: 'armorUp'})
            commit('mutate', {property: 'tempArmor', with:state.tempArmor+=1})
            PlayerSounds.armorUp.play();
            dispatch('LOG_UPDATE', `+1 ARM`);
          }
          else if (state.info.name === 'mage') {
            commit('toggleAnimation', {property: 'blueShine'})
            dispatch('DEAL_SPECIAL_DAMAGE', 12)
            PlayerSounds.variagate.play();
            dispatch('LOG_UPDATE', `VARIAGATE DEALT 12 DAMAGE`);
          }
          else if (state.info.name === 'varlet') {
            commit('toggleAnimation', {property: 'yellowShine'})
            dispatch('DEAL_SPECIAL_DAMAGE', getters.varletCrit)
            PlayerSounds.backstab.play();
            dispatch('LOG_UPDATE', `BACKSTAB DEALT ${getters.varletCrit} DAMAGE`);
          }
    
          commit('changeStats', {stat:'mettle', value:1, operator:'minus'});
            setTimeout(() => {
              dispatch('RESET_ANIMATIONS');
            }, 1200)
    
          dispatch('authData/updateSavedGame', null, {root:true})
    
        }
      },
      DEAL_SPECIAL_DAMAGE({commit, getters, dispatch}, dealtDamage) {
        commit('monsterData/toggleAnimation', {property: 'redShine'}, {root:true})
        commit('mutate', {property:'specialDamageAnimation', with:true})
        commit('mutate', {property:'specialDamage', with:dealtDamage})
        commit('monsterData/takeDamage', {damage: dealtDamage}, {root:true})
        commit('leaderboardData/incrementByValue', {property:'totalDamageDealt', with:dealtDamage}, {root:true})
        setTimeout(() => {
          dispatch('RESET_ANIMATIONS');
          commit('mutate', {property:'specialDamageAnimation', with:false})
          dispatch('monsterData/SPECIAL_CHECK_HP', null, {root:true})
        }, 1200)
    
      },
      TURN_TAIL({commit, dispatch, state, rootState}){
          if(!rootState.gameData.turnTailUsed) {
            // Lock Controls
            commit('gameData/toggle', {property:'combatLocked'}, {root: true});
            
            //calculate success chance
            let monsterRoll = Math.floor(Math.random()*6);
            let playerRoll = Math.floor(Math.random()*6);
            let monsterCalc = monsterRoll + rootState.monsterData.info.baseHealth
            let playerCalc = playerRoll + state.info.baseHealth
            
            UiSounds.escape.play();
            
            // Updating Log
            dispatch('LOG_UPDATE', `YOU'RE TURNING TAIL`);
            dispatch('monsterData/LOG_UPDATE', `THE MONSTER TRIES TO STOP YOU`, {root:true})
            
            // Initial Turn Tail Ambiguous Purple Animation
            commit('toggleAnimation', {property: 'portEffect'})
            commit('toggleAnimation', {property: 'purpleShine'})
            commit('monsterData/toggleAnimation', {property: 'portEffect'}, {root:true})
            commit('monsterData/toggleAnimation', {property: 'purpleShine'}, {root:true})
            
            setTimeout(() => {
              //PLAYER ESCAPES
              if(monsterCalc >= playerCalc) {
                dispatch('RESET_ANIMATIONS');
                dispatch('monsterData/RESET_ANIMATIONS', null, {root:true});
                dispatch('ESCAPE')
              }
              //PLAYER CANT ESCAPE
              else {
                dispatch('RESET_ANIMATIONS');
                dispatch('monsterData/RESET_ANIMATIONS', null, {root:true});
                dispatch('CAUGHT')
              }
            },1200)
          } 
        },
      ESCAPE({commit, dispatch}){
        commit('toggleAnimation', {property: 'portEffect'})
        commit('toggleAnimation', {property: 'greenShine'})
        dispatch('LOG_UPDATE', `YOU GOT AWAY.`);
        setTimeout(() => {
          commit('gameData/mutate', {property: 'phase', with:'ShopSelect'}, {root:true})
          dispatch('RESET_ANIMATIONS')
        }, 1200)
      },
      CAUGHT({commit, dispatch}) {
        commit('gameData/mutate', {property:'turnTailUsed', with:true}, {root: true});
        dispatch('LOG_UPDATE', `CAN'T GET AWAY!`);
        dispatch('monsterData/TRADE_BLOWS', null, {root:true})
      },
      RESET_ANIMATIONS({state,commit}){
        for (let item in state.animations){
          if (state.animations[item] === true) commit('toggleAnimation', {property: item})
        }
      },
}

export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
}