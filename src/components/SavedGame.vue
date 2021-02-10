<template>
	<div>
		<b-row class="d-flex justify-content-between mb-3" no-gutters>
			<!-- NEWS -->
			<b-col cols="4" class="border">
				<div class="p-4">
					<h1>News</h1>
					<p>If the game appears too large on your screen try pressing CRTL- on Windows or CMD- on Mac to resize the interface.</p>
					<p class="text-danger">WARNING: Moebius Dungeons no longer auto saves your gameplay. To save your game click the cog in the top left corner during game play and click save game before closing the browser.</p>
				</div>
			</b-col>
			
			<!-- NEW GAME -->
			<b-col cols="3" class="border d-flex flex-column justify-content-center align-items-center text-center hoverGold" @click="startNewGame()" @mouseenter="UiSounds.chit.play()">
				<div class="p-4">
					<img src="@/assets/imgs/icons/playerSigilIcon.png" alt="kingloyal sigil icon, resembles a decorated helmet fifth floral borders">
					<h4 class="text-uppercase"><span v-if="save">Delete Save and</span> Start A New Game</h4>
				</div>
			</b-col>

			<!-- LOAD SAVED GAME -->
			<b-col cols="4" class="hoverGold border d-flex justify-content-center align-items-center p-4 savedGame text-center"
				@click="loadSavedGame()"
				@mouseenter="UiSounds.chit.play()"
			>

				<div v-if="player != null">
					<img class="mb-2" :src="player.info.portrait" alt="a portrait of your character">
					<h4>Resume Game</h4>

					<h3>{{savedPhase}}</h3>

					<div class="d-flex flex-row justify-content-center">
						<div> 
							<img class="statIcon" src="@/assets/imgs/icons/healthIcon.png">
							<h4>{{ player.info.baseHealth + player.tempHealth}}</h4>
						</div>
							
						<div>
							<img class="statIcon" :src="player.info.attackTypeImage">
							<h4>{{ player.info.baseAttackMax + player.tempAttackMax}}</h4>
						</div>
					
						<div>
							<img class="statIcon" src="@/assets/imgs/icons/armorIcon.png">
							<h4 class="overlayGridPos">{{ player.info.baseArmor + player.tempArmor}}</h4>
						</div>
					</div>

					<div class="d-flex flex-row justify-content-center">
						<div>
							<img class="statIcon" src="@/assets/imgs/icons/coinIcon.png">
							<h4>{{ player.info.coins }}</h4>
						</div>
							
						<div>
							<img class="statIcon" :src="player.info.mettleImg">
							<h4>{{ player.info.mettle }}</h4>
						</div>
					</div>
				</div>

				<h3 class="text-uppercase" v-else>No Save Data Exists</h3>

		</b-col>
	</b-row>
	
		<!-- Second Row -->
		<b-row class="d-flex justify-content-between" no-gutters>
			<b-col cols="4" class="border hoverGold d-flex align-items-center">
				<div class="p-4" @mouseenter="UiSounds.chit.play()">
					<img class="float-left mr-4" src="@/assets/imgs/icons/discord.png" alt="discord icon">
					<p>Join the Moebius Dungeon Discord to become a part of the Amaran community. help develop the game as it grows, and be the first to hear about new features and content. </p>
				</div>
			</b-col>
			
			<b-col cols="3" class="border hoverGold d-flex flex-column justify-content-center align-items-center" @mouseenter="UiSounds.chit.play()" @click="toLeaderboards()">
					<img src="@/assets/imgs/icons/travelersSigilIcon.png" alt="">
					<h4>LEADERBOARDS</h4>
			</b-col>
			
			<b-col cols="4" class="border hoverGold d-flex flex-column justify-content-center align-items-center" @click="$store.commit('gameData/mutate', {property: 'phase', with: 'CreditsOverlay'});" @mouseenter="UiSounds.chit.play()">
					<img src="@/assets/imgs/icons/shopkeepSigilIcon.png" alt="">
					<h4>CREDITS</h4>
			</b-col>
		</b-row>
	</div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import CreditsOverlay from '@/components/CreditsOverlay';
import UiSounds from "@/plugins/UiSounds";

    export default {
        name:"SavedGame",
        components: {
            CreditsOverlay
        },
        data() {
            return {
                UiSounds: UiSounds,
            }
        },
        methods: {
            startNewGame() {
                this.$store.commit('gameData/mutate', {property: 'phase', with:'CharacterSelect'}, {root:true})
                this.$store.dispatch('authData/deleteSavedGame', null, {root:true})
                this.$store.commit('monsterData/mutate', {property: 'roster', with:0}, {root:true})
                this.$store.commit('leaderboardData/resetLeaderboard', null, {root:true})
            },
            ...mapActions( 'authData', [
                'loadSavedGame',
                'deleteSavedGame'
            ]),
            toLeaderboards() {
                this.$store.commit('gameData/mutate', {property: 'phase', with: 'LeaderBoard'})
            }
        },
        computed: {
            ...mapState('authData', {
                save: state => state.user.data.save.saveExists,
                player: state => state.user.data.save.saveState.player
            }),
            savedPhase: function () {
                switch (this.player.currentPhase){
                    case 'DungeonPhase':
                        return 'Dungeon Phase'
                    break;
                    case 'ShopPhase':
                        return 'Shop Phase'
                    break;
                    case 'ShopSelect':
                        return 'Shop Select'
                    break;
                    case 'ShopPhase':
                        return 'Shop Phase'
                    break;
                    default:
                        null
                }
            }
        },
    }
</script>

<style scoped>
.savedGame img {
	width:100px;
}

.statIcon {
	max-width:50px;
}

.hoverGold:hover {
	background:gold;
	cursor:pointer;
}
</style>