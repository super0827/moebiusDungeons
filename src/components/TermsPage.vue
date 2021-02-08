<template>
<b-col cols="8">
  <h1>TERMS AND CONDITIONS</h1>
  <p>Moebius Dungeons is created by Sean Yager, for fun and entertainment. Moebius Dungeons uses Firebase authentication to save data and information to a database, where the information is protected by your own chosen password. Moebius Dungeons automatically draws from your Google account information to generate a username for you. This username is subject to be placed in the leaderboards. By creating an account you give Moebius Dungeons permission to post your display name (which is located in the top left corner of the website) to the leaderboards.</p>

  <p>By creating an account you acknowledge the above and release Moebius Dungeons and it's creator from any liability that comes from your display name being publically available.</p>

  <div @click="toLogin()" class="back">
    <h3>Back To Login</h3>
  </div>
</b-col>
</template>

<script>

export default {
  methods: {
  toLogin() {
    this.$store.commit('gameData/mutate', {property: 'phase', with:"Login"})
  },
  }
};
</script>

<style scoped>
.termsPage {
  grid-row:2/3;
  grid-column:5/9;
}

.back {
  padding:10px;
  margin-top:20px;
  background:black;
  color:white;
}

.back:hover {
  cursor:pointer;
  background:green;
  color:white;
}

h1, h3{
  text-align:center;
}
</style>