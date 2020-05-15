import { store } from '../../store/store'

export default {
    //scene change animations, 
    //bkg music handling, 
    beforeDestroy: function(){
        if(store.state.phase == 'DungeonPhase') {
            if(this.state.monsterRoster > this.characters.monsterCharacters.length) {
                this.state.monsterRoster = this.characters.monsterCharacters.length;
                this.state.finalBoss = true; 
			}
			else {
                this.state.monster = this.characters.monsterCharacters[this.state.monsterRoster];
  			}
  				console.log(`new monster is ${this.state.monster.name}`);
        	}
    },
    created: function () {
        store.commit('mutate', {property: 'isEntering', with: true});
        if(this.$options.music) {
            store.commit('mutate', {property: 'music', with: this.$options.music});
            this.$sound.play(store.state.music, {fade: 2000});
        }
    },
    beforeDestroy: function () {
        store.commit('mutate', {property: 'isEntering', with: false});
        if(this.$options.music) {
            this.$sound.pause(store.state.music, {fade: 2000, volume:0 });
        }
    },
};