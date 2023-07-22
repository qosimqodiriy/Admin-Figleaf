import App from './App.vue'
import router from './router'
import { createApp } from 'vue'
import './assets/styles/style.css'



import Header from '@/components/Header.vue'
import ImageBox from '@/components/ImageBox.vue'
import BaseImage from '@/components/BaseImage.vue'
import BaseButton from '@/components/BaseButton.vue'
import DeleteModal from '@/components/DeleteModal.vue'
import GlobalModal from '@/components/GlobalModal.vue'
import BaseLoading from '@/components/BaseLoading.vue'
import BasePagination from '@/components/BasePagination.vue'
import BaseNotification from '@/components/BaseNotification.vue'


const app = createApp(App)
app.component('Header', Header)
app.component('Modal', GlobalModal)
app.component('ImageBox', ImageBox)
app.component('BaseImage', BaseImage)
app.component('BaseButton', BaseButton)
app.component('DeleteModal', DeleteModal)
app.component('BaseLoading', BaseLoading)
app.component('BasePagination', BasePagination)
app.component('BaseNotification', BaseNotification)

app.use(router)
app.mount('#app')
