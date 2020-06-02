import { store } from '../../store/store'
import { mapGetters } from 'vuex'
import bkg from '@/plugins/backgroundMusic.js'

export default {
    watch: {
        //helpers toggling, audio ducking
        helper: function(value){
            if (value == true) {
                bkg[this.bkgMusic].fade(1,.2,1000); 
            }
            else {
                bkg[this.bkgMusic].fade(.2,1,1000); 
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