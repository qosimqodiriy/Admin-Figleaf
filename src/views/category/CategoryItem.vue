<script setup lang="ts">
const emit = defineEmits(["edit", "remove"])

const props = defineProps({
    item: { type: Object, required: true }
})

</script>


<template>
    <div class="card flex p-5 w-full h-full rounded-5 lg:rounded-8 border border-gray-secondary bg-white-primary relative">
        <div class="px-20 py-10 flex flex-col w-full">
            <p class="text-16 md:text-18 xl:text-20 mb-auto max-w-202 flex-wrap">{{ item.name.uz }}</p>

            <div class="flex items-center justify-between gap-8">
                <p class="text-16 leading-19 font-medium">Ko'rish</p>

                <img class="arrow_right w-18 h-18 rotate-180" src="../../assets/icons/arrow-left-s.png" alt="arrow">
            </div>
        </div>

        <div class="w-full flex justify-end max-h-200 min-h-180 rounded-5 overflow-hidden border border-gray-secondary">
            <base-image :src="item.image" class="max-w-full max-h-full object-cover object-center" />
            <!-- <img class="max-w-full max-h-full object-cover object-center" src="https://as1.ftcdn.net/v2/jpg/01/41/22/06/1000_F_141220644_1ZhSyys3lIkndGQDFvJEZFiGI0rSg5JX.jpg" alt="product"> -->
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