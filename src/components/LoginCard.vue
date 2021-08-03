<template>
  <el-card
    shadow="always"
    header="Авторизация"
  >
    <el-form
      ref="form"
      :model="form"
      label-position="top"
      :rules="loginRules"
      @keypress.enter="onSubmit"
    >
      <el-form-item
        label="Логин"
        prop="login"
        :error="loginError"
      >
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
      },
      loginError: ''
    }
  },
  methods: {
    onSubmit() {
      this.$refs['form'].validate(async (valid) => {
        if (valid) {
          try {
            await this.$store.dispatch('auth/fetchLogin', this.form)
            console.log('Success login')

            this.$router.push({name: 'users'})
          } catch (err) {
            this.loginError = err.message

            // Hack
            setTimeout(() => this.loginError = '', 3000)
          }
        } else {
          return false;
        }
      })
    }
  }
}
</script>
