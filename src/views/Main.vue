
<template>
    <el-header style="text-align: right; font-size: 16px">
        <i class="el-icon-user" style="margin-right: 15px"></i>
        <span>Roman</span>
    </el-header>

    <el-container>
        <el-aside>
            <el-menu>
                <el-row justify="center">
                    <el-col :span="16"><el-button>Query</el-button></el-col>
                </el-row >
                <el-row justify="center">
                    <el-col :span="16"><el-input>Search</el-input></el-col>
                </el-row>
            </el-menu>
        </el-aside>
        <el-main>
            <el-skeleton/>
        </el-main>
    </el-container>

    <!-- <el-footer> -->
        <!-- Hello -->
    <!-- </el-footer> -->
</template>

<script>
  export default {
    data() {
      const item = {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      };
      return {
        tableData: Array(20).fill(item)
      }
    }
  };
</script>

<style>
.el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
  }
</style>
