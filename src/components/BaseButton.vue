<script setup lang="ts">
const props = defineProps({
    text: {
        type: String,
        required: true,
    },
    loading: {
        type: Boolean,
        required: false,
    },
    hideText: {
        type: String,
        required: false,
    },
    plus: {
        type: Boolean,
        required: false,
    }
});

</script>
<template>
    <button class="btn px-15 py-5 md:px-20 md:py-8 lg:px-25 lg:py-10 flex items-center gap-5" :class="props.loading ? 'loading' : ''">
        <img v-if="props.plus" class="w-20 h-20" src="@/assets/images/add-white.png" alt="">
        <div class="flex items-center gap-3">
            <p class="btn_text hidden md:block">{{ props.hideText }}</p>
            <span class="btn_text">{{ props.text }}</span>
            <span class="loader"></span>
        </div>
    </button>
</template>


<style scoped>
.btn {
    border-radius: 5px;
    position: relative;
    white-space: nowrap;
    background: #009A10;
}

.btn_text {
    font-size: 14px;
    font-weight: 600;
    color: #FFFFFF;
    line-height: 22px;
    white-space: nowrap;
    font-family: 'Gilroy';
    letter-spacing: 0.02em;
    text-transform: uppercase;
    
    opacity: 1;
    transform: scale(1);
}

.loading .btn_text {
    opacity: 0;
    transform: scale(0);
}

.loader {
    width: 24px;
	height: 24px;
	border-radius: 50%;
	border: 2px solid white;
	border-left-color: transparent;
	border-right-color: transparent;
	animation: rotate 1.5s linear infinite;

    opacity: 0;
    position: absolute;
    top: calc(50% - 12px);
    left: calc(50% - 10px);
    transform: scale(0);
}

.loading .loader {
    opacity: 1;
    transform: scale(1);
}


@keyframes rotate {
	0% {
		transform: rotateZ(0deg);
	}
	100% {
		transform: rotateZ(360deg);
	}
}

</style>