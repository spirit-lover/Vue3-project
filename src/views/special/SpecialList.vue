<script>
import { getCurrentInstance, nextTick, reactive, ref } from "vue";
import BlogList from "@/views/special/BlogList.vue";

export default {
  components: { BlogList },
  setup() {
    const cns = getCurrentInstance().appContext.config.globalProperties;
    //通过proxy获取不到全局globalProperties，只能通过上面方式获取
    //const proxy = getCurrentInstance();
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
        width: 50,
      },
      {
        label: "简介",
        prop: "categoryDesc",
        width: 146,
      },
      {
        label: "博客数量",
        prop: "blogCount",
        width: 50,
      },
      {
        label: "操作",
        prop: "op",
        width: 150,
        scopedSlots: "op",
      },
    ];
    // 数据
    let dataSource = [
      {
        key: "1",
        cover: "/src/assets/login-bg.png",
        categoryName: "傻子",
        categoryDesc: "....",
        blogCount: 2,
      },
      {
        key: "2",
        cover: "/src/assets/login-bg.png",
        categoryName: "傻子",
        categoryDesc: "....",
        blogCount: 2,
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

    const currentCategoryId = ref(null);
    const loadDateList = async () => {
      //   let result=await cns.Request({
      //     url:''
      //   })
      // if(!result){
      //   return
      // }
      // dataSource=result.data
      if (currentCategoryId.value === null && result.data.list.length > 0) {
        currentCategoryId.value = result.data.list[0].categoryId;
      }
      nextTick(() => {
        dataSource.value.setCurrentRow("categoryId", currentCategoryId.value);
      });
      currentCategoryId.value;
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
            submitForm();
          },
        },
      ],
    });

    //新增表单数据
    const formData = reactive({});
    const rules = {
      categoryName: [
        {
          required: true,
          message: "请输入分类名称",
        },
      ],
    };
    const formDataRef = ref();
    const showEdit = (type, data) => {
      dialogConfig.show = true;

      //等待dialog完全加载完再执行下面操作(update操作获取数据)
      // nextTick(() => {
      //   formDataRef.value.resetFields();
      // });
      if (type === "add") {
        dialogConfig.title = "新增分类";
      } else if (type === "update") {
        dialogConfig.title = "编辑分类";
        Object.assign(formData, data);
      }
    };
    //提交
    const submitForm = () => {
      formDataRef.value.validate(async (valid) => {
        if (!valid) {
          return;
        }
        let params = {};
        Object.assign(params, formData);
        let result = await cns.Request({
          url: "",
          params: params,
        });
        if (!result) {
          return;
        }
        dialogConfig.show = false;
        cns.message.success("保存成功");
        // loadDateList();
      });
    };

    //删除
    const del = (data) => {
      let result;
      cns.confim(`你确定要删除${data.categoryName}`, async () => {
        result = await cns.Requset({
          url: "",
          params: {
            categoryId: data.categoryId,
          },
        });
        if (!result) {
          return;
        }
        loadDateList();
        currentCategoryId.value = null;
      });
    };

    //专题树

    const rowClick = () => {
      currentCategoryId.value = row.categoryId;
      loadBlogList();
    };

    const blogList = ref([]);
    //
    const loadBlogList = async () => {
      let result = await cns.Requset({
        url: "",
        pramas: {
          categoryId: currentCategoryId.value,
          showType: "1",
        },
      });
      blogList.value = result.data;
    };

    const treeProps = {
      children: "children",
      label: "title",
      value: "blogId",
    };
    //树拖拽排序
    const blogDrog = () => {};

    //新增，修改专题博客
    const blogEditRef = ref(null);
    const editBlog = (type, data) => {
      blogEditRef.value.init(type, data);
    };
    //保存专题博客回调
    const saveBlogCallback = () => {
      loadBlogList();
    };
    return {
      columns,
      dataSource,
      formVal,
      options,
      pagination,
      dialogConfig,
      formData,
      cns,
      rules,
      formDataRef,
      treeProps,
      blogList,
      blogEditRef,
      submitForm,
      showEdit,
      del,
      loadBlogList,
      blogDrog,
      rowClick,
      editBlog,
      saveBlogCallback,
    };
  },
};
</script>
<template>
  <div>
    <el-button type="danger" @click="showEdit('add')">新增分类</el-button>
    <el-row :gutter="10">
      <el-col :span="14">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>专题 </span>
            </div>
          </template>
          <Table
            :columns="columns"
            :dataSource="dataSource"
            :options="options"
            :pagination="pagination"
            :value="formVal"
            border
            @rowClick="rowClick"
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
                <a class="a-link" href="javascript:void(0)" @click="del(row)"
                  >删除</a
                >
              </div>
            </template>
          </Table>
        </el-card>
      </el-col>
      <el-col :span="10">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>专题文章 </span>
            </div>
          </template>
          <el-tree
            ref="refTree"
            :data="blogList"
            :expand-on-click-node="false"
            :highlight-current="true"
            :props="treeProps"
            class="tree-panel"
            defaultExpandAll
            draggable
            node-key="blogId"
            @node-drog="blogDrog"
          >
            <template #default="{ node, data }">
              <span class="custom-node-style">
                <span class="node-title">{{ data.title }}</span>
                <span class="node-op">
                  <template v-if="data.blogId === '0'">
                    <a
                      class="a-link"
                      href="javascript:void(0)"
                      @click="editBlog('add', data)"
                      >新增文章</a
                    >
                  </template>
                  <template v-else>
                    <a
                      class="a-link"
                      href="javascript:void(0)"
                      @click="showDetail(data)"
                      >预览</a
                    >
                    <el-divider direction="vertical"></el-divider>
                    <a
                      class="a-link"
                      href="javascript:void(0)"
                      @click="editBlog('edit', row)"
                      >修改</a
                    >
                    <el-divider direction="vertical"></el-divider>
                    <a
                      class="a-link"
                      href="javascript:void(0)"
                      @click="del(row)"
                      >删除</a
                    >
                    <el-divider direction="vertical"></el-divider>
                    <a
                      class="a-link"
                      href="javascript:void(0)"
                      @click="editBlog('add', data)"
                      >新增下级文章</a
                    >
                  </template>
                </span>
              </span>
            </template>
          </el-tree>
        </el-card>
      </el-col>
    </el-row>
  </div>
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
          placeholder="请输入简介"
          type="textarea"
        >
        </el-input>
      </el-form-item>
    </el-form>
  </Dialog>
  <BlogList ref="blogEditRef" @callback="saveBlogCallback"></BlogList>
</template>

<style lang="scss">
.tree-panel {
  height: calc(100vh - 245px);
  overflow: hidden;

  .el-tree-node_label {
    flex: 1;
  }

  .custom-node-style {
    display: flex;
    justify-content: space-between;
  }
}
</style>
