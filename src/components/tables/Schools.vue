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

  <fixed-add-button @action="addSchool"></fixed-add-button>
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
        currentPage: 1
      }
    },
    methods: {
      addSchool: function() {
        console.log('Add School')
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
