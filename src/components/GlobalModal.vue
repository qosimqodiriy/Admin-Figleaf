<script setup lang="ts">
</script>

<template>
    <teleport to='body'>
        <div class="w-screen h-full overflow-auto flex items-start justify-center fixed top-0 right-0 modal">
              <!-- Modal Content -->
              <slot></slot>
        </div>
    </teleport>
</template>


<style scoped>
.modal {
    z-index: 50;
    backdrop-filter: blur(1px);
    background: rgba(1, 14, 56, 0.5);
}
</style>