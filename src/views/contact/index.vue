<script setup lang="ts">
import { defineAsyncComponent, onMounted, ref } from 'vue'
import { getContact, type Contact } from '@/services/contact'
import { OPEN_DELETE_MODAL, OPEN_LOADING_MODAL, CLOSE_LOADING_MODAL, OPEN_NOTIFICATION} from '@/store'


const modalRef = ref()
const TheModal = defineAsyncComponent(() => import('./TheModal.vue'))
const ContactItem = defineAsyncComponent(() => import('./ContactItem.vue'));


const items = ref<{isLoading: boolean, list: Contact}>({
    isLoading: false,
    list: {
        phone: '',
        phone2: '',
        email: '',
        address: {
            uz: '',
            ru: '',
            eng: '',
        },
        lat: 0,
        long: 0,
    },
})

async function getItems() {
   OPEN_LOADING_MODAL()
   const [error, response] = await getContact()
   console.log(response);
   CLOSE_LOADING_MODAL()
   items.value.list = response
}



// document.addEventListener('keydown', evt => {
//     if (evt.key === 'Escape') {
//         _changeBox.value = false;
//     }
// });

// document.addEventListener('click', (evt: any) => {
//     if (!evt?.srcElement?.classList.contains('img_more')) {
//         _changeBox.value = false;
//     }
// });




function openModal(val: any) {
   modalRef.value.open(val)
}

onMounted(() => {
    getItems()
})

// onUnmounted(() => {
//     show.value = false
// })



// OPEN_DELETE_MODAL({ callback: getItems, text: 'ijtimoiy tarmoq', title: item.title.uz, url: `merchant/category/group/${item.id}` })
</script>



<template>
    <div class="space-y-40">
        <div class="flex items-center justify-between gap-20">
            <p class="title">Bog‘lanish</p>
            <!-- <base-button text="qo'shish" hideText="Yangi tarmoq" @click="openModal" /> -->
        </div>

        <div class="max-w-700">
            <contact-item  :item="items.list"  @edit="openModal" />
        </div>


        
        <the-modal @refresh="getItems" ref="modalRef" @toast="val => OPEN_NOTIFICATION({text: val, callback: getItems })" />
    </div>
</template>