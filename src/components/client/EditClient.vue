<template>
  <Modal
    :is-open="props.modelValue"
    @close-modal="changeModalState($event)"
    @update:model-value="changeModalState"
    title="Редактирование клиента"
    content="Пожалуйста заполните форму"
  >
    <div class="py-6 flex space-x-6">
      <BaseInput
        label="Имя клиента"
        placeholder="введите имя клиента"
        v-model="editClientState.name"
      />
      <BaseInput
        label="Дата рождение"
        placeholder="введите дату рождение"
        type="date"
        v-model="editClientState.birth_date"
      />
      <BaseInput
        label="Телефон номер"
        placeholder="введите Телефон номер"
        v-model="editClientState.telephone"
      />
    </div>
    <div class="flex py-2 space-x-4">
      <BaseInput
        label="Название продукта"
        placeholder="введите название продукта"
        v-model="editClientState.product.name"
      />
      <BaseInput
        label="Цена продукта"
        placeholder="введите цену продукта"
        v-model="editClientState.product.price"
      />
      <Textarea
        class="mb-4"
        label="Комментарии"
        placeholder="комметарии о продукте"
        v-model="editClientState.product.comment"
      />
    </div>
    <div class="mt-2 mb-4">
      <div
        v-for="error of clientEditStateValidation.editClientState.name.$errors"
        :key="error.$uid"
      >
        <div class="error-msg text-red-700">
          <span class="font-bold text-xl text-black">&#9673; Имя клиента - </span>
          {{ error.$message }}
        </div>
      </div>
      <div
        v-for="error of clientEditStateValidation.editClientState.telephone.$errors"
        :key="error.$uid"
      >
        <div class="error-msg text-red-700">
          <span class="font-bold text-xl text-black">&#9673; Телефон номер - </span>
          {{ error.$message }}
        </div>
      </div>
      <div
        v-for="error of clientEditStateValidation.editClientState.product.name.$errors"
        :key="error.$uid"
      >
        <div class="error-msg text-red-700">
          <span class="font-bold text-xl text-black">&#9673; Имя продукта - </span>
          {{ error.$message }}
        </div>
      </div>
      <div
        v-for="error of clientEditStateValidation.editClientState.product.price.$errors"
        :key="error.$uid"
      >
        <div class="error-msg text-red-700">
          <span class="font-bold text-xl">&#9673; Цена продукта - </span>
          {{ error.$message }}
        </div>
      </div>
    </div>
    <div class="flex space-x-2 justify-end flex-wrap">
      <Button
        size="xl"
        @click="changeModalState(false)"
        class="px-6 py-2 text-blue-800 border border-blue-600 rounded"
      >
        Cancel
      </Button>
      <Button
        @click="editSelectedClient()"
        size="xl"
        class="px-6 py-2 ml-2 text-blue-100 bg-blue-600 rounded"
        >Edit</Button
      >
    </div>
  </Modal>
</template>

<script setup lang="ts">
import { reactive, defineProps, watch } from 'vue'
import { helpers, minLength, numeric, required } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'

// ui-component import
import BaseInput from '@/components/ui/Input.vue'
import Button from '@/components/ui/Button.vue'
import Textarea from '@/components/ui/Textarea.vue'
import Modal from '@/components/ui/Modal.vue'
import { useProductStore } from '@/store/core'

const clientProducts = useProductStore()

type TClientProduct = {
  id?: number
  name: string
  img?: string
  birth_date: string | Date
  telephone: string
  product: {
    name: string
    price: number
    comment: string
  }
}

interface Props {
  modelValue: boolean
  personData: TClientProduct
  index: number | undefined
}

const props = defineProps<Props>()

const initialState = {
  name: '',
  birth_date: new Date().toLocaleString(),
  telephone: '',
  product: {
    name: '',
    price: null,
    comment: ''
  }
}

let editClientState = reactive({
  id: props.personData.id,
  name: '',
  img: '',
  birth_date: new Date().toLocaleString(),
  telephone: '',
  product: {
    name: '',
    price: null,
    comment: ''
  }
})

const validationEditClientState = {
  editClientState: {
    name: {
      required: helpers.withMessage('Поле обязательно для заполнения', required)
    },
    telephone: {
      required: helpers.withMessage('Поле обязательно для заполнения', required)
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
const clientEditStateValidation = useVuelidate(validationEditClientState, { editClientState })

const editSelectedClient = () => {
  clientEditStateValidation.value.$reset()
  if (clientEditStateValidation.value.$invalid) {
    clientEditStateValidation.value.$touch()
    return false
  } else {
    clientProducts.clients[props.index] = {
      ...editClientState,
      birth_date: editClientState.birth_date.toLocaleString()
    }
  }
  changeModalState(false)
  editClientState = reactive({ ...initialState })
}

watch(
  () => props.personData,
  () => {
    editClientState.id = props.personData.id
    editClientState.img = props.personData.img
    editClientState.name = props.personData.name
    editClientState.telephone = props.personData.telephone
    editClientState.birth_date = props.personData.birth_date
    editClientState.product.name = props.personData.product.name
    editClientState.product.price = props.personData.product.price
    editClientState.product.comment = props.personData.product.comment
  }
)
const emit = defineEmits(['update:modelValue'])
const changeModalState = (value: boolean): void => {
  emit('update:modelValue', value)
}
</script>
