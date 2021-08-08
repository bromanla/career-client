<template>
  <el-table
    class="table"
    :data="tableData"
    v-loading="loading"
    border
    empty-text="Загрузка"
  >
    <el-table-column
      prop="id"
      label="Id"
      width="50"
      align="center"
    >
    </el-table-column>
    <el-table-column
      prop="login"
      label="Login"
    >
    </el-table-column>
    <el-table-column
      prop="role"
      label="Role">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="Operations"
      width="160"
      align="center"
    >
      <template #default="scope">
        <table-operations
          @show="showUser(scope.row)"
          @edit="editUser(scope.row)"
          @delete="deleteUser(scope.row)"
        ></table-operations>
      </template>
    </el-table-column>
  </el-table>

  <el-pagination
    class="pagination"
    layout="prev, pager, next"
    :page-size="perPage"
    :total="totalRows"
    v-model:currentPage="currentPage"
    @current-change="paginationChange"
  >
  </el-pagination>

  <fixed-add-button @action="addVisible = true"></fixed-add-button>
  <el-dialog
    title="Добавление пользователя"
    v-model="addVisible"
    width="500px">
    <el-form
      @submit.prevent="addUser"
      ref="addForm"
      label-width="120px"
      :rules="addFormRules"
      :model="addFormData">
      <el-form-item prop="login" label="Login">
        <el-input v-model="addFormData.login"></el-input>
      </el-form-item>
      <el-form-item prop="password" label="Password">
        <el-input v-model="addFormData.password" show-password></el-input>
      </el-form-item>
      <el-form-item prop="role" label="Role">
        <el-select v-model="addFormData.role">
          <el-option label="Student" value="student"></el-option>
          <el-option label="Admin" value="admin"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="classroomId" label="Classroom Id" v-if="addFormData.role === 'student'">
        <el-input v-model.number="addFormData.classroomId"></el-input>
      </el-form-item>
      <el-form-item align="right">
        <div>
          <el-button @click="addVisible = false">Отменить</el-button>
          <el-button type="primary" @click="addUser">Сохранить</el-button>
        </div>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
  import TableOperations from '@/components/TableOperations.vue'
  import FixedAddButton from '@/components/FixedAddButton.vue'

  export default {
    name: 'table-content',
    components: { TableOperations, FixedAddButton },
    data() {
      return {
        tableData: [],
        loading: true,
        totalRows: 0,
        perPage: 0,
        currentPage: 1,
        addVisible: false,
        addFormData: {},
        addFormRules: {
          login: [{ required: true, message: 'Поле не может быть пустым', trigger: 'submit' }],
          role: [{ required: true, message: 'Поле не может быть пустым', trigger: 'submit' }],
          password: [{ required: true, message: 'Поле не может быть пустым', trigger: 'submit' }],
          classroomId: [
            { type: 'number', message: 'Поле должно быть числом', trigger: 'submit' },
            { required: true, message: 'Поле не может быть пустым', trigger: 'submit' }
          ]
        }
      }
    },
    methods: {
      addUser: async function() {
        this.$refs['addForm'].validate(async (valid) => {
          if (valid) {
            try {
              const body = {
                login: this.addFormData.login,
                password: this.addFormData.password,
                role: this.addFormData.role
              }

              if (this.addFormData.role === 'student')
                body.classroomId = this.addFormData.classroomId

              await this.$store.dispatch('users/post', { body } )
              await this.paginationChange()

              this.addFormData = {}
              this.addVisible = false
            } catch ({message}) {
              this.$notify.error({ title: 'Ошибка', message: message })
            }
          }
        })
      },
      showUser: function(row) {
        const { id } = row
        this.$router.push(`/users/${id}`)
      },
      editUser: function(row) {
        const { id } = row
        this.$router.push(`/users/${id}?edit`)
      },
      deleteUser: async function(row) {
        const { id } = row

        try {
          await this.$confirm(`Удалить запись?`, {
            confirmButtonText: 'Да',
            cancelButtonText: 'Нет',
            type: 'warning'
          })

          await this.$store.dispatch('users/delete', { id })
          await this.paginationChange()

          this.$message({ type: 'success', message: 'Запись удалена' })
        } catch (e) {
          if (e === 'cancel')
            this.$message({ type: 'info', message: 'Удаление отменено' })
          else
            this.$notify.error({ title: 'Ошибка', message: e.message })
        }
      },
      paginationChange: async function() {
        try {
          this.loading = true
          const { users, meta } = await this.$store.dispatch('users/all', { page: this.currentPage })

          // Данные пагинации
          this.totalRows = meta.totalRows
          this.perPage = meta.perPage

          // Данные таблицы
          this.tableData = users
          this.loading = false
        } catch ({message}) {
          this.$notify.error({ title: 'Ошибка', message })
        }
      }
    },
    async mounted() {
      await this.paginationChange()
    }
  }
</script>

<style scoped>
  .table {
    width: 100%;
    margin-bottom: 1rem;
  }

  .pagination {
    margin: auto auto 1rem auto
  }
</style>
