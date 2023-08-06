<script setup lang="ts">
import { reactive, ref } from 'vue'
import { putPassword } from '@/services/password';
import type { Password, PasswordForm, } from '@/services/password';


const loading = ref(false)
const emit = defineEmits(["refresh", "toast"])
const data = reactive<{ display: boolean, formInfo: PasswordForm, error: boolean, message: string }>({
    message: '',
    error: false,
    display: false,
    formInfo: {
        id: 0,
        username: '',
        password: '',
    }
});


async function assign(item: Password) {
    Object.assign(data.formInfo, item)
}

function open(item: Password) {
    assign(item)
    data.display = true
}

async function submit() {
    loading.value = true
    
    putPassword(data.formInfo).then((res: any) => {
        if (res[1] !== null && res[1] !== undefined) {
            data.display = false
            loading.value = false
            emit('toast', 'Password yangilandi')
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
            <h2 class="text-17 text-black-primary">Tahrirlash</h2>
              
            <img @click="close()" src="@/assets/images/close-black.png" class="cursor-pointer w-24 h-24" alt="">
          </div>

  
          <form @submit.prevent="submit" class="w-full">
            <div class="w-full relative mb-10">
              <input type="text" v-model="data.formInfo.username" class="base_input" name="username" id="username" required />
              <label class="base_label" for="username">Username</label>
            </div>

            <div class="w-full relative mb-30">
              <input type="text" v-model="data.formInfo.password" class="base_input" name="password" id="password" required />
              <label class="base_label" for="password">Password</label>
            </div>

            <p v-if="!data.error" class="text-red-primary mb-30">{{ data.message }}</p>

            <base-button text="Saqlash" type="submit" :loading="loading" />
          </form>
        </div>
      </div>
    </Modal>
</template>