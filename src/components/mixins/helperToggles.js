import { store } from '@/store/store'

export default {
    methods: {
        toggleHelp() {
            store.commit('gameData/toggleHelp');
        }
    }
};