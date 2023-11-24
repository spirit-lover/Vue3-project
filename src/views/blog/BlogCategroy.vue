<script>
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
    prop: "blogcount",
    width: 80,
  },
  {
    label: "操作",
    prop: "blogcount",
    width: 80,
  },
];

// 服务器请求返回值
const dataSource = [
  {
    key: "1",
    name: "胡彦斌",
    age: 32,
    sex: 0,
    address: "西湖区湖底公园1号",
  },
  {
    key: "2",
    name: "胡彦祖",
    age: 42,
    sex: 1,
    disabled: 2,
    address: "西湖区湖底公园1号",
  },
];

export default {
  data() {
    return {
      columns,
      dataSource,
      formVal: {
        name: 18335,
      },
      options: {
        index: true,
        labelIndex: "序号",
        pageExtend: {
          layout: "total, sizes, ->, prev, pager, next, jumper",
        },
      },
      pagination: {
        currentPage: 1,
        pageSize: 10,
      },
    };
  },
};
</script>
<template>
  <div>
    <el-button type="danger">新增分类</el-button>
  </div>
  <Table
    :columns="columns"
    :dataSource="dataSource"
    :options="options"
    :pagination="pagination"
    :value="formVal"
    border
  >
  </Table>
</template>

<style scoped></style>