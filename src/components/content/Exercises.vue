<template>
  <el-table
    class="table"
    :data="tableData"
    v-loading="loading"
    border
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

  <fixed-add-button @action="addUser"></fixed-add-button>
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
      addUser: function() {
        console.log('Add users')
      },
      showUser: function(row) {
        console.log(row)
        console.log('Show user')
      },
      editUser: function() {
        console.log('Edit user')
      },
      deleteUser: function() {
        console.log('Delete User')
      },
      paginationChange: async function() {
        this.loading = true
        const { exercises, meta } = await this.$store.dispatch('exercises/fetchExercises', { page: this.currentPage })

        // Данные пагинации
        this.totalRows = meta.totalRows
        this.perPage = meta.perPage

        // Данные таблицы
        this.tableData = exercises
        this.loading = false
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
