<template>
<section id="intro">
  <section class="chooseChar">
      <section id="swordsmanCont" class="animated zoomIn">
          <h2>SWORDSMAN</h2>
          <p>Slicing & dicing.</p>
          <p>Heavy hitter & sturdy.</p>
          <section id="swordsman" onclick="pickChar(this.id)" class="charSlot">
              <img src="./imgs/swordsman.png" alt="a swordsman, armored and adept in swordplay. Swings his sword real good.">
              <section class="overlay"></section>
          </section>
      </section>
  
      <section id="mageCont" class="animated zoomIn">
          <h2>MAGE</h2>
          <p>Uses magic attacks.</p>
          <p>Ignores enemy armor.</p>
          <section id="mage" onclick="pickChar(this.id)" class="charSlot">
              <img src="./imgs/mage.png" alt="a mage sitting with her book and magic flame, she can cast spells">
              <section class="overlay"></section>
          </section>
      </section>
  
      <section id="varletCont" class="animated zoomIn">
          <h2>VARLET</h2>
          <p>Jack of all trades.</p>
          <p>Starts with 1 Mettle</p>
          <section id="varlet" onclick="pickChar(this.id)" class="charSlot">
              <img src="./imgs/varlet.png" alt="a varlet by a campfire. he's trecherous and untrustworthy.">
              <section class="overlay"></section>
          </section>
      </section>
  </section>
</section>
</template>

<script>
export default {
  name: 'CharacterSelect',
  props: {
  }
}
</script>

<style scoped>
.chooseChar {
    display:flex;
    flex-direction: row;
}

.chooseChar > section {
    margin:0px 20px;
}

.chooseChar img {
    max-width:200px;
}

.charSlot {
    position:relative;
}

.charSlot:hover {
    cursor:pointer;
}

.overlay {
    height:100px;
    width:200px;
    z-index:999;
    top:132px;
    position:absolute;
}

#swordsman.charSlot:hover > .overlay {
    background: linear-gradient(0deg, rgb(255, 145, 0) 0%, rgba(255,192,0,0) 100%);
    cursor:pointer;
}

#mage.charSlot:hover > .overlay {
    background: linear-gradient(0deg, rgb(0, 174, 255) 0%, rgba(255,192,0,0) 100%);
    cursor:pointer;
}

#varlet.charSlot:hover > .overlay {
    background: linear-gradient(0deg, rgb(238, 255, 0) 0%, rgba(255,192,0,0) 100%);
    cursor:pointer;
}
</style>
