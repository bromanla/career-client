<template>
  <panel-header></panel-header>

  <el-container>
    <table-menu></table-menu>
    <router-view></router-view>
  </el-container>
</template>

<script>
  import TableMenu from '@/components/TableMenu.vue';
  import PanelHeader from '@/components/PanelHeader.vue';

  export default {
    components: {
      TableMenu, PanelHeader
    }
  }
</script>

<style scoped>

</style>
