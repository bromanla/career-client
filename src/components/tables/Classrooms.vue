<template>
  <el-table
    border
    class="table"
    :data="tableData"
    v-loading="isLoading"
    :empty-text="tableLabel">
    <el-table-column
      prop="id"
      label="Id"
      width="50"
      align="center"
    >
    </el-table-column>
    <el-table-column prop="className" label="Name"></el-table-column>
    <el-table-column prop="school.name" label="School"></el-table-column>
    <el-table-column
      label="Operations"
      width="160"
      align="center"
    >
      <template #default="scope">
        <table-operations
          @show="$router.push(`/classrooms/${scope.row.id}`)"
          @edit="$router.push(`/classrooms/${scope.row.id}?edit`)"
          @delete="deleteRecord(scope.row)"></table-operations>
      </template>
    </el-table-column>
  </el-table>

  <el-pagination
    class="pagination"
    layout="prev, pager, next"
    :page-size="perPage"
    :total="totalRows"
    v-model:currentPage="currentPage"
    @update:current-page="paginationChange"
  ></el-pagination>

  <fixed-add-button @action="addVisible = true"></fixed-add-button>

  <el-dialog
    title="Добавление класса"
    v-model="addVisible"
    width="500px">
    <el-form
      @submit.prevent="addClassroom"
      ref="addForm"
      label-width="100px"
      :rules="addFormRules"
      :model="addFormData">
      <el-form-item prop="className" label="Name">
        <el-input v-model="addFormData.className"></el-input>
      </el-form-item>
      <el-form-item prop="schoolId" label="School Id">
        <el-input v-model.number="addFormData.schoolId"></el-input>
      </el-form-item>
      <el-form-item align="right">
        <div>
          <el-button @click="addVisible = false">Отменить</el-button>
          <el-button type="primary" @click="addClassroom">Сохранить</el-button>
        </div>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
  import TableOperations from '@/components/TableOperations.vue'
  import FixedAddButton from '@/components/FixedAddButton.vue'
  import TableMixin from '@/mixins/table.js'

  export default {
    name: 'table-content',
    mixins: [ TableMixin ],
    components: { TableOperations, FixedAddButton },
    data() {
      return {
        addVisible: false,
        addFormData: {},
        addFormRules: {
          className: [{ required: true, message: 'Поле не может быть пустым', trigger: 'submit' }],
          schoolId: [
            { type: 'number', message: 'Поле должно быть числом', trigger: 'submit' },
            { required: true, message: 'Поле не может быть пустым', trigger: 'submit' }
          ]
        }
      }
    },
    methods: {
      addClassroom: function() {
        this.$refs['addForm'].validate(async (valid) => {
          if (valid) {
            try {
              const body = {
                className: this.addFormData.className,
                schoolId: this.addFormData.schoolId
              }

              await this.$store.dispatch('classrooms/post', { body } )
              await this.paginationChange()

              this.addFormData = {}
              this.addVisible = false
            } catch ({ message }) {
              this.$notify.error({ title: 'Ошибка', message: message })
            }
          }
        })
      },
      // Override TableMixin methods
      tableDataLoading: async function () {
        const { classrooms: data, meta } = await this.$store.dispatch('classrooms/fetchClassrooms', { page: this.currentPage })
        return { data, meta }
      },
      deleteRecordAction: async function (id) {
        return this.$store.dispatch('classrooms/delete', { id })
      }
    },
    async mounted() {
      await this.paginationChange()
    }
  }
</script>

<style scoped>
  .table {
    width: 100%;
    margin-bottom: 1rem;
  }

  .pagination {
    margin: auto auto 1rem auto;
  }
</style>
