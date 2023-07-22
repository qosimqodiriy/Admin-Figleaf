<script setup lang="ts">
// import router from '@/router'
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { handleAuth } from "@/services/common";
import { reactive, ref } from "@vue/reactivity";



const data = reactive<{ login: string, password: string, loading: boolean, passwordError: string }>({
  login: '',
  password: '',
  loading: false,
  passwordError: '',
})

const router = useRouter()
const path = sessionStorage.getItem('path')
function handleSubmit() {
    data.loading = true;
    if (data.passwordError === '') {
        data.loading = true;
      handleAuth(data.login, data.password).then((res: any) => {
        console.log(res);

        if (res[0] === null) {
          data.loading = false;
          sessionStorage.setItem('token', res[1].token)
          if (path) {
            router.push(path)
          } else {
            router.push('/')
          }
        } else {
          data.loading = false;
          data.passwordError = 'Parol yoki foydalanuvchi nomi xato';

          setTimeout(() => {
            data.passwordError = ''
          }, 3000)
          router.push('/login')
        }
      })
    }
}

onMounted(() => {
//   setTimeout(() => {
//     let phone = document.getElementById('phone') as HTMLInputElement;

//     phone.addEventListener('input', function (e: any) {
//       var x = e.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,3})(\d{0,2})(\d{0,2})/);
//       e.target.value = !x[2] ? x[1] : + x[1] + ' ' + x[2] + (x[3] ? ' ' + x[3] : '') + (x[4] ? ' ' + x[4] : '');
//     });
//   }, 200);
})


</script>

<template>
  <teleport to='body'>
    <div class="absolute top-0 left-0 w-full h-screen flex justify-center items-center p-10 login">
      <div class="bg-white-primary  px-20 md:px-30 py-25 md:py-36 rounded-15 w-full md:max-w-500">
        <form action="" method="post" @submit.prevent="handleSubmit">
          <div class="flex flex-col relative space-y-15">
            <!-- <div class="flex items-center bg-white-secondary pl-16 gap-4 border border-gray-secondary rounded-10 mb-16 relative overflow-hidden">
              <img class="w-20 h-20 rounded-full object-cover" src="@/assets/images/uz-flag.png" alt="">
              <p class="py-14 ml-4">+998</p>
              <input type="text" maxlength="12" minlength="12" v-model="phone" id="phone" class="py-14 pl-4 w-full bg-white-secondary rounded-r-10" :class="phoneError ? 'text-red-primary' : ''" placeholder="00 000 00 00" required>
            </div> -->

            <div class="w-full relative">
              <input class="base_input" type="text" v-model="data.login" name="login" id="login" required  autocomplete="off" autofocus>
              <label class="base_label" for="login">Login</label>
            </div>

            <div class="w-full relative">
              <input class="base_input" type="text" v-model="data.password" name="password" id="password" required  autocomplete="off" autofocus>
              <label class="base_label" for="password">Password</label>
            </div>
          </div>

          <p v-if="data.passwordError !== ''" class="text-red-primary mt-16">{{data.passwordError}}</p>

          <base-button text="Yuborish" type="submit" :loading="data.loading" class="mt-30 float-rights" />
        </form>


      </div>
    </div>
  </teleport>
</template>

<style scoped>

.login {
  z-index: 99 !important;
  /* background-image: url('@/assets/images/login.png'); */
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;
  background-color: #f4f4f4;
}
</style>