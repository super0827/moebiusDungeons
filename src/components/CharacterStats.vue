<template>
  <b-row class="text-white mt-1">
    <b-col class="mb-5 mt-3 " cols="12">
        <ToolTip
          subtitle="Health (HP)"
          :descriptions="[`Value representing total Health.`]"
        >
          <section class="d-flex flex-column justify-content-center">
            <img class="position-absolute" src="@/assets/imgs/icons/healthIcon.png">
            <h1 class="m-0 leftPos position-relative">
              <AnimatedNumber 
                :value="health"
                :duration="1000"
                :formatValue="wholeNumber"
              />
            </h1>
          </section>
        </ToolTip>
    </b-col>

    <b-col cols="12" class="mb-5" :order="order[0]">
      <ToolTip
        subtitle="Attack (ATK)"
        :descriptions="[`Value representing maximum possible physical attack.`]"
      >
        <section class="d-flex flex-column justify-content-center" v-if="attackType === 'physical'">
          <img class="position-absolute" src="@/assets/imgs/icons/physicalIcon.png">
          <h1 class="m-0 leftPos position-relative">
            <AnimatedNumber 
              :value="attack"
              :duration="1000"
              :formatValue="wholeNumber"
            />
          </h1>
        </section>
      </ToolTip>

      <ToolTip
        subtitle="Magic Attack (MAG)"
        :descriptions="[`Value representing maximum possible magical attack.`]"
      >
        <section  class="d-flex flex-column justify-content-center" v-if="attackType === 'magical'">
          <img class="position-absolute" src="@/assets/imgs/icons/physicalIcon.png">
          <h1 class="m-0 leftPos position-relative">
            <AnimatedNumber 
              :value="attack"
              :duration="1000"
              :formatValue="wholeNumber"
            />
          </h1>
        </section>
      </ToolTip>
    </b-col>

    <b-col cols="12" class="mb-5" :order="order[1]">
      <ToolTip
        subtitle="Armor (ARM)"
        :descriptions="[`Value representing armor, this value reduces physical damage taken.`]"
      >
        <section class="d-flex flex-column justify-content-center" v-if="armorType === 'physical'">
          <img class="position-absolute" src="@/assets/imgs/icons/armorIcon.png">
          <h1 class="m-0 leftPos position-relative">
            <AnimatedNumber 
              :value="armor"
              :duration="1000"
              :formatValue="wholeNumber"
            />
          </h1>
        </section>
      </ToolTip>

      <ToolTip
        subtitle="Ward (WRD)"
        :descriptions="[`Value representing warding, this value reduces magical damage taken.`]"
      >
        <section class="d-flex flex-column justify-content-center" v-if="armorType === 'magical'">
          <img class="position-absolute" src="@/assets/imgs/icons/wardIcon.png">
          <h1 class="m-0 leftPos position-relative">
            <AnimatedNumber 
              :value="armor"
              :duration="1000"
              :formatValue="wholeNumber"
            />
          </h1>
        </section>
      </ToolTip>
    </b-col>
  </b-row> 
</template>

<script>
import AnimatedNumber from "animated-number-vue";
import ToolTip from "@/components/ui/ToolTip.vue"

export default {
    name: 'CharacterStats',
    components: {
        AnimatedNumber,
        ToolTip
    },
    props: ['health', 'attack', 'armor', 'attackType', 'armorType', 'order'],
}
</script>

<style scoped>
img {
  width:80px;
  height:80px;
}

.leftPos {
  text-align:center;
  left:21px;
  top:10px;
}

h1 {
  height:35px;
  width:35px;
  font-size:20px;
  text-align:center;
  display:block;
  text-shadow: 1px 1px 5px black;
}
</style>