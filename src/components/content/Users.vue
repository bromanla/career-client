<template>
  <el-card header="Пользователь" shadow="newer">
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
        prop="login"
        label="Login"
        :error="serverRules.login">
        <el-input
          v-model="formData.login"
          :disabled="!isEdit">
        </el-input>
      </el-form-item>
      <el-form-item
        prop="role"
        label="Role">
        <el-select
          v-model="formData.role"
          :disabled="!isEdit">
          <el-option label="Student" value="student"></el-option>
          <el-option label="Admin" value="admin"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        v-if="formData.role === 'student'"
        prop="classroomId"
        label="Classroom Id"
        :error="serverRules.classroomId">
        <el-input
          v-model.number="formData.classroomId"
          :disabled="!isEdit">
        </el-input>
      </el-form-item>
      <el-form-item
        v-if="formData.role === 'student'"
        prop="className"
        label="Classroom">
        <el-input
          v-model="formData.className"
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
    header="Результаты"
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
        prop="man"
        label="Man"
        min-width="85">
      </el-table-column>
      <el-table-column
        prop="nature"
        label="Nature"
        min-width="85">
      </el-table-column>
      <el-table-column
        prop="technics"
        label="Technics"
        min-width="85">
      </el-table-column>
      <el-table-column
        prop="sign"
        label="Sign"
        min-width="85">
      </el-table-column>
      <el-table-column
        prop="artistic"
        label="Artistic"
        min-width="85">
      </el-table-column>
      <el-table-column
        label="Operations"
        width="100"
        align="center">
        <template #default="scope">
          <el-button
            size="mini"
            @click="$router.push(`/exercises/${scope.row.exerciseId}`)">
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
          login: { required: true, message: 'Поле не может быть пустым' },
          role: { required: true, message: 'Поле не может быть пустым' },
          classroomId: [
            { type: 'number', message: 'Поле должно быть числом' },
            { required: true, message: 'Поле не может быть пустым' }
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
                login: this.formData.login,
                role: this.formData.role,
                classroomId: this.formData.role === 'student' ? this.formData.classroomId : undefined
              }

              const response = await this.$store.dispatch('users/patch', { id, body } )

              this.formData.className = response.classroom?.className
              this.formDataCopy = { ...this.formData }
              this.$message({ type: 'success', message: 'Запись изменена' })

              this.isEdit = false
              this.$router.push(this.$route.path)
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
    },
    async mounted() {
      try {
        this.isLoading = true
        const id = this.$route.params.id

        const data = await this.$store.dispatch('users/byId', { id })

        const formData = {
          id: data.id,
          login: data.login,
          role: data.role,
          classroomId: data.classroom?.id,
          className: data.classroom?.className
        }

        this.formData = formData
        this.formDataCopy = { ...formData }

        if (data.results.length && data.role === 'student') {
          this.isExtra = true
          this.extraData = data.results
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
