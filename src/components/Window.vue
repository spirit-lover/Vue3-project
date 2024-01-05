<script setup>
const windowWidth = window.innerWidth - 280;

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  buttons: {
    type: Array,
  },
  showCancel: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(["close"]);
const close = () => {
  emit("close");
};
</script>

<template>
  <div v-if="show" :style="{ width: windowWidth + 'px' }" class="window">
    <div class="title">
      <span class="iconfont icon-back" @click="close"></span>
    </div>
    <div class="body">
      <slot></slot>
    </div>
    <template v-if="(buttons && buttons.length > 0) || showCancel">
      <div class="footer">
        <el-button link @click="close"> 取消</el-button>
        <el-button v-for="btn in buttons" :type="btn.type" @click="btn.click">
          {{ btn.text }}
        </el-button>
      </div>
    </template>
  </div>
</template>

<style scoped>
.window {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: calc(100vh - 70px);
  background-color: #fff;
  z-index: 50;

  .title {
    height: 30px;
    display: flex;
    align-items: center;
    padding-left: 10px;

    .icon-back {
      font-size: 14px;
      cursor: pointer;
    }
  }

  .body {
    height: calc(100vh - 151px);
    padding: 10px;
  }

  .footer {
    border-top: 1px solid #ddd;
    text-align: center;
    line-height: 50px;
  }
}
</style>
