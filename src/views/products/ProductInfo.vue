<script setup lang="ts">
import { useRoute } from 'vue-router';
import { defineAsyncComponent, onMounted, ref } from 'vue'
import { getProduct, type Product, type ProductForm } from '@/services/product'
import { OPEN_DELETE_MODAL, OPEN_LOADING_MODAL, CLOSE_LOADING_MODAL, OPEN_NOTIFICATION} from '@/store'


const active = ref(0)
const modalRef = ref()
const sizeModal = ref()
const colorModal = ref()
const route = useRoute()
const TheModal = defineAsyncComponent(() => import('./TheModal.vue'))
const SizeItem = defineAsyncComponent(() => import('./SizeItem.vue'));
const ColorItem = defineAsyncComponent(() => import('./ColorItem.vue'));
const SizeModal = defineAsyncComponent(() => import('./SizeModal.vue'))
const ColorModal = defineAsyncComponent(() => import('./ColorModal.vue'))


const data = ref<{ formInfo: ProductForm }>({
    formInfo: {
        id: 0,
        name: {
            uz: '',
            ru: '',
            eng: '',
        },
        category: {
            id: 0,
            image: '',
            name: {
            uz: '',
            ru: '',
            eng: '',
            },
            type: [],
        },
        type: {
            id: 0,
            category: {
                id: 0,
                image: '',
                name: {
                    uz: '',
                    ru: '',
                    eng: '',
                },
                type: [],
            },
            name: {
                uz: '',
                ru: '',
                eng: '',
            },
            priority: 0,
        },
        details: {
            code: '',
            material: '',
            structure: '',
        },
        sizes: [],
        suggests: [],
        colors: [],
        count: null,
        image: '',
        price: null,
    }
})

