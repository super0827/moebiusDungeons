import {Howl, Howler} from 'howler'

const welcome = new Howl({
    src: [require('@/assets/audio/shopAudio/graverobber/welcome.mp3')],
    loop: false,
    volume: .5,
});

const alright = new Howl({
    src: [require('@/assets/audio/shopAudio/graverobber/alright.mp3')],
    loop: false,
    volume: .5,
});

const buyAnother = new Howl({
    src: [require('@/assets/audio/shopAudio/graverobber/buyAnother.mp3')],
    loop: false,
    volume: .5,
});

const heyThere = new Howl({
    src: [require('@/assets/audio/shopAudio/graverobber/heyThere.mp3')],
    loop: false,
    volume: .5,
});

const huh = new Howl({
    src: [require('@/assets/audio/shopAudio/graverobber/huh.mp3')],
    loop: false,
    volume: .5,
});

const okay = new Howl({
    src: [require('@/assets/audio/shopAudio/graverobber/okay.mp3')],
    loop: false,
    volume: .5,
});

export default {
    welcome,
    alright,
    buyAnother,
    heyThere,
    huh,
    okay,
};

