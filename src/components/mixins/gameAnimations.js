import { store } from '../../store/store'

export default {
    created() {
        store.commit('gameData/mutate', {property: 'isEntering', with: true});
    },
    beforeDestroy() {
        store.commit('gameData/mutate', {property: 'isEntering', with: false});
    },
};



// beforeDestroy: function(){
//     if(store.state.gameData.phase == 'DungeonPhase') {
//         if(this.state.monsterRoster > this.characters.monsterCharacters.length) {
//             this.state.monsterRoster = this.characters.monsterCharacters.length;
//             this.state.finalBoss = true; 
// 		}
// 		else {
//             this.state.monster = this.characters.monsterCharacters[this.state.monsterRoster];
// 		}
// 			console.log(`new monster is ${this.state.monsters.name}`);
//     	}
// },