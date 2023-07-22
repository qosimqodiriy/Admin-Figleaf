<script setup lang="ts">
import { _loading } from '@/store/theLoading'
</script>

<template>
  <div v-if="_loading.visible" class="absolute overflow-hidden top-0 left-0 right-0 height z-20"> <!--  -->
    <div class="box">
      <svg><circle cx="50" cy="50" r="50"></circle></svg>
    </div>
  </div>
</template>


<style scoped>
.height {
  height: 100vh;
  /* height: calc(100vh - 115px); */
}
.box {
  display: flex;
  /* background: #fff; */
  /* background: rgba(1, 14, 56, 0.5); */
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
}

svg {
  position: relative;
  width: 110px;
  height: 110px;
  animation: rotate 2s linear infinite;
}

svg circle {
  width: 100%;
  height: 100%;
  fill: none;
  stroke-width: 7;
  stroke: #FFD171;
  stroke-linecap: round;
  stroke-dasharray: 320;
  stroke-dashoffset: 320;
  transform: translate(5px, 5px);
  animation: animate 4s linear infinite;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(720deg);
  }
}

@keyframes animate {

  0%,
  100% {
    stroke-dashoffset: 320;
  }

  50% {
    stroke-dashoffset: 0;
  }

  50.1% {
    stroke-dashoffset: 640;
  }
}
</style>