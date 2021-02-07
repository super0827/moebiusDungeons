<template>
  <b-col cols='12' class="d-flex flex-column justify-content-start align-items-center">
    <div class="debugBar px-2" v-if="bugger">
      <article class="debugContent d-flex flex-column">
        <h4 class="mt-2">SCENES</h4>
        <section class="d-flex flex-column">
          <span>SCENE SELECT</span>
          <b-button class="mb-1" @click="$store.commit('gameData/mutate', {property: 'phase', with:'SavedGame'})">SAVE GAME</b-button>
          <b-button class="mb-1" @click="$store.commit('gameData/mutate', {property: 'phase', with:'CharacterSelect'})">CHAR SELECT</b-button>
          <b-button class="mb-1" @click="$store.commit('gameData/mutate', {property: 'phase', with:'DungeonPhase'})">DUNGEON</b-button>
          <b-button class="mb-1" @click="$store.commit('gameData/mutate', {property: 'phase', with:'ShopSelect'})">SHOP SELECT</b-button>
          <b-button class="mb-1" @click="$store.commit('gameData/mutate', {property: 'phase', with:'ShopPhase'})">SHOP</b-button>
          <b-button @click="$store.commit('gameData/mutate', {property: 'phase', with:'LoseScreen'})">LOSE SCREEN</b-button>
        </section>

        <h4 class="mt-2">MONSTERS</h4>
        <section class="d-flex align-items-center">
          <span>HEALTH</span>
          <b-button class="mr-1" click="$store.commit('monsterData/mutateInfo', {property: 'baseHealth', with:1})">1</b-button>
          <b-button @click="$store.commit('monsterData/mutateInfo', {property: 'baseHealth', with:99})">99</b-button>
        </section>
        
        <h4 class="mt-2">TEMP ITEMS</h4>
          <section>
            <b-button @click="$store.commit('playerData/addToInventory', 
            { 
              type: 'temporary', 
              bought: false, 
              noSale: false, 
              name: 'Dessicated Doll', 
              cost: 5, 
              description: 'Revive with 10 HP on death.', 
              effect: {action:'ADD_TO_INVENTORY', payload: {ability:'revive', length:-1, shine:'goldShine'}}, 
              icon: require('@/assets/imgs/icons/items/graverobber/dessicatedDoll.png')
            }
            )"> Dessicated Doll </b-button>
          </section>

        <h4 class="mt-2">PLAYER</h4>
        <section class="d-flex align-items-center">
          <span>HP</span>
          <section>
            <b-button class="mr-1" @click="$store.commit('playerData/mutateInfo', {property: 'baseHealth', with:1})">1</b-button>
            <b-button @click="$store.commit('playerData/mutateInfo', {property: 'baseHealth', with:99})">99</b-button>
          </section>
        </section>
      
        <section class="d-flex align-items-center">
          <span>ARM</span>
          <section>
          <b-button class="mr-1" @click="$store.commit('playerData/mutateInfo', {property: 'baseArmor', with:5})">5</b-button>
          <b-button @click="$store.commit('playerData/mutateInfo', {property: 'baseArmor', with:99})">99</b-button>
          </section>
        </section>
        
        <section class="d-flex align-items-center">
          <span>ATK</span>
          <section>
          <b-button size="sm" class="mr-1" @click="$store.commit('playerData/addToStat', {property: 'baseAttackMax', with:1})">1</b-button>
          <b-button size="sm" class="mr-1" @click="$store.commit('playerData/mutateInfo', {property: 'baseAttackMax', with:5})">5</b-button>
          <b-button size="sm" @click="$store.commit('playerData/mutateInfo', {property:'baseAttackMax', with:99})">99</b-button> 
          </section>
        </section>
        
        <section class="d-flex align-items-center">
          <span>COIN</span>
          <section>
          <b-button class="mr-1" @click="$store.commit('playerData/mutateInfo', {property:'coins', with:0})">0</b-button>
          <b-button @click="$store.commit('playerData/mutateInfo', {property:'coins', with:99})">99</b-button>
          </section>
        </section>
        
        <section class="d-flex align-items-center">
          <span>MTL</span>
          <section>
          <b-button class="mr-1" @click="$store.commit('playerData/mutateInfo', {property:'mettle', with:0})">0</b-button>
          <b-button @click="$store.commit('playerData/mutateInfo', {property:'mettle', with:3})">3</b-button>
          </section>
        </section>

        <h4 class="mt-2">SHOPKEEPS</h4>
          <section class="d-flex flex-column">
            <b-button class="mb-1" @click="$store.dispatch('shopkeepData/PICK_SHOPKEEP', {shopkeep:0})">CLERIC </b-button>
            <b-button class="mb-1" @click="$store.dispatch('shopkeepData/PICK_SHOPKEEP', {shopkeep:1})">GRAVEROBBER</b-button>
            <b-button class="mb-1" @click="$store.dispatch('shopkeepData/PICK_SHOPKEEP', {shopkeep:2})">MERCHANT</b-button>
            <b-button @click="$store.dispatch('shopkeepData/PICK_SHOPKEEP', {shopkeep:3})">WITCH</b-button>
        </section>

        <h4 class="mt-2">MONSTER ROSTER</h4>
        <section class="d-flex flex-column">
          <b-button class="mb-1" @click="$store.commit('monsterData/newMonster', 1)">Next Monster</b-button>
          <b-button @click="$store.commit('monsterData/newMonster', -1)">Prev Monster</b-button>
        </section>

        <h4 class="mt-2">MONSTER RANKS</h4>
        <section class="d-flex flex-column">
          <b-button @click="$store.commit('leaderboardData/addToList', {property: 'monstersKilled', with: 'monster'})">Rank Up</b-button>
        </section>
      </article> 
    </div>
  </b-col>
</template>

<script>

import { mapState } from 'vuex'
import UiSounds from '@/plugins/UiSounds.js'

export default {
  name: 'DebugBar',
  data() {
    return {
      UiSounds: UiSounds
      }
  },
  computed: {
    ...mapState('playerData', {
        special: state => state.info.special,
        description: state => state.info.specialDescription
    }),
    ...mapState('gameData', {
        bugger: state => state.debugShow
    }),
  }
}
</script>

<style scoped>
    /* Debug Styles - REMOVE FOR PRODUCTION */
.debugBar {
  z-index:999;
  padding:5px;
  color:white;
  background:rgb(54, 54, 54);
  width:200px;
}

.debugBar span {
  margin-right:10px;
}

.debugBar section {
  display:flex;
  justify-content:center;
  padding:1px;
  margin:3px;
}

.debugContent { 
  height:500px;
  overflow-y: scroll;
}
</style>
