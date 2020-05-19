import { store } from '../../store/store'
import { mapGetters } from 'vuex'

export default {
    watch: {
        //helpers toggling, audio ducking
        helper: function(value){
            if (value == true) {
                this.$sound.pause(this.bkgMusic, {fade:1000, volume:.1});
                
            }
            else {
                this.$sound.pause(this.bkgMusic, {fade:1000, volume:1});
            }
        }
    },
    computed: {
        ...mapGetters( 'musicData', {
            bkgMusic: 'musicPick'
        })
    },
    methods: {
        toggleHelp() {
            store.commit('gameData/toggleHelp');
        }
    }
};