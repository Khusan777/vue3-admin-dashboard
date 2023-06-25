import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { TClientProduct } from '@/types/TClient'
import axios from 'axios'
import type { AxiosRequestConfig } from 'axios'

export const useProductStore = defineStore('products', () => {
  const clients = ref<TClientProduct[]>([])
  const getClients = computed(() => clients.value)

  const addClient = async (clientData: TClientProduct): Promise<AxiosRequestConfig> =>
    await axios.post('http://localhost:3000/data', clientData)

  const getAllClients = async (): Promise<AxiosRequestConfig> =>
    await axios.get('http://localhost:3000/data')

  const removeClient = async (clientIndex: string): Promise<AxiosRequestConfig> =>
    await axios.delete(`http://localhost:3000/data/${clientIndex}`)

  const editClient = async (
    clientId: string,
    updatedClient: TClientProduct
  ): Promise<AxiosRequestConfig> =>
    await axios.patch(`http://localhost:3000/data/${clientId}`, updatedClient)

  return { clients, getClients, addClient, removeClient, editClient, getAllClients }
})
