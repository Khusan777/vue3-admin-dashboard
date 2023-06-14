import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
// @ts-ignore
import clientsData from '@/json/clients.json'

export const useProductStore = defineStore('products', () => {
  const clients = ref(clientsData.data)
  const getClients = computed(() => clients.value)

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

  const addClient = (clientData: TClientProduct): void => {
    clients.value = [...clients.value, ...clientData]
  }

  const removeClient = (clientIndex: number): void => {
    clients.value.splice(clientIndex, 1)
  }

  const editClient = (clientIndex: number, updatedClient: TClientProduct): void => {
    clients.value[clientIndex] = updatedClient
  }

  if (localStorage.getItem('clients')) {
    clients.value = JSON.parse(localStorage.getItem('clients') || '')
  }

  watch(
    clients,
    (clientValue): void => {
      localStorage.setItem('clients', JSON.stringify(clientValue))
    },
    { deep: true }
  )

  return { clients, getClients, addClient, removeClient, editClient }
})
