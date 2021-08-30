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
      prop="name"
      label="Name"
      min-width="150">
    </el-table-column>
    <el-table-column
      prop="description"
      label="Description"
      min-width="250">
    </el-table-column>
    <el-table-column
      label="Operations"
      width="100"
      align="center">
      <template #default="scope">
        <el-tooltip content="Подробно" placement="top">
          <el-button
            size="mini"
            @click="$router.push(`/exercises/${scope.row.id}`)">
            <i class="el-icon-zoom-in"></i>
          </el-button>
        </el-tooltip>
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

</template>

<script>
  import TableMixin from '@/mixins/table.js'

  export default {
    name: 'table-content',
    mixins: [ TableMixin ],
    data() {
      return {}
    },
    methods: {
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
