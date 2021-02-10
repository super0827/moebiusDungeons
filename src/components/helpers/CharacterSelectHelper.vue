<template>
<div class="h-90 px-4 text-black">
    <b-row align-h="between" class="mb-2">
        <b-col cols="6">
            <h1>WELCOME TO THE INFINITE DUNGEONS.</h1>
            <h2>A challenging path lies ahead of you.</h2>
            <p>You've stumbled onto a fantasy hack and slash adventure where you have but one goal.</p>

            <p>Explore the dangerous realm of <strong>Amara</strong> as an adventurer for the <strong>Grand City of Eyien</strong>, in service to the venerable <strong>King of Embers</strong>.</p>

            <p>You will slay monsters to gain coins, and experience. Travel through the realm of Amara on this quest, and do your best to survive.</p>
            
            <p>How long will you last as an adventurer? Try not to get in over your head. These lands are dangerous.</p>

            <p>Do not falter, for every mistake could be your last.</p>
        </b-col>

        <b-col cols="6">
            <h2>CLASSES</h2>
            <h3>THE SWORDSMAN</h3>
            <p>A deadly bulwark. The swordsman starts with high armor, use his special ability <strong>EN'GARDE</strong> to make youself and impenetrable wall by adding permenant armor with each use. He is well protected when fighting physical type monsters. His armor and raw strength will best any non-magical opponent.</p>
        
            <h3>THE MAGE</h3>
            <p>A pragmatic choice, The mage starts with high magical attack, she is a destructive force and a powerful class requiring planning and security. Her special ability <strong>VARIAGATE</strong> will reduce even the most powerful foe into a smattering of hitpoints, halving their health with each use.</p>

            <h3>THE VARLET</h3>
            <p>A challenging class, requiring deadly precision. Utilized properly, the varlet will retire rich of pockets and young of age. His stats start balanced, and with proper training can decimate his foes with a single stealthy blow. Use his special ability <strong>PECULATE</strong> to deal a modest amount of damage, if used to kill a monster you'll pilfer extra coins.</p>
        </b-col>
    </b-row>

</div>
</template>

<script>

import UiSounds from '@/plugins/UiSounds.js'

export default {
  name: 'InstructionsScreen',
  data() {
      return {
          UiSounds: UiSounds,
      }
  },
}
</script>

<style scoped>

</style>