async function getItems() {
   OPEN_LOADING_MODAL()
   const [error, response] = await getProduct(route.query.id)
   console.log(response);

//    console.log(JSON.parse(data.formInfo.details));
   

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




function openModal(val: any) {
   modalRef.value.open(val)
}

function openSizeModal(val: any) {
   sizeModal.value.open(val)
}

function openColorModal(val: any) {
   colorModal.value.open(val)
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
        <div class="flex items-center justify-between gap-20 flex-wrap">
            <div @click="$router.go(-1)" class="inline-flex items-center gap-20 bg-white-primary px-24 py-8 rounded-5 cursor-pointer shadow-sm">
                <img class="w-21 h-21" src="../../assets/images/arrow-left-s.png" alt="">
                <p class="text-18">Ortga</p>
            </div>

            <div class="flex items-center gap-10">
                <div role="button" class="changeBox bg-yellow-secondary w-42 h-42 shrink-0 flex items-center justify-center rounded-full border border-gray-secondary shadow-sm" @click="openModal(data.formInfo)">
                    <img class="w-20 h-20" src="@/assets/images/edit.png" alt="">
                </div>
                <div class="changeBox bg-red-secondary w-42 h-42 shrink-0 flex items-center justify-center rounded-full border border-gray-secondary shadow-sm" @click="OPEN_DELETE_MODAL({ text: 'product', title: data.formInfo.name.uz, url: `product/${data.formInfo.id}` })">
                    <img class="w-20 h-20" src="@/assets/images/delete.png" alt="">
                </div>
            </div>
        </div>

        <!-- v-if="data.formInfo.id" -->
        <div>
            <div class="flex items-center flex-wrap gap-5 mb-15">
                <p class="text-20 font-semibold uppercase">{{ data.formInfo.category.name.uz }}</p>
                <p class="text-20 font-semibold uppercase">/ {{ data.formInfo.type?.name.uz }}</p>
                <p class="text-20 font-semibold uppercase">/ {{ data.formInfo.name.uz }}</p>
            </div>
    
            <div class="max-w-1100">
                <!-- Detail -->
                <div class="flex flex-col lg:flex-row lg:items-end gap-20 mb-50">
                    <div class="flex flex-col lg:flex-row w-full gap-10">
                        <div class="images_box flex flex-row lg:flex-col gap-5 overflow-x-scroll shrink-0">
                            <div v-for="(item, index) in data.formInfo.colors" :key="item.id" @click="active = active != index + 1 ? index + 1 : 0" class="w-60 h-60 md:w-80 md:h-80 shrink-0 rounded-6 cursor-pointer bg-white-primary border" :class="active == index + 1 ? 'image_active p-5 opacity-100 border-colour-green' : 'image_not_active p-8 opacity-70 border-gray-secondary'">
                                <base-image :src="item.image" />
                            </div>
                        </div>
        
                        <div class="inline-flex items-center justify-center w-full max-w-500 min-h-300 max-h-500 p-20 border border-gray-secondary bg-white-primary rounded-10 overflow-hidden">
                            <base-image v-if="active == 0" :src="data.formInfo.image" :cover="true"  />
                            <div v-for="(item, index) in data.formInfo.colors" :key="item.id">
                                <base-image v-if="active == index + 1" :src="item.image" :cover="true"  />
                            </div>
                        </div>
                    </div>
    
                    <!-- Information -->
                    <div class="w-full space-y-20">
                        <div class="flex items-end gap-10">
                            <p class="text-18 leading-24">Kod</p>
                            <div class="w-full mb-8 border-b border-dashed border-gray-secondary"></div>
                            <p class="text-18 leading-24 whitespace-nowrap">{{ data.formInfo.details.code }}</p>
                        </div>
                        <div class="flex items-end gap-10">
                            <p class="text-18 leading-24">Material</p>
                            <div class="w-full mb-8 border-b border-dashed border-gray-secondary"></div>
                            <p class="text-18 leading-24 whitespace-nowrap">{{ data.formInfo.details.material }}</p>
                        </div>
                        <div class="flex items-end gap-10">
                            <p class="text-18 leading-24">Structure</p>
                            <div class="w-full mb-8 border-b border-dashed border-gray-secondary"></div>
                            <p class="text-18 leading-24 whitespace-nowrap">{{ data.formInfo.details.structure }}</p>
                        </div>
                    </div>
                </div>

                <!-- Color && Size -->
                <div class="p-20 bg-white-primary border border-gray-secondary rounded-5">
                    <!-- Ranglar -->
                    <div class="flex items-center justify-between mb-20">
                        <p class="text-20 font-bold">Ranglar</p>
                        <div class="flex items-center justify-center p-8 bg-green-primary border border-gray-secondary rounded-5" @click="openColorModal(data.formInfo.id)">
                            <img class="w-21 h-21" src="../../assets/images/add-white.png" alt="">
                        </div>
                    </div>

                    <div v-if="data.formInfo.colors && data.formInfo.colors.length > 0" class="flex items-center gap-15 mb-40">
                        <color-item v-for="item in data.formInfo.colors" :key="item.id" :item="item" @remove="OPEN_DELETE_MODAL({ id: item.id, text: 'rang', title: item.name && item.name.uz ? item.name.uz : null, url: `/color/${item.id}`, callback: getItems })" />
                    </div>
                    <p v-else class="text-gray-secondary mb-40">Ranglar hozircha mavjud emas</p>


                    <!-- Razmerlar -->
                    <div class="flex items-center justify-between mb-20">
                        <p class="text-20 font-bold">Razmerlar</p>
                        <div class="flex items-center justify-center p-8 bg-green-primary border border-gray-secondary rounded-5" @click="openSizeModal(data.formInfo.id)">
                            <img class="w-21 h-21" src="../../assets/images/add-white.png" alt="">
                        </div>
                    </div>

                    <div v-if="data.formInfo.sizes && data.formInfo.sizes.length > 0" class="flex items-center gap-15 mb-40">
                        <size-item v-for="item in data.formInfo.sizes" :key="item.id" :item="item" @remove="OPEN_DELETE_MODAL({ id: item.id, text: 'razmer', title: item.name, url: `/size/${item.id}`, callback: getItems })" />
                    </div>
                    <p v-else class="text-gray-secondary mb-40">Ranglar hozircha mavjud emas</p>
                </div>
            </div>
        </div>


        
        <the-modal @refresh="getItems" ref="modalRef" @toast="val => OPEN_NOTIFICATION({text: val, callback: getItems })" />
        <SizeModal @refresh="getItems" ref="sizeModal" @toast="val => OPEN_NOTIFICATION({text: val, callback: getItems })" />
        <ColorModal @refresh="getItems" ref="colorModal" @toast="val => OPEN_NOTIFICATION({text: val, callback: getItems })" />
    </div>
</template>



<style scoped>
* {
    transition: 0.37s;
}
.images_box::-webkit-scrollbar {
    height: 0;
}
</style>