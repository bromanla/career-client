<template>
  <el-row justify="center">
    <el-col :xs="23" :sm="18" :md="12" :lg="8" :xl="6">
      <login-card class="login-card"></login-card>
    </el-col>
  </el-row>
</template>

<script>
  import LoginCard from '@/components/LoginCard.vue'

  export default {
    components: {
      LoginCard
    },
    mounted() {
      if (this.$route.params.message) {
        this.$notify.error({
          title: 'Ошибка',
          message: this.$route.params.message
        });
      }
    }
  }
</script>

<style scoped>
  .login-card {
    margin-top: 4rem;
  }
</style>
