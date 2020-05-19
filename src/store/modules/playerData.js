const state = () => ({
    info:  {
      name:"swordsman",
      type:'player', 
      portrait:require("@/assets/imgs/playableCharacters/swordsman.png"), 
      description1:"Slicing and Dicing",
      description2:"Bruiser class, high damage, good armor, high health.", 
      coins:0, health:12, armor:2, attackMax:8, attackType: "physical",
      attackTypeImage: require("@/assets/imgs/icons/physicalIcon.png"), 
    },
    permenantTraits: [],
    tempTraits: [],
    thisDamage: {type: Number},
    thisAdjDamage: {type: Number},
    log: [],
    animations: {
      blocking: false,
      hurt: false,
      attacking:false,
      portEffect: false,
      portEffectRed: false,
      portEffectPurple: false,
      portEffectGreen: false,
      isDead: false,
    },
})

const mutations = {
    mutate(state, payload) {
      state[payload.property] = payload.with;
    },
    addHealth(state) {
      state.info.health += 10;
    },
    loseHealth(state) {
      state.info.health -= 10;
    },
    addArmor(state) {
      state.info.armor += 1;
    },
    loseArmor(state) {
      state.info.armor -= 1;
    }
}

export default {
    namespaced: true,
    state,
    mutations,
}
        