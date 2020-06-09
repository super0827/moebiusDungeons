import {Howl, Howler} from 'howler'

const playerDead = new Howl({
    src: [require('@/assets/audio/playerSounds/playerDead.wav')],
    loop: false,
    volume: .5,
});

const playerMelee1 = new Howl({
    src: [require('@/assets/audio/playerSounds/sword1.wav')],
    loop: false,
    volume: 1,
});

const playerMelee2 = new Howl({
    src: [require('@/assets/audio/playerSounds/sword2.wav')],
    loop: false,
    volume: 1,
});

const playerMelee3 = new Howl({
    src: [require('@/assets/audio/playerSounds/sword3.wav')],
    loop: false,
    volume: 1,
});

const playerMagic1 = new Howl({
    src: [require('@/assets/audio/playerSounds/flame.wav')],
    loop: false,
    volume: 1,
});

const playerMagic2 = new Howl({
    src: [require('@/assets/audio/playerSounds/flame2.wav')],
    loop: false,
    volume: 1,
});

const playerMagic3 = new Howl({
    src: [require('@/assets/audio/playerSounds/flame3.wav')],
    loop: false,
    volume: 1,
});

const armorUp = new Howl({
    src: [require('@/assets/audio/playerSounds/armorUp.mp3')],
    loop: false,
    volume: 1,
});

const variagate = new Howl({
    src: [require('@/assets/audio/playerSounds/variagate.mp3')],
    loop: false,
    volume: 1,
});


export default {
    playerDead,
    playerMelee1,
    playerMelee2,
    playerMelee3,
    playerMagic1,
    playerMagic2,
    playerMagic3,
    armorUp,
    variagate

};