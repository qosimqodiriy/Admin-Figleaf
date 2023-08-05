<script setup lang="ts">
import { defineAsyncComponent, onMounted, ref } from 'vue'
import { getProducts, type Product } from '@/services/product'
import { OPEN_DELETE_MODAL, OPEN_LOADING_MODAL, CLOSE_LOADING_MODAL, OPEN_NOTIFICATION} from '@/store'


const modalRef = ref()
const TheModal = defineAsyncComponent(() => import('./TheModal.vue'))
const ProductItem = defineAsyncComponent(() => import('./ProductItem.vue'));


const items = ref<{isLoading: boolean, list: Product[]}>({
    list: [],
    isLoading: false,
})

async function getItems() {
   OPEN_LOADING_MODAL()
   const [error, response] = await getProducts()
   console.log(response);
   CLOSE_LOADING_MODAL()
   items.value.list = response;
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

</script>



<template>
    <div class="space-y-40">
        <div class="flex items-center justify-between gap-20">
            <p class="title">Mahsulotlar</p>
            <base-button text="qo'shish" hideText="Yangi mahsulot" @click="openModal" />
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-10 md:gap-12 lg:gap-15">
            <product-item v-for="item in items.list" :key="item.id" :item="item"   @edit="openModal" @remove="OPEN_DELETE_MODAL({ id: item.id, text: 'product', title: item.name.uz, url: `/product/${item.id}`, callback: getItems })" />
        </div>


        
        <the-modal @refresh="getItems" ref="modalRef" @toast="val => OPEN_NOTIFICATION({text: val, callback: getItems })" />
    </div>
</template>