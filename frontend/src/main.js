import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router'
import Vuelidate from 'vuelidate'

import './assets/style.css'

const app = createApp(App)

app.use(router)
app.use(Vuelidate)

app.mount('#app')
