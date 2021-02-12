<template>
    <section class="text-center readout position-absolute m-0 pale"
        :class="{'rightPos': who === 'Player', 'leftPos': who === 'Monster'}"
    >
        <p class="text-uppercase"><strong>{{who}}</strong></p>
        <b-row align-h="center" class="readout" no-gutters>
            <transition-group name="list-complete">
                <b-col 
                    cols="12"
                    class="border-top m-0 pt-3 pb-3 list-complete-item" 
                    v-for="items in thisLog"
                    :key="items.id"
                >
                    <p class="m-0">{{ items.message }}</p>
                </b-col>
            </transition-group>
        </b-row>
    </section>
</template>

<script>

export default {
    name: 'TurnLog',
    props: ['thisLog', 'who'],
}
</script>

<style scoped>
    .pale {
        color:#ccc;
    }
    .readout {
        width:75px;
    }

    .rightPos{
        right:20px;
    }
    
    .leftPos{
        left:20px;
    }
</style>