<template>
  <Modal
    :is-open="props.modelValue"
    @close-modal="changeModalState($event)"
    @update:model-value="changeModalState"
    title="Редактирование cтатьи"
    content="Пожалуйста заполните форму"
  >
    <div class="py-2">
      <BaseInput
        class="mb-4"
        label="Название статьи"
        placeholder="введите название статьи"
        v-model="editArticleState.name"
      />
      <Textarea
        label="Описание статьи"
        placeholder="введите описание статьи"
        v-model="editArticleState.description"
      />
    </div>
    <div class="mt-2 mb-4">
      <div
        v-for="error of articleEditStateValidation.editArticleState.name.$errors"
        :key="error.$uid"
      >
        <div class="error-msg text-red-700">
          <span class="font-bold text-xl text-black">&#9673; Название статьи - </span>
          {{ error.$message }}
        </div>
      </div>
      <div
        v-for="error of articleEditStateValidation.editArticleState.description.$errors"
        :key="error.$uid"
      >
        <div class="error-msg text-red-700">
          <span class="font-bold text-xl text-black">&#9673; Описание статьи - </span>
          {{ error.$message }}
        </div>
      </div>
    </div>
    <div class="flex space-x-2 justify-end flex-wrap">
      <Button
        size="xl"
        @click="changeModalState(false)"
        class="px-6 py-2 text-blue-800 border border-blue-600 rounded"
      >
        Cancel
      </Button>
      <Button
        @click="editSelectedArticle()"
        size="xl"
        class="px-6 py-2 ml-2 text-blue-100 bg-blue-600 rounded"
        >Edit</Button
      >
    </div>
  </Modal>
</template>

<script setup lang="ts">
import { reactive, defineProps, watch } from 'vue'
import { helpers, minLength, required } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'

// ui-component import
import BaseInput from '@/components/ui/Input.vue'
import Button from '@/components/ui/Button.vue'
import Modal from '@/components/ui/Modal.vue'
import { useArticleStore } from '@/store/core'
import type { TArticle } from '@/types/TArticle'
import Textarea from '@/components/ui/Textarea.vue'

const articleStore = useArticleStore()

interface Props {
  modelValue: boolean
  articleData: TArticle
  index: number | null
}

const props = defineProps<Props>()

let editArticleState = reactive<TArticle>({
  id: Math.random().toString(16).slice(2) || 1,
  name: '',
  description: ''
})

const validationEditArticleState = {
  editArticleState: {
    name: {
      required: helpers.withMessage('Поле обязательно для заполнения', required),
      minLength: helpers.withMessage('Поле дожно состоять боллее 3 символов', minLength(3))
    },
    description: {
      required: helpers.withMessage('Поле обязательно для заполнения', required),
      minLength: helpers.withMessage('Поле дожно состоять боллее 8 символов', minLength(8))
    }
  }
}
const articleEditStateValidation = useVuelidate(
  validationEditArticleState,
  { editArticleState },
  { $scope: false }
)

const editSelectedArticle = () => {
  articleEditStateValidation.value.$reset()
  if (articleEditStateValidation.value.$invalid) {
    articleEditStateValidation.value.$touch()
    return false
  } else {
    articleStore
      .editArticle(editArticleState.id!, editArticleState)
      .then((response) => {
        articleStore.articles[props.index!] = response.data
      })
      .catch((error) => {
        console.log(error)
      })
  }
  changeModalState(false)
}

watch(
  () => props.articleData,
  () => {
    editArticleState.id = props.articleData.id!
    editArticleState.description = props.articleData.description
    editArticleState.name = props.articleData.name
  }
)

const emit = defineEmits(['update:modelValue'])
const changeModalState = (value: boolean): void => {
  emit('update:modelValue', value)
}
</script>
