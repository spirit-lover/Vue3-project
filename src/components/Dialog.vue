<script setup>
let props = defineProps({
  title: {
    type: String,
  },
  show: {
    type: Boolean,
    default: false,
  },
  showCancel: {
    type: Boolean,
    default: true,
  },
  top: {
    type: String,
    default: "50px",
  },
  width: {
    type: String,
    default: "30%",
  },
  buttons: {
    type: Array,
  },
});

const emit = defineEmits(["close"]);
const close = () => {
  emit("close");
};
</script>

<template>
  <div>
    <el-dialog
      v-model="props.show"
      :draggable="true"
      :showCancel="showCancel"
      :title="title"
      :top="top"
      :width="width"
      class="cost-dialog"
    >
      <div class="dialog-body">
        <slot></slot>
      </div>
      <template v-if="(buttons && buttons.length > 0) || showCancel">
        <div class="dialog-footer">
          <el-button link @click="close"> 取消</el-button>
          <el-button v-for="btn in buttons" :type="btn.type" @click="btn.click">
            {{ btn.text }}
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<style>
.cost-dialog {
  .el-dialog_body {
    padding: 0;
  }

  .dialog-body {
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    padding: 10px;
    min-height: 100px;
  }

  .dialog-footer {
    text-align: right;
    padding: 5px 20px;
  }
}
</style>