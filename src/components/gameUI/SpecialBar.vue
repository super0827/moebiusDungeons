<template>
    <section class="centerRow">
        <p>METTLE</p>
        <img :src="mettleImg" :class="{'used': mettle <= 0}"/>
        <img :src="mettleImg" :class="{'used': mettle <= 1}"/>
        <img :src="mettleImg" :class="{'used': mettle <= 2}"/>
    </section>
</template>

<script>

import { mapGetters, mapState } from 'vuex';

    export default {
        name: 'SpecialBars',
        computed: {
             ...mapState('playerData/', {
                mettle: state => state.info.mettle,
                mettleImg: state => state.info.mettleImg,
             }),
        },
    }
</script>

<style scoped>
.centerRow{
    width:200px;
    display:flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
}
p{
    font-size:20px;
}
img{
    width:30px;
}
.used {
    filter: grayscale(100%);
}
</style>