<script setup lang="ts">
const props = defineProps({
  src: { String, required: true },
  cover: { String, required: true },
})
</script>


<template>
  <img class="object-cover object-center w-full h-full" :src="`https://www.figleaf.uz/files/${props.src}`" alt="">
</template>