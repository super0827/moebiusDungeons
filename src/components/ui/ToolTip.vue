<template>
    <div class="tooltip-container">
        <div @mouseenter="hover = true" @mouseleave="hover = false">
            <slot></slot>
        </div>
        
        <transition appear
            type="animation"
            enter-active-class="animated fadeIn"
            leave-active-class="animated fadeOut"
          >
        <div v-if="hover && toolTipsEnabled" class="tooltip">
            <span class="text">
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
        
        props: ['title', 'subtitle', 'descriptions'],
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
        
        bottom: 105%;
        left: 50%;
        margin-left: -90px;

        opacity: 0;
        transition: opacity .5s;
        transition-delay: .5s;

        position: absolute;
        z-index: 999;

        background: #777;
    }

    .text::after {
        content: " ";
        position: absolute;
        top: 100%;
        left: 50%;
        margin-left: -5px;
        border-width: 5px;
        border-style: solid;
        border-color: #777 transparent transparent transparent;
    }
</style>