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
      align="center"
    ></el-table-column>
    <el-table-column
      prop="name"
      label="Name"
      min-width="150"
    ></el-table-column>
    <el-table-column
      label="Operations"
      width="160"
      align="center">
      <template #default="scope">
        <table-operations
          @show="$router.push(`/schools/${scope.row.id}`)"
          @edit="$router.push(`/schools/${scope.row.id}?edit`)"
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

  <fixed-add-button @action="dialogVisible = true"></fixed-add-button>

  <add-school-dialog
    v-bind:isVisible="dialogVisible"
    @close="dialogVisible = false"
    @refresh="paginationChange">
  </add-school-dialog>
</template>

<script>
  import TableOperations from '@/components/TableOperations.vue'
  import FixedAddButton from '@/components/FixedAddButton.vue'
  import AddSchoolDialog from '@/components/dialogs/AddSchool.vue'
  import TableMixin from '@/mixins/table.js'

  export default {
    name: 'table-content',
    mixins: [ TableMixin ],
    components: { TableOperations, FixedAddButton, AddSchoolDialog },
    data() {
      return {
        dialogVisible: false,
      }
    },
    methods: {
      // Override TableMixin methods
      tableDataLoading: async function () {
        const { schools: data, meta } = await this.$store.dispatch('schools/fetchSchools', { page: this.currentPage })
        return { data, meta }
      },
      deleteRecordAction: async function (id) {
        return this.$store.dispatch('schools/delete', { id })
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
