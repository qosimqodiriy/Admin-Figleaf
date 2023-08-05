<script setup lang="ts">
import { getOrders, type Order } from '@/services/order'
import { defineAsyncComponent, onMounted, ref } from 'vue'
import { OPEN_LOADING_MODAL, CLOSE_LOADING_MODAL } from '@/store'


const TableItem = defineAsyncComponent(() => import('./TableItem.vue'))
const TableTitle = defineAsyncComponent(() => import('./TableTitle.vue'));


const items = ref<{isLoading: boolean, list: Order[]}>({
    list: [],
    isLoading: false,
})

async function getItems() {
   OPEN_LOADING_MODAL()
   const [error, response] = await getOrders()
   console.log(response);
   CLOSE_LOADING_MODAL()
   items.value.list = response
}



onMounted(() => {
    getItems()
})
</script>



<template>
    <div class="space-y-40">
        <p class="title">Buyurtmalar</p>

        <div class="overflow-x-scroll scroll pb-10">
            <div class="w-full min-w-800 h-full space-y-20">
                <table-title />
                <div class="grid grid-cols-1 gap-12">
                    <table-item v-for="item in items.list" :key="item.id" :item="item" />
                </div>
            </div>
        </div>

    </div>
</template>