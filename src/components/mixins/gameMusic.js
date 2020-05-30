import { store } from '../../store/store'
import { mapGetters } from 'vuex'

export default {
    created() {
        // should mutate gameData music to become the current top level components $options music value
        store.commit({
            type: 'musicData/newMusic', 
            value: this.music,
        })
        this.$sound.play(this.bkgMusic, {fade: 2000})

    },
    destroyed() {
        this.$sound.pause(this.bkgMusic, {fade: 2000, volume:0 });
    },
    computed: {
        ...mapGetters( 'musicData', {
            bkgMusic: 'musicPick'
        })
    }
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