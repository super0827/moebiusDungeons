import shuffle from 'lodash.shuffle'
import ShopSounds from '@/plugins/ShopSounds.js'
import playerData from './playerData';


const state = () => ({
    info: {type: Object},
    shopChoice: [],
    inventory: [],
    visited:[],
    variants: [
        {
          name:"cleric", 
          portrait:require("@/assets/imgs/shopkeepers/cleric.png"),
          items: [
            {
              type: 'instant', 
              bought: false, 
              noSale: false, 
              name: 'minor heal', 
              cost: 1, 
              description: '+5 HP', 
              effect: {action:'CHANGE_PLAYER_STATS', payload:[{stat:'baseHealth', value:5, operator: 'add'}]},
              icon: require("@/assets/imgs/icons/items/cleric/heal1.png")
            },
              
            { 
              type: 'instant', 
              bought: false, 
              noSale: false, 
              name: 'minor blessing', 
              cost: 1, 
              description: '+1 ARM', 
              effect: {action:"CHANGE_PLAYER_STATS", payload:[{stat:'baseArmor', value:1, operator: 'add'}]},
              icon: require("@/assets/imgs/icons/items/cleric/boon.png")
            },

            {
              type: 'temporary', 
              bought: false, 
              noSale: false, 
              name: 'fortune', 
              cost: 2, 
              description: 'doubles coin value of next monster', 
              effect: {action:'CHANGE_MONSTER_STATS', payload:[{stat:'coins', value:2, length:1, operator:'multiply', length: 1}]},
              icon: require('@/assets/imgs/icons/items/cleric/fortune.png')
            },
              
            {
              type: 'instant', 
              bought: false, 
              noSale: false, 
              name: 'greater heal', 
              cost: 2, 
              description: '+12 HP', 
              effect: {action:'CHANGE_PLAYER_STATS', payload:[{stat:'baseHealth', value:12, operator:'add'}]},
              icon: require("@/assets/imgs/icons/items/cleric/heal2.png")
            },

            {
              type: 'instant', 
              bought: false, 
              noSale: false, 
              name: 'great blessing', 
              cost: 2, 
              description: '+3 ARM', 
              effect: {action:'CHANGE_PLAYER_STATS', payload:[{stat:'baseArmor', value:3, operator:'add'}]},
              icon: require("@/assets/imgs/icons/items/cleric/boonGold.png")
            },

            {
              type: 'instant', 
              bought: false, 
              noSale: false, 
              name: 'great miracle', 
              cost: 3, 
              description: '+5 ATK',
              effect: {action:'CHANGE_PLAYER_STATS', payload:[{stat:'baseAttackMax', value:5, operator:'add'}]},
              icon: require("@/assets/imgs/icons/items/cleric/boostAttack.png")
            },
            
            {
              type: 'temporary', 
              bought: false, 
              noSale: false, 
              name: 'boon', 
              cost: 3, 
              description: 'Immune to damage once', 
              effect: {action:'ADD_TO_INVENTORY', payload: {ability:'immune', length:1, shine:'greenShine'}},
              icon: require("@/assets/imgs/icons/items/cleric/immune2.png")
            },
          ],
          saying:"Come in, are you hurt?",
          shopTitle: "I can heal you... or perhaps you need the favor of the old gods?",
          welcome:['hello', 'hello2', 'welcome', 'welcome2',],
          welcomeBack:['youreBack', 'youreBack2' ],
          goodbye:['goodbye', 'goodbye2', 'beCareful', 'beCareful2', 'seeYouSoon', 'seeYouSoon2', 'staySafe', 'staySafe2' ],
          thankYou:['feelingBetter', 'feelingBetter2', 'thanks', 'thanks2', 'thankYou', 'thankYou2', ],
          cantBuy:['notEnough', 'notEnough2', 'moreCoin', 'moreCoin2', ],
          bigBuy:['byAmara', 'byAmara2']
        },

        {
          name:"graverobber", 
          portrait:require("@/assets/imgs/shopkeepers/graverobber.png"),
          items: [
            { 
              type: 'instant', 
              bought: false, 
              noSale: false, 
              name: 'nacre charm', 
              cost: 1,
              description: '+1 ATK | +1 ARM | -5 HP', 
              effect: {action:'CHANGE_PLAYER_STATS',
              payload:[
                {stat:'baseAttackMax', value:1, operator:'add'},
                {stat:'baseArmor', value:1, operator:'add'},
                {stat:'baseHealth', value:5, operator:'minus'},
                {stat:'curse', value:0.15, operator:'add'},
              ]}, 
              icon: require("@/assets/imgs/icons/items/graverobber/nacreCharm.png") 
            },

            { 
              type: 'instant', 
              bought: false, 
              noSale: false, 
              name: 'detriment bangle', 
              cost: 1, 
              description: "Halves your HP | +3 ARM", 
              effect: {action:'CHANGE_PLAYER_STATS',
              payload:[
                {stat:'baseArmor', value:3, operator:'add'},
                {stat:'baseHealth', value:2, operator:'divide'},
                {stat:'curse', value:0.25, operator:'add'},
              ]}, 
              icon: require("@/assets/imgs/icons/items/graverobber/detrimentBangle.png") 
            },

            { 
              type: 'instant', 
              bought: false, 
              noSale: false, 
              name: 'unlucky trinket', 
              cost: 3, 
              description: "+4 ATK | -2 ARM", 
              effect: {action:'CHANGE_PLAYER_STATS',
              payload:[
                {stat:'baseAttackMax', value:4, operator:'add'},
                {stat:'baseArmor', value:2, operator:'minus'},
                {stat:'curse', value:0.25, operator:'add'},
              ]},  
              icon: require("@/assets/imgs/icons/items/graverobber/unluckyTrinket.png") 
            },

            { 
              type: 'temporary', 
              bought: false, 
              noSale: false, 
              name: 'hollow bone', 
              cost: 2, 
              description: "+4 ATK for next battle", 
              effect: {action:'ADD_TO_INVENTORY',
              payload:{stat:'tempAttackMax', value:4, operator:'add', length:1, shine:'redShine'}}, 
              icon: require("@/assets/imgs/icons/items/graverobber/hollowBone.png") 
            },

            { 
              type: 'permanent', 
              bought: false, 
              noSale: false, 
              name: 'Demon Ring', 
              cost: 4, 
              description: 'ATK Type = Physical | Havles your ARM | x2 ATK', 
              effect: {action:'CHANGE_PLAYER_STATS',
              payload:[
                {stat:'baseArmor', value:3, operator:'add', shine:'purpleShine'},
                {stat:'baseHealth', value:2, operator:'divide'},
              ]}, 
              icon: require("@/assets/imgs/icons/items/graverobber/demonRing.png")
            },
            
            { 
              type: 'temporary', 
              bought: false, 
              noSale: false, 
              name: 'Dessicated Doll', 
              cost: 5, 
              description: 'Revive with 10 HP on death.', 
              effect: {action:'ADD_TO_INVENTORY', payload: {ability:'revive', length:-1, shine:'goldShine'}}, 
              icon: require("@/assets/imgs/icons/items/graverobber/dessicatedDoll.png")
            },
          ],
        saying:"Trust me, nothing I sell is cursed.",
        shopTitle: "Just buy somethin' quick, I don't wanna be seen fencing to the Kingloyal.",
        welcome:['heyThere', 'heyThereCoterie', 'heyThereCoterie2', 'huh', 'keepYourDistance',' wantSome', 'welcome', 'whatDoYouNeed', 'whatDoYouNeed2', 'whatDoYouNeed3'],
        welcomeBack:['backForMore', 'backForMore2', 'backForMore3', 'enoughOfMe', 'enoughOfMe2', 'enoughOfMe3', 'knewYoudBeBack', 'knewYoudBeBack2',], 
        goodbye:['illBeHere', 'illBeHere2', 'nextTime', 'nextTime2', 'okay', 'staySafe', 'staySafe2'],
        thankYou:['alright', 'buyAnother', 'buyAnother2', 'buyAnother3', 'goodEye', 'goodEye2', 'heresOne', 'laugh', 'laugh2', ],
        cantBuy:['noBargaining', 'noBargaining2', 'noDiscounts', 'notEnoughCoin', 'notEnoughCoin2', 'notEnoughCoin3', 'youreBroke'],
        bigBuy:['gladToRidThat', 'gladYouBought', 'gladYouBought2', 'pickedAnother', 'pickedAnother2', 'thankYouSire',]
        },




        //MERCHANT SHOP
        {
        name:"merchant", 
        portrait:require("@/assets/imgs/shopkeepers/merchant.png"),
        items: [
          {
            type:'instant', 
            bought: false, 
            noSale: false, 
            name: 'rations', 
            cost: 1, 
            description: '+5 HP', 
            effect: {action:"CHANGE_PLAYER_STATS",
            payload:[
              {stat:'baseHealth', value:5, operator:'add'},
            ]},   
            icon: require("@/assets/imgs/icons/items/merchant/rations.png")
          },

          {
            type:'instant', 
            bought: false, 
            noSale: false, 
            name: 'sewing kit', 
            cost: 1, 
            description: '+1 ARM', 
            effect: {action:"CHANGE_PLAYER_STATS",
            payload:[
              {stat:'baseArmor', value:1, operator:'add'},
            ]},  
            icon: require("@/assets/imgs/icons/items/merchant/sewingKit.png")
          },
          
          {
            type:'instant', 
            bought: false, 
            noSale: false, 
            name: 'Mettle Poultice', 
            cost: 1, 
            description: '+1 METTLE', 
            effect: {action:"CHANGE_PLAYER_STATS",
            payload:[
              {stat:'mettle', value:1, operator:'add'},
            ]},  
            icon: require("@/assets/imgs/icons/items/merchant/poultice.png")
          },
          
          {
            type:'instant', 
            bought: false, 
            noSale: false, 
            name: 'quick meal', 
            cost: 2, 
            description: '+12 HP',
            effect: {action:"CHANGE_PLAYER_STATS",
            payload:[
              {stat:'baseHealth', value:12, operator:'add'},
            ]},  
            icon: require("@/assets/imgs/icons/items/merchant/mutton.png")
          },

          {
            type:'instant', 
            bought: false, 
            noSale: false, 
            name: 'armor kit', 
            cost: 3, 
            description: '+2 ARM', 
            effect: {action:"CHANGE_PLAYER_STATS",
            payload:[
              {stat:'baseArmor', value:2, operator:'add'},
            ]},  
            icon: require("@/assets/imgs/icons/items/merchant/armorKit.png")
          },

          {
            type:'instant', 
            bought: false, 
            noSale: false, 
            name: 'Mettle Draght', 
            cost: 2, 
            description: '+2 METTLE', 
            effect: {action:"CHANGE_PLAYER_STATS",
            payload:[
              {stat:'mettle', value:2, operator:'add'},
            ]},  
            icon: require("@/assets/imgs/icons/items/merchant/draught.png")
          },
          
          {
            type:'instant', 
            bought: false, 
            noSale: false, 
            name: 'kings feast', 
            cost: 3, description: '+18 HP', 
            effect: {action:"CHANGE_PLAYER_STATS",
            payload:[
              {stat:'baseHealth', value:18, operator:'add'},
            ]},  
            icon: require("@/assets/imgs/icons/items/merchant/simpleMeal.png")
          },

          {
            type:'instant', 
            bought: false, 
            noSale: false, 
            name: 'etching rod', 
            cost: 5, description: '+3 ARM', 
            effect: {action:"CHANGE_PLAYER_STATS",
            payload:[
              {stat:'baseArmor', value:3, operator:'add'},
            ]},  
            icon: require("@/assets/imgs/icons/items/merchant/etchingRod.png")
          },

          {
            type:'instant', 
            bought: false, 
            noSale: false, 
            name: 'Mettle Vulnerary', 
            cost: 3, description: '+3 METTLE', 
            effect: {action:"CHANGE_PLAYER_STATS",
            payload:[
              {stat:'mettle', value:3, operator:'add'},
            ]}, 
            icon: require("@/assets/imgs/icons/items/merchant/vulnary.png")
          },
        ],
        saying:"Friend or foe, what are ya' buyin'?",
        shopTitle: "It's not much, but it's what I've got. All priced to move.",
        welcome:['hello', 'howsTheAdventuring', 'newStockToday', 'takeALookAround', 'welcome'],
        welcomeBack:['backForMore', 'welcomeBack'], 
        goodbye:['seeYouNextTime', 'staySafe'],
        thankYou:['anythingElse', 'goodChoice', 'interestingChoice', 'justPickedThatOut', 'thankYou'],
        cantBuy:['areYouKidding', 'shortSomeCoin', 'shortSomeCoin2', 'cantAffordThat', 'trySomethingCheaper', 'outOfYourMind', 'notACharity','goLootSomething', 'needMoreCoin', 'needMoreCoin2'],
        bigBuy:['justCleanedOff', 'spendItAllAtOnce', 'wonderfulChoice']
        },

        {
        name:"witch", 
        portrait:require("@/assets/imgs/shopkeepers/witch.png"),
        items: [
          { 
            type:'instant', 
            bought: false, 
            noSale: false, 
            name: 'weak enchantment', 
            cost: 1, 
            description: '+2 ATK', 
            effect: {action:"CHANGE_PLAYER_STATS",
            payload:[
              {stat:'baseAttackMax', value:2, operator:'add'},
            ]},
            icon: require("@/assets/imgs/icons/items/witch/weakEnchantment.png")
          },
          { 
            type:'instant', 
            bought: false, 
            noSale: false, 
            name: 'red potion', 
            cost: 1, 
            description: '+6 HP', 
            effect: {action:"CHANGE_PLAYER_STATS",
            payload:[
              {stat:'baseHealth', value:6, operator:'add'},
            ]},  
            icon: require("@/assets/imgs/icons/items/witch/redPotion.png")
          },
          { 
            type:'instant', 
            bought: false, 
            noSale: false, 
            name: 'banded charm', 
            cost: 1, 
            description: '+1 ATK | +1 ARM', 
            effect: {action:"CHANGE_PLAYER_STATS",
            payload:[
              {stat:'baseAttackMax', value:1, operator:'add'},
              {stat:'baseArmor', value:1, operator:'add'},
            ]},
            icon: require("@/assets/imgs/icons/items/witch/bandedCharm.png")
          },
          
          { 
            type:'instant', 
            bought: false, 
            noSale: false, 
            name: 'arcane binding', 
            cost: 2, 
            description: '+3 ATK | +1 ARM', 
            effect: {action:"CHANGE_PLAYER_STATS",
            payload:[
              {stat:'baseAttackMax', value:3, operator:'add'},
              {stat:'baseArmor', value:1, operator:'add'},
            ]}, 
            icon: require("@/assets/imgs/icons/items/witch/arcaneBinding.png")
          },

          { 
            type:'instant', 
            bought: false, 
            noSale: false, 
            name: 'ochre elixir', 
            cost: 2, 
            description: '+6 HP | +1 ATK', 
            effect: {action:"CHANGE_PLAYER_STATS",
            payload:[
              {stat:'baseHealth', value:6, operator:'add'},
              {stat:'baseAttackMax', value:1, operator:'add'},
            ]},
            icon: require("@/assets/imgs/icons/items/witch/ochrePotion.png")
          },

          { 
            type:'instant', 
            bought: false, 
            noSale: false, 
            name: 'mettle earring', 
            cost: 2, 
            description: '+1 ARM | +1 ATK | +6 HP', 
            effect: {action:"CHANGE_PLAYER_STATS",
            payload:[
              {stat:'baseArmor', value:1, operator:'add'},
              {stat:'baseAttackMax', value:1, operator:'add'},
              {stat:'baseHealth', value:6, operator:'add'},
            ]}, 
            icon: require("@/assets/imgs/icons/items/witch/mettleEarring.png")
          },
          
          { 
            type:'instant', 
            bought: false, 
            noSale: false, 
            name: 'ancient rune', 
            cost: 3, 
            description: '+3 ATK | +2 ARM', 
            effect: {action:"CHANGE_PLAYER_STATS",
            payload:[
              {stat:'baseAttackMax', value:3, operator:'add'},
              {stat:'baseArmor', value:2, operator:'add'},
            ]}, 
            icon: require("@/assets/imgs/icons/items/witch/ancientRune.png")
          },

          { 
            type:'instant', 
            bought: false, 
            noSale: false, 
            name: 'special drink', 
            cost: 3, 
            description: '+10 HP | +2 ATK', 
            effect: {action:"CHANGE_PLAYER_STATS",
            payload:[
              {stat:'baseAttackMax', value:2, operator:'add'},
              {stat:'baseHealth', value:10, operator:'add'},
            ]}, 
            icon: require("@/assets/imgs/icons/items/witch/specialDrink.png")
          },

          { 
            type:'instant', 
            bought: false, 
            noSale: false, 
            name: 'mettle necklace', 
            cost: 3, 
            description: '+1 ARM | +3 ATK | +8 HP', 
            effect: {action:"CHANGE_PLAYER_STATS",
            payload:[
              {stat:'baseArmor', value:1, operator:'add'},
              {stat:'baseAttackMax', value:3, operator:'add'},
              {stat:'baseHealth', value:8, operator:'add'},
            ]},
            icon: require("@/assets/imgs/icons/items/witch/mettleNecklace.png")
          },
          
          //NEEDS A NEW ACTION
          { 
            type: 'instant', 
            bought: false, 
            noSale: false, 
            name: 'blood ritual', 
            cost: 5, 
            description: 'Thirds your HP | + lost HP to your ATK', 
            effect: {action:"TRANSFER_PLAYER_STAT",
            payload:{
              fromStat:'baseHealth', toStat:'baseAttackMax', value:3, operator:'divide'},
            },
            icon: require("@/assets/imgs/icons/items/witch/bloodRitual.png")
          },
        ],
        saying:"Everything you see, all hand enchanted.",
        shopTitle: "Some of my inventory tends to be virulent. Browse at your own risk.",
        welcome:['hello', 'hello2', 'hello3', 'oh', 'ohHello' ],
        welcomeBack:['welcomeBack', 'welcomeBack2'], 
        goodbye:['goodbye', 'goodbye2', 'seeYouSoon', 'seeYouSoon2'],
        thankYou:['thankYou', 'thankYou2', 'carefulWithThat', 'carefulWithThat2', 'itsAllYours', 'itsAllYours2'],
        cantBuy:['notEnough', 'notEnough2'],
        bigBuy:['interestingChoice', 'interestingChoice2', ]
        },
    ]
})

