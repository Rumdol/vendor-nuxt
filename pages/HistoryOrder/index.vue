<template>
  <div class="flex flex-col p-8 bg-white">
    <!-- Header Section -->
    <div class="pb-8 flex justify-between items-center">
      <h1 class="text-4xl font-bold text-gray-900">History Orders</h1>
    </div>

    <!-- Search Bar Section -->
    <div class="pb-4">
      <input
        type="text"
        placeholder="Search orders..."
        class="w-80 px-4 py-2 border border-gray-300 rounded-lg"
        v-model="searchQuery"
      />
    </div>

    <!-- Table Section -->
    <div class="overflow-hidden bg-white shadow-lg rounded-2xl">
      <div class="flow-root">
        <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="py-6 pl-8 pr-3 text-lg font-semibold text-left text-gray-900">Order ID</th>
                  <th class="px-4 py-6 text-lg font-semibold text-left text-gray-900">Customer Name</th>
                  <th class="px-4 py-6 text-lg font-semibold text-left text-gray-900">Address</th>
                  <th class="px-4 py-6 text-lg font-semibold text-left text-gray-900">Date</th>
                  <th class="px-4 py-6 text-lg font-semibold text-left text-gray-900">Product</th>
                  <th class="px-4 py-6 text-lg font-semibold text-left text-gray-900">Status</th>
                  <th class="px-4 py-6 text-lg font-semibold text-left text-gray-900">Action</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
                <tr v-for="order in filteredOrders" :key="order.id" class="hover:bg-gray-50">
                  <td class="whitespace-nowrap pl-8 pr-3 text-base font-medium text-gray-900">
                    {{ order.id }}
                  </td>
                  <td class="whitespace-nowrap px-4 py-5 text-base text-gray-700">
                    {{ order.user.name }}
                  </td>
                  <td class="whitespace-nowrap px-4 py-5 text-base text-gray-700">
                    {{ order.address || "N/A" }}
                  </td>
                  <td class="whitespace-nowrap px-4 py-5 text-base text-gray-700">
                    {{ order.created_at }}
                  </td>
                  <td class="whitespace-nowrap px-4 py-5 text-base text-gray-700">
                    <ul>
                      <li v-for="product in order.products" :key="product.id">
                        {{ product.title }}
                      </li>
                    </ul>
                  </td>
                  <td class="whitespace-nowrap px-4 py-5 text-base text-gray-700">
                    <span :class="statusClass(order.status)">{{ order.status }}</span>
                  </td>
                  <td class="whitespace-nowrap px-4 py-5 text-base">
                    <div class="flex gap-3">
                      <el-tooltip content="View Details" placement="top">
                        <el-button @click="navigateTo(`/RequestOrder/Detail/${order.id}`)" class="action-btn">
                          <i class="fa-solid fa-eye"></i>
                        </el-button>
                      </el-tooltip>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useOrderStore } from '~/store/order'

// Search query for filtering
const searchQuery = ref('')

// Order store to fetch data
const orderStore = useOrderStore()
const orderList = ref([])

// Fetch orders from the API
const fetchOrders = async () => {
  try {
    const data = await orderStore.getOrder({})
    orderList.value = data.data || [] // Assume the API returns orders in `data.data`
  } catch (error) {
    console.error('Error fetching orders:', error)
  }
}

// Filter orders based on the search query
const filteredOrders = computed(() => {
  if (!searchQuery.value) return orderList.value
  return orderList.value.filter((order) =>
    order.user.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    (order.address || '').toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    order.products.some(product =>
      product.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  )
})

// Navigate to order details
const navigateTo = (route) => {
  window.location.href = route
}

// Add status-specific classes for styles
const statusClass = (status) => {
  if (status === 'success') {
    return 'text-green-600'
  } else if (status === 'pending') {
    return 'text-yellow-500'
  } else if (status === 'failed') {
    return 'text-red-600'
  }
  return 'text-gray-700'
}

// Fetch orders when the component is mounted
onMounted(fetchOrders)
</script>

<style scoped>
.action-btn {
  padding: 8px 16px;
  border-radius: 6px;
  transition: opacity 0.2s;
}

.action-btn:hover {
  opacity: 0.8;
}
</style>