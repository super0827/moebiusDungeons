<template>
    <section class="h-100 w-100">
        <b-row class="h-100 w-100">
            <b-col cols="12"
                class="animated"
                :class="{'zoomIn' :isEntering, 'zoomOut' : !isEntering}"
            >
            </b-col>
            <b-col cols="12"
                class="h-100 w-100 animated"
                :class="{'zoomInUp' :isEntering, 'zoomOutDown' : !isEntering}"
            >
                <img class="map position-relative d-block" src="@/assets/imgs/locations/world-map.png" alt="a map of Amara, depicting various landmarks">

                <img class="position-absolute" @mouseenter="UiSounds.chit.play()" @click="pickLocation('tower') ? towerAccess : null" :class="{'currentLocation': location === 'tower', 'accessible': towerAccess, 'inaccessible': !towerAccess }" id="tower" src="@/assets/imgs/locations/tower.png" alt="">
                <img class="position-absolute" @mouseenter="UiSounds.chit.play()" @click="pickLocation('ruins') ? ruinsAccess : null" :class="{'currentLocation': location === 'ruins', 'accessible': ruinsAccess, 'inaccessible': !ruinsAccess }" id="ruins" src="@/assets/imgs/locations/ruins.png" alt="">
                <img class="position-absolute" @mouseenter="UiSounds.chit.play()" @click="pickLocation('hills') ? hillsAccess : null" :class="{'currentLocation': location === 'hills', 'accessible': hillsAccess, 'inaccessible': !hillsAccess }" id="hills" src="@/assets/imgs/locations/hills.png" alt="">
                <img class="position-absolute" @mouseenter="UiSounds.chit.play()" @click="pickLocation('forest') ? forestAccess : null" :class="{'currentLocation': location === 'forest', 'accessible': forestAccess, 'inaccessible': !forestAccess }" id="forest" src="@/assets/imgs/locations/forest.png" alt="">
                <img class="position-absolute" @mouseenter="UiSounds.chit.play()" @click="pickLocation('roads') ? roadsAccess : null" :class="{'currentLocation': location === 'roads', 'accessible': roadsAccess, 'inaccessible': !roadsAccess }" id="roads" src="@/assets/imgs/locations/roads.png" alt="">
                <img class="position-absolute" @mouseenter="UiSounds.chit.play()" @click="pickLocation('caves') ? cavesAccess : null" :class="{'currentLocation': location === 'caves', 'accessible': cavesAccess, 'inaccessible': !cavesAccess }" id="caves" src="@/assets/imgs/locations/caves.png" alt="">
                <img class="position-absolute" @mouseenter="UiSounds.chit.play()" @click="pickLocation('eyien') ? eyienAccess : null" :class="{'currentLocation': location === 'eyien', 'accessible': eyienAccess, 'inaccessible': !eyienAccess }" id="eyien" src="@/assets/imgs/locations/eyien.png" alt="">
            </b-col>
        </b-row>
    </section>
</template>

<script>
import { mapState } from 'vuex'
import UiSounds from '@/plugins/UiSounds.js'
import gameAnimations from '@/components/mixins/gameAnimations';
import gameMusic from '@/components/mixins/gameMusic';

    export default {
        data() {
            return {
                UiSounds: UiSounds,
                music:['worldMap']
            }
        },
        mixins: [gameAnimations, gameMusic],
        methods: {
            pickLocation(location) {
                if(location !== 'eyien'){
                    this.$store.dispatch('gameData/changeLocation', {property: 'phase', phase: 'DungeonPhase', location: location});
                }
                else {
                    this.$store.dispatch('gameData/changeLocation', {property: 'phase', phase: 'ShopSelect', location: location});
                }
            }
        },
          computed: {
            ...mapState('gameData', {
                location: state => state.location
            }),
            towerAccess: function() {
                if (this.location === 'hills') {
                    return true;
                }
                return false;
            },
            ruinsAccess: function() {
                if (this.location === 'forest') {
                    return true;
                }
                return false;
            },
            hillsAccess: function() {
                switch (this.location) {
                    case 'forest':
                    case 'roads':
                        return true;
                        break;
                    default:
                        return false
                }
            },
            forestAccess: function() {
                switch (this.location) {
                    case 'hills':
                    case 'roads':
                    case 'ruins':
                        return true;
                        break;
                    default:
                        return false
                }
            },
            roadsAccess: function() {
                switch (this.location) {
                    case 'hills':
                    case 'forest':
                    case 'caves':
                    case 'eyien':
                        return true;
                        break;
                    default:
                        return false
                }
            },
            cavesAccess: function() {
                switch (this.location) {
                    case 'hills':
                    case 'roads':
                        return true;
                        break;
                    default:
                        return false
                }
            },
            eyienAccess: function() {
                if (this.location === 'roads') {
                    return true;
                }
                return false;
            },

        }
    }
</script>

<style scoped>
    .map {
        height:100%;
        width:100%;
    }

    #tower {
        height:120px;
        top:70px;
        left:100px;
    }

    #ruins {
        height:100px;
        top:50px;
        right:95px;
    }

    #hills {
        height:100px;
        top:145px;
        left:350px;
    }
    
    #forest {
        height:100px;
        top:160px;
        right:365px;
    }
   
    #roads {
        height:100px;
        bottom:200px;
        right:520px;
    }
   
    #caves {
        height:100px;
        bottom:100px;
        left:190px;
    }
   
    #eyien {
        height:100px;
        bottom:20px;
        right:230px;
    }

    .accessible {

    }

    .accessible:hover {
        cursor:pointer;
        transform:scale(1.2);
    }

    .inaccessible {
        filter:blur(2px);
        opacity:0.5;
        cursor:not-allowed;
    }

    .currentLocation {
        border-radius:5px;
        box-shadow:
            1px 0px 50px 10px gold,
            -1px 0px 50px 10px gold,
            0px 1px 50px 10px gold,
            0px -1px 50px 10px gold
        ;
        background:gold;
        filter:blur(0);
        opacity:1;
    }
</style>