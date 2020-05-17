import { store } from '../../store/store'

export default {
    created: function () {
        //should mutate gameData music to become the current top level components $options music value
        store.dispatch('gameMusic/changeMusic', this.$options.music)
        .then(store.dispatch('gameMusic/playMusic'));
    },
    beforeDestroy: function () {
        if(this.$options.music) {
            this.$sound.pause(store.state.gameData.music, {fade: 2000, volume:0 });
        }
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