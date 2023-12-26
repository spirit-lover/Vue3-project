<script>
import { reactive } from "vue";

export default {
  setup() {
    const columns = [
      {
        label: "封面",
        prop: "cover",
        width: 100,
        scopedSlots: "cover",
      },
      {
        label: "名称",
        prop: "categoryName",
        width: 100,
      },
      {
        label: "简介",
        prop: "categoryDesc",
        width: 450,
      },
      {
        label: "博客数量",
        prop: "blogCount",
        width: 80,
      },
      {
        label: "操作",
        prop: "op",
        width: 200,
        scopedSlots: "op",
      },
    ];
    // 数据
    const dataSource = [
      {
        key: "1",
        cover: "/src/assets/login-bg.png",
        categoryName: "傻子",
        categoryDesc: "....",
        blogCount: 2,
        op: 1,
      },
      {
        key: "2",
        cover: "/src/assets/login-bg.png",
        categoryName: "傻子",
        categoryDesc: "....",
        blogCount: 2,
        op: 1,
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
    //新增，修改
    const dialogConfig = reactive({
      show: false,
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
    const showEdit = (type, data) => {
      dialogConfig.show = true;
    };

    //新增表单数据
    const formData = reactive({});
    const rules = {};

    return {
      columns,
      dataSource,
      formVal,
      options,
      pagination,
      dialogConfig,
      formData,
      showEdit,
      rules,
    };
  },
};
</script>
<template>
  <div>
    <el-button type="danger" @click="showEdit('add')">新增分类</el-button>
  </div>
  <Table
    :options="options"
    :value="formVal"
    border
    :columns="columns"
    :dataSource="dataSource"
    :pagination="pagination"
  >
    <!--表单中图片插槽-->
    <template #cover="{ index, row }">
      <Cover :cover="row.cover"></Cover>
    </template>
    <!--表单中操作列插槽-->
    <template #op="{ index, row }">
      <div class="op">
        <a
          class="a-link"
          href="javascript:void(0)"
          @click="showEdit('update', row)"
          >修改</a
        >
        <el-divider direction="vertical"></el-divider>
        <a class="a-link" href="javascript:void(0)">删除</a>
        <el-divider direction="vertical"></el-divider>
        <a class="a-link" href="javascript:void(0)">上移</a>
        <el-divider direction="vertical"></el-divider>
        <a class="a-link" href="javascript:void(0)">下移</a>
      </div>
    </template>
  </Table>
  <Dialog
    :buttons="dialogConfig.buttons"
    :show="dialogConfig.show"
    :title="dialogConfig.title"
    @close="dialogConfig.show = false"
  >
    <el-form
      ref="formDataRef"
      :model="formData"
      :rules="rules"
      label-width="80px"
    >
      <el-form-item label="名称" prop="categoryName ">
        <el-input
          v-model="formData.categoryName"
          placeholder="请输入名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="封面" prop="cover">
        <CoverUpload v-model="formData.cover"></CoverUpload>
      </el-form-item>
      <el-form-item label="简介" prop="categoryDesc">
        <el-input
          v-model="formData.categoryDesc"
          :autosize="{ minRows: 4, maxRows: 4 }"
          type="=textarea"
        >
        </el-input>
      </el-form-item>
    </el-form>
  </Dialog>
</template>

<style scoped></style>