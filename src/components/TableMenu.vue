<template>
  <el-aside width="200px">
    <el-menu router="true" :default-active="1">
      <el-menu-item index="1" route="?users">
        <i class="el-icon-user"></i>
        <span>Пользователи</span>
      </el-menu-item>
      <el-menu-item index="2" route="?classrooms">
        <i class="el-icon-folder"></i>
        <span>Классы</span>
      </el-menu-item>
      <el-menu-item index="3" route="?schools">
        <i class="el-icon-school"></i>
        <span>Школы</span>
      </el-menu-item>
      <el-menu-item index="4" route="?exercises">
        <i class="el-icon-document"></i>
        <span>Упражнения</span>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>

<script>
export default {
  name: 'table-menu'
}
</script>

<style scoped>
  .el-aside {
    color: #333;
    min-height: 100vh;
  }

  .el-menu-item {
    text-align: left;
  }
</style>
