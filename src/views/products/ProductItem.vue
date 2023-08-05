<script setup lang="ts">
import { formatPrice } from '@/services/Function';

const emit = defineEmits(["edit", "remove"])
const props = defineProps({ item: { type: Object, required: true } })
</script>


<template>
    <router-link :to="{path: 'product', query:{id: JSON.stringify(item.id)}}" class="card bg-white-primary rounded-5 lg:rounded-8 px-15 py-10 border border-gray-secondary relative">
        <p class="title text-20 lg:text-22 xl:text-24 2xl:text-28 font-babesNeue line-clamp-2 break-all">{{ item.name.uz }}</p>
        <div class="flex items-start justify-between gap-10 mb-10">
            <p class="text-16 text-black-secondary font-interfaces">{{ item.category.name.uz }}</p>
            <p class="text-14 text-green-primary font-interfaces">{{ formatPrice(item.price) }} so'm</p>
        </div>
        
        <div class="flex items-center justify-center flex-1 w-full relative min-h-250">
            <base-image :src="item.image" :cover="true" class="card_img w-full max-w-full px-15 lg:px-20 py-10 lg:py-15" />
            <!-- <img class="card_img w-full max-w-full px-20 lg:px-30 py-10 lg:py-15" src="../../assets/images/product_img_3.png" alt=""> -->
        </div>


        <!-- <div class="flex gap-5 absolute top-10 right-10 z-10">
            <div role="button" class="changeBox bg-yellow-secondary w-36 h-36 shrink-0 flex items-center justify-center rounded-full border border-gray-secondary shadow-sm" @click="emit('edit', props.item)">
                <img class="w-20 h-20" src="@/assets/images/edit.png" alt="">
            </div>
            <div role="button" class="changeBox bg-red-secondary w-36 h-36 shrink-0 flex items-center justify-center rounded-full border border-gray-secondary shadow-sm" @click="emit('remove', props)">
                <img class="w-20 h-20" src="@/assets/images/delete.png" alt="">
            </div>
        </div> -->
    </router-link>
</template>


<style scoped>
.card {
    transition: 0.2s;
}

.card_img {
    filter: drop-shadow(1px 1px 3px rgba(0, 0, 0, 0.7));
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