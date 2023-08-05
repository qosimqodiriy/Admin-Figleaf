<script setup lang="ts">
import { defineAsyncComponent, onMounted, ref } from 'vue'
import { getCategories, type Category } from '@/services/category'
import { OPEN_DELETE_MODAL, OPEN_LOADING_MODAL, CLOSE_LOADING_MODAL, OPEN_NOTIFICATION} from '@/store'


const modalRef = ref()
const TheModal = defineAsyncComponent(() => import('./TheModal.vue'))
const CategoryItem = defineAsyncComponent(() => import('./CategoryItem.vue'));


const items = ref<{isLoading: boolean, list: Category[]}>({
    list: [],
    isLoading: false,
})

async function getItems() {
   OPEN_LOADING_MODAL()
   const [error, response] = await getCategories()
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
            <p class="title">Kategoriyalar</p>
            <base-button text="qo'shish" hideText="Yangi kategoriya" @click="openModal" />
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-10 md:gap-12 lg:gap-15">
            <category-item v-for="item in items.list" :key="item.id" :item="item"   @edit="openModal" @remove="OPEN_DELETE_MODAL({ id: item.id, text: 'kategoriya', title: item.name.uz, url: `/category/${item.id}`, callback: getItems })" />
        </div>


        
        <the-modal @refresh="getItems" ref="modalRef" @toast="val => OPEN_NOTIFICATION({text: val, callback: getItems })" />
    </div>
</template>