<template>
  <div v-if="isOpen" class="container h-screen">
    <div class="flex justify-center items-center z-10">
      <div class="absolute inset-0 flex items-center max-w-2xl justify-center bg-opacity-90">
        <div class="max-w-xl p-6 mx-4 bg-gray-100 rounded-md shadow-xl">
          <div class="flex items-center justify-between">
            <h3 class="text-2xl">{{ title }}</h3>
            <svg
              @click="$emit('closeModal', false)"
              xmlns="http://www.w3.org/2000/svg"
              class="w-8 h-8 text-red-900 ml-2 cursor-pointer"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div class="mt-6">
            <p class="mb-4 text-sm">
              {{ content }}
            </p>
            <div class="max-w-xl">
              <slot></slot>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineEmits(['closeModal'])
defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: 'modal title'
  },
  content: {
    type: String,
    default: 'lorem ipsum solor dolor'
  }
})
</script>
