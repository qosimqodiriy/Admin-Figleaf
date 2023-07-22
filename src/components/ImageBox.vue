<script setup lang="ts">
import {reactive, computed, onMounted, ref} from 'vue'
import { uploadPhoto } from '@/services/common'
const url = import.meta.env.VITE_BASE_URL3
const emit = defineEmits(["invalidInput"])
const inputRef = ref();

function click() {
  inputRef.value.click()
}
function sendEmit() {
  emit("invalidInput")
}
const data = reactive<{uid: number, src: string | null, file: string | null, width: number, height: number, isLocal: boolean, image: string}>({
  uid: 0,
  src: '',
  file: '',
  width: 0,
  height: 0,
  isLocal: false,
  image: ''
})

const getImageURL = computed(() => {
  let result;
      if (data.isLocal) {
        result = data.src
      } else {
        if (data.src) {
          result = `${data.src}`
        }
      }
  return result
})

onMounted(() => {
  data.uid = Math.random()
})

function  setImage(src: string) {
  if(src === null ) {
    data.src = src
    data.image = src
  } else {
  data.src = `${url}${src}`
  data.image = src
  data.isLocal = false
  }
}

async function encodeImageFileAsURL(element: any) {
  const file = (element.target as HTMLInputElement)?.files?.[0]
  if(file){
    getBase64(file);
  }
}

async function getBase64(file: File) {
  let img;
  var reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    if (reader.result) {
      if(typeof reader.result == 'string') {
        let start = reader.result.indexOf('base64,') + 7;
        img = reader.result.slice(start);

        uploadPhoto(img).then(res => {
        if(res[1] !== null){
          data.image = `${res[1].data}`
          data.src = `${url}${res[1].data}`
        } else if (res[0].code == "ERR_NETWORK") {
          // console.log(res[0]);
          alert("Iltimos kichikroq razmerdagi rasm kiriting")
        } else {
          // alert(res[0])
        }
      })
      }
    }
  };

  reader.onerror = function (error) {
    console.log('Error: ', error);
  };

  return img
}

function getImage() {
  return data.image
}
defineExpose({
  setImage,
  getImage
})
</script>

<template>
  <div>
    <div class="relative h-full w-full rounded flex items-center justify-center" @click="click" >
      <img v-if="data.src" :id="`${data.uid}`" :src="`${getImageURL}`" alt="" class="object-cover opacity-50 h-full w-full rounded">
      <div class="absolute flex flex-col items-center justify-center">
        <img v-if="data.src" class="w-24 h-24" src="@/assets/images/photo-rename.png" alt="">
        <img v-else class="w-24 h-24" src="@/assets/images/photo-add.png" alt="">
      </div>
    </div>
    <input ref="inputRef" :onchange="encodeImageFileAsURL" name="image" @invalid="sendEmit" type="file" hidden accept="image/*">
  </div>
</template>