import {createRouter,createWebHistory} from "vue-router";
const routes=[
    {
        name:'登录',
        path:'/login',
        component:()=> import('../views/Login.vue')
    }
]

//这里不是通过new来创建，通过createrRouter方法创建，使用的的模式不是通过mode来定义
const  router=createRouter({
    routes,
    history:createWebHistory(),
})
export default router