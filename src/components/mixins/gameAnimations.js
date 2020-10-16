import { store } from '@/store/store'

export default {
    created() {
        store.commit('gameData/mutate', {property: 'isEntering', with: true});
    },
    beforeDestroy() {
        store.commit('gameData/mutate', {property: 'isEntering', with: false});
    },
};