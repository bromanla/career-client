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
    ></el-table-column>
    <el-table-column prop="name" label="Name"></el-table-column>
    <el-table-column
      label="Operations"
      width="160"
      align="center">
      <template #default="scope">
        <table-operations
          @show="$router.push(`/schools/${scope.row.id}`)"
          @edit="$router.push(`/schools/${scope.row.id}?edit`)"
          @delete="deleteRecord(scope.row)">
        </table-operations>
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
  >
  </el-pagination>

  <fixed-add-button @action="addVisible = true"></fixed-add-button>

  <el-dialog
    title="Добавление школы"
    v-model="addVisible"
    width="500px">
    <el-form
      @submit.prevent="addSchool"
      ref="addForm"
      :rules="addFormRules"
      :model="addFormData">
      <el-form-item prop="name" label="Name">
        <el-input v-model="addFormData.name"></el-input>
      </el-form-item>
      <el-form-item align="right">
        <div>
          <el-button @click="addVisible = false">Отменить</el-button>
          <el-button type="primary" @click="addSchool">Сохранить</el-button>
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
          name: [{ required: true, message: 'Поле не может быть пустым', trigger: 'submit' }]
        }
      }
    },
    methods: {
      addSchool: function() {
        this.$refs['addForm'].validate(async (valid) => {
          if (valid) {
            try {
              const body = { name: this.addFormData.name }

              await this.$store.dispatch('schools/post', { body } )
              await this.paginationChange()

              this.addFormData = {}
              this.addVisible = false
            } catch ({message}) {
              this.$notify.error({ title: 'Ошибка', message: message })
            }
          }
        })
      },
      // Override TableMixin methods
      tableDataLoading: async function () {
        const { schools: data, meta } = await this.$store.dispatch('schools/fetchSchools', { page: this.currentPage })
        return { data, meta }
      },
      deleteRecordAction: async function (id) {
        return this.$store.dispatch('schools/delete', { id })
      }
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
