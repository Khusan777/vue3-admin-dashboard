<template>
  <div>
    <Label :for="state.uniqueId" v-if="label">{{ label }}</Label>
    <div class="mt-1">
      <input
        :type="type"
        :id="state.uniqueId"
        v-bind="$attrs"
        :placeholder="placeholder || label"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        :class="{
          'border-2 border-red-600': error,
          'border-2 border-green-600': success,
          'border-2 border-blue-600': info,
          'border-2 border-yellow-400': warning
        }"
        :value="modelValue"
        @input="updateInput"
      />
    </div>
  </div>
</template>

<script>
export default {
  inheritAttrs: false
}
</script>

<script setup>
import Label from '@/components/ui/Label.vue'
import FormError from '@/components/ui/FormError.vue'
import { onMounted, reactive } from 'vue'

const props = defineProps({
  label: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  modelValue: {
    type: [String, Number, Date],
    default: ''
  },
  error: {
    type: [String, Boolean],
    default: false
  },
  id: {
    type: String
  },
  type: {
    type: String,
    default: 'text'
  },
  success: Boolean,
  info: Boolean,
  warning: Boolean
})

const emit = defineEmits(['update:modelValue'])

const state = reactive({
  uniqueId: ''
})

const updateInput = ($event) => {
  emit('update:modelValue', $event.target.value)
}

onMounted(() => {
  state.uniqueId = props.id || Math.random().toString(16).slice(2)
})
</script>
