<script setup>
const props = defineProps({
  dataSource: {
    type: Array,
    default: () => [],
  },
});
</script>

<template>
  <div class="cover">
    <img :src="dataSource.cover" />
  </div>
</template>

<style scoped></style>
