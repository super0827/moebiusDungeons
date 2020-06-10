import {Howl, Howler} from 'howler'

const chit = new Howl({
    src: [require('@/assets/audio/uiSounds/chit.wav')],
    loop: false,
    volume: 1,
});

const startBlip = new Howl({
    src: [require('@/assets/audio/uiSounds/startBlip.wav')],
    loop: false,
    volume: 1,
});

const charPick = new Howl({
    src: [require('@/assets/audio/uiSounds/charPick.ogg')],
    loop: false,
    volume: .5,
});

const escape = new Howl({
    src: [require('@/assets/audio/uiSounds/escape.wav')],
    loop: false,
    volume: .5,
});

const victory1 = new Howl({
    src: [require('@/assets/audio/uiSounds/victory1.wav')],
    loop: false,
    volume: .5,
});

const victory2 = new Howl({
    src: [require('@/assets/audio/uiSounds/victory2.wav')],
    loop: false,
    volume: .5,
});

const victory3 = new Howl({
    src: [require('@/assets/audio/uiSounds/victory3.wav')],
    loop: false,
    volume: .5,
});

const victory4 = new Howl({
    src: [require('@/assets/audio/uiSounds/victory4.wav')],
    loop: false,
    volume: .5,
});

export default {
    chit,
    startBlip,
    charPick,
    escape,
    victory1,
    victory2,
    victory3,
    victory4
};