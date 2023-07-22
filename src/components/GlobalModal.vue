<script setup lang="ts">
</script>

<template>
    <teleport to='body'>
        <div class="w-screen h-full overflow-auto flex items-start justify-center fixed top-0 right-0 modal">
              <!-- Modal Content -->
              <slot/>
        </div>
    </teleport>
</template>