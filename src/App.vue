<script setup lang="ts">
import { reactive, ref } from 'vue';
import Sidebar from './components/sidebar/index.vue'
import { RouterView, useRoute, useRouter } from 'vue-router'



const route = useRoute()
const router = useRouter()

const data = reactive<{token: string | null, name: string, phone: string }>({
  token: null,
  name: '',
  phone: '',
})

function handleUser() {
  data.token = localStorage.getItem('token')

  setTimeout(() => {
    sessionStorage.setItem('path', route.fullPath)
    setTimeout(() => {
      if (data.token == null) {
        router.push('/login')
      }
    }, 100);
  }, 10);
  
  setTimeout(handleUser, 100)
}

handleUser()
</script>



<template>
  <div class="flex items-start w-full h-full bg-white-secondary">
    <sidebar />

    <div class="flex flex-col w-full h-full min-h-screen relative px-10 md:px-15 lg:px-20 xl:px-30 2xl:px-40 py-5 md:py-10 lg:py-15 xl:py-20">
      <Header></Header>
      <RouterView class="w-full min-h-full flex-1" />
      <base-loading />
    </div>

  </div>
  
  <delete-modal />
  <base-notification />
</template>

<style scoped>
.shadow {
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
}

@media (max-width: 768px){
  
}
</style>