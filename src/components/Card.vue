<template>
  <div class="px-4 py-3 mb-8 bg-white rounded-xl shadow-md dark:bg-gray-800">
    <slot></slot>
    <div>
      <p class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
        <slot name="card_name"></slot>
      </p>
      <p class="text-lg font-semibold text-gray-700 dark:text-gray-200">
        <slot name="cart_price"></slot>
      </p>
    </div>
  </div>
</template>
