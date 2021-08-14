<template>
  <el-tooltip content="Добавить" placement="top">
    <el-button
      @click="$emit('action')"
      class="add-button"
      type="primary"
      circle>
      <i class="el-icon-plus"></i>
    </el-button>
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
    position: fixed;
    right: 1rem;
    bottom: 1rem;
    z-index: 9999;
  }
</style>
