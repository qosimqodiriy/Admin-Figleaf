<script setup lang="ts">
const props = defineProps({ item: { type: Object, required: true } })
</script>


<template>
    <div class="card bg-white-primary rounded-5 lg:rounded-8 px-15 py-10 border border-gray-secondary relative">
        <p class="title text-20 lg:text-22 xl:text-24 2xl:text-28 font-babesNeue line-clamp-2 break-all mb-10">{{ item.name.uz }}</p>
        
        <div class="flex items-start justify-between gap-10 mb-10">
            <div class="flex items-center gap-10">
                <div class="w-21 h-21 overflow-hidden">
                    <img class="w-22 h-22 scale-150" src="../../assets/icons/size.png" alt="">
                </div>
                <p class="leading-20">{{ item.size.name }}</p>
            </div>
            <div class="flex items-center gap-10">
                <div class="w-20 h-20 p-3 rounded-3 overflow-hidden bg-black-primary">
                    <img class="max-w-full" src="../../assets/icons/code.png" alt="">
                </div>
                <p class="leading-20">{{ item.details.code }}</p>
            </div>
        </div>

        <div class="flex items-center justify-between gap-10 mb-10">
            <p class="text-17">Mahsulot soni: </p>
            <p class="text-17">{{ item.count }} ta</p>
        </div>
        
        <div class="flex items-center justify-center flex-1 w-full relative min-h-250">
            <base-image :src="item.image" :cover="true" class="card_img w-full max-w-full px-20 lg:px-30 py-10 lg:py-15" />
        </div>
    </div>
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