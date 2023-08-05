<script setup lang="ts">
const props = defineProps({
    item: { type: Object, required: true }
})

</script>


<template>
    <router-link :to="{path: '/order', query:{id: JSON.stringify(item.id)}}">
        <div class="flex items-center justify-between rounded-5 gap-15 px-15 py-10 bg-white-primary shadow hover:shadow-md">
            <p class="w-200 text-17">{{ item.name }}</p>
            <p class="w-160 text-17">{{ item.phone }}</p>
            <p class="w-200 text-17">{{ item.email }}</p>
            <p class="w-110 text-17">{{ item.products.length }} ta</p>
        </div>
    </router-link>
</template>