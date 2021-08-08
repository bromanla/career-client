<template>
  <el-table
    class="table"
    :data="tableData"
    v-loading="isLoading"
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
      prop="description"
      label="Description">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="Operations"
      width="160"
      align="center"
    >
      <template #default="scope">
        <table-operations
          @show="showExercises(scope.row)"
          @edit="editExercises(scope.row)"
          @delete="deleteExercises(scope.row)"
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

  <fixed-add-button @action="addExercises"></fixed-add-button>
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
        isLoading: true,
        totalRows: 0,
        perPage: 0,
        currentPage: 1
      }
    },
    methods: {
      addExercises: function() {
        $this.$router.push('/exercises?add')
      },
      showExercises: function(row) {
        const { id } = row
        this.$router.push(`/exercises/${id}`)
      },
      editExercises: function(row) {
        const { id } = row
        this.$router.push(`/exercises/${id}?edit`)
      },
      deleteExercises: function(row) {
        const { id } = row
        this.$router.push(`/exercises/${id}`)
      },
      paginationChange: async function() {
        this.isLoading = true
        const { exercises, meta } = await this.$store.dispatch('exercises/fetchExercises', { page: this.currentPage })

        // Данные пагинации
        this.totalRows = meta.totalRows
        this.perPage = meta.perPage

        // Данные таблицы
        this.tableData = exercises
        this.isLoading = false
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