const mutations = {
  pickTwoShops(state) {
    const randomizeShopKeeps = shuffle(state.variants);
    state.shopChoice = randomizeShopKeeps.slice(0,2);
  },
  newShopkeep(state, payload) {
    if(!payload){
      const randomPick = Math.floor(Math.random() * Math.floor(state.variants.length));
      // const randomPick = 1;
      state.info = state.variants[randomPick]
      const inventory = shuffle(state.variants[randomPick].items);
      state.inventory = inventory.slice(0, 3)
      // state.inventory = inventory
    }
    else if (typeof payload.shopkeep == 'number'){
      state.info = state.variants[payload.shopkeep]
      const inventory = shuffle(state.variants[payload.shopkeep].items);
      state.inventory = inventory.slice(0, 3)
    }
    else {
      state.info = payload.shopkeep;
      const inventory = shuffle(state.info.items);
      state.inventory = inventory.slice(0, 3)
    }
  },
  recordVisit(state) {
    state.visited.push(state.info.name)
  }
}

const getters = {
  haveVisited: (state, commit) => {
    if (state.visited.indexOf(state.info.name) > -1) {
      return true;
    } else {
      return false;
    }
  }
}

const actions = {
  //DEBUG OPTION
  PICK_SHOPKEEP ({commit}, payload){
    commit('gameData/mutate', {property: 'phase', with:'ShopPhase'}, {root:true})
    commit('newShopkeep', payload)
  },
  ADD_TO_INVENTORY({commit, dispatch}, payload) {
    commit('playerData/toggleAnimation', {property: 'portEffect'}, {root:true})
    commit('playerData/toggleAnimation', {property: payload.shine}, {root:true})
    commit('playerData/addToInventory', payload, {root:true})
    commit('playerData/changeTempStats', payload, {root:true})
    setTimeout(() => {
      dispatch('playerData/RESET_ANIMATIONS', null, {root:true});
    }, 1200)
  },
  CHANGE_PLAYER_STATS({commit}, payload) {
      for(const slots in payload) {
        commit('playerData/changeStats', {stat:payload[slots].stat, value:payload[slots].value, operator:payload[slots].operator}, {root:true})
      }
   },
   TRANSFER_PLAYER_STAT({commit}, payload){
      commit('playerData/transferStat', {fromStat:payload.fromStat, toStat:payload.toStat, value:payload.value, operator:payload.operator}, {root:true})
   },
   CHANGE_MONSTER_STATS({commit}, payload){
    for(const slots in payload) {
      commit('monsterData/changeStats', {stat:payload[slots].stat, value:payload[slots].value, operator:payload[slots].operator}, {root:true})
    }
   },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
        