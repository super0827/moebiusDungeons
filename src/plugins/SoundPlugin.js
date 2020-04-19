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
    "cantBuy": {
        url: require("@/assets/audio/cantBuy.wav"),
        defaults: {
            
        },
    }
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
            $(sound.audio).animate({volume: 0}, {
                duration: options.fade,
                complete () {
                    sound.audio.pause();
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