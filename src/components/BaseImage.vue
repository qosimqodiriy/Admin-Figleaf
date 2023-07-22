<script setup lang="ts">
const url = import.meta.env.VITE_BASE_URL
const props = defineProps({
  src: {
    String,
    required: true
  }
})
</script>


<template>
  <img class="object-cover object-center w-full h-full" :src="`${url}${props.src}`" alt="">
</template>