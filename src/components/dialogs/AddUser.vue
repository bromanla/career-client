<template>
  <el-dialog
    title="Добавление пользователя"
    width="95%"
    custom-class="addUserDialog"
    v-model="isVisible"
    @close="formClose">
    <el-form
      ref="form"
      label-width="auto"
      :rules="formRules"
      :model="formData"
      v-loading="isLoading"
      @submit.prevent
      @keypress.enter="formSubmit">
      <el-form-item
        prop="login"
        label="Login"
        :error="serverRules.login">
        <el-input v-model="formData.login"></el-input>
      </el-form-item>
      <el-form-item prop="password" label="Password">
        <el-input v-model="formData.password" show-password></el-input>
      </el-form-item>
      <el-form-item prop="role" label="Role">
        <el-select v-model="formData.role">
          <el-option label="Student" value="student"></el-option>
          <el-option label="Admin" value="admin"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        prop="classroomId"
        label="Classroom Id"
        :error="serverRules.classroomId"
        v-if="formData.role === 'student'">
        <el-input v-model.number="formData.classroomId"></el-input>
      </el-form-item>
      <el-form-item align="right">
        <el-button
          @click="formClose">Отменить</el-button>
        <el-button
          type="primary"
          @click="formSubmit"
          :disabled="isLoading">Сохранить</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
  export default {
    name: 'AddUserDialog',
    props: { isVisible: Boolean },
    emits: ['close', 'refresh'],
    data() {
      return {
        isLoading: false,
        serverRules: {},
        formData: {},
        formRules: {
          login: { required: true, message: 'Поле не может быть пустым'},
          role: { required: true, message: 'Поле не может быть пустым' },
          password: { required: true, message: 'Поле не может быть пустым' },
          classroomId: [
            { type: 'number', message: 'Поле должно быть числом' },
            { required: true, message: 'Поле не может быть пустым' }
          ]
        }
      }
    },
    methods: {
      formClose: function () {
        this.$refs['form'].clearValidate()
        this.$emit('close')
      },
      formSubmit: async function () {
        if (this.isLoading)
          return false

        this.$refs['form'].validate(async (valid) => {
          if (valid) {
            try {
              this.isLoading = true

              const body = {
                login: this.formData.login,
                password: this.formData.password,
                role: this.formData.role,
                classroomId: this.formData.role === 'student'
                  ? this.formData.classroomId
                  : undefined
              }

              await this.$store.dispatch('users/post', { body } )

              this.$refs['form'].resetFields()
              this.$emit('close')
              this.$emit('refresh')
            }
            catch ({message, subcode = false}) {
              if ([41, 44].includes(subcode)) {
                // Login already exist
                if (subcode === 41)
                  this.serverRules.classroomId = message

                // Classroom not found
                if (subcode === 44)
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

<style>
  .addUserDialog {
    max-width: 500px;
  }
</style>
