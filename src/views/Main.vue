<template>
  <el-header>
    <el-row>
      <el-col :span="12"><span>Career</span></el-col>
      <el-col :span="12">
        <el-dropdown>
          <el-button type="danger">
            <i class="el-icon-user-solid"></i>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>
                <router-link to="/login">
                  <span>Выйти</span><i class="el-icon-error"></i>
                </router-link>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-col>
    </el-row>
  </el-header>

  <el-container>
    <el-aside>
      <el-menu router="true">
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

    <el-main>
      <el-skeleton />
    </el-main>

    <el-aside>
      <el-input placeholder="Search"></el-input>
      <el-button type="primary">Query</el-button>
    </el-aside>
  </el-container>
</template>

<script>
  export default {

  }

</script>

<style scoped>
  .el-header {
    background-color: #354e5b;
    color: #e9e9e9;
    line-height: 60px;
  }

  .el-header>.el-row>.el-col:first-child {
    text-align: left;
  }

  .el-header>.el-row>.el-col:last-child {
    text-align: right;
  }

  .el-aside {
    color: #333;
  }

  .el-menu-item {
    text-align: left;
  }

</style>
