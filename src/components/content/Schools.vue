<template>
  <el-card header="Школа" shadow="newer" v-loading="isLoading">
    <el-form
      ref="form"
      label-width="50px"
      :model="formData"
      :rules="formRules"
    >
      <el-form-item label="Id">
        <el-input v-model="formData.id" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item prop="name" label="Name" >
         <el-input v-model="formData.name" :disabled="!isEdit"></el-input>
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

  <el-card header="Классы" shadow="newer" v-if="isExtra">
    <el-table
      stripe
      border
      :data="extraData"
    >
      <el-table-column prop="id" label="Id" width="50" align="center"></el-table-column>
      <el-table-column prop="className" label="Name"></el-table-column>
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
            @click="showClassroom(scope.row)">
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
          name: [{ required: true, message: 'Поле не может быть пустым', trigger: 'change' }]
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
              const { id, ...body } = this.formData
              await this.$store.dispatch('schools/patch', { id, body })

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
      showClassroom (row) {
        const { id } = row
        this.$router.push(`/classrooms/${id}`)
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
