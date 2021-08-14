<template>
  <el-dialog
    title="Добавление класса"
    width="95%"
    custom-class="addClassroomDialog"
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
        prop="className"
        label="Name">
        <el-input v-model="formData.className"></el-input>
      </el-form-item>
      <el-form-item
        prop="schoolId"
        label="School Id"
        :error="serverRules.schoolId">
        <el-input v-model.number="formData.schoolId"></el-input>
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
    name: 'AddClassroomDialog',
    props: { isVisible: Boolean },
    emits: ['close', 'refresh'],
    data() {
      return {
        isLoading: false,
        serverRules: {},
        formData: {},
        formRules: {
          className: { required: true, message: 'Поле не может быть пустым' },
          schoolId: [
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
                className: this.formData.className,
                schoolId: this.formData.schoolId
              }

              await this.$store.dispatch('classrooms/post', { body } )

              this.$refs['form'].resetFields()
              this.$emit('close')
              this.$emit('refresh')
            }
            catch ({message, subcode = false}) {
              if ([42].includes(subcode)) {
                // School not found
                if (subcode === 42)
                  this.serverRules.schoolId = message

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
  .addClassroomDialog {
    max-width: 500px;
  }
</style>
