<template>
  <el-table
    :data="tableData"
    v-loading="loading"
    style="width: 100%"
    border
  >
    <el-table-column
      prop="id"
      label="Id"
      width="100">
    </el-table-column>
    <el-table-column
      prop="login"
      label="Login"
      width="180">
    </el-table-column>
    <el-table-column
      prop="role"
      label="Role">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="Operations">
      <table-operations></table-operations>
    </el-table-column>
  </el-table>

  <!-- <el-pagination
    layout="prev, pager, next"
    :page-size="100"
    :total="1000">
  </el-pagination> -->

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
        loading: true
      }
    },
    methods: {
      addUser: function() {
        console.log('Add users')
      }
    },
    async mounted() {
      const { users } = await this.$store.dispatch('fetchUsers')

      this.tableData = users
      this.loading = false
    }
  }
</script>
