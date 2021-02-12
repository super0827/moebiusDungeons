<template>
<div class="mt-4">
    <b-overlay
        id="overlay"
        no-center
        :show="item"
        bg-color="#eee"
        opacity="0.2"
        blur="5px"
    >
        <template #overlay>
            <b-row>
                <b-col cols="12">
                    <div>
                        <!-- <img v-if="item" src="" alt=""> -->
                        <h3 else>NO ITEM</h3>
                    </div>
                    <b-button>USE</b-button>
                    <b-button>DISCARD</b-button>
                </b-col>
            </b-row>
        </template>
        <b-row class="blankHeight d-flex flex-row justify-content-center" no-gutters>
            <b-col class="filler border m-1" cols="3"></b-col>
            <b-col class="filler border m-1" cols="3"></b-col>
            <b-col class="filler border m-1" cols="3"></b-col>
        </b-row>
        <b-row class="blankHeight d-flex flex-row justify-content-center" no-gutters>
            <b-col class="filler border m-1" cols="3"></b-col>
            <b-col class="filler border m-1" cols="3"></b-col>
            <b-col class="filler border m-1" cols="3"></b-col>

        </b-row>
        <b-row class="blankHeight d-flex flex-row justify-content-center" no-gutters>
            <b-col class="filler border m-1" cols="3"></b-col>
            <b-col class="filler border m-1" cols="3"></b-col>
            <b-col class="filler border m-1" cols="3"></b-col>
        </b-row>
    </b-overlay>
</div>
</template>

<script>
    export default {
        data() {
            return {
                item: false
            }
        },
    }
</script>

<style scoped>
.blankHeight {
    height:60px;
}

.filler {
    background:rgba(0,0,0,0.4);
}
</style>