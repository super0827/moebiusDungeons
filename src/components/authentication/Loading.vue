<template>
    <div>
        <div class="loader"></div> 
    </div>
</template>

<script>
    export default {
        name:"Loading"
    }
</script>

<style scoped>
.loader {
  border: 7px solid #f3f3f3; /* Light grey */
  border-top: 7px solid #777;
  border-right: 7px solid #888;
  border-bottom: 7px solid #777;
  border-left: 7px solid #888;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>