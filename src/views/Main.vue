<template>
  <panel-header></panel-header>

  <el-container>
    <table-menu></table-menu>
    <table-content></table-content>
  </el-container>
</template>

<script>
  import TableMenu from '@/components/TableMenu.vue';
  import PanelHeader from '@/components/PanelHeader.vue';
  import TableContent from '@/components/TableContent.vue';

  export default {
    components: {
      TableMenu, PanelHeader, TableContent
    }
  }
</script>

<style scoped>

</style>
