<template>
  <el-card shadow="always" header="Авторизация" >
    <el-form ref="form" :model="form" label-position="top" :rules="loginRules">
      <el-form-item label="Логин" prop="login">
        <el-input v-model="form.login" suffix-icon="el-icon-user"></el-input>
      </el-form-item>

      <el-form-item label="Пароль" prop="password">
        <el-input show-password v-model="form.password" suffix-icon="el-icon-lock"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">Войти</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  name: 'login-card',
  data() {
    return {
      form: {
        login: '',
        password: ''
      },
      loginRules: {
        login: [
          { required: true, message: 'Поле не может быть пустым', trigger: 'change' }
        ],
        password: [
          { required: true, message: 'Поле не может быть пустым', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    onSubmit() {
      this.$refs['form'].validate(async (valid) => {
        if (valid) {
          // await this.$store.dispatch('fetchLogin', this.form)
        } else {
          return false;
        }
      })
    }
  },
  async mounted() {
    //  await this.$store.dispatch('fetchLogin', {login: 'Vova', password: '4321'})
  }
}
</script>
