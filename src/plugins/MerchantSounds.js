import {Howl, Howler} from 'howler'

const welcome = new Howl({
    src: [require('@/assets/audio/shopAudio/merchant/welcome.mp3')],
    loop: false,
    volume: 1,
});

const alright = new Howl({
    src: [require('@/assets/audio/shopAudio/merchant/alright.mp3')],
    loop: false,
    volume: 1,
});

const hey = new Howl({
    src: [require('@/assets/audio/shopAudio/merchant/hey.mp3')],
    loop: false,
    volume: 1,
});

const okay = new Howl({
    src: [require('@/assets/audio/shopAudio/merchant/okay.mp3')],
    loop: false,
    volume: 1,
});

const comeBackSoon = new Howl({
    src: [require('@/assets/audio/shopAudio/merchant/comeBackSoon.mp3')],
    loop: false,
    volume: 1,
});

export default {
    welcome,
    alright,
    hey,
    okay,
    comeBackSoon,
};

