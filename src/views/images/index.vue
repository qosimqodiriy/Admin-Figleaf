<script setup lang="ts">
import { getImages, getVideos, type Image } from '@/services/images'
import { defineAsyncComponent, onMounted, ref } from 'vue'
import { OPEN_LOADING_MODAL, CLOSE_LOADING_MODAL, OPEN_NOTIFICATION} from '@/store'


const modalRef = ref()
const modalVideoRef = ref()
const TheModal = defineAsyncComponent(() => import('./TheModal.vue'))
const VideoModal = defineAsyncComponent(() => import('./VideoModal.vue'))
// const SocialItem = defineAsyncComponent(() => import('./SocialItem.vue'));


const data = ref<{ formInfo: Image, video: string}>({
    video: '',
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
   const [error2, response2] = await getVideos()
   console.log(response2);
   
   CLOSE_LOADING_MODAL()
   data.value.formInfo = response
   data.value.video = response2.video
}




function openModal(val: any) {
   modalRef.value.open(val)
}
function openVideoModal(val: any) {
   modalVideoRef.value.open(val)
}

onMounted(() => {
    getItems()
})
</script>



<template>
    <div class="space-y-40">
        <div class="flex items-center justify-between max-w-1100">
            <p class="title">Rasm && Video</p>
        </div>

        <div class="card relative rounded-15 max-w-1100">
            <div class="flex items-stretch flex-col lg:flex-row gap-5">
                <div class="flex flex-row lg:flex-col gap-5">
                    <div class="max-w-202 md:max-w-300 h-180 border border-gray-secondary rounded-5 rounded-tl-15 overflow-hidden">
                        <img class="w-full h-full object-cover object-center" :src="`https://www.figleaf.uz/files/${data.formInfo.image1}`" alt="">
                    </div>
                    <div class="max-w-202 md:max-w-300 h-180 border border-gray-secondary rounded-5 rounded-bl-15 overflow-hidden">
                        <img class="w-full h-full object-cover object-center" :src="`https://www.figleaf.uz/files/${data.formInfo.image2}`" alt="">
                    </div>
                </div>
                <div class="w-full max-h-200 md:max-h-full border border-gray-secondary rounded-5 rounded-r-15 overflow-hidden">
                    <img class="w-full h-full object-cover object-center" :src="`https://www.figleaf.uz/files/${data.formInfo.image3}`" alt="">
                </div>
            </div>

            <!-- <div class="grid grid-cols-2 gap-5 mt-30">
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
            </div> -->

            <div role="button" class="changeBox absolute top-10 right-10 bg-yellow-secondary w-36 h-36 shrink-0 flex items-center justify-center rounded-full border border-gray-secondary shadow-sm" @click="openModal(data.formInfo)">
                <img class="w-20 h-20" src="@/assets/images/edit.png" alt="">
            </div>
        </div>

        <div class="card relative  rounded-15 max-w-1100">
            <video class="w-full h-full max-h-500 overflow-hidden object-cover object-center rounded-15" :src="`https://www.figleaf.uz/files/${data.video}`" controls></video>

            <div role="button" class="changeBox absolute top-10 right-10 bg-yellow-secondary w-36 h-36 shrink-0 flex items-center justify-center rounded-full border border-gray-secondary shadow-sm" @click="openVideoModal(data.video)">
                <img class="w-20 h-20" src="@/assets/images/edit.png" alt="">
            </div>
        </div>


        
        <the-modal @refresh="getItems" ref="modalRef" @toast="val => OPEN_NOTIFICATION({text: val, callback: getItems })" />
        <video-modal @refresh="getItems" ref="modalVideoRef" @toast="val => OPEN_NOTIFICATION({text: val, callback: getItems })" />
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