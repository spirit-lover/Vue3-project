<script setup>
import { getCurrentInstance, reactive, ref } from "vue";

const cns = getCurrentInstance().appContext.config.globalProperties;

const api = {};
//搜索
const searchFormData = reactive({});
const categoryList = ref([
  {
    categoryId: 10000,
    cover: "",
    categoryName: "Java",
    categoryDesc: "介绍博客使用",
    categoryType: 0,
    blogCount: 10,
  },
  {
    categoryId: 10001,
    cover: "",
    categoryName: "Vue",
    categoryDesc: "介绍博客使用",
    categoryType: 0,
    blogCount: 10,
  },
  {
    categoryId: 10002,
    cover: "",
    categoryName: "Python",
    categoryDesc: "介绍博客使用",
    categoryType: 0,
    blogCount: 10,
  },
]);
const loadCategoryList = async () => {
  //   let result=await cns.Request({
  //     url:''
  //   })
  //   categoryList.value=result.data
};
loadCategoryList();
//列表
const tableData = ref({});
const tableOption = {
  exHeight: 10,
};
//表单原始数据
let dataSource = [
  {
    key: "1",
    cover: "/src/assets/login-bg.png",
    title: "傻子",
    editorTypeName: "markdown",
    categoryName: "Java",
    nikoName: "傻子",
    type: 1,
    reprintUrl: "wwww.baidu.com",
    allowCommentTypeName: "允许",
    status: 1,
    statusName: "已发布",
    createTime: "2023-11-11",
    lastUpdateTime: null,
  },
  {
    key: "2",
    cover: "/src/assets/login-bg.png",
    title: "傻子",
    editorTypeName: "markdown",
    categoryName: "Vue",
    nikoName: "傻子",
    type: 0,
    reprintUrl: null,
    allowCommentTypeName: "允许",
    status: 0,
    statusName: "草稿",
    createTime: "2023-11-11",
    lastUpdateTime: null,
  },
];
const columns = [
  {
    label: "封面",
    prop: "cover",
    width: 100,
    scopedSlots: "cover",
  },
  {
    label: "文章信息",
    prop: "blogInfo",
    width: 100,
    scopedSlots: "blogInfo",
  },
  {
    label: "编辑器",
    prop: "editorTypeName",
    width: 100,
  },
  {
    label: "类型",
    prop: "typeName",
    width: 153,
    scopedSlots: "typeName",
  },
  {
    label: "评论",
    prop: "allowCommentTypeName",
    width: 100,
  },
  {
    label: "状态",
    prop: "statusName",
    width: 100,
    scopedSlots: "statusName",
  },
  {
    label: "时间",
    prop: "time",
    width: 150,
    scopedSlots: "time",
  },
  {
    label: "操作",
    prop: "op",
    width: 200,
    scopedSlots: "op",
  },
];
const loadDateList = async () => {
  let params = {
    pageNo: tableData.pageNo,
    pageSize: tableData.pageSize,
  };

  Object.assign(params, searchFormData);
  let result = await cns.Request({
    url: "",
    params,
  });
  if (!result) {
    return;
  }
  dataSource.value = result.data;
};
</script>

<template>
  <div>
    <div class="top-panel">
      <el-form :model="searchFormData">
        <el-row>
          <el-col :span="5">
            <el-form-item
              :style="{ marginLeft: '10px' }"
              label="标题"
              prop="titleFuzzy"
            >
              <el-input
                v-model="searchFormData.tileFuzzy"
                placeholder="请输入标题"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item
              :style="{ marginLeft: '10px' }"
              label="状态"
              prop="status"
            >
              <el-select
                v-model="searchFormData.status"
                :style="{ width: '100%' }"
                clearable
                placeholder="请选择状态"
              >
                <el-option :value="0" label="草稿"></el-option>
                <el-option :value="1" label="已发布"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item
              :style="{ marginLeft: '10px' }"
              label="分类"
              prop="categoryId"
            >
              <el-select
                v-model="searchFormData.categoryId"
                :style="{ width: '100%' }"
                clearable
                placeholder="请选择分类"
              >
                <el-option
                  v-for="item in categoryList"
                  :label="item.categoryName"
                  :value="item.categoryId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5" :style="{ paddingLeft: '20px' }">
            <el-button type="danger" @click="loadDateList">搜索</el-button>
            <el-button type="danger">新增博客</el-button>
          </el-col>
        </el-row>
      </el-form>
      <Table
        :columns="columns"
        :dataSource="dataSource"
        :options="options"
        :pagination="pagination"
        :value="formVal"
        border
      >
        <!--表单中图片插槽-->
        <template #cover="{ index, row }">
          <Cover :cover="row.cover"></Cover>
        </template>
        <!--        文章信息插槽-->
        <template #blogInfo="{ index, row }">
          <div>标题：{{ row.title }}</div>
          <div>分类：{{ row.categoryName }}</div>
          <div>作者：{{ row.nikoName }}</div>
        </template>
        <!--        类型插槽-->
        <template #typeName="{ index, row }">
          <div>标题：{{ row.type === 0 ? "原创" : "转载" }}</div>
          <div v-if="row.type === 1">转载地址：{{ row.reprintUrl }}</div>
        </template>
        <!--        状态插槽-->
        <template #statusName="{ index, row }">
          <span v-if="row.status === 0" :style="{ color: 'red' }">{{
            row.statusName
          }}</span>
          <span v-else :style="{ color: 'green' }">{{ row.statusName }}</span>
        </template>
        <!--        时间插槽-->
        <template #time="{ index, row }">
          <div>创建时间：{{ row.createTime }}</div>
          <div>更新时间：{{ row.lastUpdateTime }}</div>
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
            <a class="a-link" href="javascript:void(0)" @click="del(row)"
              >删除</a
            >
            <el-divider direction="vertical"></el-divider>
            <a
              class="a-link"
              href="javascript:void(0)"
              @click="changeSort(index, 'up')"
              >预览</a
            >
          </div>
        </template>
      </Table>
    </div>
  </div>
</template>

<style></style>