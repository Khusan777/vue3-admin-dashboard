import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { TArticle } from '@/types/TArticle'
import axios from 'axios'
import type { AxiosRequestConfig } from 'axios'

export const useArticleStore = defineStore('articles', () => {
  const articles = ref<TArticle[]>([])
  const getArticles = computed(() => articles.value)

  const addArticle = async (articleData: TArticle): Promise<AxiosRequestConfig> =>
    await axios.post('http://localhost:3000/data', articleData)

  const getAllArticles = async (): Promise<AxiosRequestConfig> =>
    await axios.get('http://localhost:3000/data')

  const removeArticle = async (articleIndex: number | string): Promise<AxiosRequestConfig> =>
    await axios.delete(`http://localhost:3000/data/${articleIndex}`)

  const editArticle = async (
    articleId: number | string,
    updatedArticle: TArticle
  ): Promise<AxiosRequestConfig> =>
    await axios.patch(`http://localhost:3000/data/${articleId}`, updatedArticle)

  return { articles, getArticles, addArticle, removeArticle, editArticle, getAllArticles }
})
