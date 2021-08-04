<template>
  <el-card>
    <el-page-header title="Назад" @back="$router.push('/users')" content="Пользователи"></el-page-header>
    <span>{{ $route.params.id }}</span>
  </el-card>
</template>
