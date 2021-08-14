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
      prop="description"
      label="Description"
      min-width="250"
    ></el-table-column>
    <el-table-column
      label="Operations"
      width="160"
      align="center">
      <template #default="scope">
        <table-operations
          @show="$router.push(`/exercises/${scope.row.id}`)"
          @edit="$router.push(`/exercises/${scope.row.id}?edit`)"
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

  <fixed-add-button @action="addExercises"></fixed-add-button>
</template>

<script>
  import TableOperations from '@/components/TableOperations.vue'
  import FixedAddButton from '@/components/FixedAddButton.vue'
  import TableMixin from '@/mixins/table.js'

  export default {
    name: 'table-content',
    mixins: [ TableMixin ],
    components: { TableOperations, FixedAddButton },
    data() {
      return {}
    },
    methods: {
      addExercises: function() {
        $this.$router.push('/exercises?add')
      },
      // Override TableMixin methods
      tableDataLoading: async function () {
        const { exercises: data, meta } = await this.$store.dispatch('exercises/fetchExercises', { page: this.currentPage })
        return { data, meta }
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
