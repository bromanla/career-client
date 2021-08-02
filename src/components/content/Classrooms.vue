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
      prop="className"
      label="Name"
      width="180">
    </el-table-column>
    <el-table-column
      prop="school.name"
      label="School">
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
      const { classrooms } = await this.$store.dispatch('fetchClassrooms')

      this.tableData = classrooms
      this.loading = false
    }
  }
</script>
