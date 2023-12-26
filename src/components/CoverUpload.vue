<script setup>
import { getCurrentInstance } from "vue";

const { proxy } = getCurrentInstance();
const props = defineProps({
  modelValue: {
    type: String,
    default: null,
  },
});

//自定义上次请求
const emit = defineEmits();
const uploadImage = async (file) => {
  console.log(file);
  let result = await proxy.Request({
    url: "",
    dataType: "file",
    params: {
      file: file.file,
      type: 0,
    },
  });
  //通过emit回调
  const fileName = result.data.fileName;
  emit("upload:modelValue", fileName);
};
</script>

<template>
  <el-upload
    :http-request="uploadImage"
    :multiple="false"
    :show-file-list="false"
    accept=".png,.PNG,.jpg,.JPG,.gif,.GIF,.bmp,.BMP"
    class="upload-demo"
    name="file"
  >
    <div class="cover-upload-btn">
      <template v-if="modelValue">
        <img :src="modelValue" />
      </template>
      <span v-else class="iconfont icon-add"></span>
    </div>
  </el-upload>
</template>

<style scoped>
.cover-upload-btn {
  width: 150px;
  height: 150px;
  display: flex;
  background: url(../assets/coverupload-bg.jpg);
  align-items: center;
  justify-content: center;

  .iconfont {
    font-size: 50px;
  }

  img {
    width: 100px;
  }
}
</style>
