<script setup lang="ts">
import { reactive, ref } from 'vue'
import { tabs } from '@/services/data';
import { postPutBanner, reset } from '@/services/banner';
import type { Banner, BannerForm, } from '@/services/banner';

const title = reactive({
    data: {
        index: 1,
        code: 'uz',
        title: 'Sarlavha',
        lang: 'O‘zbek tili',
    }
})

const imageRef = ref()
const loading = ref(false)
const emit = defineEmits(["refresh", "toast"])
const data = reactive<{ display: boolean, formInfo: BannerForm, error: boolean, message: string }>({
    message: '',
    error: false,
    display: false,
    formInfo: {
        id: 0,
        image: '',
        name: {
            uz: '',
            ru: '',
            eng: '',
        },
        priority: null,
    }
});


async function assign(item: Banner) {
    Object.assign(data.formInfo, item)

    setTimeout(() => {
        imageRef.value.setImage(item.image)
    }, 100)
}

function open(item: Banner) {
    data.display = true
    title.data = tabs[0]

    if (item.id !== undefined) {
        assign(item)
    } else {
        reset(data.formInfo)
    }
}

async function submit() {
    loading.value = true
    data.formInfo.image = await imageRef.value.getImage()
    
    postPutBanner(data.formInfo).then((res: any) => {
        if (data.formInfo.id != null && res[1] !== null && res[1] !== undefined) {
            data.display = false
            loading.value = false
            emit('toast', 'Banner yangilandi')
        } else if (res[1] !== null && res[1] !== undefined) {
            data.display = false
            loading.value = false
            emit('toast', 'Yangi banner qo‘shildi')
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
        <div class="bg-white-primary p-20 md:p-32 shadow-lg rounded-16 z-0 w-483 lg:w-600 xl:w-700" :class="data.display ? 'z-0 scale-100 animate-blowUp' : ''">
          <div class="flex items-center justify-between gap-8 mb-32">
            <h2 class="text-17 text-black-primary">{{ data.formInfo.id ? 'Tahrirlash' : 'Yangi qo‘shish' }}</h2>
              
            <img @click="close()" src="@/assets/images/close-black.png" class="cursor-pointer w-24 h-24" alt="">
          </div>

  
          <form @submit.prevent="submit" class="w-full">
            <div class="flex flex-col lg:flex-row lg:items-end gap-20">
                <div class="w-120 md:w-150 lg:w-200 h-150 md:h-180 lg:h-250 rounded-5 border border-gray-secondary bg-white-secondary shrink-0">
                    <image-box ref="imageRef"  class="w-full h-full rounded-3" />
                </div>

                <div class="w-full">
                    <div class="flex gap-16 border-b-2 border-b-white-secondary mb-20">
                        <div v-for="(item) in tabs" :key="item.code" class="relative top-2 cursor-pointer border-b-2 text-16 pb-8" :class="title.data.code === item.code ? 'font-semibold border-b-green-primary text-green-primary' : ' font-normal text-black-primary border-b-transparent'" @click="title.data = item">
                            {{ item.lang }}
                        </div>
                    </div>
                    
                    <div class="w-full relative mb-15" v-for="(item, index) in data.formInfo.name" :key="index" v-show="index == title.data.code">
                        <input type="text" v-model="data.formInfo.name[index]" class="base_input" :name="`name${index}`" :id="`name${index}`" :required="index == title.data.code ? true : false" />
                        <label class="base_label" :for="`name${index}`">{{ title.data.title }}</label>
                    </div>

                    <div class="w-full relative">
                        <input type="number" v-model="data.formInfo.priority" class="base_input" name="priority" id="priority" required />
                        <label class="base_label" for="priority">Priority</label>
                    </div>
                </div>
            </div>

            <p v-if="!data.error" class="text-red-primary mb-30">{{ data.message }}</p>

            <!-- <base-button :text="true ? 'Saqlash' : `Yangi qo'shish`" type="submit" :loading="loading" /> -->
            <base-button :text="data.formInfo.id ? 'Saqlash' : `Yangi qo'shish`" type="submit" :loading="loading" />
          </form>
        </div>
      </div>
    </Modal>
  </template>