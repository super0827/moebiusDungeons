<template>
<section class="debugBar">
      <section @click="bugger = !bugger">
        <h3>DEBUG BAR</h3>
      </section>

      <article class="debugContent" v-if="bugger">
        <p>SCENES</p>

        <section>
          <section class="flexColumn">
          <span>SCENE SELECT</span>
            <button @click="$store.commit('gameData/mutate', {property: 'phase', with:'StartScreen'})">STARTING SCREEN</button>
            <button @click="$store.commit('gameData/mutate', {property: 'phase', with:'SavedGame'})">SAVED GAME SCREEN</button>
            <button @click="$store.commit('gameData/mutate', {property: 'phase', with:'CharacterSelect'})">CHARACTER SCREEN</button>
            <button @click="$store.commit('gameData/mutate', {property: 'phase', with:'DungeonPhase'})">DUNGEON</button>
            <button @click="$store.commit('gameData/mutate', {property: 'phase', with:'ShopSelect'})">SHOP SELECT</button>
            <button @click="$store.commit('gameData/mutate', {property: 'phase', with:'ShopPhase'})">SHOP</button>
            <button @click="$store.commit('gameData/mutate', {property: 'phase', with:'WinScreen'})">WIN SCREEN</button>
            <button @click="$store.commit('gameData/mutate', {property: 'phase', with:'LoseScreen'})">LOSE SCREEN</button>
          </section>
        </section>

        <p>MONSTER</p>
        <section>
          <span>HEALTH</span>
          <section>
            <button @click="$store.commit('monsterData/mutateInfo', {property: 'baseHealth', with:1})">1</button>
            <button @click="$store.commit('monsterData/mutateInfo', {property: 'baseHealth', with:99})">99</button>
          </section>
        </section>
        
        <br>
        <p>ADD TEMP ITEMS</p>
        <section>
          <section>
            <button @click="$store.commit('playerData/addToInventory', 
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
            )"> Dessicated Doll </button>
            
            
          </section>
        </section>
        <p>PLAYER</p>
        

        <section>
          <span>HEALTH</span>
          <section>
            <button @click="$store.commit('playerData/mutateInfo', {property: 'baseHealth', with:1})">1</button>
            <button @click="$store.commit('playerData/mutateInfo', {property: 'baseHealth', with:99})">99</button>
          </section>
        </section>
      
        <section>
          <span>ARMOR</span>
          <section>
          <button @click="$store.commit('playerData/mutateInfo', {property: 'baseArmor', with:5})">5</button>
          <button @click="$store.commit('playerData/mutateInfo', {property: 'baseArmor', with:99})">99</button>
          </section>
        </section>
        
        <section>
          <span>ATTACK</span>
          <section>
          <button @click="$store.commit('playerData/addToStat', {property: 'baseAttackMax', with:1})">1</button>
          <button @click="$store.commit('playerData/mutateInfo', {property: 'baseAttackMax', with:5})">5</button>
          <button @click="$store.commit('playerData/mutateInfo', {property:'baseAttackMax', with:99})">99</button> 
          </section>
        </section>
        
        <section>
          <span>COINS</span>
          <section>
          <button @click="$store.commit('playerData/mutateInfo', {property:'coins', with:0})">0</button>
          <button @click="$store.commit('playerData/mutateInfo', {property:'coins', with:99})">99</button>
          </section>
        </section>
        
        <section>
          <span>METTLE</span>
          <section>
          <button @click="$store.commit('playerData/mutateInfo', {property:'mettle', with:0})">0</button>
          <button @click="$store.commit('playerData/mutateInfo', {property:'mettle', with:3})">3</button>
          </section>
        </section>

        <br>

        <p>SHOPKEEPS</p>
          <section>
            <section class="flexColumn">
              <button @click="$store.dispatch('shopkeepData/PICK_SHOPKEEP', {shopkeep:0})">CLERIC </button>
              <button @click="$store.dispatch('shopkeepData/PICK_SHOPKEEP', {shopkeep:1})">GRAVEROBBER</button>
              <button @click="$store.dispatch('shopkeepData/PICK_SHOPKEEP', {shopkeep:2})">MERCHANT</button>
              <button @click="$store.dispatch('shopkeepData/PICK_SHOPKEEP', {shopkeep:3})">WITCH</button>
            </section>
        </section>

        <br>

        <p>MONSTER ROSTER</p>
        <section class="flexColumn">
          <button @click="$store.commit('monsterData/newMonster', 1)">Next Monster</button>
          <button @click="$store.commit('monsterData/newMonster', -1)">Prev Monster</button>
        </section>

        <br>

        <p>MONSTER RANKS</p>
        <section class="flexColumn">
              <button @click="$store.commit('leaderboardData/addToList', {property: 'monstersKilled', with: 'monster'})">Rank Up</button>
            </section>
      </article> 
    </section>
</template>

<script>

import { mapState } from 'vuex'
import UiSounds from '@/plugins/UiSounds.js'

export default {
  name: 'DebugBar',
  data() {
      return {
          bugger: false,
          UiSounds: UiSounds
      }
  },
  computed: {
    ...mapState('playerData', {
        special: state => state.info.special,
        description: state => state.info.specialDescription
    })
  }
}
</script>

<style scoped>
    /* Debug Styles - REMOVE FOR PRODUCTION */
.debugBar {
  margin:10px;
  font-family: var(--paragraphs-type);
  text-align:center;
  font-size:13px;
  top:0px;
  z-index:999999;
  min-width:200px;
  opacity:0.7;
  color:white;
  left:0px;
  background:black;
  text-transform:uppercase;
}

.debugBar h3 {
  border: solid white 2px;
  padding:0 50px;
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
