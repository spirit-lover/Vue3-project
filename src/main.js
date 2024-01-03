import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "@/router/index.js";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@/assets/icon/iconfont.css'
import Request from "@/utils/Request.js";
import message from "@/utils/Message.js";
import confirm from "@/utils/comfirm.js";
import Table from "@/components/Table.vue";
import Cover from "@/components/Cover.vue";
import Dialog from "@/components/Dialog.vue";
import CoverUpload from "@/components/CoverUpload.vue";
import TableFormList from "table-form-list";
import "table-form-list/dist/theme-chalk/index.css";

const app= createApp(App);
app.use(router);
app.use(ElementPlus);
app.use(TableFormList);

app.component("Table", Table);
app.component("Cover", Cover);
app.component("Dialog", Dialog);
app.component("CoverUpload", CoverUpload);

app.config.globalProperties.Request = Request;
app.config.globalProperties.message = message;
app.config.globalProperties.confim = confirm;

app.mount('#app')

