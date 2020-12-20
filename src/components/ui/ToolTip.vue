<template>
    <div class="tooltip-container">
        <span @mouseenter="hover = true" @mouseleave="hover = false">
            <slot></slot>
        </span>
        
        <transition appear
            type="animation"
            enter-active-class="animated fadeIn"
            leave-active-class="animated fadeOut"
          >
        <div v-if="hover && toolTipsEnabled" class="tooltip"
        :class="{
            'top':top,
            'bottom': bottom,
            'left': left,
            'right': right
        }">
            <span class="text" 
            :class="{
                'arrowTop': top,
                'arrowBottom': bottom,
                'arrowRight': left,
                'arrowLeft': right
            }"
            >
                <h2 v-if="title">{{title}}</h2>
                <h3 v-if="subtitle">{{subtitle}}</h3>
                <span v-if="descriptions">
                    <p v-for="sentence in descriptions" :key="sentence.slice(0,2)+'desc'">{{sentence}}</p>
                </span>
            </span>
        </div>
        </transition>
    </div>
</template>

<script>
import { mapState } from 'vuex'

    export default {
        
        props: ['title', 'subtitle', 'descriptions', 'top', 'bottom', 'left', 'right'],
        data() {
            return {
                hover: false
            }
        },
        computed: {
            ...mapState('authData', {
                toolTipsEnabled: state => state.settings.tooltips,
            }),
        }
    }
</script>

<style scoped>
    .tooltip-container {
        position:relative;
        display:inline-block;
        z-index:9999;
    }

    .tooltip-container:hover .tooltip {
        display:inline-block;
        opacity:1;
    }

    .tooltip {
        color: #ffffff;
        text-align: center;
        padding: 10px 10px;
        border-radius: 5px;
        opacity: 0;
        transition: opacity .5s;
        transition-delay: .5s;
        position: absolute;
        z-index: 999;
        background: rgba(119, 119, 119, .9);
        width:auto;
    }

    .top {
        bottom: 110%;
        left: 50%;
        margin-left: -90px;
    }

    .bottom {
        top: 110%;
        left: 50%;
        margin-left: -90px;
    }

    .left {
        left: -50%;
        top: -5%;
        margin-left: -90px;
        width:200px;
    }

    .right {
        left: 105%;
        top: 50%;
        margin-left: -90px;
    }

    .text::after {
        content: " ";
        position: absolute;
        
        border-width: 5px;
        border-style: solid;
        
    }

    h2, h3 {
        text-transform: uppercase;
    }

    .arrowTop::after {
        top: 100%;
        left: 50%;
        margin-left: -5px;
        border-color: #777 transparent transparent transparent;
    }

    .arrowBottom::after {
        bottom: 100%;
        left: 50%;
        margin-left: -5px;
        border-color: transparent transparent #777 transparent;
    }

    .arrowLeft::after {
        bottom: 100%;
        left: 50%;
        margin-left: -5px;
        border-color: transparent transparent #777 transparent;
    }

    .arrowRight::after {
        top: 50%;
        left: 100%;
        margin-right: -5px;
        border-color: transparent transparent transparent #777;
    }
</style>