<script setup lang="ts">
import links from './links.json';
import { _menubar } from '../../store';

</script>

<template>
  <div v-if="_menubar.visible" class="close_aside absolute top-0 left-0 w-full h-screen" @click="_menubar.visible = false"></div>
  <aside class="relative">
    <div class="sidebar min-h-full bg-white-primary py-5 md:py-16 lg:py-20 border-r border-gray-secondary sticky top-0" :class="_menubar.visible ? 'active_bar' : 'not_active_bar'">
      <router-link to="/" @click="_menubar.visible = false">
        <div role="button" class="flex items-center justify-center md:justify-start gap-10 px-2 md:px-20 lg:px-30 mt-15 md:mt-0">
          <img class="w-full max-w-70% md:max-w-full" src="@/assets/images/Logo2.png" alt="" />
        </div>
      </router-link>
  
      <div class="px-5 lg:px-10text-sm font-medium flex flex-col items-center md:items-start gap-y-10 mt-32 md:mt-46 link">
        <router-link v-for="link in links" :to="link.path" :key="link.path" @click="_menubar.visible = false" class="flex text-black-secondary items-center w-full rounded-3 transition-all duration-300 hover:bg-white-secondary py-5 px-10" active-class="router-link-active">
          <p class="text-16">{{link.content}}</p>
        </router-link>
      </div>
    </div>
  </aside>
</template>

<style scoped>
* {
  transition: 0.5s;
  animation: 0.5s linear ease;
}


.sidebar {
  z-index: 3;
  height: 100vh;
  width: 230px;
  min-width: 80px;
  max-width: 250px;
  position: relative;
  overflow-y: scroll;
  overflow-x: visible;
}

.close_aside {
  z-index: 1;
}



p {
  font-weight: 500;
  color: #010E38;
}

.router-link-active p {
  color: #009A10;
}

.sidebar::-webkit-scrollbar {
  width: 0;
}

.modal {
  background: rgba(1, 14, 56, 0.25);
  backdrop-filter: blur(5px);
}




@media (max-width: 768px) {
  .sidebar.active_bar {
    left: 0;
    position: absolute;
    box-shadow: rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px;
  }

  .sidebar.not_active_bar {
    left: -230px;
    position: absolute;
  }
}

</style>
