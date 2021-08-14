<template>
  <el-dialog
    title="Добавление класса"
    width="95%"
    custom-class="addSchoolDialog"
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
        prop="name"
        label="Name">
        <el-input v-model="formData.name"></el-input>
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
    name: 'AddSchoolDialog',
    props: { isVisible: Boolean },
    emits: ['close', 'refresh'],
    data() {
      return {
        isLoading: false,
        serverRules: {},
        formData: {},
        formRules: {
          name: { required: true, message: 'Поле не может быть пустым' }
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
                name: this.formData.name
              }

              await this.$store.dispatch('schools/post', { body } )

              this.$refs['form'].resetFields()
              this.$emit('close')
              this.$emit('refresh')
            }
            catch ({ message }) {
              this.$notify.error({ title: 'Ошибка', message })
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
  .addSchoolDialog {
    max-width: 500px;
  }
</style>
