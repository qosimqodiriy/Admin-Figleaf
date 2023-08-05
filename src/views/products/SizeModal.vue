<script setup lang="ts">
import { reactive, ref } from 'vue'
import { postSize } from '@/services/product';

const loading = ref(false)
const emit = defineEmits(["refresh", "toast"])

const data = reactive<{ display: boolean, formInfo: any, error: boolean, message: string }>({
    message: '',
    error: false,
    display: false,
    formInfo: {
        name: '',
        price: null,
        productId: null,
    }
});


async function assign(productId: number) {
    data.formInfo.productId = productId;
}

function open(num: number) {
    data.display = true

    assign(num)
}

async function submit() {
    loading.value = true
    console.log(data.formInfo);
    data.formInfo.name = data.formInfo.name.toUpperCase();
    
    
    postSize(data.formInfo).then((res: any) => {
        if (res[1] !== null && res[1] !== undefined) {
            data.display = false
            loading.value = false
            emit('toast', 'Yangi razmer qo‘shildi')
        } else {
            data.error = true
            console.log(res[0]);
            loading.value = false;
            data.message = res[0].message;

            setTimeout(() => {
                data.error = false;
            }, 3000);
        }
    })
}


function close() {
//   emit("refresh")
  data.display = false
}

defineExpose({
    open
})
</script>
   
<template>
    <Modal v-if="data.display">
      <div class="h-screen flex items-center justify-center fixed top-0 left-0 w-full p-10">
        <div class="bg-white-primary p-20 md:p-32 shadow-lg rounded-16 z-0 w-483" :class="data.display ? 'z-0 scale-100 animate-blowUp' : ''">
          <div class="flex items-center justify-between gap-8 mb-32">
            <h2 class="text-17 text-black-primary">Yangi razmer qo'shish</h2>
              
            <img @click="close()" src="@/assets/images/close-black.png" class="cursor-pointer w-24 h-24" alt="">
          </div>

  
          <form @submit.prevent="submit" class="w-full">
            <div class="w-full relative mb-10">
              <input type="text" v-model="data.formInfo.name" class="base_input uppercase" name="name" id="name" required />
              <label class="base_label" for="name">Razmer</label>
            </div>

            <div class="w-full relative mb-30">
              <input type="number" v-model="data.formInfo.price" class="base_input" name="price" id="price" required />
              <label class="base_label" for="price">Narxi</label>
            </div>

            <p v-if="!data.error" class="text-red-primary mb-30">{{ data.message }}</p>

            <base-button text="Yangi qo'shish" type="submit" :loading="loading" />
          </form>
        </div>
      </div>
    </Modal>
  </template>