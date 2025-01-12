<template>
  <div class="p-8 bg-white shadow-lg rounded-lg" v-if="orderDetail">
    <h1 class="text-3xl font-bold text-gray-900 mb-6">ORDER</h1>

    <!-- Order Details -->
    <div class="mb-6">
      <p class="text-lg font-semibold text-gray-700">
        Order Number: <span class="font-normal">{{ orderDetail.code }}</span>
      </p>
      <p class="text-lg font-semibold text-gray-700">
        Date: <span class="font-normal">{{ orderDetail.created_at }}</span>
      </p>
    </div>

    <!-- Customer Details -->
    <div class="mb-6 border-b pb-6">
      <h2 class="text-xl font-bold text-gray-900 mb-4">Customer Detail</h2>
      <p class="text-lg text-gray-700">
        Customer Name: <span class="font-normal">{{ orderDetail.user.name }}</span>
      </p>
      <p class="text-lg text-gray-700">
        Email: <span class="font-normal">{{ orderDetail.user.email }}</span>
      </p>
      <p class="text-lg text-gray-700">
        Phone Number: <span class="font-normal">{{ orderDetail.user.mobile || 'N/A' }}</span>
      </p>
      <p class="text-lg text-gray-700">
        Address: <span class="font-normal">{{ orderDetail.address || 'N/A' }}</span>
      </p>
      <p class="text-lg text-gray-700">
        Order Date: <span class="font-normal">{{ orderDetail.created_at }}</span>
      </p>
    </div>

    <!-- Order Summary Table -->
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-4 text-left text-sm font-medium text-gray-900">Description</th>
            <th class="px-6 py-4 text-left text-sm font-medium text-gray-900">Qty</th>
            <th class="px-6 py-4 text-left text-sm font-medium text-gray-900">Unit Price</th>
            <th class="px-6 py-4 text-left text-sm font-medium text-gray-900">Amount</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 bg-white">
          <tr v-for="product in orderDetail.products" :key="product.id">
            <td class="px-6 py-4 text-gray-700">{{ product.title }}</td>
            <td class="px-6 py-4 text-gray-700">{{ product.pivot.count || 1 }}</td>
            <td class="px-6 py-4 text-gray-700">${{ product.price }}</td>
            <td class="px-6 py-4 text-gray-700">${{ calculateAmount(product) }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Order Total -->
    <div class="mt-6 border-t pt-6 text-gray-700">
      <p class="flex justify-between text-lg">
        <span>Subtotal:</span>
        <span>${{ calculateSubtotal() }}</span>
      </p>
      <p class="flex justify-between text-lg">
        <span>Shipping:</span>
        <span>$0.00</span>
      </p>
      <p class="flex justify-between text-lg text-red-600">
        <span>Discount:</span>
        <span>-${{ calculateDiscount() }}</span>
      </p>
      <p class="flex justify-between text-xl font-bold text-gray-900">
        <span>Total:</span>
        <span>${{ orderDetail.amount }}</span>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useOrderStore } from '~/store/order'

// Get the current route and extract the order ID
const route = useRoute()
const orderId = route.params.id

// Use the order store to fetch order details
const orderStore = useOrderStore()
const orderDetail = ref(null)

// Helper function to calculate the amount for each product
const calculateAmount = (product) => {
  return ((product.price * (product.pivot.count || 1))).toFixed(2)
}

// Helper function to calculate the subtotal
const calculateSubtotal = () => {
  return orderDetail.value.products.reduce((total, product) => {
    return total + (product.price * (product.pivot.count || 1))
  }, 0).toFixed(2)
}

// Helper function to calculate the discount
const calculateDiscount = () => {
  return orderDetail.value.products.reduce((total, product) => {
    return total + ((product.price * product.discount / 100) * (product.pivot.count || 1))
  }, 0).toFixed(2)
}

// Fetch the order details when the component is mounted
onMounted(async () => {
  try {
    const response = await orderStore.showOrder({ id: orderId })
    orderDetail.value = response // Assuming API response returns the correct structure
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
