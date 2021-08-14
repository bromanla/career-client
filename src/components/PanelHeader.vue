<template>
  <el-header>
    <el-row>
      <el-col
        class="logo"
        :span="12">
        <span>Career Guidance</span>
      </el-col>
      <el-col
        class="menu"
        :span="12">
        <span class="username">{{ $store.getters['auth/login'] }}</span>
        <el-dropdown>
          <el-button type="danger">
            <i class="el-icon-user-solid"></i>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item
                @click="logout">
                Выйти
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-col>
    </el-row>
  </el-header>
</template>

<script>
  export default {
    name: 'panel-header',
    methods: {
      logout() {
        this.$store.dispatch('auth/logout')
        this.$router.push({ name: 'login' })
      }
    }
  }
</script>

<style scoped>
  .el-header {
    background-color: #354e5b;
    color: #e9e9e9;
    line-height: 60px;
  }

  .logo {
    text-align: left;
  }

  .logo img {
    height: 1.5rem;
  }

  .logo span {
    font-size: 1.5rem;
    font-weight: bold;
  }

  .menu {
    text-align: right;
  }

  .username {
    margin-right: 1rem;
  }

  .el-dropdown-menu a {
    color: inherit;
    text-decoration: none;
  }
</style>
