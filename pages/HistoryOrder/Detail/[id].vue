<template>
  <div>
    <button @click="navigateTo('/HistoryOrder')" class="p-2 bg-primary w-[100px] text-white rounded">
      <i class="fa-solid fa-arrow-left mr-1"></i>Back</button>
  </div>
  <div v-if="orderDetail" class="p-8 bg-white shadow-lg rounded-lg">
    <h1 class="text-3xl font-bold text-gray-900 mb-6">Order Details</h1>

    <div class="flex justify-between items-start">
      <!-- Order Details -->
      <div class="pb-6">
        <p class="text-lg font-semibold text-gray-700">
          Order Number:
          <span class="font-normal">{{ orderDetail.code }}</span>
        </p>
        <p class="text-lg font-semibold text-gray-700">
          Date: <span class="font-normal">{{ formatDate(orderDetail.created_at) }}</span>
        </p>
        <p class="text-lg font-semibold text-gray-700 flex items-center">
          <span>Status:</span>
          <span :class="statusClass(orderDetail.status)" class="ml-2">{{ orderDetail.status }}</span>
        </p>
      </div>

      <!-- Customer Details -->
      <div class="pb-6">
        <h2 class="text-xl font-bold text-gray-900 mb-4">Customer Details</h2>
        <p class="text-lg text-gray-700">
          Phone: <span class="font-normal">{{ orderDetail.phone }}</span>
        </p>
        <p class="text-lg text-gray-700">
          Address: <span class="font-normal">{{ orderDetail.address }}</span>
        </p>
      </div>
    </div>

    <!-- Products Table -->
    <div class="mt-6">
      <table class="min-w-full divide-y divide-gray-200 bg-white shadow rounded-lg">
        <thead class="bg-gray-50">
        <tr>
          <th class="py-4 pl-6 text-left text-lg font-semibold text-gray-900">Product Code</th>
          <th class="px-4 py-4 text-left text-lg font-semibold text-gray-900">Title</th>
          <th class="px-4 py-4 text-left text-lg font-semibold text-gray-900">Amount</th>
          <th class="px-4 py-4 text-left text-lg font-semibold text-gray-900">Unit Price</th>
          <th class="px-4 py-4 text-left text-lg font-semibold text-gray-900">Discount</th>
          <th class="px-4 py-4 text-left text-lg font-semibold text-gray-900">Total</th>
        </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
        <tr v-for="product in orderDetail.products" :key="product.id" class="hover:bg-gray-50">
          <td class="pl-6 py-4 text-base text-gray-900">{{ product.id }}</td>
          <td class="px-4 py-4 text-base text-gray-700">{{ product.product_title }}</td>
          <td class="px-4 py-4 text-base text-gray-700">{{ product.count }}</td>
          <td class="px-4 py-4 text-base text-gray-700">${{ product.price }}</td>
          <td class="px-4 py-4 text-base text-gray-700">{{ product.discount }}%</td>
          <td class="px-4 py-4 text-base text-gray-700">${{ product.total }}</td>
        </tr>
        </tbody>
      </table>
    </div>

    <!-- Order Summary -->
    <div class="mt-6 border-t pt-6 text-gray-700">
      <p class="flex justify-between text-lg">
        <span>Transaction Method:</span>
        <span>{{ orderDetail.transaction_method }}</span>
      </p>
      <p class="flex justify-between text-lg">
        <span>Transaction ID:</span>
        <span>{{ orderDetail.transaction_id }}</span>
      </p>
      <p class="flex justify-between text-lg">
        <span>Grand Total:</span>
        <span>${{ orderDetail.amount }}</span>
      </p>
    </div>
  </div>

  <div v-else class="text-center text-gray-600">
    <p>Loading order details...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useOrderStore } from '~/store/order.js'
import { ElMessage } from 'element-plus'

const route = useRoute()
const orderStore = useOrderStore()
const orderDetail = ref(null) // Initialize as null to check for loaded data
definePageMeta({
  middleware: ['authenticated'],
})
const showOrder = async () => {
  try {
    const orderId = route.params.id
    const response = await orderStore.showOrder(orderId)
    orderDetail.value = response || null
  } catch (error) {
    console.error('Error fetching order details:', error)
    ElMessage.error('Failed to fetch order details')
  }
}

const statusClass = (status) => {
  switch (status) {
    case 'success':
      return 'text-green-600'
    case 'pending':
      return 'text-yellow-500'
    case 'cancelled':
      return 'text-red-600'
    default:
      return 'text-gray-700'
  }
}

//Format the date to show only day-month-year
const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}
onMounted(showOrder)
</script>


<style scoped>
table th,
table td {
  padding: 16px;
  text-align: left;
}
</style>
