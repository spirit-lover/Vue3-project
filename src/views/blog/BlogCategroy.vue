<script>
import { reactive } from "vue";

export default {
  setup() {
    const columns = [
      {
        label: "封面",
        prop: "cover",
        width: 80,
      },
      {
        label: "名称",
        prop: "categoryName",
        width: 80,
      },
      {
        label: "简介",
        prop: "categoryDesc",
        width: 80,
      },
      {
        label: "博客数量",
        prop: "blogCount",
        width: 80,
      },
      {
        label: "操作",
        prop: "operate",
        width: 80,
      },
    ];
    // 服务器请求返回值
    const dataSource = [
      {
        key: "1",
        cover: "D:\\软件专业\\vue\\vite-project\\src\\assets\\login-bg.png",
        categoryName: "傻子",
        categoryDesc: "....",
        blogCount: 2,
        operate: 1,
      },
      {
        key: "2",
        cover: "D:\\软件专业\\vue\\vite-project\\src\\assets\\login-bg.png",
        categoryName: "傻子",
        categoryDesc: "....",
        blogCount: 2,
        operate: 1,
      },
    ];
    let formVal = {
      name: 18335,
    };

    let options = {
      index: true,
      labelIndex: "序号",
      pageExtend: {
        layout: "total, sizes, ->, prev, pager, next, jumper",
      },
    };
    let pagination = {
      currentPage: 1,
      pageSize: 10,
    };
    const dialogConfig = reactive({
      show: true,
      title: "我是标题",
      buttons: [
        {
          type: "danger",
          text: "确定",
          click: (e) => {
            console.log("xx");
          },
        },
      ],
    });
    return {
      columns,
      dataSource,
      formVal,
      options,
      pagination,
      dialogConfig,
    };
  },
};
</script>
<template>
  <div>
    <el-button type="danger">新增分类</el-button>
  </div>
  <Table
    :options="options"
    :value="formVal"
    border
    :columns="columns"
    :dataSource="dataSource"
    :pagination="pagination"
  >
    <!--    <template #cover="{index,dataSource}">-->
    <!--      <Cover :cover="dataSource"></Cover>-->
    <!--    </template>-->
  </Table>
  <Dialog
    :buttons="dialogConfig.buttons"
    :show="dialogConfig.show"
    :title="dialogConfig.title"
    @close="dialogConfig.show = false"
  >
    我是内容
  </Dialog>
</template>

<style scoped></style>