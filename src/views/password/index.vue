<script setup lang="ts">
import { defineAsyncComponent, onMounted, ref } from 'vue'
import { getPassword, type Password } from '@/services/password'
import {  OPEN_LOADING_MODAL, CLOSE_LOADING_MODAL, OPEN_NOTIFICATION } from '@/store'


const modalRef = ref()
const TheModal = defineAsyncComponent(() => import('./TheModal.vue'))


const data = ref<{ formInfo: Password}>({
    formInfo: {
        id: 0,
        username: '',
        password: '',
    },
})

async function getItems() {
   OPEN_LOADING_MODAL()
   const [error, response] = await getPassword()
   console.log(response);
   CLOSE_LOADING_MODAL()
   data.value.formInfo = response[0];
   console.log(data.value.formInfo);
   
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
        <p class="title">Fig-Leaf</p>

        <div class="card max-w-500 border border-gray-secondary bg-white-primary rounded-10 p-20 relative">
            <p class="text-20 font-semibold mb-10">Login: {{ data.formInfo.username }}</p>
            <p class="text-20 font-semibold">Password: {{ data.formInfo.password }}</p>

            <div class="changeBox absolute top-10 right-10 border border-gray-secondary rounded-full w-36 h-36 flex items-center justify-center cursor-pointer bg-yellow-secondary" @click="openModal(data.formInfo)">
                <img class="w-21 h-21" src="../../assets/images/edit.png" alt="">
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