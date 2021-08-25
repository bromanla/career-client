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
                v-loading.fullscreen.lock="fullscreenLoading"
                @click="unloading">
                Выгрузка
              </el-dropdown-item>
              <el-dropdown-item
                id="logout"
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
  import xlsx from 'xlsx'

  export default {
    name: 'panel-header',
    data() {
      return {
        fullscreenLoading: false
      }
    },
    methods: {
      async unloading() {
        try {
          this.fullscreenLoading = true

          // Loading data in server
          const sheetData = await this.$store.dispatch('results/unloading')

          // Creating xlsx document
          const workbook = xlsx.utils.book_new()
          const worksheet = xlsx.utils.aoa_to_sheet(sheetData)
          xlsx.utils.book_append_sheet(workbook, worksheet, 'Данные')

          this.fullscreenLoading = false

          await this.$confirm(`Выгрузка данных (${sheetData.length - 1 })`, {
            type: 'info',
            confirmButtonText: 'Скачать',
            showCancelButton: false
          })

          // Download file if confirm is ok
          xlsx.writeFile(workbook, 'Unloading.xlsb')
        }
        catch (e) {
          if (e !== 'cancel')
            this.$notify.error({ title: 'Ошибка', message: e.message })
        }
        finally {
          this.fullscreenLoading = false
        }
      },
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

  .el-dropdown-menu__item:hover {
    transition: 0.5s;
    border-radius: 2px;
    background: #EBEEF5 !important;
  }
</style>
