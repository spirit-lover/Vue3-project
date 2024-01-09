<script>
export default {
  data() {
    return {
      text: "",
    };
  },
};
</script>

<template>
  <div>
    <v-md-editor v-model="text" height="400px"></v-md-editor>
  </div>
</template>

<style scoped></style>