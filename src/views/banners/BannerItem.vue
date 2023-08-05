<script setup lang="ts">
const emit = defineEmits(["edit", "remove"])

const props = defineProps({
    item: { type: Object, required: true }
})

</script>


<template>
    <div class="card flex bg-white-primary rounded-5 lg:rounded-8 px-10 py-8 border border-gray-secondary relative">
    <!-- <div class="card flex bg-white-primary rounded-5 md:rounded-8 lg:rounded-12 px-20 py-10 border border-gray-secondary relative"> -->
        <div class="flex flex-col w-full relative">
            <div class="flex items-center justify-center w-full max-h-285 min-h-235 flex-1 rounded-3 shrink-0 overflow-hidden mb-10">
                <base-image :src="item.image" class="max-w-full max-h-full" />
            </div>

            <p class="text-17 font-bold line-clamp-1 break-all">{{ item.name.uz }}</p>
        </div>

        <div class="flex gap-5 absolute top-10 right-10 z-10">
            <div role="button" class="changeBox bg-yellow-secondary w-36 h-36 shrink-0 flex items-center justify-center rounded-full border border-gray-secondary shadow-sm" @click="emit('edit', props.item)">
                <img class="w-20 h-20" src="@/assets/images/edit.png" alt="">
            </div>
            <div role="button" class="changeBox bg-red-secondary w-36 h-36 shrink-0 flex items-center justify-center rounded-full border border-gray-secondary shadow-sm" @click="emit('remove', props)">
                <img class="w-20 h-20" src="@/assets/images/delete.png" alt="">
            </div>
        </div>
    </div>
</template>


<style scoped>
.card {
    transition: 0.2s;
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