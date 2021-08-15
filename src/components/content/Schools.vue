<template>
  <el-card header="Школа" shadow="newer">
    <el-form
      ref="form"
      v-loading="isLoading"
      label-width="auto"
      :rules="formRules"
      :model="formData"
      @submit.prevent
      @keypress.enter="editSave">
      <el-form-item
        label="Id">
        <el-input
          v-model="formData.id"
          disabled>
        </el-input>
      </el-form-item>
      <el-form-item
        prop="name"
        label="Name">
        <el-input
          v-model="formData.name"
          :disabled="!isEdit">
        </el-input>
      </el-form-item>
      <el-form-item align="right">
        <el-button
          v-if="!isEdit"
          @click="isEdit = true">
          Редактировать
        </el-button>
        <template
          v-if="isEdit">
          <el-button
            class="editBtn"
            type="danger"
            @click="editBack">
            Отменить
          </el-button>
          <el-button
            class="editBtn"
            type="primary"
            @click="editSave">
            Сохранить
          </el-button>
        </template>
      </el-form-item>
    </el-form>
  </el-card>

  <el-card
    header="Классы"
    shadow="newer"
    v-if="isExtra">
    <el-table
      stripe
      border
      :data="extraData">
      <el-table-column
        prop="id"
        label="Id"
        width="50"
        align="center">
      </el-table-column>
      <el-table-column
        prop="className"
        label="Name"
        min-width="150">
      </el-table-column>
      <el-table-column
        label="Operations"
        width="100"
        align="center">
        <template #default="scope">
          <el-button
            size="mini"
            @click="$router.push(`/classrooms/${scope.row.id}`)">
            <i class="el-icon-zoom-in"></i>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
  export default {
    data() {
      return {
        isLoading: true,
        isEdit: false,
        isExtra: false,
        formData: {},
        formDataCopy: {},
        extraData: [],
        formRules: {
          name: { required: true, message: 'Поле не может быть пустым' }
        }
      }
    },
    methods: {
      editBack () {
        this.formData = { ...this.formDataCopy }
        this.isEdit = false
      },
      editSave () {
        if (this.isLoading)
          return false

        this.$refs['form'].validate(async (valid) => {
          if (valid) {
            try {
              this.isLoading = true
              const id = this.formData.id

              const body = {
                name: this.formData.name
              }

              await this.$store.dispatch('schools/patch', { id, body })

              this.formDataCopy = { ...this.formData }
              this.$message({ type: 'success', message: 'Запись Изменена' })

              this.isEdit = false
              this.$router.push(this.$route.path)
            }
            catch ({ message }) {
              this.$notify.error({ title: 'Ошибка', message: message })
            }
            finally {
              this.isLoading = false
            }
          }
        })
      }
    },
    async mounted() {
      try {
        this.isLoading = true
        const id = this.$route.params.id

        const { classrooms, ...data } = await this.$store.dispatch('schools/byId', { id })

        const formData= {
          id: data.id,
          name: data.name
        }

        this.formData = formData
        this.formDataCopy = { ...formData }

        if (classrooms.length) {
          this.isExtra = true
          this.extraData = classrooms
        }

        if (this.$route.query.edit === 'true')
          this.isEdit = true

        this.isLoading = false
      } catch ({ message }) {
        this.$notify.error({ title: 'Ошибка', message })
      }
    }
  }
</script>

<style scoped>
 .el-form {
    max-width: 500px;
  }

  .el-card {
    border-radius: 0px;
  }

  .el-button:first-child {
    margin-bottom: 10px;
  }

  .editBtn {
    width: 110px;
  }
</style>
