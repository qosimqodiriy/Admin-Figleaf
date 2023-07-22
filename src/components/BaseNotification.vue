<script setup lang="ts">
import { _toast } from '@/store/theToast'
</script>
<template>
  <teleport to="body">
    <div v-if="_toast.visible" class="fixed w-screen flex justify-center left-0 bottom-0 mb-60">
      <div class="rounded-16 flex gap-15 items-center bg-white-primary border border-gray-secondary p-16 shadow-lg">
        <div class="border border-gray-secondary w-54 h-54 flex items-center justify-center rounded-full">
          <img src="@/assets/images/tick.svg" alt="">
        </div>
        <p class="text-black-primary text-base font-semibold self-center">{{_toast.text}}</p>
      </div>
    </div>
  </teleport>
</template>
