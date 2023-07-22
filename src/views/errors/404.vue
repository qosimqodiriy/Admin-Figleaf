<script setup lang="ts">
import router from '@/router'

</script>

<template>
    <div class="w-full h-full flex items-center justify-center bg-white-secondary body">
      <div class="flex items-center gap-20">
        <div class="w-300 h-250 overflow-hidden">
          <img class="w-full h-full object-cover object-center" src="@/assets/images/404.jpg" alt="">
        </div>
        <div class="w-5 h-250 bg-black-primary"></div>
        <div class="space-y-5 text-black-primary">
          <p class="text-xxl">SORRY !</p>
          <div class="flex items-center">
            <p class="mr-8">Got o the </p>
            <img class="w-18 h-18" src="@/assets/images/arrow-left-s.png" alt="">
            <p @click="router.go(-1)" class="text-md cursor-pointer">Go back.</p>
          </div>
        </div>
      </div>
    </div>
</template>
 