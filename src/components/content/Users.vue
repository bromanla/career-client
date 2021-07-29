<template>
  <el-table
    :data="tableData"
    style="width: 100%"
    border
  >
    <el-table-column
      prop="date"
      label="Id"
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="Login"
      width="180">
    </el-table-column>
    <el-table-column
      prop="address"
      label="Role">
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    name: 'table-content',
    data() {
      return {
        tableData: [{
          date: '2016-05-03',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles'
        }, {
          date: '2016-05-02',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles'
        }, {
          date: '2016-05-04',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles'
        }, {
          date: '2016-05-01',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles'
        }, {
          date: '2016-05-08',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles'
        }, {
          date: '2016-05-06',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles'
        }, {
          date: '2016-05-07',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles'
        }],
      }
    },
    async mounted() {
      const foo = await this.$store.dispatch('fetchUsers')
      console.log(foo)
    }
  }
</script>
