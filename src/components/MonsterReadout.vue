<template>
    <section class="readout">
        <ul>
            <transition-group name="list-complete">    
                <li
                v-for="items in monsterLog"
                class="list-complete-item"
                :key="items.id"
                >
                        {{ items.message }}
                </li>
            </transition-group>
        </ul>
    </section>
</template>

<script>
import { store } from "../store"

export default {
    name: 'MonsterReadout',
    data() {
        return {
            storeState: store.state,
            monsterLog: store.state.monsterLog,
        }
    },
    watch: {
        monsterLog: function() {
            if(this.monsterLog.length > 4){
                this.monsterLog.shift();
            }
        }
    }
}
</script>

<style  scoped>
    .readout {
        max-width:70px;
        min-width:50px;
        text-align:center;
        margin:0 10px;
    }
    li {
        font-family:var(--paragraphs-type);
        font-size:15px;
        text-transform:uppercase;
        min-width:50px;
        max-width:50px;
        border-top: solid 2px rgb(182,182,182);
        border-bottom: solid 2px rgb(182,182,182);
        padding:10px;
        margin:5px 0px;
    }
    ul {
        list-style-type: none;
        margin-block-start: 0;
        margin-block-end: 0;
        margin-inline-start: 0;
        margin-inline-end: 0;
        padding-inline-start: 0;
        color:rgb(182, 182, 182);
    }
</style>