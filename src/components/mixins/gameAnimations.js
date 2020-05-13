import { store } from '../../store/store'

export default {
    //scene change animations, 
    //bkg music handling, 
    created: function () {
        store.commit('mutate', {property: 'isEntering', with: true});
        if(this.$options.music) {
            store.commit('mutate', {property: 'music', with: this.$options.music});
            this.$sound.play(store.state.music, {fade: 2000});
        }
    },
    beforeDestroy: function () {
        store.commit('mutate', {property: 'isEntering', with: false});
        if(this.$options.music) {
            this.$sound.pause(store.state.music, {fade: 2000, volume:0 });
        }
    },
};