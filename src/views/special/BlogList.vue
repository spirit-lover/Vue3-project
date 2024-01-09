<script setup>
import { getCurrentInstance, reactive, ref } from "vue";
import Window from "@/components/Window.vue";

const cns = getCurrentInstance().appContext.config.globalProperties;

const api = {};

//列表
const tableData = reactive({});

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
  Object.assign(dataSource, result.data);
};
//新增，修改
const windowConfig = ref({
  show: false,
  title: "我是标题",
  buttons: [
    {
      type: "danger",
      text: "确定",
      click: (e) => {
        console.log("eee");
      },
    },
  ],
});

const closeWindow = () => {
  windowConfig.value.show = false;
  // loadDateList();
};

const showEdit = (type, data) => {
  windowConfig.value.show = true;
};
</script>

<template>
  <div>
    <window
      :buttons="windowConfig.buttons"
      :show="windowConfig.show"
      @click="closeWindow"
    >
      test
    </window>
  </div>
</template>

<style></style>
