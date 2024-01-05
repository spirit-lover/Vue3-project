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
import EditorMarkdown from "@/components/EditorMarkdown.vue";
import Window from "@/components/Window.vue";
import TableFormList from "table-form-list";
import "table-form-list/dist/theme-chalk/index.css";

// import VueMarkdownEditor from '@kangc/v-md-editor';
// import '@kangc/v-md-editor/lib/style/base-editor.css';
// import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
// import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
// import Prism from 'prismjs';
//
// VueMarkdownEditor.use(vuepressTheme, {
//     Prism,
// });

const app= createApp(App);
app.use(router);
app.use(ElementPlus);
app.use(TableFormList);

// app.use(VueMarkdownEditor);

app.component("Table", Table);
app.component("Cover", Cover);
app.component("Dialog", Dialog);
app.component("CoverUpload", CoverUpload);
app.component("Window", Window);
app.component("EditorMarkdown", EditorMarkdown);

app.config.globalProperties.Request = Request;
app.config.globalProperties.message = message;
app.config.globalProperties.confim = confirm;

app.mount('#app')

