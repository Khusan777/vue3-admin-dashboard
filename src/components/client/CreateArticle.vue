<template>
  <Modal
    :is-open="props.modelValue"
    @update:model-value="changeModalState"
    title="Добавление статьи"
    content="Пожалуйста заполните форму"
    @close-modal="changeModalState($event)"
  >
    <div class="py-2">
      <BaseInput
        class="mb-4"
        label="Название статьи"
        placeholder="введите название статьи"
        v-model="articleState.name"
      />
      <Textarea
        label="Описание статьи"
        placeholder="введите описание статьи"
        v-model="articleState.description"
      />
    </div>
    <div class="mt-2 mb-4">
      <div
        class="block"
        v-for="error of articleStateValidation.articleState.name.$errors"
        :key="error.$uid"
      >
        <div class="error-msg text-red-700">
          <span class="font-bold text-xl text-black">&#9673; Название статьи - </span>
          {{ error.$message }}
        </div>
      </div>
      <div
        class="block"
        v-for="error of articleStateValidation.articleState.description.$errors"
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
        class="px-6 py-2 text-blue-800 w-1/2 border border-blue-600 rounded"
      >
        Cancel
      </Button>
      <Button
        @click="addNewArticle"
        size="xl"
        class="px-6 py-2 ml-2 text-blue-100 bg-blue-600 rounded w-1/2"
        >Create</Button
      >
    </div>
  </Modal>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
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
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false
})

let articleState = reactive<TArticle>({
  id: Math.random().toString(16).slice(2) || 1,
  name: '',
  description: ''
})

const validationArticleState = {
  articleState: {
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
const articleStateValidation = useVuelidate(
  validationArticleState,
  { articleState },
  { $scope: false }
)

const addNewArticle = () => {
  articleStateValidation.value.$reset()
  if (articleStateValidation.value.$invalid) {
    articleStateValidation.value.$touch()
    return
  } else {
    articleStore
      .addArticle(articleState)
      .then((response) => {
        articleStore.articles.push(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
    changeModalState(false)
    articleState.description = ''
    articleState.name = ''
  }
}

const emit = defineEmits(['update:modelValue'])
const changeModalState = (value: boolean): void => {
  emit('update:modelValue', value)
}
</script>
