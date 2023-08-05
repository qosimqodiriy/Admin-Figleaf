<script setup lang="ts">
import { _menubar } from "../store";

document.addEventListener('keydown', evt => {
    if(evt.key === 'Escape') {
        _menubar.visible = false;
    }
});
</script>



<template>
    <div class="flex items-center p-10 gap-15 md:hidden">
        <div @click="_menubar.visible = !_menubar.visible" class="cursor-pointer p-2" :class="_menubar.visible ? 'active_bar' : 'not_active_bar'">
            <img class="w-20 h-20" src="@/assets/images/menu.png" alt="">
        </div>

        <div class="flex items-center justify-center">
          <img class="w-full max-h-25" src="../assets/images/Logo2.png" alt="" />
        </div>
    </div>
</template>