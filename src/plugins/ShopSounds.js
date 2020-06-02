import {Howl, Howler} from 'howler'

const cantBuy = new Howl({
    src: [require('@/assets/audio/shopAudio/cantBuy.wav')],
    loop: false,
    volume: .5,
});

const oneCoin1 = new Howl({
    src: [require('@/assets/audio/shopAudio/coins/oneCoin1.mp3')],
    loop: false,
    volume: 1,
});

const oneCoin2 = new Howl({
    src: [require('@/assets/audio/shopAudio/coins/oneCoin2.mp3')],
    loop: false,
    volume: 1,
});

const twoCoin1 = new Howl({
    src: [require('@/assets/audio/shopAudio/coins/twoCoin1.mp3')],
    loop: false,
    volume: 1,
});

const twoCoin2 = new Howl({
    src: [require('@/assets/audio/shopAudio/coins/twoCoin2.mp3')],
    loop: false,
    volume: 1,
});

const threeCoin1 = new Howl({
    src: [require('@/assets/audio/shopAudio/coins/threeCoin1.mp3')],
    loop: false,
    volume: 1,
});

const threeCoin2 = new Howl({
    src: [require('@/assets/audio/shopAudio/coins/threeCoin2.mp3')],
    loop: false,
    volume: 1,
});

const fourCoin = new Howl({
    src: [require('@/assets/audio/shopAudio/coins/fourCoin.mp3')],
    loop: false,
    volume: 1,
});

const fiveCoin = new Howl({
    src: [require('@/assets/audio/shopAudio/coins/fiveCoin.mp3')],
    loop: false,
    volume: 1,
});

export default {
    cantBuy,
    oneCoin1,
    oneCoin2,
    twoCoin1,
    twoCoin2,
    threeCoin1,
    threeCoin2,
    fourCoin,
    fiveCoin
};