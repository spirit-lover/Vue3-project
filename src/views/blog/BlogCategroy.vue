<script>
import { getCurrentInstance, nextTick, reactive, ref } from "vue";

export default {
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
    const loadDateList = async () => {
      //   let result=await cns.Request({
      //     url:''
      //   })
      // if(!result){
      //   return
      // }
      // dataSource=result.data
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
        // loadDateList();
      });
    };

    //排序
    //排序功能因无法获取插槽的index导致无法正常使用
    const changeSort = async (index, type) => {
      let cagetoryList = dataSource;
      if (
        (type === "down" && index === cagetoryList.length - 1) ||
        (type === "up" && index === 0)
      ) {
        return;
      }
      let temp = cagetoryList[index];
      let number = type === "down" ? 1 : -1;
      cagetoryList.splice(index, 1);
      cagetoryList.splice(index + number, 0, temp);
      let result = await cns.Requset({
        url: "",
        dataType: "json",
        pramas: cagetoryList,
      });
      if (!result) {
        return;
      }
      cns.message.success("重新排序成功");
      // loadDateList();
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
      submitForm,
      showEdit,
      del,
      changeSort,
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
        <a class="a-link" href="javascript:void(0)" @click="del(row)">删除</a>
        <el-divider direction="vertical"></el-divider>
        <a
          :class="[index === 0 ? 'not-allow' : 'a-link']"
          href="javascript:void(0)"
          @click="changeSort(index, 'up')"
          >上移</a
        >
        <el-divider direction="vertical"></el-divider>
        <a
          :class="[index === dataSource.length - 1 ? 'not-allow' : 'a-link']"
          href="javascript:void(0)"
          @click="changeSort(index, 'down')"
          >下移</a
        >
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
          placeholder="请输入简介"
          :autosize="{ minRows: 4, maxRows: 4 }"
          type="textarea"
        >
        </el-input>
      </el-form-item>
    </el-form>
  </Dialog>
</template>

<style scoped></style>