<script setup lang="ts">
import FormData from 'form-data'
import { uploadPhoto } from '@/services/common'
import {reactive, computed, onMounted, ref} from 'vue'

const inputRef = ref();
const emit = defineEmits(["invalidInput"])
const url = 'https://www.figleaf.uz/files/'


const data = reactive<{ src?: string, isLocal: boolean, image: string, loading: boolean }>({
  src: '',
  image: '',
  loading: false,
  isLocal: false,
})

const getImageURL = computed(() => {
  let result: any;
  if (data.isLocal) {
    result = data.src
  } else {
    if (data.src) {
      result = `${data.src}`
    }
  }
  return result
})

function click() {
  inputRef.value.click()
}

function sendEmit() {
  emit("invalidInput")
}

function setImage(src: string) {
  if (src === null) {
    data.src = ''
    data.image = ''
  } else {
    data.image = src
    data.isLocal = false
    data.src = `${url}${src}`
  }
}

async function imageSelected(element: any) {
  data.loading = true
  const formData = new FormData();
  formData.append("file", element.target.files[0]);

  await uploadPhoto(formData).then((res: any) => {
    if(res[1] != null) {
      data.loading = false;
      data.image = `${res[1].data}`
      data.src = `${url}${res[1].data}`
    } else {
      data.loading = false;
      alert('error: ' + res[0].message);
    }
  })
}

onMounted(() => {
  data.src = '',
  data.image = ''
  data.isLocal = false;
})

function getImage() {
  return data.image
}

defineExpose({
  setImage,
  getImage,
})
</script>

<template>
  <div>
    <div class="relative h-full w-full rounded flex items-center justify-center" @click="click">
      <img v-if="data.src" :src="`${getImageURL}`" alt="" class="object-cover opacity-50 h-full w-full rounded">
      <div class="absolute flex flex-col items-center justify-center gap-5">
        <img v-if="data.loading" class="w-36 h-36" src="@/assets/images/loading.png" alt="" :class="data.loading ? 'loader' : ''">
        <img v-else-if="data.src" class="w-24 h-24" src="../assets/images/photo-rename.png" alt="icon">
        <img v-else class="w-24 h-24" src="../assets/images/photo-add.png" alt="icon">
      </div>
    </div>
    
    <input ref="inputRef" :onchange="imageSelected" name="image" @invalid="sendEmit" type="file" hidden accept="image/*">
  </div>
</template>

<style scoped>
.loader {
  animation: rotation 1s infinite linear;
}

@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}
</style>