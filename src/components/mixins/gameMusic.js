import bkg from '@/plugins/backgroundMusic.js'
import shuffle from 'lodash.shuffle'

let shuffleMusic = [];
let pickedMusic = '';
let oldMusic = null;

export default {
    mounted() {
        shuffleMusic = shuffle(this.music);
        pickedMusic = shuffleMusic[0];
        if(oldMusic == pickedMusic){
            pickedMusic = shuffleMusic[1];
        }
        bkg[pickedMusic].play()
        bkg[pickedMusic].fade(0,1,2000);
    },
    beforeDestroy() {
        oldMusic = bkg[pickedMusic];
        oldMusic.fade(1,0,2000);
        oldMusic.on('fade', () => {
            oldMusic.stop();
        })
    },
    watch: {
        //helpers toggling, audio ducking
        helper: function(value){
            if (value == true) {
                bkg[pickedMusic].fade(1,.2,1000); 
            }
            else {
                bkg[pickedMusic].fade(.2,1,1000); 
            }
        }
    },
};
