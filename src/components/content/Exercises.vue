<template>
  <el-card
    header="Упражнение"
    shadow="newer">
    <el-form
      ref="form"
      v-loading="isLoading"
      label-width="auto"
      :model="formData">
      <el-form-item
        label="Id">
        <el-input
          v-model="formData.id"
          disabled>
        </el-input>
      </el-form-item>
      <el-form-item
        label="Name">
        <el-input
          v-model="formData.name"
          disabled>
        </el-input>
      </el-form-item>
       <el-form-item
        label="Description">
        <el-input
          v-model="formData.description"
          disabled
          type="textarea"
          autosize>
        </el-input>
      </el-form-item>
    </el-form>
  </el-card>

  <el-card
    header="Вопросы"
    shadow="newer"
    v-if="isExtra">
      <div
        v-for="(questions, index) in extraData"
        :key="questions.id">
        <p class="question"> {{ `${index + 1}. ${questions.question}` }} </p>
        <el-space wrap>
          <template
            v-for="answers in questions.answers"
            :key="answers.id">
            <el-button
              @click="answerDetails(answers)">
              <el-image
                v-if="answers.type === 'image'"
                :src="answers.answer"
                class="button-image"
                fit="scale-down">
              </el-image>
              <template v-else>
                {{ answers.answer }}
              </template>
            </el-button>
          </template>
        </el-space>
        <el-divider></el-divider>
      </div>
  </el-card>
</template>

<script>
  export default {
    data() {
      return {
        isLoading: true,
        isExtra: false,
        formData: {},
        extraData: []
      }
    },
    methods: {
      async answerDetails({ man, nature, technics, sign, artistic }) {
        await this.$alert(
         `Человек Человек: ${man}<br/>
          Человек Природа: ${nature}<br/>
          Человек Техника: ${technics}<br/>
          Человек Знаковая Система: ${sign}<br/>
          Человек Художественный Образ: ${artistic}`,
          'Результаты',
          {
            closeOnPressEscape: true,
            closeOnClickModal: true,
            dangerouslyUseHTMLString: true
          }
        ).catch(() => {})
      }
    },
    async mounted() {
      try {
        this.isLoading = true
        const id = this.$route.params.id

        const { questions, ...data } = await this.$store.dispatch('exercises/byId', { id })

        this.formData = {
          id: data.id,
          name: data.name,
          description: data.description
        }

        if (questions.length) {
          this.isExtra = true
          this.extraData = questions
        }

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

  .question {
    margin-bottom: 1.5rem;
  }

  .button-image {
    height: 150px;
  }
</style>
