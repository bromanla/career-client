<template>
  <el-table
    class="table"
    :data="tableData"
    v-loading="loading"
    border
    empty-text="Нет данных"
  >
    <el-table-column
      prop="id"
      label="Id"
      width="50"
      align="center"
    >
    </el-table-column>
    <el-table-column
      prop="name"
      label="Name"
    >
    </el-table-column>
    <el-table-column
      fixed="right"
      label="Operations"
      width="160"
      align="center"
    >
      <template #default="scope">
        <table-operations
          @show="showSchool(scope.row)"
          @edit="editSchool(scope.row)"
          @delete="deleteSchool(scope.row)"
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
    title="Добавление школы"
    v-model="addVisible"
    width="500px">
    <el-form
      @submit.prevent="addSchool"
      ref="addForm"
      :rules="addFormRules"
      :model="addFormData">
      <el-form-item prop="name" label="Name">
        <el-input v-model="addFormData.name"></el-input>
      </el-form-item>
      <el-form-item align="right">
        <div>
          <el-button @click="addVisible = false">Отменить</el-button>
          <el-button type="primary" @click="addSchool">Сохранить</el-button>
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
          name: [{ required: true, message: 'Поле не может быть пустым', trigger: 'submit' }]
        }
      }
    },
    methods: {
      addSchool: function() {
        this.$refs['addForm'].validate(async (valid) => {
          if (valid) {
            try {
              const body = { name: this.addFormData.name }

              await this.$store.dispatch('schools/post', { body } )
              await this.paginationChange()

              this.addFormData = {}
              this.addVisible = false
            } catch ({message}) {
              this.$notify.error({ title: 'Ошибка', message: message })
            }
          }
        })
      },
      showSchool: function(row) {
        const { id } = row
        this.$router.push(`/schools/${id}`)
      },
      editSchool: function(row) {
        const { id } = row
        this.$router.push(`/schools/${id}?edit`)
      },
      deleteSchool: async function(row) {
        const { id } = row

        try {
          await this.$confirm(`Удалить запись?`, {
            confirmButtonText: 'Да',
            cancelButtonText: 'Нет',
            type: 'warning'
          })

          await this.$store.dispatch('schools/delete', { id })

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
          const { schools, meta } = await this.$store.dispatch('schools/fetchSchools', { page: this.currentPage })

          // Данные пагинации
          this.totalRows = meta.totalRows
          this.perPage = meta.perPage

          // Данные таблицы
          this.tableData = schools
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
