<template>
  <div class="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4" role="alert">
    <p class="font-bold">{{ title }}</p>
    <p>{{ description }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
    default: 'Be Warned'
  },
  description: {
    type: String,
    default: 'Article list is empty!!!'
  }
})
</script>
