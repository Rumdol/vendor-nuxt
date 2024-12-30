<template>
  <div class="flex flex-col p-8 bg-white">
    <!-- Header Section -->
    <div class="pb-8 flex justify-between items-center">
      <h1 class="text-4xl font-bold text-gray-900">Request Orders</h1>
    </div>

    <!-- Table Section -->
    <div class="overflow-hidden bg-white shadow-lg rounded-2xl">
      <div class="flow-root">
        <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="py-6 pl-8 pr-3 text-lg font-semibold text-left text-gray-900">Product ID</th>
                  <th class="px-4 py-6 text-lg font-semibold text-left text-gray-900">User Name</th>
                  <th class="px-4 py-6 text-lg font-semibold text-left text-gray-900">Address</th>
                  <th class="px-4 py-6 text-lg font-semibold text-left text-gray-900">Date</th>
                  <th class="px-4 py-6 text-lg font-semibold text-left text-gray-900">Product</th>
                  <th class="px-4 py-6 text-lg font-semibold text-left text-gray-900">Action</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
                <tr v-for="order in paginatedOrders" :key="order.id" class="hover:bg-gray-50">
                  <td class="whitespace-nowrap pl-8 pr-3 text-base font-medium text-gray-900">
                    {{ order.id }}
                  </td>
                  <td class="whitespace-nowrap px-4 py-5 text-base text-gray-700">{{ order.userName }}</td>
                  <td class="whitespace-nowrap px-4 py-5 text-base text-gray-700">{{ order.address }}</td>
                  <td class="whitespace-nowrap px-4 py-5 text-base text-gray-700">{{ order.date }}</td>
                  <td class="whitespace-nowrap px-4 py-5 text-base text-gray-700">{{ order.productName }}</td>
                  <td class="whitespace-nowrap px-4 py-5 text-base">
                    <div class="flex gap-3">
                      <el-tooltip content="View Details" placement="top">
                        <el-button @click="navigateToDetail(order.id)" class="action-btn">
                          <i class="fa-solid fa-eye"></i>
                        </el-button>
                      </el-tooltip>
                      <el-tooltip content="Approve" placement="top">
                        <el-button type="success" @click="handleApprove(order.id)" class="action-btn">
                          <i class="fa-solid fa-check"></i>
                        </el-button>
                      </el-tooltip>
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
      <!-- Pagination -->
      <div class="flex items-center justify-between border-t border-gray-200 px-4 py-6 sm:px-6">
        <el-pagination
          :current-page="currentPage"
          :page-size="pageSize"
          :total="totalItems"
          @current-change="handlePageChange"
          layout="total, prev, pager, next, jumper"
          class="text-base"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

// Define the mock store data and methods
const ordersStore = {
  orders: [
    { id: 1, userName: 'John Doe', address: '123 Main St', date: '2024-12-29', productName: 'Perfume A' },
    { id: 2, userName: 'Jane Smith', address: '456 Oak St', date: '2024-12-28', productName: 'Perfume B' },
    { id: 3, userName: 'Alice Brown', address: '789 Pine St', date: '2024-12-27', productName: 'Perfume C' },
  ],
  fetchOrders(page, size) {
    // This method simulates fetching orders but isn't connected to an API yet.
    // For now, it just uses the mock data.
    console.log(`Fetching orders for page ${page} with size ${size}`)
  }
}

const router = useRouter()

const currentPage = ref(1)
const pageSize = ref(10)
const totalItems = ref(ordersStore.orders.length)

const fetchOrders = () => {
  ordersStore.fetchOrders(currentPage.value, pageSize.value)
}

onMounted(() => {
  fetchOrders()
})

const paginatedOrders = computed(() => {
  const startIndex = (currentPage.value - 1) * pageSize.value
  const endIndex = startIndex + pageSize.value
  return ordersStore.orders.slice(startIndex, endIndex)
})

const handlePageChange = (page) => {
  currentPage.value = page
  fetchOrders() // Simulate fetching orders when page changes
}

const navigateToDetail = (id) => {
  router.push(`/RequestOrder/Detail/${id}`)
}

const handleApprove = (id) => {
  console.log('Approved order:', id)
  ElMessage.success('Order approved successfully')
}

const handleReject = (id) => {
  console.log('Rejected order:', id)
  ElMessage.warning('Order rejected successfully')
}
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
