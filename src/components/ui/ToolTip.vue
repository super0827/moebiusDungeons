<template>
    <div class="tooltip-container">
        <span @mouseenter="hover = true" @mouseleave="hover = false">
            <slot></slot>
        </span>
        
        <transition appear
            type="animation"
            enter-active-class="animated zoomIn"
            leave-active-class="animated zoomOut"
          >
        <div v-if="hover && toolTipsEnabled" class="tooltip noPointer"
        :style="toolShift">
            <span class="text" 
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
        
        props: ['title', 'subtitle', 'descriptions', 'top', 'bottom', 'left', 'right', 'shift'],
        data() {
            return {
                hover: true
            }
        },
        computed: {
            ...mapState('authData', {
                toolTipsEnabled: state => state.settings.tooltips,
            }),
            toolShift () {
                let move = '';
                if(this.shift){
                    if(this.shift.top) {
                        move += `top: ${this.shift.top}px; `
                    }
                    if(this.shift.right) {
                        move += `right: ${this.shift.right}px; `
                    }
                    if(this.shift.bottom) {
                        move += `bottom: ${this.shift.bottom}px; `
                    }
                    if(this.shift.left) {
                        move += `left: ${this.shift.left}px; `
                    }
                return move;
                }
                return move;
            }
        }
    }
</script>

<style scoped>
    .tooltip-container {
        display:grid;
        grid-template-columns: 100%;
        grid-template-rows: 100%;
        position:relative;
        /* display:inline-block; */
    }

    .tooltip-container:hover .tooltip {
        /* display:inline-block; */
        grid-column: 1/2;
        grid-row: 1/2;
        opacity:1;
    }

    .tooltip {
        color: #ffffff;
        text-align: center;
        border-radius: 5px;
        opacity: 0;
        transition: opacity 2s;
        transition-delay: 1s;
        position: fixed;
        z-index: 9999;
        background: rgba(119, 119, 119, 1);
        width:90%;
        top:55px;
        right:10px;
        max-width:200px;
    }

    .tooltip:hover {
        /* display:inline-block; */
        opacity:1;
    }

    .text {
        padding:1rem;
    }

    h2, h3 {
        text-transform: uppercase;
    }

    .noPointer {
        pointer-events: none;
    }
</style>