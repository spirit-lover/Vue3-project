<script setup>

import {ref} from "vue";

const menuList=ref([
  {
    title:"博客",
    icon:"icon-blog",
    open:true,
    children:[
      {
        title:"博客管理",
        path:"/blog/list"
      },
      {
        title:"分类管理",
        path:"/blog/category"
      },
    ],
  },
  {
    title:"专题",
    icon:"icon-zhuanti",
    open:true,
    children:[
      {
        title:"专题管理",
        path:"/special/list"
      },
    ],
  },
  {
    title:"设置",
    icon:"icon-setting",
    open:true,
    children:[
      {
        title:"个人信息设置",
        path:"/setting/my"
      },
      {
        title:"博客成员",
        path:"/setting/usr"
      },
      {
        title:"系统设置",
        path:"/setting/sySetting",
        roleTyoe:1,
      },
    ],
  },
  {
    title:"回收站",
    icon:"icon-delete",
    open:true,
    children:[
      {
        title:"回收站",
        path:"/recovery/list"
      },
    ],
  },
])


</script>

<template>
  <div class="common-layout">
    <el-container >
      <el-header class="header">Header</el-header>
      <el-container class="container">
        <el-aside width="200px" class="left-aside">
        <div>
          <el-button class="post-btn">发布</el-button>
        </div>
        <ul class="menu-panel">

          <li v-for="menu in menuList">
            <span :class="['iconfont',menu.icon]"></span>
            <span>{{menu.title}}</span>
            <ul class="menu-children-panel">
              <li v-for="subMenu in menu.children">
                <span>{{subMenu.title}}</span>
              </li>
            </ul>
          </li>
        </ul>
        </el-aside>
        <el-main class="right-main">Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="css">
.common-layout{
   .header{
     border-bottom: 1px solid #ddd;
    }
  .container{
    padding-top: 10px;
    background: #f5f6f7;
    height: calc(100vh - 60px);
    .left-aside{
      width: 250px;
      padding: 0 15px;
      .post-btn{
        background: green;
        width: 100%;
        height: 40px;
      }
      .menu-panel,.menu-children-panel{
          padding: 0;
          margin: 0;
          list-style: none;
      }
    }
    .right-main{
      background: #fff;
    }
  }
}
</style>
