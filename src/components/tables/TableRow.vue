<template>
  <tr class="text-gray-700 dark:text-gray-400">
    <td class="px-4 py-3 text-sm">{{ article.id }}</td>
    <td>
      <div>
        <p class="text-xs text-gray-600 px-4 py-3 dark:text-gray-400">
          {{ article.name }}
        </p>
      </div>
    </td>
    <td class="px-4 py-3 text-sm">{{ article.description }}</td>
    <td class="px-4 py-3 text-xs">
      <div class="px-2 py-1 flex sm:flex-col md:flex-row space-x-2">
        <Button size="lg" @click="deleteArticleData(article.id)" color="red"
          ><TrashIcon class="w-4 h-4 text-red"></TrashIcon
        ></Button>
        <Button size="lg" @click="editArticleData(article)"
          ><PencilIcon class="w-4 h-4 text-white"></PencilIcon
        ></Button>
      </div>
    </td>
  </tr>
</template>

<script setup lang="ts">
import { PencilIcon, TrashIcon } from '@heroicons/vue/solid'

import Button from '@/components/ui/Button.vue'

type TArticle = {
  id: number | string
  name: string
  description: string
}

const emit = defineEmits(['deletedArticle', 'editedArticle'])
const deleteArticleData = (deletedIdArticle: number) => {
  emit('deletedArticle', deletedIdArticle)
}
const editArticleData = (editedArticleData: TArticle) => {
  emit('editedArticle', editedArticleData)
}

defineProps({
  article: {
    type: Object,
    required: true
  },
  index: {
    type: Number,
    required: true
  }
})
</script>
