import { store } from '../../store/store'
import { mapGetters } from 'vuex'
import bkg from '@/plugins/backgroundMusic.js'

export default {
    created() {
        // should mutate gameData music to become the current top level components $options music value
        store.commit({
            type: 'musicData/newMusic', 
            value: this.music,
        })
        bkg[this.bkgMusic].play()
        bkg[this.bkgMusic].fade(0,1,2000);

    },
    beforeDestroy() {
        bkg[this.bkgMusic].fade(1,0,2000);
        // bkg[this.bkgMusic].on('fade', () => {
        //     bkg[this.bkgMusic].stop()
        // })
    },
    computed: {
        ...mapGetters( 'musicData', {
            bkgMusic: 'musicPick'
        })
    }
};
