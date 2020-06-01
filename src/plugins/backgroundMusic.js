import {Howl, Howler} from 'howler'

const charSelectMusic = new Howl({
    src: [require('@/assets/audio/miscBackground/charSelectMusic.ogg')],
    loop: true,
    volume: .4,
});

const dungeonMusic1 = new Howl({
    src: [require('@/assets/audio/dungeonMusic/battlePlanPP.mp3')],
    loop: true,
    volume: .3,
});

const dungeonMusic2 = new Howl({
    src: [require('@/assets/audio/dungeonMusic/deadlockPP.mp3')],
    loop: true,
    volume: .3,
});

const dungeonMusic3 = new Howl({
    src: [require('@/assets/audio/dungeonMusic/expectancyPP.mp3')],
    loop: true,
    volume: .3,
});

const dungeonMusic4 = new Howl({
    src: [require('@/assets/audio/dungeonMusic/IntoBattlePP.mp3')],
    loop: true,
    volume: .3,
});

const dungeonMusic5 = new Howl({
    src: [require('@/assets/audio/dungeonMusic/TheChasePP.mp3')],
    loop: true,
    volume: .3,
});

const shopMusic1 = new Howl({
    src: [require('@/assets/audio/dungeonMusic/eventidePP.mp3')],
    loop: true,
    volume: .3,
});

const shopMusic2 = new Howl({
    src: [require('@/assets/audio/dungeonMusic/sceneicEssencePP.mp3')],
    loop: true,
    volume: .3,
});

const shopMusic3 = new Howl({
    src: [require('@/assets/audio/dungeonMusic/spiritualMomentPP.mp3')],
    loop: true,
    volume: .3,
});

const loseScreen = new Howl({
    src: [require('@/assets/audio/miscBackground/gameOver.mp3')],
    loop: true,
    volume: .3,
});



export default {
    charSelectMusic,
    dungeonMusic1,
    dungeonMusic2,
    dungeonMusic3,
    dungeonMusic4,
    dungeonMusic5,
    shopMusic1,
    shopMusic2,
    shopMusic3,
    loseScreen
};
