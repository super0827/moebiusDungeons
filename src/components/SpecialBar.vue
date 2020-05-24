<template>
    <section class="centerRow">
        <p>METTLE</p>
        <section v-for="slots in mettle" :key="slots.id">
            <img :src="mettleImg" :class="{'used': !slots.available}"/>
            <!-- <section :class="{'available': slots.available, 'used': !slots.available}"></section>
            <section :class="{'available': slots.available, 'used': !slots.available}"></section> -->
        </section>
    </section>
</template>

<script>

import { mapGetters, mapState } from 'vuex';

    export default {
        name: 'StatBars',
        computed: {
             ...mapState('playerData/', {
                mettle: 'mettle',
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
    justify-content: space-around;
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