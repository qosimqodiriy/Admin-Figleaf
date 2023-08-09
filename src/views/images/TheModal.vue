<script setup lang="ts">
import { reactive, ref } from 'vue'
import { putImage } from '@/services/images';
import type { Image, ImageForm, } from '@/services/images';


const image_ref_1 = ref()
const image_ref_2 = ref()
const image_ref_3 = ref()
const image_ref_4 = ref()
const image_ref_5 = ref()
const image_ref_6 = ref()
const image_ref_7 = ref()
const loading = ref(false)
const emit = defineEmits(["refresh", "toast"])
const data = reactive<{ display: boolean, formInfo: ImageForm, error: boolean, message: string }>({
    message: '',
    error: false,
    display: false,
    formInfo: {
        image1: '',
        image2: '',
        image3: '',
        image4: '',
        image5: '',
        image6: '',
        image7: '',
    }
});


async function assign(item: Image) {
    Object.assign(data.formInfo, item)

    setTimeout(() => {
        image_ref_1.value.setImage(item.image1)
        image_ref_2.value.setImage(item.image2)
        image_ref_3.value.setImage(item.image3)
        image_ref_4.value.setImage(item.image4)
        image_ref_5.value.setImage(item.image5)
        image_ref_6.value.setImage(item.image6)
        image_ref_7.value.setImage(item.image7)
    }, 100)
}

function open(item: Image) {
    assign(item)
    data.display = true
}

async function submit() {
    loading.value = true
    data.formInfo.image1 = await image_ref_1.value.getImage()
    data.formInfo.image2 = await image_ref_2.value.getImage()
    data.formInfo.image3 = await image_ref_3.value.getImage()
    data.formInfo.image4 = await image_ref_4.value.getImage()
    data.formInfo.image5 = await image_ref_5.value.getImage()
    data.formInfo.image6 = await image_ref_6.value.getImage()
    data.formInfo.image7 = await image_ref_7.value.getImage()
    
    putImage(data.formInfo).then((res: any) => {
        if (res[1] !== null && res[1] !== undefined) {
            data.display = false
            loading.value = false
            emit('toast', 'Rasmlar yangilandi')
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
            <div class="flex w-full h-full items-stretch gap-5 mb-20 rounded-10 overflow-hidden">
                <div class="flex flex-col gap-5">
                    <div class="w-100 h-80 rounded-3 overflow-hidden">
                        <image-box ref="image_ref_1"  class="w-full h-full" />
                    </div>
                    <div class="w-100 h-80 rounded-3 overflow-hidden">
                        <image-box ref="image_ref_2"  class="w-full h-full" />
                    </div>
                </div>
                <div class="w-full h-165 rounded-3 overflow-hidden">
                    <image-box ref="image_ref_3"  class="w-full h-full" />
                </div>
            </div>

            <div class="grid grid-cols-2 md:grid-cols-3 gap-5 rounded-10 overflow-hidden">
                <div class="w-full h-120 md:h-full md:row-span-2 rounded-3 overflow-hidden">
                    <image-box ref="image_ref_4"  class="w-full h-full" />
                </div>
                <div class="w-full md:col-span-2 h-120 rounded-3 overflow-hidden">
                    <image-box ref="image_ref_5"  class="w-full h-full" />
                </div>
                <div class="w-full h-120 rounded-3 overflow-hidden">
                    <image-box ref="image_ref_6"  class="w-full h-full" />
                </div>
                <div class="w-full h-120 rounded-3 overflow-hidden">
                    <image-box ref="image_ref_7"  class="w-full h-full" />
                </div>
            </div>

            <p v-if="!data.error" class="text-red-primary mb-30">{{ data.message }}</p>

            <base-button text="Saqlash" type="submit" :loading="loading" />
          </form>
        </div>
      </div>
    </Modal>
  </template>