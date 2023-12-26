<script setup>
const props = defineProps({
  cover: {
    type: String,
    default: null,
  },
});
</script>

<template>
  <div class="cover">
    <img v-if="cover" :src="cover" />
    <img v-else src="../assets/login-bg.png" />
  </div>
</template>

<style scoped>
.cover {
  background-color: #ddd;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  padding-right: 10px;

  img {
    width: 100px;
  }
}
</style>