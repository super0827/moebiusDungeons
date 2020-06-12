import { store } from '../../store/store'
import bkg from '@/plugins/backgroundMusic.js'

export default {
    methods: {
        toggleHelp() {
            store.commit('gameData/toggleHelp');
        }
    }
};