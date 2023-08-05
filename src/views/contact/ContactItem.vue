<script setup lang="ts">
const emit = defineEmits(["edit", "remove"])

const props = defineProps({
    item: { type: Object, required: true }
})

</script>


<template>
    <div class="card flex bg-white-primary rounded-5 lg:rounded-8 p-15 border border-gray-secondary relative">
        <div class="space-y-15">
            <div class="flex flex-wrap items-center gap-x-20 gap-y-10">
                <div class="flex items-center gap-10">
                    <img class="w-24 h-24" src="../../assets/icons/phone.png" alt="">
                    <p class="text-17">{{ item.phone }}</p>
                </div>
                <div class="flex items-center gap-10">
                    <img class="w-24 h-24" src="../../assets/icons/phone.png" alt="">
                    <p class="text-17">{{ item.phone2 }}</p>
                </div>
            </div>
            
            <p class="text-18">{{ item.email }}</p>
            <p class="text-18">{{ item.address.uz }}</p>
        </div>

        <div class="flex gap-5 absolute top-10 right-10 z-10">
            <div role="button" class="changeBox bg-yellow-secondary w-36 h-36 shrink-0 flex items-center justify-center rounded-full border border-gray-secondary shadow-sm" @click="emit('edit', props.item)">
                <img class="w-20 h-20" src="@/assets/images/edit.png" alt="">
            </div>
            <!-- <div role="button" class="changeBox bg-red-secondary w-36 h-36 shrink-0 flex items-center justify-center rounded-full border border-gray-secondary shadow-sm" @click="emit('remove', props)">
                <img class="w-20 h-20" src="@/assets/images/delete.png" alt="">
            </div> -->
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