<template #default="scope">
  <el-button-group>
    <el-tooltip content="Подробно" placement="top">
      <el-button
        size="mini"
        icon="el-icon-zoom-in"
        @click="handleDeatil(scope.row)"></el-button>
    </el-tooltip>

    <el-tooltip content="Редактировать" placement="top">
      <el-button
        size="mini"
        icon="el-icon-edit"
        @click="handleEdit(scope.row)"></el-button>
    </el-tooltip>
    <el-tooltip content="Удалить" placement="top">
      <el-button
        size="mini"
        icon="el-icon-delete"
        @click="handleDelete(scope.row)"></el-button>
    </el-tooltip>
  </el-button-group>
</template>

<script>
export default {
  name: 'table-operations'
}
</script>
