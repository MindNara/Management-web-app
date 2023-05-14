import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router'
import Vuelidate from 'vuelidate'
import { createPinia } from 'pinia'

import './assets/style.css'

const app = createApp(App)

app.use(router)
app.use(Vuelidate)

const pinia = createPinia()
app.use(pinia)

app.mount('#app')
