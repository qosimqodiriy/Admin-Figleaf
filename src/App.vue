<script setup lang="ts">
import { reactive, ref } from 'vue';
import { _deleteModal } from './store';
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

// handleUser()



document.addEventListener('keydown', evt => {
  if (evt.key === 'Escape') {
    _deleteModal.visible = false;
  }
});
</script>



<template>
  <div class="flex items-stretch w-full h-screen overflow-hidden relative max-w-2000 mx-auto">
    <sidebar />

    <div class=" flex flex-col w-full min-h-screen overflow-y-scroll relative  bg-white-secondary">
      <Header></Header>
      <RouterView class="main_box w-full px-10 md:px-15 lg:px-20 xl:px-30 2xl:px-40 py-10 md:py-15 lg:py-20 xl:py-30 flex-1 min-h-100% overflow-y-scroll" />
      <base-loading />
    </div>

  </div>
  
  <delete-modal />
  <base-notification />
</template>

<style scoped>
.main_box::-webkit-scrollbar {
  width: 5px;
  /* background-color: red; */
}

.main_box::-webkit-scrollbar-thumb {
  width: 5px;
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.2);
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}
.shadow {
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
}

@media (max-width: 768px){
  
}
</style>