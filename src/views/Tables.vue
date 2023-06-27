<template>
  <div class="container grid px-6 mx-auto">
    <h2 class="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">Articles</h2>
    <Info />
    <div class="flex justify-between items-start flex-wrap mb-8">
      <h4 class="mb-4 text-lg font-semibold text-gray-600 dark:text-gray-300">
        Table with all articles
      </h4>
      <Button @click="isCreateModal = true"
        ><PlusIcon class="w-4 h-4 text-white mr-2"></PlusIcon>Add article</Button
      >
    </div>
    <div
      v-if="articleStore.articles?.length"
      class="w-full mb-8 overflow-hidden rounded-lg shadow-xs"
    >
      <div class="w-full overflow-x-auto">
        <table class="w-full mt-4 whitespace-no-wrap">
          <thead>
            <tr
              class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800"
            >
              <th class="px-4 py-3">N#</th>
              <th class="px-4 py-3">Name</th>
              <th class="px-4 py-3">Description</th>
              <th class="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
            <TableRow
              @deleted-article="deleteArticle($event, true)"
              @edited-article="editArticle(index, $event)"
              v-for="(article, index) in articleStore.articles"
              :key="article.id"
              :article="article"
              :index="index"
            />
          </tbody>
        </table>
      </div>
      <!--      Footer table-->
      <div
        class="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800"
      >
        <span class="flex items-center col-span-3">
          Showing 1-{{ articleStore.articles?.length }} of {{ articleStore.articles?.length }}
        </span>
        <span class="col-span-2"></span>
      </div>
    </div>
    <div class="space-y-4" v-else>
      <Alert></Alert>
    </div>

    <CreateArticle v-model="isCreateModal"></CreateArticle>
    <EditArticle
      :articleData="initialState"
      :index="indexSelectedArticle"
      v-model="isEditModal"
    ></EditArticle>
    <!--    // Delete Client-->
    <Modal
      title="Удаление статьи"
      content="Вы действительно хотите удалить статью?"
      @close-modal="closeModal($event)"
      :is-open="isDeleteModal"
    >
      <div class="flex justify-between flex-wrap">
        <Button
          size="xl"
          @click="deleteArticle(null, false)"
          class="px-6 py-2 text-blue-800 border border-blue-600 rounded"
        >
          Cancel
        </Button>
        <Button
          @click="deletedArticle"
          size="xl"
          color="red"
          class="px-6 py-2 ml-2 text-blue-100 bg-blue-600 rounded"
          >Delete</Button
        >
      </div>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Info from '@/components/Info.vue'
import { PlusIcon } from '@heroicons/vue/solid'
import { useArticleStore } from '@/store/core'

// ui-import
import TableRow from '@/components/tables/TableRow.vue'
import Button from '@/components/ui/Button.vue'
import Modal from '@/components/ui/Modal.vue'
import Alert from '@/components/ui/Alert.vue'
import CreateArticle from '@/components/client/CreateArticle.vue'
import EditArticle from '@/components/client/EditArticle.vue'
import type { TArticle } from '@/types/TArticle'

const articleStore = useArticleStore()

let initialState: TArticle = {
  id: Math.random().toString(16).slice(2) || 1,
  name: null,
  description: null
}

const indexSelectedArticle = ref<number | null>(null)
const isCreateModal = ref<boolean>(false)
const isEditModal = ref<boolean>(false)
const deletedIdArticle = ref<number | string>()

const isDeleteModal = ref<boolean>(false)
const deleteArticle = (id: number | string, open: boolean) => {
  deletedIdArticle.value = id
  isDeleteModal.value = open
}
const closeModal = (isOpen: boolean): void => {
  isDeleteModal.value = isOpen
}

const editArticle = (indexElement: number, articleData: TArticle) => {
  indexSelectedArticle.value = indexElement
  isEditModal.value = true
  initialState = articleData
}

const deletedArticle = (): void => {
  articleStore
    .removeArticle(deletedIdArticle.value!)
    .then(() => {
      articleStore
        .getAllArticles()
        .then((response) => {
          articleStore.articles = [...response.data]
        })
        .catch((error) => {
          console.log(error)
        })
    })
    .catch((error) => {
      console.log(error)
    })
  isDeleteModal.value = false
}
</script>
