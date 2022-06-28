import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from "./router.js";
import store from "./store.js"
import * as ElIcons from '@element-plus/icons-vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

const app = createApp(App)
    .use(ElementPlus)
    .use(router)
    .use(store)
    .use(VueAxios,axios)
    .mount('#app')

