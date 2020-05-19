import { store } from '../../store/store'

export default {
    watch: {
        //helpers toggling, audio ducking
        helper: function(value){
            if (value == true) {
                this.$sound.pause(store.state.musicData.music, {fade:1000, volume:.1});
                
            }
            else {
                this.$sound.pause(store.state.musicData.music, {fade:1000, volume:1});
            }
        }
    },
    methods: {
        toggleHelp() {
            store.commit('gameData/toggleHelp');
        }
    }
};