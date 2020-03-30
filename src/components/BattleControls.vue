<template>
<section class="columns battleOptions">

    <h2 @click="$emit('deal-damage')">Trade Blows</h2>
    <h2>Be Reckless</h2>
    
    <br>

    <h3>Turn Tail</h3>

</section>
</template>

<script>
export default {
  name: 'BattleControls',
}
</script>

<style scoped>
    .battleOptions {
        margin:0 20px;
    }

    p {
        font-size:10px;
    }

    h2 {
        background: rgb(151, 151, 151);
        cursor:pointer;
    }
    
    h3 {
        background: rgb(207, 207, 207);
        cursor:pointer;
    }

    h2:hover {
        background: rgb(166, 207, 144);
    }
    
    h3:hover {
        background: rgb(166, 207, 144);
    }

    h1 {
        font-size:15px;
        margin:2px;
    }

    h2 {
        padding:10px;
        font-size: 17px;
        text-decoration: none;
    }

    h3 {
        padding:10px;
        font-size:17px;
        text-transform: uppercase;
        text-decoration: none;
    }
</style>
