<template>
    <b-row class="centerRow">
        <b-col cols="12" class="d-flex justify-content-center align-items-center">
            <h3 class='m-0 mr-2'>METTLE</h3>
            <img :src="mettleImg" :class="{'used': mettle <= 0}"/>
            <img :src="mettleImg" :class="{'used': mettle <= 1}"/>
            <img :src="mettleImg" :class="{'used': mettle <= 2}"/>
        </b-col>
    </b-row>
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
img{
    width:50px;
}
.used {
    filter: grayscale(100%);
}
</style>