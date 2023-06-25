<template>
  <tr class="text-gray-700 dark:text-gray-400">
    <td class="px-4 py-3 text-sm">{{ person.id }}</td>
    <td class="px-4 py-3">
      <div class="flex items-center text-sm">
        <div class="relative flex hidden w-8 h-8 mr-3 rounded-full md:block">
          <img
            class="object-cover inline-block w-full h-full rounded-full"
            :src="person.img"
            :alt="person.img"
            loading="lazy"
          />
          <div class="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"></div>
        </div>
        <div>
          <p class="font-semibold">{{ person.name }}</p>
        </div>
      </div>
    </td>
    <td>
      <div>
        <p class="text-xs text-gray-600 px-4 py-3 dark:text-gray-400">
          {{ person.birth_date }}
        </p>
      </div>
    </td>
    <td class="px-4 py-3 text-sm">{{ person.telephone }}</td>
    <td class="px-4 py-3 text-xs">
      <div
        class="px-2 py-1 font-semibold leading-tight bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100"
      >
        <p class="text-center">{{ person.product?.name }}</p>
      </div>
    </td>
    <td class="px-4 py-3 text-xs">
      <div
        class="px-2 py-1 font-semibold leading-tight text-black-500 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300"
      >
        <p class="text-center">{{ person.product?.price }} $</p>
      </div>
    </td>
    <td class="px-4 py-3 text-xs">
      <div class="px-2 py-1 flex sm:flex-col md:flex-row space-x-2">
        <Button size="lg" @click="deleteClientData(person.id)" color="red"
          ><TrashIcon class="w-4 h-4 text-red"></TrashIcon
        ></Button>
        <Button size="lg" @click="editClientData(person)"
          ><PencilIcon class="w-4 h-4 text-white"></PencilIcon
        ></Button>
      </div>
    </td>
  </tr>
</template>

<script setup lang="ts">
import { PencilIcon, TrashIcon } from '@heroicons/vue/solid'

import Button from '@/components/ui/Button.vue'

type TClientProduct = {
  id: number
  name: string
  img: string
  birth_date: string
  telephone: string
  product: {
    name: string
    price: number
    comment: string
  }
}

const emit = defineEmits(['deletedClient', 'editedClient'])
const deleteClientData = (deletedIdClient: number) => {
  emit('deletedClient', deletedIdClient)
}
const editClientData = (editedClientData: TClientProduct) => {
  emit('editedClient', editedClientData)
}

defineProps({
  person: {
    type: Object,
    required: true
  },
  index: {
    type: Number,
    required: true
  }
})
</script>
