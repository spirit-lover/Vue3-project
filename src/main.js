import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "@/router/index.js";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@/assets/icon/iconfont.css'
import Request from "@/utils/Request.js";
import message from "@/utils/Message.js";


const app= createApp(App);
app.use(router);
app.use(ElementPlus);
app.config.globalProperties.Request=Request
app.config.globalProperties.message=message
app.mount('#app')
