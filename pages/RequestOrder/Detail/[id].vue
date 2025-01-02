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
        Customer Name:
        <span class="font-normal">{{ orderDetail.user.name }}</span>
      </p>
      <p class="text-lg text-gray-700">
        Email: <span class="font-normal">{{ orderDetail.user.email }}</span>
      </p>
    </div>

    <!-- Order Summary Table -->
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-4 text-left text-sm font-medium text-gray-900">
              Product ID
            </th>
            <th class="px-6 py-4 text-left text-sm font-medium text-gray-900">
              Quantity
            </th>
            <th class="px-6 py-4 text-left text-sm font-medium text-gray-900">
              Unit Price
            </th>
            <th class="px-6 py-4 text-left text-sm font-medium text-gray-900">
              Total Price
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 bg-white">
          <tr v-for="item in orderDetail.products" :key="item.product_id">
            <td class="px-6 py-4 text-gray-700">{{ item.product_id }}</td>
            <td class="px-6 py-4 text-gray-700">{{ item.count }}</td>
            <!-- Assuming you have a price field for the unit price -->
            <td class="px-6 py-4 text-gray-700">${{ item.unit_price || 'N/A' }}</td>
            <!-- Calculate total price (unit price * quantity) -->
            <td class="px-6 py-4 text-gray-700">${{ (item.unit_price * item.count).toFixed(2) || 'N/A' }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Order Total -->
    <div class="mt-6 border-t pt-6 text-gray-700">
      <p class="flex justify-between text-lg">
        <span>Total Amount:</span>
        <span>${{ orderDetail.amount }}</span>
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
    orderDetail.value = await orderStore.showOrder(orderId) // Fetch order details from the store
  } catch (error) {
    console.error("Error fetching order details:", error)
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
