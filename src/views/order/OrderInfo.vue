<script setup lang="ts">
import { useRoute } from 'vue-router';
import { phoneNum } from '@/services/Function';
import { defineAsyncComponent, onMounted, ref } from 'vue'
import { getOrder, type OrderForm } from '@/services/order'
import { OPEN_LOADING_MODAL, CLOSE_LOADING_MODAL } from '@/store'

const OrderItem = defineAsyncComponent(() => import('./OrderItem.vue'))


const route = useRoute()
const data = ref<{ formInfo: OrderForm }>({
    formInfo: {
        id: 0,
        phone: '',
        name: '',
        email: '',
        message: '',
        products: [],
    }
})

async function getItems() {
   OPEN_LOADING_MODAL()
   const [error, response] = await getOrder(route.query.id)
   console.log(response);
   CLOSE_LOADING_MODAL()
   data.value.formInfo = response
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



onMounted(() => {
    getItems()
})
</script>



<template>
    <div class="space-y-40">
        <div @click="$router.go(-1)" class="inline-flex items-center gap-20 bg-white-primary px-24 py-8 rounded-5 cursor-pointer shadow-sm">
            <img class="w-21 h-21" src="../../assets/images/arrow-left-s.png" alt="">
            <p class="text-18">Ortga</p>
        </div>
        

        <div class="bg-white-primary p-15 md:p-20 lg:p-30 rounded-10 lg:rounded-20 space-y-15 max-w-700 mb-40">
            <div class="flex items-center gap-15">
                <img class="w-24 h-24 object-cover" src="../../assets/icons/user.png" alt="">
                <p class="text-26 leading-24">{{ data.formInfo.name }}</p>
            </div>
            <div class="flex items-center gap-15">
                <img class="w-24 h-24 object-cover" src="../../assets/icons/phone.png" alt="">
                <p class="text-18 leading-20">{{ phoneNum(data.formInfo.phone ? data.formInfo.phone : '') }}</p>
            </div>
            <div class="flex items-center gap-15">
                <img class="w-24 h-24 object-cover" src="../../assets/icons/mail.png" alt="">
                <p class="text-18 leading-20">{{ data.formInfo.email }}</p>
            </div>
            <div v-if="data.formInfo.message" class="flex items-start gap-15">
                <img class="w-24 h-24 object-cover" src="../../assets/icons/message.png" alt="">
                <p class="text-18 leading-20 pt-3">{{ data.formInfo.message }}</p>
            </div>
        </div>

        <p class="title mb-20">Buyurtmalar</p>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-10 md:gap-12 lg:gap-15">
            <order-item v-for="item in data.formInfo.products" :key="item.id" :item="item" />
        </div>
    
    </div>
</template>



<style scoped>
* {
    transition: 0.37s;
}
</style>