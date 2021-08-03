<template>
  <el-aside width="200px">
    <el-menu :default-active="$route.name" :router="true">
      <el-menu-item index="users" route="/users">
        <i class="el-icon-user"></i>
        <span>Пользователи</span>
      </el-menu-item>
      <el-menu-item index="classrooms" route="/classrooms">
        <i class="el-icon-folder"></i>
        <span>Классы</span>
      </el-menu-item>
      <el-menu-item index="schools" route="/schools">
        <i class="el-icon-school"></i>
        <span>Школы</span>
      </el-menu-item>
      <el-menu-item index="exercises" route="/exercises">
        <i class="el-icon-document"></i>
        <span>Упражнения</span>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>

<script>
export default {
  name: 'nav-menu'
}
</script>

<style scoped>
  .el-aside {
    color: #333;
    background: #fff;
    min-height: calc(100vh - 60px);
  }

  .el-menu-item {
    text-align: left;
  }
</style>
