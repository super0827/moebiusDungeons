import { store } from '../../store/store'

export default {
    //scene change animations, 
    //bkg music handling, 
    created: function () {
        store.commit('monsterData/newMonster', {property: 'isEntering', with: true});
    },
    beforeDestroy: function () {
        store.commit('monsterData/mutate', {property: 'isEntering', with: false});
    },
};