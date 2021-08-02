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
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="Name">
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    name: 'table-content',
    data() {
      return {
        tableData: [],
        loading: true
      }
    },
    async mounted() {
      const { schools } = await this.$store.dispatch('fetchSchools')

      this.tableData = schools
      this.loading = false
    }
  }
</script>
