<script setup lang="ts">
import { getImages, type Image } from '@/services/images'
import { defineAsyncComponent, onMounted, ref } from 'vue'
import { OPEN_DELETE_MODAL, OPEN_LOADING_MODAL, CLOSE_LOADING_MODAL, OPEN_NOTIFICATION} from '@/store'


const modalRef = ref()
const TheModal = defineAsyncComponent(() => import('./TheModal.vue'))
// const SocialItem = defineAsyncComponent(() => import('./SocialItem.vue'));


const data = ref<{ formInfo: Image}>({
    formInfo: {
        image1: '',
        image2: '',
        image3: '',
        image4: '',
        image5: '',
        image6: '',
        image7: '',
    },
})

async function getItems() {
   OPEN_LOADING_MODAL()
   const [error, response] = await getImages()
   CLOSE_LOADING_MODAL()
   data.value.formInfo = response
}




function openModal(val: any) {
   modalRef.value.open(val)
}

onMounted(() => {
    getItems()
})
</script>



<template>
    <div class="space-y-40">
        <div class="flex items-center justify-between max-w-1100">
            <p class="title">Rasmlar</p>
            <div role="button" class="bg-yellow-secondary w-36 h-36 shrink-0 flex items-center justify-center rounded-full border border-gray-secondary shadow-sm" @click="openModal(data.formInfo)">
                <img class="w-20 h-20" src="@/assets/images/edit.png" alt="">
            </div>
        </div>

        <div class="card relative bg-white-primary border border-gray-secondary rounded-20 p-20 max-w-1100 ">
            <div class="flex items-stretch flex-col lg:flex-row gap-5 mb-30">
                <div class="flex flex-row lg:flex-col gap-5">
                    <div class="max-w-202 md:max-w-300 h-180 border border-gray-secondary rounded-5 overflow-hidden">
                        <img class="w-full h-full object-cover object-center" :src="`https://www.figleaf.uz/files/${data.formInfo.image1}`" alt="">
                    </div>
                    <div class="max-w-202 md:max-w-300 h-180 border border-gray-secondary rounded-5 overflow-hidden">
                        <img class="w-full h-full object-cover object-center" :src="`https://www.figleaf.uz/files/${data.formInfo.image2}`" alt="">
                    </div>
                </div>
                <div class="w-full max-h-200 md:max-h-full border border-gray-secondary rounded-5 overflow-hidden">
                    <img class="w-full h-full object-cover object-center" :src="`https://www.figleaf.uz/files/${data.formInfo.image3}`" alt="">
                </div>
            </div>

            <div class="grid grid-cols-2 gap-5">
                <div class="border border-gray-secondary rounded-10 overflow-hidden">
                    <img class="w-full h-full max-h-254 object-cover object-center" :src="`https://www.figleaf.uz/files/${data.formInfo.image4}`" alt="">
                </div>
                <div class="border border-gray-secondary rounded-10 overflow-hidden">
                    <img class="w-full h-full max-h-254 object-cover object-center" :src="`https://www.figleaf.uz/files/${data.formInfo.image5}`" alt="">
                </div>
                <div class="border border-gray-secondary rounded-10 overflow-hidden">
                    <img class="w-full h-full max-h-254 object-cover object-center" :src="`https://www.figleaf.uz/files/${data.formInfo.image6}`" alt="">
                </div>
                <div class="border border-gray-secondary rounded-10 overflow-hidden">
                    <img class="w-full h-full max-h-254 object-cover object-center" :src="`https://www.figleaf.uz/files/${data.formInfo.image7}`" alt="">
                </div>
            </div>
        </div>


        
        <the-modal @refresh="getItems" ref="modalRef" @toast="val => OPEN_NOTIFICATION({text: val, callback: getItems })" />
    </div>
</template>

<style scoped>
* {
    transition: 0.37s;
}

.changeBox {
    opacity: 0;
    z-index: 1;
    transition: 0.2s;
    transform: scale(0.8);
}

.card:hover .changeBox {
    opacity: 100;
    transform: scale(1);
}
</style>