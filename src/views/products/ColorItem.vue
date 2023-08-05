<script setup lang="ts">
const emit = defineEmits(["edit", "remove"])

const props = defineProps({
    item: { type: Object, required: true }
})

</script>

<template>
    <div class="card w-50 h-50 rounded-5 border border-gray-secondary shadow p-2 relative" :style="`background-color: ${item.hex};`">
        <div class="delete absolute top-3 right-3 bg-white-primary w-30 h-30 flex items-center justify-center rounded-full border border-gray-secondary" @click="emit('remove', props.item)">
            <img class="w-18 h-18" src="../../assets/images/delete.png" alt="">
        </div>
    </div>
</template>


<style scoped>
.card {
    transition: 0.2s;
}

.delete {
    opacity: 0;
    z-index: 1;
    cursor: pointer;
    transition: 0.2s;
    transform: scale(0.8);
}

.card:hover .delete {
    opacity: 100;
    transform: scale(1);
}


@media (max-width: 768px) {
    .card .delete {
        opacity: 100;
        transform: scale(1);
    }
}
</style>