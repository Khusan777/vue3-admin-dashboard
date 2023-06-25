<template>
  <Modal
    :is-open="props.modelValue"
    @update:model-value="changeModalState"
    title="Добавление клиента"
    content="Пожалуйста заполните форму"
    @close-modal="changeModalState($event)"
  >
    <div class="py-6 flex space-x-6">
      <BaseInput label="Имя клиента" placeholder="введите имя клиента" v-model="clientState.name" />
      <BaseInput
        label="Дата рождение"
        placeholder="введите дату рождение"
        type="date"
        v-model="clientState.birth_date"
      />
      <BaseInput
        label="Телефон номер"
        placeholder="введите Телефон номер"
        v-model="clientState.telephone"
      />
    </div>
    <div class="flex py-2 space-x-4">
      <BaseInput
        label="Название продукта"
        placeholder="введите название продукта"
        v-model="clientState.product.name"
      />
      <BaseInput
        label="Цена продукта"
        placeholder="введите цену продукта"
        v-model="clientState.product.price"
      />
      <Textarea
        class="mb-4"
        label="Комментарии"
        placeholder="комметарии о продукте"
        v-model="clientState.product.comment"
      />
    </div>
    <div class="mt-2 mb-4">
      <div
        class="block"
        v-for="error of clientStateValidation.clientState.name.$errors"
        :key="error.$uid"
      >
        <div class="error-msg text-red-700">
          <span class="font-bold text-xl text-black">&#9673; Имя клиента - </span>
          {{ error.$message }}
        </div>
      </div>
      <div
        class="block"
        v-for="error of clientStateValidation.clientState.telephone.$errors"
        :key="error.$uid"
      >
        <div class="error-msg text-red-700">
          <span class="font-bold text-xl text-black">&#9673; Телефон номер - </span>
          {{ error.$message }}
        </div>
      </div>
      <div
        v-for="error of clientStateValidation.clientState.product.name.$errors"
        :key="error.$uid"
      >
        <div class="error-msg text-red-700">
          <span class="font-bold text-xl text-black">&#9673; Имя продукта - </span>
          {{ error.$message }}
        </div>
      </div>
      <div
        v-for="error of clientStateValidation.clientState.product.price.$errors"
        :key="error.$uid"
      >
        <div class="error-msg text-red-700">
          <span class="font-bold text-xl text-black">&#9673; Цена продукта - </span>
          {{ error.$message }}
        </div>
      </div>
    </div>
    <div class="flex space-x-2 justify-end flex-wrap">
      <Button
        size="xl"
        @click="changeModalState(false)"
        class="px-6 py-2 text-blue-800 w-1/2 border border-blue-600 rounded"
      >
        Cancel
      </Button>
      <Button
        @click="addNewClient()"
        size="xl"
        class="px-6 py-2 ml-2 text-blue-100 bg-blue-600 rounded w-1/2"
        >Create</Button
      >
    </div>
  </Modal>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { helpers, minLength, numeric, required } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'

// ui-component import
import BaseInput from '@/components/ui/Input.vue'
import Button from '@/components/ui/Button.vue'
import Textarea from '@/components/ui/Textarea.vue'
import Modal from '@/components/ui/Modal.vue'
import { useProductStore } from '@/store/core'

const clientProducts = useProductStore()

interface Props {
  modelValue: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false
})

const initialState: {
  name: string
  birth_date: string
  telephone: string
  product: { name: string; price: number | null; comment: string }
} = {
  name: '',
  birth_date: new Date().toLocaleDateString(),
  telephone: '',
  product: {
    name: '',
    price: null,
    comment: ''
  }
}
let clientState = reactive<{
  name: string
  birth_date: string | Date
  telephone: string
  product: {
    name: string
    price: number | null
    comment?: string
  }
}>({
  name: '',
  birth_date: new Date(),
  telephone: '',
  product: {
    name: '',
    price: null,
    comment: ''
  }
})

const plusSymbolValidate = (telephoneNumber: string) => telephoneNumber.startsWith('+')
const validationClientState = {
  clientState: {
    name: {
      required: helpers.withMessage('Поле обязательно для заполнения', required)
    },
    telephone: {
      required: helpers.withMessage('Поле обязательно для заполнения', required),
      minLength: minLength(8),
      plusSymbolValidate: helpers.withMessage(
        'Телeфон номер должен начинаться с символа +',
        plusSymbolValidate
      )
    },
    product: {
      name: {
        required: helpers.withMessage('Поле обязательно для заполнения', required)
      },
      price: {
        required: helpers.withMessage('Поле обязательно для заполнения', required),
        numeric: helpers.withMessage('Поле должен быть цифрой', numeric),
        minlength: helpers.withMessage('Поле должно быть более 3 цифр', minLength(3))
      }
    }
  }
}
const clientStateValidation = useVuelidate(validationClientState, { clientState })

const addNewClient = () => {
  clientStateValidation.value.$reset()
  if (clientStateValidation.value.$invalid) {
    clientStateValidation.value.$touch()
    return false
  } else {
    clientProducts
      .addClient({
        id: Math.random().toString(16).slice(2) || 1,
        ...clientState,
        birth_date: clientState.birth_date.toLocaleString(),
        img: `https://source.unsplash.com/featured/300x${100 + clientProducts.clients?.length + 1}`
      })
      .then((response) => {
        clientProducts.clients.push(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
    changeModalState(false)
    clientState = reactive({ ...initialState })
  }
}

const emit = defineEmits(['update:modelValue'])
const changeModalState = (value: boolean): void => {
  emit('update:modelValue', value)
}
</script>
