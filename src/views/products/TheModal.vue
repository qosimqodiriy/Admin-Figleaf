<script setup lang="ts">
import { reactive, ref } from 'vue'
import { tabs } from '@/services/data';
import { postPutProduct, reset,  } from '@/services/product';
import type { Product, ProductForm, } from '@/services/product';
import { getCategories, type Category } from '@/services/category';

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
const isChange = ref(false)
const emit = defineEmits(["refresh", "toast"])

const types = ref<{ list: any }>({ list: [] })
const categories = ref<{ list: Category[] }>({ list: [] })
const data = reactive<{ display: boolean, formInfo: ProductForm, error: boolean, message: string }>({
    message: '',
    error: false,
    display: false,
    formInfo: {
        id: 0,
        name: {
            uz: '',
            ru: '',
            eng: '',
        },
        category: {
            id: 0,
            image: '',
            name: {
            uz: '',
            ru: '',
            eng: '',
            },
            type: [],
        },
        type: {
            id: 0,
            category: {
                id: 0,
                image: '',
                name: {
                    uz: '',
                    ru: '',
                    eng: '',
                },
                type: [],
            },
            name: {
                uz: '',
                ru: '',
                eng: '',
            },
            priority: 0,
        },
        details: {
            code: '',
            material: '',
            structure: '',
        },
        sizes: [],
        suggests: [],
        colors: [],
        count: null,
        image: '',
        price: null,
    }
});


async function assign(item: Product) {
    Object.assign(data.formInfo, item)

    setTimeout(() => {
        imageRef.value.setImage(item.image)
    }, 100)
}

async function Categories() {
   const [error, response] = await getCategories()
   console.log(response);
   categories.value.list = response
}


function change() {
    isChange.value = true;

    categories.value.list.forEach(category => {
        if(category.id == data.formInfo.category.id) {
            types.value.list = category.type;
        }
    })
}

function open(item: Product) {
    data.display = true
    title.data = tabs[0]
    isChange.value = false
    
    Categories()
    if (item.id !== undefined) {
        assign(item)
    } else {
        reset(data.formInfo)
        data.formInfo.price = null;
    }
}

async function submit() {
    loading.value = true
    data.formInfo.image = await imageRef.value.getImage()
    
    postPutProduct(data.formInfo).then((res: any) => {
        if (data.formInfo.id != null && res[1] !== null && res[1] !== undefined) {
            data.display = false
            loading.value = false
            emit('toast', 'Mahsulot yangilandi')
        } else if (res[1] !== null && res[1] !== undefined) {
            data.display = false
            loading.value = false
            emit('toast', 'Yangi mahsulot qo‘shildi')
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
        <div class="bg-white-primary p-20 md:p-32 shadow-lg rounded-16 z-0 w-full md:w-700 lg:w-800" :class="data.display ? 'z-0 scale-100 animate-blowUp' : ''">
          <div class="flex items-center justify-between gap-8 mb-32">
            <h2 class="text-17 text-black-primary">{{ data.formInfo.id ? 'Tahrirlash' : 'Yangi qo‘shish' }}</h2>
              
            <img @click="close()" src="@/assets/images/close-black.png" class="cursor-pointer w-24 h-24" alt="">
          </div>

  
          <form @submit.prevent="submit" class="w-full">
            <div class="flex flex-col md:flex-row md:items-end gap-20 mb-30">
                <div class="w-120 md:w-150 lg:w-200 h-150 md:h-180 lg:h-250 rounded-5 border border-gray-secondary bg-white-secondary shrink-0">
                    <image-box ref="imageRef"  class="w-full h-full rounded-3" />
                </div>
                <div class="w-full space-y-10">
                    <div class="flex flex-col md:flex-row gap-10">
                        <div class="w-full relative">
                            <select v-model="data.formInfo.category.id" @change="change" class="base_input" id="category" name="category" required>
                                <option v-for="category in categories.list" :key="category.id" class="text-18" :value="category.id">{{ category.name.uz }}</option>
                            </select>
                            <label class="base_label select" for="category">Categoriya</label>
                        </div>

                        <!-- v-if="isChange" -->
                        <div class="w-full relative">
                            <select v-model="data.formInfo.type.id" class="base_input" id="type" name="type" required>
                                <option v-for="item in types.list" :key="item.id" class="text-18" :value="item.id">{{ item.name.uz }}</option>
                            </select>
                            <label class="base_label select" for="type">Type</label>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div class="w-full relative">
                          <input type="number" v-model="data.formInfo.price" class="base_input" name="price" id="price" required />
                          <label class="base_label" for="price">Narxi</label>
                        </div>
                        <div class="w-full relative">
                          <input type="text" v-model="data.formInfo.details.code" class="base_input" name="code" id="code" required />
                          <label class="base_label" for="code">Kod</label>
                        </div>
                        <div class="w-full relative">
                          <input type="text" v-model="data.formInfo.details.material" class="base_input" name="material" id="material" required />
                          <label class="base_label" for="material">Material</label>
                        </div>
                        <div class="w-full relative">
                          <input type="text" v-model="data.formInfo.details.structure" class="base_input" name="structure" id="structure" required />
                          <label class="base_label" for="structure">Structure</label>
                        </div>

                    </div>

        
                </div>
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

                <!-- <div class="w-full relative">
                    <input type="number" v-model="data.formInfo.priority" class="base_input" name="priority" id="priority" required />
                    <label class="base_label" for="priority">Priority</label>
                </div> -->
            </div>

            <p v-if="!data.error" class="text-red-primary mb-30">{{ data.message }}</p>

            <!-- <base-button :text="true ? 'Saqlash' : `Yangi qo'shish`" type="submit" :loading="loading" /> -->
            <base-button :text="data.formInfo.id ? 'Saqlash' : `Yangi qo'shish`" type="submit" :loading="loading" />
          </form>
        </div>
      </div>
    </Modal>
  </template>