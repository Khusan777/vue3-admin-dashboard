<template>
  <button
    :class="[
      { 'px-10 py-4': size === 'xl' },
      { 'px-5 py-3': size === 'lg' },
      { 'px-4 py-2 text-sm': size === 'md' },
      { 'bg-purple-600': color === 'purple' },
      { 'bg-red-600': color === 'red' },
      disabled ? 'opacity-50 cursor-pointer' : ''
    ]"
    class="font-medium leading-5 text-white border border-transparent rounded-lg hover:bg-gray-200 focus:outline-none focus:shadow-outline-purple flex items-center transition duration-200 ease-in"
    :disabled="disabled"
  >
    <Loader class="w-6 h-6 text-white mr-2" v-if="loading" />
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import Loader from '@/components/ui/Loader.vue'

defineProps({
  size: {
    type: String,
    default: 'md'
  },
  loading: {
    type: Boolean,
    default: false
  },
  color: {
    type: String,
    default: 'purple',
    validator(value: string) {
      return value === 'purple' || value === 'red'
    }
  },
  disabled: {
    type: Boolean,
    default: false
  }
})
</script>
