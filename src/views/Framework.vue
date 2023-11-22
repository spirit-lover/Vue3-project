<script setup>
import { ref } from "vue";

const menuList = ref([
  {
    title: "博客",
    icon: "icon-blog",
    open: true,
    children: [
      {
        title: "博客管理",
        path: "/blog/list",
      },
      {
        title: "分类管理",
        path: "/blog/category",
      },
    ],
  },
  {
    title: "专题",
    icon: "icon-zhuanti",
    open: true,
    children: [
      {
        title: "专题管理",
        path: "/special/list",
      },
    ],
  },
  {
    title: "设置",
    icon: "icon-setting",
    open: true,
    children: [
      {
        title: "个人信息设置",
        path: "/setting/my",
      },
      {
        title: "博客成员",
        path: "/setting/usr",
      },
      {
        title: "系统设置",
        path: "/setting/sySetting",
        roleTyoe: 1,
      },
    ],
  },
  {
    title: "回收站",
    icon: "icon-delete",
    open: true,
    children: [
      {
        title: "回收站",
        path: "/recovery/list",
      },
    ],
  },
]);

const openClose=(index)=>{
  const open=menuList.value[index].open;
  menuList.value[index].open=!open;
}
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header class="header">Header</el-header>
      <el-container class="container">
        <el-aside width="200px" class="left-aside">
          <div>
            <el-button class="post-btn">发布</el-button>
          </div>
          <ul class="menu-panel">
            <li v-for="(menu,index) in menuList">
              <span class="menu-title-p" @click="openClose(index)">
                <span :class="['iconfont', menu.icon]"></span>
                <span class="menu-title">{{ menu.title }}</span>
                <span
                  :class="[
                    'iconfont',
                    'open-close',
                    menu.open ? 'icon-open' : 'icon-close',
                  ]"
                ></span>
              </span>
              <ul class="sub-menu" v-show="menu.open">
                <li v-for="subMenu in menu.children">
                  <span class="sub-menu-item">{{ subMenu.title }}</span>
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
.common-layout {
  .header {
    border-bottom: 1px solid #ddd;
  }

  .container {
    padding-top: 10px;
    background: #f5f6f7;
    height: calc(100vh - 60px);

    .left-aside {
      width: 280px;
      padding: 0 15px;

      .post-btn {
        background: green;
        width: 100%;
        height: 40px;
        margin-bottom: 5px;
      }

      .menu-panel,
      .sub-menu {
        padding: 0;
        margin: 0;
        list-style: none;
      }

      .menu-title-p {
        padding: 0 5px;
        display: flex;
        cursor: pointer;
        line-height: 45px;
        .iconfont {
          font-size: 18px;
          color: #91949a;
        }

        .menu-title {
          flex: 1;
          color: #3f4042;
          margin-left: 10px;
        }
        .open-close {
          width: 20px;
          font-size: 16px;
        }
      }
      .menu-title-p:hover{
        background-color: #ddd;
      }
      .sub-menu{
        margin-left: 23px;
        font-size: 14px;
        .sub-menu-item{
          padding: 0 10px;
          display: block;
          cursor: pointer;
          line-height: 40px;
        }
        .sub-menu-item:hover{
          background-color: #ddd;
        }
      }
    }

    .right-main {
      background: #fff;

    }
  }
}
</style>
