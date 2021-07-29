<template>
  <router-view/>
</template>

<script>
import api from '@/api/instance.js'

export default {
  async mounted() {
    try {
      // После загрузки приложения отправляем тестовый запрос на сервер для проверки его работоспособноти
      await api.get('/health')
      console.info('Server available')
    } catch {
      await this.$alert('Попробуйте перезагрузить страницу', 'Сервер недоступен', {
        type: 'error'
      })
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

body {
  background: #f5f5f5;
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
