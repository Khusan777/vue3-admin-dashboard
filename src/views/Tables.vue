<template>
  <div class="container grid px-6 mx-auto">
    <h2 class="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">Clients</h2>
    <Info />
    <div class="flex justify-between items-start flex-wrap mb-8">
      <h4 class="mb-4 text-lg font-semibold text-gray-600 dark:text-gray-300">
        Table with all clients
      </h4>
      <Button @click="isCreateModal = true"
        ><PlusIcon class="w-4 h-4 text-white mr-2"></PlusIcon>Add client</Button
      >
    </div>
    <div
      v-if="clientProducts.clients?.length"
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
              <th class="px-4 py-3">Birth_Date</th>
              <th class="px-4 py-3">Telephone</th>
              <th class="px-4 py-3">Product</th>
              <th class="px-4 py-3">Price</th>
              <th class="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
            <TableRow
              @deleted-client="deleteClient($event, true)"
              @edited-client="editClient(index, $event)"
              v-for="(person, index) in clientProducts.clients"
              :key="person.id"
              :person="person"
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
          Showing 1-{{ clientProducts.clients.length }} of {{ clientProducts.clients.length }}
        </span>
        <span class="col-span-2"></span>
      </div>
    </div>
    <div class="space-y-4" v-else>
      <Alert></Alert>
    </div>

    <CreateClient v-model="isCreateModal"></CreateClient>
    <EditClient
      :personData="initialState"
      :index="indexSelectedClient"
      v-model="isEditModal"
    ></EditClient>

    <!--    // Delete Client-->
    <Modal
      title="Удаление клиента"
      content="Вы действительно хотите удалить клиента?"
      @close-modal="closeModal($event)"
      :is-open="isDeleteModal"
    >
      <div class="flex justify-between flex-wrap">
        <Button
          size="xl"
          @click="deleteClient(null, false)"
          class="px-6 py-2 text-blue-800 border border-blue-600 rounded"
        >
          Cancel
        </Button>
        <Button
          @click="deletedClient"
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
import { useProductStore } from '@/store/core'

// ui-import
import TableRow from '@/components/tables/TableRow.vue'
import Button from '@/components/ui/Button.vue'
import Modal from '@/components/ui/Modal.vue'
import Alert from '@/components/ui/Alert.vue'
import CreateClient from '@/components/client/CreateClient.vue'
import EditClient from '@/components/client/EditClient.vue'

const clientProducts = useProductStore()

let initialState: TClientProduct = {
  name: '',
  birth_date: new Date().toLocaleDateString(),
  telephone: '',
  product: {
    name: null,
    price: null,
    comment: ''
  }
}

type TClientProduct = {
  id?: number
  name: string
  img?: string
  birth_date: string
  telephone: string
  product: {
    name: string | null
    price: number | null
    comment: string
  }
}

const indexSelectedClient = ref<number | null>(null)
const isCreateModal = ref<boolean>(false)
const isEditModal = ref<boolean>(false)
const deletedIdClient = ref<string>()

const isDeleteModal = ref<boolean>(false)
const deleteClient = (id: string, open: boolean) => {
  deletedIdClient.value = id
  isDeleteModal.value = open
}
const closeModal = (isOpen: boolean): void => {
  isDeleteModal.value = isOpen
}

const editClient = (indexElement: number, personData: TClientProduct) => {
  indexSelectedClient.value = indexElement
  isEditModal.value = true
  initialState = personData
}

const deletedClient = (): void => {
  clientProducts
    .removeClient(deletedIdClient.value!)
    .then(() => {
      clientProducts
        .getAllClients()
        .then((response) => {
          clientProducts.clients = [...response.data]
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
