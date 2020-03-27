<template>
 <section id="winner" class="hidden">
        <section class="animated pulse slower infinite">
            <h2>You've slain your way through the dungeon!</h2>
            <h2>The Ember King of Amara requests an audience with thee.</h2>
        </section>
        
        <br>
        
        <p>Accept his summons?</p>
        
        <section class="tryAgain">
            <a href="https://discord.gg/fJCUzjf">
                <p>GLADLY</p>
            </a> 

            <section>    
                <p onclick="window.location.reload();">NO, THERE ARE MORE BEASTS TO SLAY.</p>
            </section>
        </section>
    </section>

</template>

<script>
export default {
  name: 'LoseScreen',
  props: {
  }
}
</script>

<style scoped>

</style>
