import bkg from '@/plugins/backgroundMusic.js'
import shuffle from 'lodash.shuffle'

let shuffleMusic = [];
let pickedMusic = '';
let oldMusic = null;
let setVolume = 0;

export default {
    mounted() {
        shuffleMusic = shuffle(this.music);
        pickedMusic = shuffleMusic[0];
        if(oldMusic == pickedMusic){
            pickedMusic = shuffleMusic[1];
        }
        bkg[pickedMusic].play()
        setVolume = bkg[pickedMusic]._volume;
        bkg[pickedMusic].fade(0,setVolume,2000);
    },
    beforeDestroy() {
        oldMusic = bkg[pickedMusic];
        oldMusic.fade(setVolume,0,2000);
        oldMusic.on('fade', () => {
            oldMusic.stop();
        })
    },
    watch: {
        //helpers toggling, audio ducking
        helper: function(value){
            let fadeVolume = setVolume - .2;
            if (value === true) {
                if (fadeVolume <= 0) fadeVolume = .05;
                bkg[pickedMusic].fade(setVolume,fadeVolume,1000); 
            }
            else {
                bkg[pickedMusic].fade(fadeVolume,setVolume,1000); 
            }
        }
    },
};
