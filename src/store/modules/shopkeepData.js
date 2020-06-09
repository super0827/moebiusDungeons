import shuffle from 'lodash.shuffle'
import ShopSounds from '@/plugins/ShopSounds.js'


const state = () => ({
    info: {type: Object},
    inventory: [],
    visited:[],
    variants: [
        {
          name:"cleric", 
          portrait:require("@/assets/imgs/shopkeepers/cleric.png"),
          items: [
              { type: 'instant', bought: false, noSale: false, name: 'minor heal', cost: 1, description: '+5 HP', effect: {action:'HEAL_PLAYER', payload: 5}, icon: require("@/assets/imgs/icons/items/cleric/heal1.png")},
              { type: 'instant', bought: false, noSale: false, name: 'minor blessing', cost: 1, description: '+1 ARM', effect: {action:"ADD_ARMOR", payload: 1}, icon: require("@/assets/imgs/icons/items/cleric/boon.png")},
              { type: 'temporary', bought: false, noSale: false, name: 'fortune', cost: 2, description: 'doubles coin value of next monster', effect: {action:'FORTUNE'}, icon: require("@/assets/imgs/icons/items/cleric/fortune.png")},
              
              { type: 'instant', bought: false, noSale: false, name: 'greater heal', cost: 2, description: '+12 HP',effect: {action:'HEAL_PLAYER', payload: 12}, icon: require("@/assets/imgs/icons/items/cleric/heal2.png")},
              { type: 'instant', bought: false, noSale: false, name: 'great blessing', cost: 2, description: '+3 ARM', effect: {action:"ADD_ARMOR", payload: 3}, icon: require("@/assets/imgs/icons/items/cleric/boonGold.png") },
              { type: 'instant', bought: false, noSale: false, name: 'great miracle', cost: 3, description: '+5 ATK',effect: {action:"ADD_ATTACK", payload: 5}, icon: require("@/assets/imgs/icons/items/cleric/boostAttack.png") },
              
              { type: 'temporary', bought: false, noSale: false, name: 'boon', cost: 3, description: 'Immune to damage once', effect: {action:'ADD_TEMPORARY_ABILITY', payload: {ability:'immune', length:1, shine:'greenShine'}}, icon: require("@/assets/imgs/icons/items/cleric/immune2.png") },
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
          { type: 'instant', bought: false, noSale: false, name: 'nacre charm', cost: 1, description: 'ATK +1 | ARM +1 | HP -5', effect: {action:'MULTI_STATS', payload: {heal:-5, armor:1, attack:1}}, icon: require("@/assets/imgs/icons/items/graverobber/nacreCharm.png") },
          { type: 'instant', bought: false, noSale: false, name: 'detriment bangle', cost: 1, description: "Halves your HP | +3 ARM", effect: {action:'DETRIMENT_BANGLE', payload:{armor:3}}, icon: require("@/assets/imgs/icons/items/graverobber/detrimentBangle.png") },
          { type: 'instant', bought: false, noSale: false, name: 'unlucky trinket', cost: 3, description: "+4 ATK | -2 ARM", effect: {action:'MULTI_STATS', payload:{attack:4, armor:-2}}, icon: require("@/assets/imgs/icons/items/graverobber/unluckyTrinket.png") },
          
          { type: 'temporary', bought: false, noSale: false, name: 'hollow bone', cost: 2, description: "+4 ATK for next battle", effect: {action:'ADD_TEMPORARY_STAT', payload:{where:'baseAttackMax', howMuch:4, shine:'redShine'}}, icon: require("@/assets/imgs/icons/items/graverobber/hollowBone.png") },
          { type: 'permanent', bought: false, noSale: false, name: 'Demon Ring', cost: 4, description: 'ATK Type = Physical | Havles your ARM | x2 ATK', effect: {action:'DEMON_RING', payload:{where:'baseAttackMax', shine:'purpleShine'}}, icon: require("@/assets/imgs/icons/items/graverobber/demonRing.png")},
          { type: 'temporary', bought: false, noSale: false, name: 'Dessicated Doll', cost: 5, description: 'Revive with 10 HP on death.', effect: {action:'ADD_TEMPORARY_ABILITY', payload: {ability:'revive', length:9999, shine:'goldShine'}}, icon: require("@/assets/imgs/icons/items/graverobber/dessicatedDoll.png")},
        ],
        saying:"Trust me, nothing I sell is cursed.",
        shopTitle: "Just buy somethin' quick, I don't wanna be seen fencing to the Kingloyal.",
        welcome:['heyThere', 'huh'],
        goodbye:['okay'],
        thankYou:['alright', 'buyAnother'],
        cantBuy:[],
        bigBuy:[],
        },

        {name:"merchant", 
        portrait:require("@/assets/imgs/shopkeepers/merchant.png"),
        items: [
          { type:'instant', bought: false, noSale: false, name: 'rations', cost: 1, description: '+5 HP', effect: {action:"HEAL_PLAYER", payload: 5},  icon: require("@/assets/imgs/icons/items/merchant/rations.png") },
          { type:'instant', bought: false, noSale: false, name: 'sewing kit', cost: 1, description: '+1 ARM', effect: {action:"ADD_ARMOR", payload: 1},  icon: require("@/assets/imgs/icons/items/merchant/sewingKit.png") },
          { type:'instant', bought: false, noSale: false, name: 'Mettle Poultice', cost: 1, description: '+2 ATK', effect: {action:"ADD_ATTACK", payload: 2},  icon: require("@/assets/imgs/icons/items/merchant/poultice.png") },
          
          { type:'instant', bought: false, noSale: false, name: 'quick meal', cost: 2, description: '+12 HP',effect: {action:"HEAL_PLAYER", payload: 12},  icon: require("@/assets/imgs/icons/items/merchant/mutton.png") },
          { type:'instant', bought: false, noSale: false, name: 'armor kit', cost: 3, description: '+2 ARM', effect: {action:"ADD_ARMOR", payload: 2},  icon: require("@/assets/imgs/icons/items/merchant/armorKit.png") },
          { type:'instant', bought: false, noSale: false, name: 'Mettle Draght', cost: 3, description: '+5 ATK', effect: {action:"ADD_ATTACK", payload: 5},  icon: require("@/assets/imgs/icons/items/merchant/draught.png") },
          
          { type:'instant', bought: false, noSale: false, name: 'kings feast', cost: 3, description: '+18 HP', effect: {action:"HEAL_PLAYER", payload: 18},  icon: require("@/assets/imgs/icons/items/merchant/simpleMeal.png") },
          { type:'instant', bought: false, noSale: false, name: 'etching rod', cost: 5, description: '+3 ARM', effect: {action:"ADD_ARMOR", payload: 3},  icon: require("@/assets/imgs/icons/items/merchant/etchingRod.png") },
          { type:'instant', bought: false, noSale: false, name: 'Mettle Vulnerary', cost: 5, description: '+8 ATK', effect: {action:"ADD_ATTACK", payload: 8},  icon: require("@/assets/imgs/icons/items/merchant/vulnary.png") },
        ],
        saying:"Friend or foe, what are ya' buyin'?",
        shopTitle: "It's not much, but it's what I've got. All priced to move.",
        welcome:['welcome', 'hello', 'hey',],
        welcomeBack:['welcomeBack', 'welcomeBack2', 'welcomeBack3'],
        goodbye:['comeBackSoon', 'comeAgain', 'nextTime', 'okay',],
        thankYou:['fairTrade', 'goodPurchase', 'thanks'],
        cantBuy:[],
        bigBuy:[],
        },

        {name:"witch", 
        portrait:require("@/assets/imgs/shopkeepers/witch.png"),
        items: [
          { type:'instant', bought: false, noSale: false, name: 'weak enchantment', cost: 1, description: '+2 ATK', effect: {action:"ADD_ATTACK", payload: 2}, icon: require("@/assets/imgs/icons/items/witch/weakEnchantment.png") },
          { type:'instant', bought: false, noSale: false, name: 'red potion', cost: 1, description: '+6 HP', effect: {action:"HEAL_PLAYER", payload: 6},  icon: require("@/assets/imgs/icons/items/witch/redPotion.png") },
          { type:'instant', bought: false, noSale: false, name: 'banded charm', cost: 1, description: '+1 ATK | +1 ARM', effect: {action:"MULTI_STATS", payload: {attack:1, armor:1}}, icon: require("@/assets/imgs/icons/items/witch/bandedCharm.png") },
          
          { type:'instant', bought: false, noSale: false, name: 'arcane binding', cost: 2, description: '+3 ATK | +1 ARM', effect: {action:"MULTI_STATS", payload: {attack:3, armor:1}}, icon: require("@/assets/imgs/icons/items/witch/arcaneBinding.png") },
          { type:'instant', bought: false, noSale: false, name: 'ochre elixir', cost: 2, description: '+6 HP | +1 ATK', effect: {action:"MULTI_STATS", payload: {heal:6, attack:1}}, icon: require("@/assets/imgs/icons/items/witch/ochrePotion.png") },
          { type:'instant', bought: false, noSale: false, name: 'mettle earring', cost: 2, description: '+1 ARM | +1 ATK | +6 HP', effect: {action:"MULTI_STATS", payload: {attack:1, armor:1, heal:6}}, icon: require("@/assets/imgs/icons/items/witch/mettleEarring.png") },
          
          { type:'instant', bought: false, noSale: false, name: 'ancient rune', cost: 3, description: '+3 ATK | +2 ARM', effect: {action:"MULTI_STATS", payload: {attack:3, armor:2}}, icon: require("@/assets/imgs/icons/items/witch/ancientRune.png") },
          { type:'instant', bought: false, noSale: false, name: 'special drink', cost: 3, description: '+10 HP | +2 ATK', effect: {action:"MULTI_STATS", payload: {attack:2, heal:10}}, icon: require("@/assets/imgs/icons/items/witch/specialDrink.png") },
          { type:'instant', bought: false, noSale: false, name: 'mettle necklace', cost: 3, description: '+1 ARM | +3 ATK | +8 HP', effect: {action:"MULTI_STATS", payload: {attack:3, armor:1, heal:8}}, icon: require("@/assets/imgs/icons/items/witch/mettleNecklace.png") },
          
          { type: 'instant', bought: false, noSale: false, name: 'blood ritual', cost: 5, description: 'Thirds your HP | + lost HP to your ATK', effect: {action:"BLOOD_RITUAL"}, icon: require("@/assets/imgs/icons/items/witch/bloodRitual.png") },
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
  newShopkeep(state) {
    // const randomPick = Math.floor(Math.random() * Math.floor(state.variants.length));
    const randomPick = 0;
    state.info = state.variants[randomPick]
    const inventory = shuffle(state.variants[randomPick].items);
    state.inventory = inventory.slice(0, 3)
    // state.inventory = inventory
    console.log(`new shopkeep is ${state.variants[randomPick].name}`)
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

const actions ={
  ADD_TEMPORARY_ABILITY({commit, dispatch}, payload) {
    commit('playerData/addTempAbility', payload, {root:true})
    commit('playerData/toggleAnimation', {property: 'portEffect'}, {root:true})
    commit('playerData/toggleAnimation', {property: payload.shine}, {root:true})
    setTimeout(() => {
      dispatch('playerData/RESET_ANIMATIONS', null, {root:true});
    }, 1200)
  },
  ADD_TEMPORARY_STAT({commit, dispatch}, payload) {
    commit('playerData/addTempStat', payload, {root:true})
    commit('playerData/toggleAnimation', {property: 'portEffect'}, {root:true})
    commit('playerData/toggleAnimation', {property: payload.shine}, {root:true})
    setTimeout(() => {
      dispatch('playerData/RESET_ANIMATIONS', null, {root:true});
    }, 1200)
  },
  DEMON_RING({commit, dispatch}, payload) {
    commit('playerData/physicalAttackType', null, {root:true})
    commit('playerData/halveArmor', null, {root:true})
    commit('playerData/toggleAnimation', {property: 'portEffect'}, {root:true})
    commit('playerData/toggleAnimation', {property: payload.shine}, {root:true})
    setTimeout(() => {
      dispatch('playerData/RESET_ANIMATIONS', null, {root:true});
    }, 1200)
  },
   HEAL_PLAYER({commit}, payload) {
     commit('playerData/heal', payload, {root:true})
   },
   MULTI_STATS({commit}, payload) {
     if(payload.heal) {
       commit('playerData/heal', payload.heal, {root:true})
     }
     if(payload.armor) {
       commit('playerData/addArmor', payload.armor, {root:true})
     }
     if(payload.attack) {
       commit('playerData/addAttack', payload.attack, {root:true})
     }
   },
   DETRIMENT_BANGLE({commit}, payload) {
    commit('playerData/addArmor', payload.armor, {root:true})
    commit('playerData/halveHP', null, {root:true})
   },
   ADD_ARMOR({commit}, payload) {
     commit('playerData/addArmor', payload, {root:true})
   },
   ADD_ATTACK({commit}, payload) {
     commit('playerData/addAttack', payload, {root:true})
   },
   FORTUNE({commit}, payload) {
     commit('monsterData/coinMultiply', payload, {root:true})
   },
   BLOOD_RITUAL({commit}) {
     commit('playerData/bloodRitual', null, {root:true});
   }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
        