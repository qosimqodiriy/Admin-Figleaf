<script setup lang="ts">
import { reactive, ref } from 'vue'
import { tabs } from '@/services/data';
import { putContact, reset,  } from '@/services/contact';
import type { Contact, ContactForm, } from '@/services/contact';


const imageRef = ref()
const loading = ref(false)
const emit = defineEmits(["refresh", "toast"])


const title = reactive({
    data: {
        index: 1,
        code: 'uz',
        location: 'Manzil',
        lang: 'O‘zbek tili',
    }
})

const data = reactive<{ display: boolean, formInfo: ContactForm, error: boolean, message: string }>({
    message: '',
    error: false,
    display: false,
    formInfo: {
        phone: '',
        phone2: '',
        email: '',
        address: {
            uz: '',
            ru: '',
            eng: '',
        },
        lat: 0,
        long: 0,
    }
});


async function assign(item: Contact) {
    Object.assign(data.formInfo, item)
}

function open(item: Contact) {
    data.display = true
    title.data = tabs[0]

    assign(item)
}

async function submit() {
    loading.value = true
    
    putContact(data.formInfo).then((res: any) => {
        if (res[1] !== null && res[1] !== undefined) {
            data.display = false
            loading.value = false
            emit('toast', "Bog'lanish yangilandi")
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
  reset(data.formInfo)
  data.display = false
}

defineExpose({
    open
})
</script>
   
<template>
    <Modal v-if="data.display">
      <div class="h-screen flex items-center justify-center fixed top-0 left-0 w-full p-10">
        <div class="bg-white-primary p-20 md:p-32 shadow-lg rounded-16 z-0 w-483 lg:w-700" :class="data.display ? 'z-0 scale-100 animate-blowUp' : ''">
          <div class="flex items-center justify-between gap-8 mb-32">
            <h2 class="text-17 text-black-primary">Tahrirlash</h2>
              
            <img @click="close()" src="@/assets/images/close-black.png" class="cursor-pointer w-24 h-24" alt="">
          </div>

          <form @submit.prevent="submit" class="w-full">
            <div class="flex flex-col lg:flex-row gap-10 mb-10">
                <div class="w-full relative">
                    <input type="text" v-model="data.formInfo.phone" class="base_input" name="phone1" id="phone1" required />
                    <label class="base_label" for="phone1">Phone 1</label>
                </div>

                <div class="w-full relative">
                    <input type="text" v-model="data.formInfo.phone2" class="base_input" name="phone2" id="phone2" required />
                    <label class="base_label" for="phone2">Phone 2</label>
                </div>
            </div>

            <div class="w-full relative mb-20">
              <input type="email" v-model="data.formInfo.email" class="base_input" name="email" id="email" required />
              <label class="base_label" for="email">Email</label>
            </div>

            <div class="space-y-10 mb-30">
                <div class="flex gap-16 border-b-2 border-b-white-secondary">
                    <div v-for="(item) in tabs" :key="item.code" class="relative top-2 cursor-pointer border-b-2 text-16 pb-8" :class="title.data.code === item.code ? 'font-semibold border-b-green-primary text-green-primary' : ' font-normal text-black-primary border-b-transparent'" @click="title.data = item">
                        {{ item.lang }}
                    </div>
                </div>

                <div class="w-full relative mb-10" v-for="(item, index) in data.formInfo.address" :key="index" v-show="index == title.data.code">
                    <textarea v-model="data.formInfo.address[index]" class="base_input min-h-100" :name="`description${index}`" :id="`description${index}`"  rows="4" :required="index == title.data.code ? true : false"></textarea>
                    <label class="base_label" :for="`description${index}`">{{title.data.location}}</label>
                </div>

                <div class="flex flex-col lg:flex-row gap-10 mb-10">
                    <div class="w-full relative">
                        <input type="text" v-model="data.formInfo.lat" class="base_input" name="lat" id="lat" required />
                        <label class="base_label" for="lat">Latitude</label>
                    </div>

                    <div class="w-full relative">
                        <input type="text" v-model="data.formInfo.long" class="base_input" name="long" id="long" required />
                        <label class="base_label" for="long">Longitude</label>
                    </div>
                </div>
            </div>

            <p v-if="data.error" class="text-red-primary mb-30">{{ data.message }}</p>

            <base-button text="Saqlash" type="submit" :loading="loading" />
          </form>
        </div>
      </div>
    </Modal>
  </template>