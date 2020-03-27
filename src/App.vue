<template>
  <div id="app">
    <character-select v-if="pickCharacter"/>
  </div>
</template>

<script>
import CharaterSelect from './components/CharacterSelect.vue'

export default {
  name: 'App',
  components: {
    CharacterSelect
  },
  data() {
    return {
      pickCharacter: true,
    }
  },
}
</script>

<style>
#app {
  display:flex;
  justify-content:center;
  align-items:center;
}
</style>
