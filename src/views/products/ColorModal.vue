<script setup lang="ts">
import { reactive, ref } from 'vue'
import { tabs } from '@/services/data';
import { postColor, type ColourForm  } from '@/services/product';

const title = reactive({
    data: {
        index: 1,
        code: 'uz',
        title: 'Sarlavha',
        lang: 'O‘zbek tili',
    }
})

const imageRef = ref()
const loading = ref(false)
const emit = defineEmits(["refresh", "toast"])

const data = reactive<{ display: boolean, formInfo: ColourForm, error: boolean, message: string }>({
    message: '',
    error: false,
    display: false,
    formInfo: {
        hex: '',
        name: {
            uz: '',
            ru: '',
            eng: '',
        },
        image: '',
        product: {
            id: 0,
        },
    }
});


async function assign(productId: number) {
    data.formInfo.product.id = productId;
}

function open(num: number) {
    data.display = true
    title.data = tabs[0]
    data.formInfo.hex = '#FFFFFF';

    assign(num)
}

async function submit() {
    loading.value = true
    data.formInfo.image = await imageRef.value.getImage()

    if(data.formInfo.image != '') {
        postColor(data.formInfo).then((res: any) => {
            if (res[1] !== null && res[1] !== undefined) {
                data.display = false
                loading.value = false
                emit('toast', 'Yangi rang qo‘shildi')
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
    } else {
        data.error = true
        loading.value = false;
        data.message = "Iltimos rasm joylang";

        setTimeout(() => {
            data.message = '';
            data.error = false;
        }, 3000);
    }
    
    
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
        <div class="bg-white-primary p-20 md:p-32 shadow-lg rounded-16 z-0 w-full md:w-600" :class="data.display ? 'z-0 scale-100 animate-blowUp' : ''">
          <div class="flex items-center justify-between gap-8 mb-32">
            <h2 class="text-17 text-black-primary">Yangi Rang qo'shish</h2>
              
            <img @click="close()" src="@/assets/images/close-black.png" class="cursor-pointer w-24 h-24" alt="">
          </div>

          <form @submit.prevent="submit" class="w-full">
            <div class="flex flex-col md:flex-row items-center md:items-end gap-20 mb-30">
                <div class="w-120 h-150 md:w-150 md:h-180 rounded-5 border border-gray-secondary bg-white-secondary shrink-0">
                    <image-box ref="imageRef"  class="w-full h-full rounded-3" />
                </div>

                

                <div class="w-full">
                    <div class="flex gap-16 border-b-2 border-b-white-secondary mb-20">
                        <div v-for="(item) in tabs" :key="item.code" class="relative top-2 cursor-pointer border-b-2 text-16 pb-8" :class="title.data.code === item.code ? 'font-semibold border-b-green-primary text-green-primary' : ' font-normal text-black-primary border-b-transparent'" @click="title.data = item">
                            {{ item.lang }}
                        </div>
                    </div>
                    
                    <div class="w-full relative mb-15" v-for="(item, index) in data.formInfo.name" :key="index" v-show="index == title.data.code">
                        <input type="text" v-model="data.formInfo.name[index]" class="base_input" :name="`name${index}`" :id="`name${index}`" :required="index == title.data.code ? true : false" />
                        <label class="base_label" :for="`name${index}`">{{ title.data.title }}</label>
                    </div>

                    <div class="flex items-center gap-10">
                        <div class="w-full relative">
                            <input type="text" v-model="data.formInfo.hex" pattern="[#]{1}[A-Za-z0-9]{6}" maxlength="7" class="base_input" name="colour" id="colour" required />
                            <label class="base_label" for="colour">Rangi</label>
                        </div>
                        <div class="w-46 h-46 border border-gray-secondary rounded-4 overflow-hidden shrink-0">
                            <input type="color" v-model="data.formInfo.hex" class="w-150% h-150% border-none outline-none scale-125 -translate-y-10%">
                        </div>
                    </div>
                </div>
            </div>

            <p v-if="data.error" class="text-red-primary mb-30">{{ data.message }}</p>

            <base-button text="Yangi qo'shish" type="submit" :loading="loading" />
          </form>
        </div>
      </div>
    </Modal>
  </template>