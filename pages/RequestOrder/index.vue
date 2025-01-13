<template>
  <div class="flex flex-col p-8 bg-white">
    <!-- Header Section -->
    <div class="pb-8 flex justify-between items-center">
      <h1 class="text-4xl font-bold text-gray-900">Request Orders</h1>
    </div>
    <!-- Search Bar Section -->
    <div class="pb-4">
      <input
        type="text"
        placeholder="Search orders..."
        class="w-80 px-4 py-2 border border-gray-300 rounded-lg"
        v-model="searchQuery"
        @input="handleSearch"
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
                <th class="px-4 py-6 text-lg font-semibold text-left text-gray-900">Phone</th>
                <th class="px-4 py-6 text-lg font-semibold text-left text-gray-900">Location</th>
                <th class="px-4 py-6 text-lg font-semibold text-left text-gray-900">Date</th>
                <th class="px-4 py-6 text-lg font-semibold text-left text-gray-900">Total</th>
                <th class="px-4 py-6 text-lg font-semibold text-left text-gray-900">Action</th>
              </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
              <tr
                v-for="order in orderList"
                :key="order.id"
                class="hover:bg-gray-50"
              >
                <td class="whitespace-nowrap pl-8 pr-3 text-base font-medium text-gray-900">
                  {{ order.id }}
                </td>
                <td class="whitespace-nowrap px-4 py-5 text-base text-gray-700">
                  {{ order.user.name }}
                </td>
                <td class="whitespace-nowrap px-4 py-5 text-base text-gray-700">
                  {{ order.phone }}
                </td>
                <td class="whitespace-nowrap px-4 py-5 text-base text-gray-700">
                  {{ order.address }}
                </td>
                <td class="whitespace-nowrap px-4 py-5 text-base text-gray-700">
                  {{ order.created_at }}
                </td>
                <td class="whitespace-nowrap px-4 py-5 text-base text-gray-700">
                  {{ order.amount }}
                </td>
                <td class="whitespace-nowrap px-4 py-5 text-base">
                  <div class="flex gap-3">
                    <!-- View Details -->
                    <el-tooltip content="View Details" placement="top">
                      <el-button @click="navigateTo(`/RequestOrder/Detail/${order.id}`)" class="action-btn">
                        <i class="fa-solid fa-eye"></i>
                      </el-button>
                    </el-tooltip>
                    <!-- Approve -->
                    <el-tooltip content="Approve" placement="top">
                      <el-button type="success" @click="handleApprove(order.id)" class="action-btn">
                        <i class="fa-solid fa-check"></i>
                      </el-button>
                    </el-tooltip>
                    <!-- Reject -->
                    <el-tooltip content="Reject" placement="top">
                      <el-button type="warning" @click="handleReject(order.id)" class="action-btn">
                        <i class="fa-solid fa-xmark"></i>
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

    <!-- Pagination Section -->
    <div class="flex justify-between items-center p-4">
      <!-- Previous Button -->
      <button
        class="px-4 py-2 text-primary border border-primary rounded-md"
        :disabled="currentPage === 1"
        @click="previousPage"
      >
        Previous
      </button>

      <!-- Page Numbers -->
      <div class="flex gap-2">
        <button
          v-for="page in totalPages"
          :key="page"
          class="px-4 py-2 rounded-md"
          :class="{'bg-primary text-white': currentPage === page, 'bg-gray-200': currentPage !== page}"
        >
          {{ page }}
        </button>
      </div>

      <!-- Next Button -->
      <button
        class="px-4 py-2 text-primary border border-primary rounded-md"
        :disabled="currentPage === totalPages"
        @click="nextPage"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useOrderStore } from '~/store/order'
import { useDebounce } from '~/composables/useDebounce.js'

const searchQuery = ref('') // Bind the search bar value
const orderStore = useOrderStore()
const orderList = ref([])
const currentPage = ref(1) // Current page for pagination
const itemsPerPage = ref(10) // Number of items per page
const totalPages = ref(1) // Total pages, default to 1
const totalItems = ref(0) // Total items, fetched from the API
const { debounce } = useDebounce()

// Fetch orders from the store with pagination and search query
const fetchOrders = async () => {
  try {
    const params = {
      page: currentPage.value,
      per_page: itemsPerPage.value,
      search: searchQuery.value, // Include search query if available
    }
    const data = await orderStore.getOrder(params)
    orderList.value = data.data || [] // Assuming `data.orders` contains the list of orders
    totalItems.value = data.total || 0
    totalPages.value = data.last_page || 1
  } catch (error) {
    console.error('Error fetching orders:', error)
  }
}

// Handle search (debounced)
const searchHandler = debounce(async () => {
  currentPage.value = 1 // Reset to the first page on search
  await fetchOrders()
}, 500)

const handleSearch = async () => {
  await searchHandler()
}

// Approve an order
const handleApprove = async id => {
  try {
    await orderStore.approve(id)
    alert(`Order approved successfully`)
    await fetchOrders() // Refresh the orders after approval
  } catch (error) {
    console.error(`Failed to approve order:`, error)
  }
}

// Reject an order
const handleReject = async id => {
  try {
    await orderStore.reject(id)
    alert(`Order rejected successfully`)
    await fetchOrders() // Refresh the orders after rejection
  } catch (error) {
    console.error(`Failed to reject order:`, error)
  }
}

// Go to the next page
const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
    fetchOrders()
  }
}

// Go to the previous page
const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
    fetchOrders()
  }
}

// Fetch orders when the component is mounted
onMounted(fetchOrders)
</script>
