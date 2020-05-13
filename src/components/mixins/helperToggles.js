import { store } from '../../store/store'

export default {
    watch: {
        //helpers toggling, audio ducking
        helper: function(value){
            if (value == true) {
                this.$sound.pause(store.state.music, {fade:1000, volume:.1});
                
            }
            else {
                this.$sound.pause(store.state.music, {fade:1000, volume:1});
            }
        }
    },
    methods: {
        //method to call
        toggleHelp() {
            store.state.helper = !store.state.helper;
        }
    }
};