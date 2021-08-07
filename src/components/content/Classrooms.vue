<template>
  <el-card header="Классы" shadow="newer" v-loading="isLoading">
    <el-form
      ref="form"
      label-width="80px"
      :model="formData"
      :rules="formRules"
    >
      <el-form-item label="Id">
        <el-input v-model="formData.id" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item prop="className" label="Name" >
        <el-input v-model="formData.className" :disabled="!isEdit"></el-input>
      </el-form-item>
      <el-form-item prop="schoolId" label="School Id" >
        <el-input v-model.number="formData.schoolId" :disabled="!isEdit"></el-input>
      </el-form-item>
      <el-form-item prop="schoolName" label="School" >
        <el-input v-model="formData.schoolName" disabled></el-input>
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

  <el-card header="Ученики" shadow="newer" v-if="isExtra">
    <el-table
      stripe
      border
      :data="extraData"
    >
      <el-table-column prop="id" label="Id" width="50" align="center"></el-table-column>
      <el-table-column prop="login" label="login"></el-table-column>
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
            @click="showUser(scope.row)">
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
          className: [{ required: true, message: 'Поле не может быть пустым'}],
          schoolId: [
            { type: 'number', message: 'Поле должно быть числом' },
            { required: true, message: 'Поле не может быть пустым'}
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
              const { id, className, schoolId } = this.formData

              const response = await this.$store.dispatch('classrooms/patch', { id, body: { className, schoolId }} )

              this.formData.schoolName = response.school.name
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
      showUser (row) {
        const { id } = row
        this.$router.push(`/users/${id}`)
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
          schoolId: data.school.id,
          schoolName: data.school.name
        }

        this.formData = formData
        this.formDataCopy = { ...formData }

        if (users.length) {
          this.isExtra = true
          this.extraData = users
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
