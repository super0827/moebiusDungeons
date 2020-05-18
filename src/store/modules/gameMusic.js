import { shuffle } from 'lodash.shuffle'

const state = () => ({
    music: {type: Array},
})

const mutations = {
    newMusic(state, payload) {
        state.music = payload.newMusic;
        state.music = shuffle(state.music)
    }
}

const getters = {
    musicPick: (state) => {
        return state.music[0];
    }
}

const actions = {
    changeMusic (context) {  
        return new Promise ((resolve) => {
            context.commit('newMusic', { newMusic:context.getters.musicPick});
            resolve();
        }) 
    },
    playMusic() {
        $sound.play(music[0])
    }
}


export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions,
}
        