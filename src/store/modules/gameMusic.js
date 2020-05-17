import { shuffle } from 'lodash.shuffle'
import { SoundPlugin } from

const state = () => ({
    music: {type: Array},
})

const mutations = {
    newMusic(state, payload) {
        state.music = payload;
        state.music = shuffle(state.music)
    }
}

const actions = {
    changeMusic ({ commit }) {  
        return new Promise ((resolve, reject) => {
            commit('newMusic');
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
    actions,
}
        