<template>
  <el-button-group>
    <el-tooltip content="Подробно" placement="top">
      <el-button
        size="mini"
        @click="$emit('show')">
        <i class="el-icon-zoom-in"></i>
      </el-button>
    </el-tooltip>

    <el-tooltip content="Редактировать" placement="top">
      <el-button
        size="mini"
        @click="$emit('edit')">
        <i class="el-icon-edit"></i>
      </el-button>
    </el-tooltip>

    <el-tooltip content="Удалить" placement="top">
      <el-button
        size="mini"
        @click="$emit('delete')">
        <i class="el-icon-delete"></i>
      </el-button>
    </el-tooltip>
  </el-button-group>
</template>

<script>
  export default {
    name: 'table-operations',
    emits: ['show', 'edit', 'delete']
  }
</script>
