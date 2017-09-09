<template>
  <div class="cotainer">
    <mu-circular-progress class="process" :size="90" :strokeWidth="5" />

  </div>
</template>

<style scoped>
  .cotainer{
    width: 100%;
    height:100%;
  }
  .process{
    position: absolute;
    left: 50%;
    top:50%;
    transform: translate(-50%, -50%);
  }
</style>
