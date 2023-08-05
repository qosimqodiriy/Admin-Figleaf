<script setup lang="ts">
import { onMounted, ref } from 'vue';
import router from '@/router'
import { deleteItem } from '@/services/common';
import { _deleteModal, CLOSE_DELETE_MODAL } from '@/store';

const message = ref('')
const error = ref(false)
const emit = defineEmits(["submit"]);

onMounted(() => {
  message.value = '';
  error.value = false;
})


async function submit() {
  const repsonse = await deleteItem({ id: _deleteModal.id }, _deleteModal.url).then((res: any) => {
    if(res[1] != null && res[1] != undefined) {
      if (_deleteModal.callback === undefined) {
        router.go(-1)
      }
      CLOSE_DELETE_MODAL()
    } else if(res[0] != null && res[0].response.status != 409) {
      if (_deleteModal.callback === undefined) {
        router.go(-1)
      }
      CLOSE_DELETE_MODAL()
    } else if(res[0] != null && res[0].response.status == 409) {
      error.value = true;
      message.value = "Bu elementni o'chirib bo'lmaydi";

      setTimeout(() => {
        error.value = false;
        message.value = '';
        CLOSE_DELETE_MODAL()
      }, 3000);
    } else {
      alert("Error" + res[1].message);
      CLOSE_DELETE_MODAL()
    }
  })
  
}

function closeModal() {
  message.value = '';
  error.value = false;
  CLOSE_DELETE_MODAL()
}


document.addEventListener('keydown', evt => {
  if (_deleteModal.visible && evt.key === 'Enter') {
    submit()
  }
});

</script>

<template>
  <Modal v-if="_deleteModal.visible">
    <div class="h-full w-full flex justify-center items-center">
      <div class="bg-white-primary p-32 shadow-lg rounded-20 w-400" :class="_deleteModal.visible ? 'z-0 scale-100 animate-blowUp': ''">
        <div class="flex items-start justify-between">
          <div class="bg-red-secondary  w-54 h-54 flex items-center justify-center rounded-full">
            <img src="@/assets/images/delete.png" class="w-25 h-25" alt="">
          </div>
          <img src="@/assets/images/close-black.png" class="cursor-pointer w-24 h-24" @click="closeModal()" />
        </div>

        <div class="flex flex-col my-20 mt-30">
          <p class="text-lg leading-28 font-grotesk font-semibold text-black-primary">Diqqat, {{_deleteModal.text}}ni o‘chirishga aminmisiz?</p>
          <p class="text-16 text-black-secondary leading-4 py-1.5 break-words">{{_deleteModal.title}}</p>
        </div>
        
        <p v-if="error" class="text-red-primary mb-20">{{ message }}</p>
        
        <button @click="submit" class="flex items-center gap-8 px-32 py-16 bg-red-primary rounded" type="button">
          <p class="font-semibold text-sm text-white-primary uppercase">Ha, o‘chirish</p>
        </button>
      </div>
    </div>
  </Modal>
</template>