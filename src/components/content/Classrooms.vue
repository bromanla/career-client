<template>
  <el-card header="Классы" shadow="newer">
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
        prop="className"
        label="Name">
        <el-input
          v-model="formData.className"
          :disabled="!isEdit">
        </el-input>
      </el-form-item>
      <el-form-item
        prop="schoolId"
        label="School Id"
        :error="serverRules.schoolId">
        <el-input
          v-model.number="formData.schoolId"
          :disabled="!isEdit"
        ></el-input>
      </el-form-item>
      <el-form-item
        prop="schoolName"
        label="School">
        <el-input
          v-model="formData.schoolName"
          disabled>
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
    header="Ученики"
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
        prop="login"
        label="login"
        min-width="150">
      </el-table-column>
      <el-table-column
        label="Operations"
        width="100"
        align="center">
        <template #default="scope">
          <el-button
            size="mini"
            @click="$router.push(`/users/${scope.row.id}`)">
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
          className: { required: true, message: 'Поле не может быть пустым' },
          schoolId: [
            { type: 'number', message: 'Поле должно быть числом' },
            { required: true, message: 'Поле не может быть пустым'}
          ]
        },
        serverRules: {}
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
                className: this.formData.className,
                schoolId: this.formData.schoolId
              }

              const response = await this.$store.dispatch('classrooms/patch', { id, body } )

              this.formData.schoolName = response.school.name
              this.formDataCopy = { ...this.formData }
              this.$message({ type: 'success', message: 'Запись Изменена' })

              this.isEdit = false
              this.$router.push(this.$route.path)
            }
            catch ({ message, subcode = false }) {
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
    },
    async mounted() {
      try {
        this.isLoading = true
        const id = this.$route.params.id

        const { users, ...data } = await this.$store.dispatch('classrooms/byId', { id })

        const formData = {
          id: data.id,
          className: data.className,
          schoolId: data.school?.id,
          schoolName: data.school?.name
        }

        this.formData = formData
        this.formDataCopy = { ...formData }

        if (users.length) {
          this.isExtra = true
          this.extraData = users
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
