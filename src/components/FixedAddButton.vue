<template>
  <el-tooltip content="Добавить" placement="top">
    <el-button
      @click="$emit('action')"
      class="add-button"
      type="primary"
      icon="el-icon-plus"
      circle
    ></el-button>
  </el-tooltip>
</template>

<script>
  export default {
    name: 'fixed-add-button',
    emits: ['action']
  }
</script>

<style scoped>
  .add-button {
    position: absolute;
    right: 1rem;
    bottom: 1rem;
  }
</style>
