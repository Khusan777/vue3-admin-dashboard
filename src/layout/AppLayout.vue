<template>
  <div class="flex h-screen bg-gray-50 dark:bg-gray-900" id="app">
    <Sidebar :isSideMenuOpen="isSideMenuOpen" @close-side-menu="isSideMenuOpen = false" />
    <div class="flex flex-col flex-1 w-full">
      <Navigation @open-side-menu="isSideMenuOpen = !isSideMenuOpen" />
      <div class="p-6 dark:text-white">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </div>
  </div>
  <FooterPartial></FooterPartial>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import '@/assets/main.min.css'

import { RouterView } from 'vue-router'
import Sidebar from '../components/ui/Sidebar.vue'
import Navigation from '../components/ui/Navigation.vue'
import FooterPartial from '@/components/footer/FooterPartial.vue'
import { useArticleStore } from '@/store/core'

const articleStore = useArticleStore()

const allArticlesData = () => {
  articleStore
    .getAllArticles()
    .then((response) => {
      articleStore.articles = response.data || []
    })
    .catch((error) => {
      console.error(error)
    })
}

allArticlesData()

const isSideMenuOpen = ref(false)
</script>
