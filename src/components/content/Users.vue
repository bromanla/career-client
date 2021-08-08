<template>
  <el-card header="Пользователь" shadow="newer" v-loading="isLoading">
    <el-form
      ref="form"
      label-width="110px"
      :model="formData"
      :rules="formRules"
    >
      <el-form-item label="Id">
        <el-input v-model="formData.id" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item prop="login" label="Name" >
         <el-input v-model="formData.login" :disabled="!isEdit"></el-input>
      </el-form-item>
      <el-form-item  prop="role" label="Role">
        <el-select v-model="formData.role" :disabled="!isEdit">
          <el-option label="Student" value="student"></el-option>
          <el-option label="Admin" value="admin"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="classroomId" label="Classroom Id" v-if="formData.role === 'student'">
        <el-input v-model.number="formData.classroomId" :disabled="!isEdit"></el-input>
      </el-form-item>
      <el-form-item prop="className" label="Classroom" v-if="formData.role === 'student'">
        <el-input v-model.number="formData.className" disabled></el-input>
      </el-form-item>
      <el-form-item align="right">
        <el-button v-if="!isEdit" @click="isEdit = true">Редактировать</el-button>
        <div v-if="isEdit">
          <el-button type="danger" @click="editBack">Отменить</el-button>
          <el-button type="primary" @click="editSave">Сохранить</el-button>
        </div>
      </el-form-item>
    </el-form>
  </el-card>

  <el-card header="Результаты" shadow="newer" v-if="isExtra">
    <el-table
      stripe
      border
      :data="extraData"
    >
      <el-table-column prop="id" label="Id" width="50" align="center"></el-table-column>
      <el-table-column prop="man" label="Man"></el-table-column>
      <el-table-column prop="nature" label="Nature"></el-table-column>
      <el-table-column prop="technics" label="Technics"></el-table-column>
      <el-table-column prop="sign" label="Sign"></el-table-column>
      <el-table-column prop="artistic" label="Artistic"></el-table-column>
      <el-table-column
        fixed="right"
        label="Operations"
        width="160"
        align="center"
      >
        <template #default="scope">
          <el-button
            size="mini"
            icon="el-icon-zoom-in"
            @click="showExercisers(scope.row)">
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
          login: [{ required: true, message: 'Поле не может быть пустым' }],
          role: [{ required: true, message: 'Поле не может быть пустым' }],
          classroomId: [
            { type: 'number', message: 'Поле должно быть числом' },
            { required: true, message: 'Поле не может быть пустым' }
          ]
        }
      }
    },
    methods: {
      editBack () {
        this.formData = { ...this.formDataCopy }
        this.isEdit = false
      },
      editSave () {
        this.$refs['form'].validate(async (valid) => {
          if (valid) {
            try {
              const { id, login, role, classroomId } = this.formData

              const body = { login, role }

              if (role === 'student')
                body.classroomId = classroomId

              const response = await this.$store.dispatch('users/patch', { id, body } )

              this.formData.className = response.classroom?.className

              this.formDataCopy = { ...this.formData }
              this.$message({ type: 'success', message: 'Запись Изменена' })
              this.isEdit = false

            } catch ({ message }) {
              this.$notify.error({ title: 'Ошибка', message: message })
            }
          } else {
            return false;
          }
        })
      },
      showExercisers: function (row) {
        const { exerciseId } = row
        this.$router.push(`/exercises/${exerciseId}`)
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

        this.isLoading = false

        if ('edit' in this.$route.query)
          this.isEdit = true
      } catch ({ message }) {
         this.$notify.error({ title: 'Ошибка', message })
      }

    }
  }
</script>

<style scoped>
  .el-form {
    width: 400px;
  }

  .el-card {
    border-radius: 0px;
  }

</style>
