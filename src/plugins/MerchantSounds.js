import {Howl, Howler} from 'howler'

const welcome = new Howl({
    src: [require('@/assets/audio/shopAudio/merchant/welcome.mp3')],
    loop: false,
    volume: 1,
});


const comeAgain = new Howl({
    src: [require('@/assets/audio/shopAudio/merchant/comeAgain.mp3')],
    loop: false,
    volume: 1,
});

const alright = new Howl({
    src: [require('@/assets/audio/shopAudio/merchant/alright.mp3')],
    loop: false,
    volume: 1,
});

const welcomeBack = new Howl({
    src: [require('@/assets/audio/shopAudio/merchant/welcomeBack.mp3')],
    loop: false,
    volume: 1,
});

const welcomeBack2 = new Howl({
    src: [require('@/assets/audio/shopAudio/merchant/welcomeBack2.mp3')],
    loop: false,
    volume: 1,
});

const welcomeBack3 = new Howl({
    src: [require('@/assets/audio/shopAudio/merchant/welcomeBack3.mp3')],
    loop: false,
    volume: 1,
});

const thanks = new Howl({
    src: [require('@/assets/audio/shopAudio/merchant/thanks.mp3')],
    loop: false,
    volume: 1,
});

const hey = new Howl({
    src: [require('@/assets/audio/shopAudio/merchant/hey.mp3')],
    loop: false,
    volume: 1,
});

const hello = new Howl({
    src: [require('@/assets/audio/shopAudio/merchant/hello.mp3')],
    loop: false,
    volume: 1,
});

const okay = new Howl({
    src: [require('@/assets/audio/shopAudio/merchant/okay.mp3')],
    loop: false,
    volume: 1,
});

const goodPurchase = new Howl({
    src: [require('@/assets/audio/shopAudio/merchant/goodPurchase.mp3')],
    loop: false,
    volume: 1,
});

const fairTrade = new Howl({
    src: [require('@/assets/audio/shopAudio/merchant/fairTrade.mp3')],
    loop: false,
    volume: 1,
});

const comeBackSoon = new Howl({
    src: [require('@/assets/audio/shopAudio/merchant/comeBackSoon.mp3')],
    loop: false,
    volume: 1,
});

const nextTime = new Howl({
    src: [require('@/assets/audio/shopAudio/merchant/nextTime.mp3')],
    loop: false,
    volume: 1,
});

const anytime = new Howl({
    src: [require('@/assets/audio/shopAudio/merchant/anytime.mp3')],
    loop: false,
    volume: 1,
});



export default {
    alright,
    anytime,
    comeAgain,
    comeBackSoon,
    fairTrade,
    goodPurchase,
    hello,
    hey,
    nextTime,
    okay,
    thanks,
    welcome,
    welcomeBack,
    welcomeBack2,
    welcomeBack3,
};

