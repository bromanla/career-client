<template>
  <panel-header></panel-header>

  <el-container>
    <nav-menu></nav-menu>
    <el-container direction="vertical">
      <router-view></router-view>
    </el-container>
  </el-container>
</template>

<script>
  import NavMenu from '@/components/NavMenu.vue';
  import PanelHeader from '@/components/PanelHeader.vue';

  export default {
    components: {
      NavMenu, PanelHeader
    }
  }
</script>
