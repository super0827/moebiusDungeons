//
const PLAY_DEFAULTS = {
    loop: false,
    reset: true,
    volume: 1,
    startAt: 0,
    fade: 0,
    delay: 0,
};

const PAUSE_DEFAULTS = {
    fade: 0,
    delay: 0,
}

const DEFAULT_SOUNDS = {
    //UI SFX
    //UI SFX
    //UI SFX
    "chit": {
        url: require("@/assets/audio/buttonHover.wav"),
        defaults: {

        },
	},
    "startblip": {
        url: require("@/assets/audio/startBlip.ogg"),
        defaults: {

        },
	},
    "charPick": {
        url: require("@/assets/audio/gamestart.ogg"),
        defaults: {
            volume:.5,
        },
    },
    'escape': {
        url: require("@/assets/audio/runAway.wav"),
        defaults: {
            volume:1,
        },
    },
    "monsterDead1": {
        url: require("@/assets/audio/victory1.wav"),
        defaults: {
            volume:.5,
        },
    },
    "monsterDead2": {
        url: require("@/assets/audio/victory2.wav"),
        defaults: {
            volume:.5,
        },
    },
    "monsterDead3": {
        url: require("@/assets/audio/victory3.wav"),
        defaults: {
            volume:.5,
        },
    },
    "monsterDead4": {
        url: require("@/assets/audio/victory4.wav"),
        defaults: {
            volume:.5,
        },
    },
    "playerDead": {
        url: require("@/assets/audio/loseSound.wav"),
        defaults: {
            volume:.5,
        },
    },
    






    //SHOP UI SFX
    //SHOP UI SFX
    //SHOP UI SFX
    "cantBuy": {
        url: require("@/assets/audio/cantBuy.wav"),
        defaults: {
            volume:.4,
        },
    },
    "oneCoin1": {
        url: require("@/assets/audio/shopAudio/coins/oneCoin1.mp3"),
        defaults: {
            volume:1,
        },
    },
    "oneCoin2": {
        url: require("@/assets/audio/shopAudio/coins/oneCoin2.mp3"),
        defaults: {
            volume:1,
        },
    },
    "twoCoin1": {
        url: require("@/assets/audio/shopAudio/coins/twoCoin1.mp3"),
        defaults: {
            volume:1,
        },
    },
    "twoCoin2": {
        url: require("@/assets/audio/shopAudio/coins/twoCoin2.mp3"),
        defaults: {
            volume:1,
        },
    },
    "threeCoin1": {
        url: require("@/assets/audio/shopAudio/coins/threeCoin1.mp3"),
        defaults: {
            volume:1,
        },
    },
    "threeCoin2": {
        url: require("@/assets/audio/shopAudio/coins/threeCoin2.mp3"),
        defaults: {
            volume:1,
        },
    },
    "fourCoin": {
        url: require("@/assets/audio/shopAudio/coins/fourCoin.mp3"),
        defaults: {
            volume:1,
        },
    },
    "fiveCoin": {
        url: require("@/assets/audio/shopAudio/coins/fiveCoin.mp3"),
        defaults: {
            volume:1,
        },
    },
    
    //GraveRobber 
    "grWelcome": {
        url: require("@/assets/audio/shopAudio/graverobber/graverobberWelcome.mp3"),
        defaults: {
            volume:1,
        },
    },
    "grAlright": {
        url: require("@/assets/audio/shopAudio/graverobber/graverobberAlright.mp3"),
        defaults: {
            volume:1,
        },
    },
    "grBuyAnother": {
        url: require("@/assets/audio/shopAudio/graverobber/graverobberBuyAnother.mp3"),
        defaults: {
            volume:1,
        },
    },
    "grHeyThere": {
        url: require("@/assets/audio/shopAudio/graverobber/graverobberHeyThere.mp3"),
        defaults: {
            volume:1,
        },
    },
    "grHuh": {
        url: require("@/assets/audio/shopAudio/graverobber/graverobberHUH.mp3"),
        defaults: {
            volume:1,
        },
    },
    "grOkay": {
        url: require("@/assets/audio/shopAudio/graverobber/graverobberOkay.mp3"),
        defaults: {
            volume:1,
        },
    },
    
    //Merchant 
    "meWelcome": {
        url: require("@/assets/audio/shopAudio/merchant/merchantWelcome.mp3"),
        defaults: {
            volume:1,
        },
    },
    "meAlright": {
        url: require("@/assets/audio/shopAudio/merchant/merchantAlright.mp3"),
        defaults: {
            volume:1,
        },
    },
    "meHey": {
        url: require("@/assets/audio/shopAudio/merchant/merchantHey.mp3"),
        defaults: {
            volume:1,
        },
    },
    "meOkay": {
        url: require("@/assets/audio/shopAudio/merchant/merchantOkay.mp3"),
        defaults: {
            volume:1,
        },
    },
    "meGoodbye": {
        url: require("@/assets/audio/shopAudio/merchant/merchantComeBackSoon.mp3"),
        defaults: {
            volume:1,
        },
    },
    
    
    
    



    //BACKGROUND MUSIC
    //BACKGROUND MUSIC
    //BACKGROUND MUSIC
    "charSelectMusic": {
        url: require("@/assets/audio/427442__kiluaboy__clouds.ogg"),
        defaults: {
            loop: true,
            volume: .4,
        },
    },

    //Dungeon Phase
    "dungeonMusic1": {
        url: require("@/assets/audio/dungeonMusic/battlePlanPP.mp3"),
        defaults: {
            volume:.3,
            loop: true,
        },
    },
    "dungeonMusic2": {
        url: require("@/assets/audio/dungeonMusic/deadlockPP.mp3"),
        defaults: {
            volume:.3,
            loop: true,
        },
    },
    "dungeonMusic3": {
        url: require("@/assets/audio/dungeonMusic/expectancyPP.mp3"),
        defaults: {
            volume:.3,
            loop: true,
        },
    },
    "dungeonMusic4": {
        url: require("@/assets/audio/dungeonMusic/IntoBattlePP.mp3"),
        defaults: {
            volume:.3,
            loop: true,
        },
    },
    "dungeonMusic5": {
        url: require("@/assets/audio/dungeonMusic/TheChasePP.mp3"),
        defaults: {
            volume:.3,
            loop: true,
        },
    },
    //Shop Phase
    "shopMusic1": {
        url: require("@/assets/audio/shopAudio/background/eventidePP.mp3"),
        defaults: {
            volume:.3,
            loop: true,
        },
    },
    "shopMusic2": {
        url: require("@/assets/audio/shopAudio/background/scenicEssencePP.mp3"),
        defaults: {
            volume:.3,
            loop: true,
        },
    },
    "shopMusic3": {
        url: require("@/assets/audio/shopAudio/background/spiritualMomentPP.mp3"),
        defaults: {
            volume:.3,
            loop: true,
        },
    },
    
    //Lose Screen
    "loseScreen": {
        url: require("@/assets/audio/gameOver.mp3"),
        defaults: {
            volume:.3,
            loop: true,
        },
    },
    
    

    // monster entering sounds
    // monster entering sounds
    // monster entering sounds
    "batsEnter": {
        url: require("@/assets/audio/monsterEnter/bats.wav"),
        defaults: {
            volume:1,
        },
	},
    "impsEnter": {
        url: require("@/assets/audio/monsterEnter/imp.wav"),
        defaults: {
            volume:.4,
        },
	},
    "slimeEnter": {
        url: require("@/assets/audio/monsterEnter/slime.wav"),
        defaults: {
            volume:1,
        },
	},
    "koboldEnter": {
        url: require("@/assets/audio/monsterEnter/kobold.wav"),
        defaults: {
            volume:1,
        },
    },
    "gnollEnter": {
        url: require("@/assets/audio/monsterEnter/gnoll.mp3"),
        defaults: {
            volume:1,
        },
    },
    "goblinEnter": {
        url: require("@/assets/audio/monsterEnter/goblin.mp3"),
        defaults: {
            volume:1,
        },
    },
    "ghostEnter": {
        url: require("@/assets/audio/monsterEnter/ghost.mp3"),
        defaults: {
            volume:1,
        },
    },
    "lizardmanEnter": {
        url: require("@/assets/audio/monsterEnter/lizardman.mp3"),
        defaults: {
            volume:1,
        },
    },
    "curseEnter": {
        url: require("@/assets/audio/monsterEnter/curse.mp3"),
        defaults: {
            volume:1,
        },
    },
    "banditsEnter": {
        url: require("@/assets/audio/monsterEnter/bandits.mp3"),
        defaults: {
            volume:1,
        },
    },
    "mimicEnter": {
        url: require("@/assets/audio/monsterEnter/mimic.mp3"),
        defaults: {
            volume:1,
        },
    },
    "ghoulEnter": {
        url: require("@/assets/audio/monsterEnter/ghoul.mp3"),
        defaults: {
            volume:1,
        },
    },
    "skeletonEnter": {
        url: require("@/assets/audio/monsterEnter/skeleton.wav"),
        defaults: {
            volume:1,
        },
    },
    "swamplingEnter": {
        url: require("@/assets/audio/monsterEnter/swampling.mp3"),
        defaults: {
            volume:1,
        },
    },
    "harpyEnter": {
        url: require("@/assets/audio/monsterEnter/harpy.mp3"),
        defaults: {
            volume:1,
        },
    },
    "mushroomEnter": {
        url: require("@/assets/audio/monsterEnter/mushroom.mp3"),
        defaults: {
            volume:1,
        },
    },
    "dryadEnter": {
        url: require("@/assets/audio/monsterEnter/dryad.mp3"),
        defaults: {
            volume:1,
        },
    },
    "golemEnter": {
        url: require("@/assets/audio/monsterEnter/golem.mp3"),
        defaults: {
            volume:1,
        },
    },
    "demonEnter": {
        url: require("@/assets/audio/monsterEnter/demon.mp3"),
        defaults: {
            volume:1,
        },
    },
    "bansheeEnter": {
        url: require("@/assets/audio/monsterEnter/banshee.mp3"),
        defaults: {
            volume:1,
        },
    },
    "lichEnter": {
        url: require("@/assets/audio/monsterEnter/lich.mp3"),
        defaults: {
            volume:1,
        },
    },
    "dragonEnter": {
        url: require("@/assets/audio/monsterEnter/dragon.mp3"),
        defaults: {
            volume:1,
        },
    },


    //physical player sounds
    //physical player sounds
    //physical player sounds
    "playerMelee1": {
        url: require("@/assets/audio/playerSounds/sword1.wav"),
        defaults: {
            volume:1,
        },
    },
    "playerMelee2": {
        url: require("@/assets/audio/playerSounds/sword2.wav"),
        defaults: {
            volume:1,
        },
    },
    "playerMelee3": {
        url: require("@/assets/audio/playerSounds/sword3.wav"),
        defaults: {
            volume:1,
        },
    },
    
    
    //magical player sounds
    //magical player sounds
    //magical player sounds
    "playerMagic1": {
        url: require("@/assets/audio/playerSounds/flame.wav"),
        defaults: {
            volume:1,
        },
    },
    "playerMagic2": {
        url: require("@/assets/audio/playerSounds/flame2.wav"),
        defaults: {
            volume:1,
        },
    },
    "playerMagic3": {
        url: require("@/assets/audio/playerSounds/flame3.wav"),
        defaults: {
            volume:1,
        },
    },
    


    // physical monster attacks
    // physical monster attacks
    // physical monster attacks
    "monsterMelee1": {
        url: require("@/assets/audio/monsterSounds/monsterAttack1.wav"),
        defaults: {
            volume:1,
        },
    },
    "monsterMelee2": {
        url: require("@/assets/audio/monsterSounds/monsterAttack2.mp3"),
        defaults: {
            volume:1,
        },
    },
    "monsterMelee3": {
        url: require("@/assets/audio/monsterSounds/monsterAttack3.mp3"),
        defaults: {
            volume:1,
        },
    },


    // magical monster attacks
    // magical monster attacks
    // magical monster attacks
    "monsterMagic1": {
        url: require("@/assets/audio/monsterSounds/monsterMagic1.wav"),
        defaults: {
            volume:1,
        },
    },
    "monsterMagic2": {
        url: require("@/assets/audio/monsterSounds/monsterMagic2.wav"),
        defaults: {
            volume:1,
        },
    },
    "monsterMagic3": {
        url: require("@/assets/audio/monsterSounds/monsterMagic3.wav"),
        defaults: {
            volume:1,
        },
    },
    
};

