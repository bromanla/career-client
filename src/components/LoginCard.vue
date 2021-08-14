<template>
  <el-card
    shadow="always"
    header="Авторизация">
    <el-form
      ref="form"
      label-position="top"
      :model="formData"
      :rules="formRules"
      v-loading="isLoading"
      @submit.prevent
      @keypress.enter="formSubmit">
      <el-form-item
        label="Логин"
        prop="login"
        :error="serverRules.login">
        <el-input
          v-model="formData.login"
          suffix-icon="el-icon-user">
        </el-input>
      </el-form-item>
      <el-form-item
        label="Пароль"
        prop="password">
        <el-input
          show-password
          v-model="formData.password"
          suffix-icon="el-icon-lock">
        </el-input>
      </el-form-item>
      <el-form-item align="right">
        <el-button
          type="primary"
          @click="formSubmit">Войти</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
  export default {
    name: 'login-card',
    data() {
      return {
        isLoading: false,
        formData: {},
        formRules: {
          login: [
            { required: true, message: 'Поле не может быть пустым', trigger: 'change' }
          ],
          password: [
            { required: true, message: 'Поле не может быть пустым', trigger: 'change' }
          ]
        },
        serverRules: {}
      }
    },
    methods: {
      formSubmit() {
        if (this.isLoading)
          return false

        this.$refs['form'].validate(async (valid) => {
          if (valid) {
            try {
              this.isLoading = true

              const body = {
                login: this.formData.login,
                password: this.formData.password
              }

              await this.$store.dispatch('auth/fetchLogin', body)

              this.$router.push('/users')
            } catch ({message, subcode = false}) {
              if ([20].includes(subcode)) {
                // Login or password invalid
                if (subcode === 20)
                  this.serverRules.login = message

                setTimeout(() => this.serverRules = {}, 3000)
              } else {
                this.$notify.error({ title: 'Ошибка', message })
              }
            }
            finally {
              this.isLoading = false
            }
          }
        })
      }
    }
  }
</script>
