<template>
  <el-button-group>
    <el-tooltip content="Подробно" placement="top">
      <el-button
        size="mini"
        icon="el-icon-zoom-in"
        @click="$emit('show')"></el-button>
    </el-tooltip>

    <el-tooltip content="Редактировать" placement="top">
      <el-button
        size="mini"
        icon="el-icon-edit"
        @click="$emit('edit')"></el-button>
    </el-tooltip>
    <el-tooltip content="Удалить" placement="top">
      <el-button
        size="mini"
        icon="el-icon-delete"
        @click="$emit('delete')"></el-button>
    </el-tooltip>
  </el-button-group>
</template>

<script>
  export default {
    name: 'table-operations',
    emits: ['show', 'edit', 'delete']
  }
</script>