const __sounds = {};
const __events = {
    load: [],
};

const Sound = {
    loaded: false,

    //load multiple sounds (see main.js)
    load (sounds) {
        return new Promise (async (resolve) => {
            this.loaded = false;
            const promises = [];
    
            for (let name in sounds) {
                const options = sounds[name];
                let audio;
                promises.push(new Promise((res) => {
                    audio = new Audio(options.url);
                    audio.onload = res();
                }));
                __sounds[name] = {
                    audio: audio,
                    defaults: options.defaults,
                };
            }

            //wait until all audio.onloads have been resolved
            try {
                await Promise.all(promises);
            } catch (e) {
                throw e;
            }
    
            __events.load.forEach(cb => {cb()})
            this.loaded = true

            resolve();
        }) 
    },

    async play (soundName, options) {
        const sound = __sounds[soundName];

        if (!sound) {
            console.error(`Sound "${soundName}" not registered.`);
            return;
        }

        //fill in missing options with global defaults, then sound-specific defaults, then override options
        options = {...PLAY_DEFAULTS, ...sound.defaults, ...options};

        if (options.delay) {
            await new Promise(resolve => { setTimeout(resolve, options.delay) });
        }

        if (options.reset) {
            sound.audio.currentTime = options.startAt;
        }
        sound.audio.loop = options.loop;
        if (options.fade) {
            sound.audio.volume = 0;
            $(sound.audio).animate({volume: options.volume}, options.fade);
        } else {
            sound.audio.volume = options.volume;
        }
        sound.audio
            .play()
            .catch(err => {
                if (err.name === 'AbortError') return; //not really a problem
                console.error(`${err.name} for sound "${soundName}" with url "${sound.audio.src}": ${err.message}`)
            });
    },

    async pause (soundName, options) {
        options = {...PAUSE_DEFAULTS, ...options};
        const sound = __sounds[soundName];

        if (!sound) {
            console.error(`Sound "${soundName}" not registered.`);
            return;
        }

        if (options.delay) {
            await new Promise(resolve => { setTimeout(resolve, options.delay) });
        }

        if (options.fade) {
            $(sound.audio).animate({volume: options.volume}, {
                duration: options.fade,
                complete () {
                    if(options.volume == 0) sound.audio.pause();
                },
            })
        } else {
            sound.audio.pause();
        }
    },

    pauseAll () {
        for (let name in __sounds) {
            const sound = __sounds[name];
            sound.audio.pause();
        }
    },

    on (eventname, callback) {
        __events[eventname].push(callback);
        if (this.loaded) {
            callback();
        }
    },
}

export default {
    install (Vue, preloadSources = {}) {
        if (preloadSources) Sound.load({...DEFAULT_SOUNDS, ...preloadSources});
        Vue.prototype.$sound = Sound;
    },
};

