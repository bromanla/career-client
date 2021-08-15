<template>
  <el-table
    border
    class="table"
    :data="tableData"
    v-loading="isLoading"
    :empty-text="tableLabel">
    <el-table-column
      prop="id"
      label="Id"
      width="50"
      align="center">
    </el-table-column>
    <el-table-column
      prop="login"
      label="Login"
      min-width="150">
    </el-table-column>
    <el-table-column
      prop="role"
      label="Role"
      min-width="80">
    </el-table-column>
    <el-table-column
      label="Operations"
      width="160"
      align="center">
      <template #default="scope">
        <table-operations
          @show="$router.push(`/users/${scope.row.id}`)"
          @edit="$router.push(`/users/${scope.row.id}?edit=true`)"
          @delete="deleteRecord(scope.row)">
        </table-operations>
      </template>
    </el-table-column>
  </el-table>

  <el-pagination
    class="pagination"
    layout="prev, pager, next"
    :page-size="perPage"
    :total="totalRows"
    v-model:currentPage="currentPage"
    @update:current-page="paginationChange">
  </el-pagination>

  <fixed-add-button
    @action="dialogVisible = true">
  </fixed-add-button>

  <add-user-dialog
    v-bind:isVisible="dialogVisible"
    @close="dialogVisible = false"
    @refresh="paginationChange">
  </add-user-dialog>
</template>

<script>
  import TableOperations from '@/components/TableOperations.vue'
  import FixedAddButton from '@/components/FixedAddButton.vue'
  import AddUserDialog from '@/components/dialogs/AddUser.vue'
  import TableMixin from '@/mixins/table.js'

  export default {
    name: 'table-content',
    mixins: [ TableMixin ],
    components: { TableOperations, FixedAddButton, AddUserDialog },
    data() {
      return {
        dialogVisible: false
      }
    },
    methods: {
      // Override TableMixin methods
      tableDataLoading: async function () {
        const { users: data, meta } = await this.$store.dispatch('users/all', { page: this.currentPage })
        return { data, meta }
      },
      deleteRecordAction: async function (id) {
        return this.$store.dispatch('users/delete', { id })
      }
    }
  }
</script>

<style scoped>
  .table {
    width: 100%;
    margin-bottom: 1rem;
  }

  .pagination {
    margin: auto auto 1rem auto;
  }
</style>
