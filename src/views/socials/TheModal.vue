<script setup lang="ts">
import { reactive, ref } from 'vue'
import { postPutSocial, reset,  } from '@/services/social';
import type { Social, SocialForm, } from '@/services/social';


const imageRef = ref()
const loading = ref(false)
const emit = defineEmits(["refresh", "toast"])
const data = reactive<{ display: boolean, formInfo: SocialForm, error: boolean, message: string }>({
    message: '',
    error: false,
    display: false,
    formInfo: {
        id: 0,
        url: '',
        icon: '',
    }
});


async function assign(item: Social) {
    Object.assign(data.formInfo, item)

    setTimeout(() => {
        imageRef.value.setImage(item.icon)
    }, 100)
}

function open(item: Social) {
    data.display = true

    if (item.id !== undefined) {
        assign(item)
    } else {
        reset(data.formInfo)
    }
}

async function submit() {
    loading.value = true
    data.formInfo.icon = await imageRef.value.getImage()
    
    postPutSocial(data.formInfo).then((res: any) => {
        if (data.formInfo.id != null && res[1] !== null && res[1] !== undefined) {
            data.display = false
            loading.value = false
            emit('toast', 'Ijtimoiy tarmoq yangilandi')
        } else if (res[1] !== null && res[1] !== undefined) {
            data.display = false
            loading.value = false
            emit('toast', 'Yangi Ijtimoiy tarmoq qo‘shildi')
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
  reset(data.formInfo)
  data.display = false
}

defineExpose({
    open
})
</script>
   
<template>
    <Modal v-if="data.display">
      <div class="h-screen flex items-center justify-center fixed top-0 left-0 w-full p-10">
        <div class="bg-white-primary p-20 md:p-32 shadow-lg rounded-16 z-0 w-483" :class="data.display ? 'z-0 scale-100 animate-blowUp' : ''">
          <div class="flex items-center justify-between gap-8 mb-32">
            <h2 class="text-17 text-black-primary">{{ data.formInfo.id ? 'Tahrirlash' : 'Yangi qo‘shish' }}</h2>
              
            <img @click="close()" src="@/assets/images/close-black.png" class="cursor-pointer w-24 h-24" alt="">
          </div>

  
          <form @submit.prevent="submit" class="w-full">
            <div class="w-60 h-60 rounded-5 mb-10 p-5 border border-gray-secondary bg-white-secondary">
                <image-box ref="imageRef"  class="w-full h-full rounded-3" />
            </div>
            <div class="w-full relative mb-30">
              <input type="text" v-model="data.formInfo.url" class="base_input" name="url" id="url" required />
              <label class="base_label" for="url">Manzil</label>
            </div>

            <p v-if="!data.error" class="text-red-primary mb-30">{{ data.message }}</p>

            <!-- <base-button :text="true ? 'Saqlash' : `Yangi qo'shish`" type="submit" :loading="loading" /> -->
            <base-button :text="data.formInfo.id ? 'Saqlash' : `Yangi qo'shish`" type="submit" :loading="loading" />
          </form>
        </div>
      </div>
    </Modal>
  </template>