export default {
  data() {
    return {
      tableLabel: 'Загрузка',
      tableData: [],
      isLoading: true,
      totalRows: 0,
      perPage: 0,
      currentPage: Number(this.$route.query.page) || 1
    }
  },
  methods: {
    tableDataLoading: async function () {
      console.warn('You must owerride tableDataLoading method!')
    },
    deleteRecordAction: async function () {
      console.warn('You must owerride deleteRecordAction method!')
    },
    paginationChange: async function () {
      try {
        this.isLoading = true

        const { data, meta } = await this.tableDataLoading()

        if (!data.length)
          this.tableLabel = 'Нет данных'

        // Данные пагинации
        this.totalRows = meta.totalRows
        this.perPage = meta.perPage

        // Данные таблицы
        this.tableData = data
        this.isLoading = false

        this.$router.push({
          query: { page: this.currentPage }
        })
      } catch ({ message }) {
        this.$notify.error({ title: 'Ошибка', message })
      }
    },
    deleteRecord: async function ({ id }) {
      try {
        await this.$confirm(`Удалить запись?`, {
          confirmButtonText: 'Да',
          cancelButtonText: 'Нет',
          type: 'warning'
        })

        await this.deleteRecordAction(id)
        await this.paginationChange()

        this.$message({ type: 'success', message: 'Запись удалена' })
      } catch (e) {
        if (e !== 'cancel')
          this.$notify.error({ title: 'Ошибка', message: e.message })
      }
    }
  },
  mounted() {
    this.paginationChange()
  }
}
