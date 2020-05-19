import shuffle from 'lodash.shuffle'

const state = () => ({
    music: []
})

const mutations = {
    newMusic(state, payload) {
        state.music = payload.value.slice(0, payload.value.length);
    }
}

const getters = {
    musicPick: state => {
        let shuffleMusic = shuffle(state.music)
        return shuffleMusic[0];
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    getters,
}
        