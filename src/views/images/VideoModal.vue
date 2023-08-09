<script setup lang="ts">
import { reactive, ref } from 'vue'
import { putVideo } from '@/services/images';
import type { Image, ImageForm, } from '@/services/images';


const video_ref = ref()
const loading = ref(false)
const emit = defineEmits(["refresh", "toast"])
const data = reactive<{ display: boolean, video: any, error: boolean, message: string }>({
  message: '',
  error: false,
  display: false,
  video: '',
});


async function assign(item: string) {
  data.video = item;

  setTimeout(() => {
    video_ref.value.setImage(item);
  }, 100)
}

function open(item: string) {
  assign(item)
  data.display = true
}

async function submit() {
  loading.value = true
  data.video = await video_ref.value.getImage()
  
  putVideo(data.video).then((res: any) => {
    if (res[1] !== null && res[1] !== undefined) {
      data.display = false
      loading.value = false
      emit('toast', 'Video yangilandi')
    } else {
      data.error = true
      console.log(res[0]);
      loading.value = false;
      data.message = res[0].message;

      setTimeout(() => {
        data.error = false;
      }, 3000);
    }
  })
}


function close() {
//   emit("refresh")
  data.display = false
}

defineExpose({
    open
})
</script>
   
<template>
    <Modal v-if="data.display">
      <div class="h-screen flex items-center justify-center fixed top-0 left-0 w-full p-10">
        <div class="bg-white-primary p-20 md:p-32 shadow-lg rounded-16 z-0 w-full md:max-w-600" :class="data.display ? 'z-0 scale-100 animate-blowUp' : ''">
          <div class="flex items-center justify-between gap-8 mb-32">
            <h2 class="text-17 text-black-primary">Tahrirlash</h2>
              
            <img @click="close()" src="@/assets/images/close-black.png" class="cursor-pointer w-24 h-24" alt="">
          </div>

          <form @submit.prevent="submit" class="w-full">
            <div class="flex flex-col items-center justify-center w-full min-h-300 max-h-500 rounded-15 overflow-hidden relative mb-30">
              <video-box ref="video_ref"  class="absolute top-0 left-0 w-full h-full" />
            </div>

            <p v-if="data.error" class="text-red-primary mb-30">{{ data.message }}</p>

            <base-button text="Saqlash" type="submit" :loading="loading" />
          </form>
        </div>
      </div>
    </Modal>
  </template>