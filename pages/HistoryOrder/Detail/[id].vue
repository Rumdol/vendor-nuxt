<template>
  <div class="p-8 bg-white shadow-lg rounded-lg" v-if="orderDetail">
    <h1 class="text-3xl font-bold text-gray-900 mb-6">ORDER</h1>

    <!-- Order Details -->
    <div class="mb-6">
      <p class="text-lg font-semibold text-gray-700">
        Order Number:
        <span class="font-normal">{{ orderDetail.code }}</span>
      </p>
      <p class="text-lg font-semibold text-gray-700">
        Date: <span class="font-normal">{{ orderDetail.created_at }}</span>
      </p>
    </div>

    <!-- Customer Details -->
    <div class="mb-6 border-b pb-6">
      <h2 class="text-xl font-bold text-gray-900 mb-4">Customer Detail</h2>
      <p class="text-lg text-gray-700">
        Phone: <span class="font-normal">{{ orderDetail.phone }}</span>
      </p>
      <p class="text-lg text-gray-700">
        Address: <span class="font-normal">{{ orderDetail.address }}</span>
      </p>
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
        <span>Total Amount:</span>
        <span>${{ orderDetail.amount }}</span>
      </p>
      <p class="flex justify-between text-lg">
        <span>Status:</span>
        <span>{{ orderDetail.status }}</span>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useOrderStore } from '~/store/order'

// Get the order ID from the route
const route = useRoute()
const orderId = route.params.id

const orderStore = useOrderStore()
const orderDetail = ref(null)

onMounted(async () => {
  try {
    const response = await orderStore.showOrder(orderId)
    // Assuming the API returns data in the structure you provided
    orderDetail.value = response.data
  } catch (error) {
    console.error("Error fetching order details:", error)
    ElMessage.error('Failed to fetch order details')
  }
})
</script>

<style scoped>
table th,
table td {
  padding: 16px;
  text-align: left;
}
</style>