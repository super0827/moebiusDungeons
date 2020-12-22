<template>
    <div class="tooltip-container">
        <span @mouseenter="hover = true" @mouseleave="hover = false">
            <slot></slot>
        </span>
        
        <transition appear
            type="animation"
            enter-active-class="animated zoomIn faster"
            leave-active-class="animated zoomOut faster"
          >
        <div v-if="hover && toolTipsEnabled" class="tooltip noPointer"
        :class="{
            'top':top,
            'bottom': bottom,
            'left': left,
            'right': right
        }"
        :style="toolShift">
            <span class="text" 
            :class="{
                'arrowTop': bottom,
                'arrowBottom': top,
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
        
        props: ['title', 'subtitle', 'descriptions', 'top', 'bottom', 'left', 'right', 'shift'],
        data() {
            return {
                hover: false
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
        z-index:9999;
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
        transition: opacity .5s;
        transition-delay: .5s;
        position: absolute;
        z-index: 9999;
        background: rgba(119, 119, 119, 1);
        box-shadow:#333 2px 2px 3px 1px;
        width:90%;
        min-width:150px;
    }

    .tooltip:hover {
        /* display:inline-block; */
        opacity:1;
    }

    .top {
        bottom: 50%;
        left: 5%;
    }

    .bottom {
        top: 90%;
        left: 5%;
    }

    .left {
        left: -90%;
        top: -5%;
    }

    .right {
        left: 90%;
        top: -5%;
    }

    .text {
        display:inline-block;
        margin:10px;
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
        bottom: 100%;
        left: calc(50% - 10px);
        border-top: transparent 10px solid;
        border-bottom: #777 10px solid;
        border-left:transparent 10px solid;
        border-right:transparent 10px solid;
    }

    .arrowBottom::after {
        top:100%;
        left: calc(50% - 10px);
        border-top: #777 10px solid;
        border-bottom:transparent 10px solid;
        border-left:transparent 10px solid;
        border-right:transparent 10px solid;
    }

    .arrowLeft::after {
        bottom: calc(50% - 10px);
        right:100%;
        border-top: transparent 10px solid;
        border-bottom:transparent 10px solid;
        border-left:transparent 10px solid;
        border-right:#777 10px solid;
    }

    .arrowRight::after {
        top: calc(50% - 10px);
        left: 100%;
        border-top: transparent 10px solid;
        border-bottom:transparent 10px solid;
        border-left:#777 10px solid;
        border-right:transparent 10px solid;
    }

    .noPointer {
        pointer-events: none;
    }
</style>