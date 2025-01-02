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
                  <th class="px-4 py-6 text-lg font-semibold text-left text-gray-900">Date</th>
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
                    {{ order.created_at }}
                  </td>
                  <td class="whitespace-nowrap px-4 py-5 text-base">
                    <div class="flex gap-3">
                      <el-tooltip content="View Details" placement="top">
                        <el-button  @click="navigateTo(`/RequestOrder/Detail/${order.id}`)" class="action-btn">
                          
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
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useOrderStore } from '~/store/order'

const orderStore = useOrderStore()
const orderList = ref([])

const fetchOrders = async () => {
  try {
    const data = await orderStore.getOrder({})
    orderList.value = data || []
  } catch (error) {
    console.error('Error fetching orders:', error)
  }
}

onMounted(fetchOrders)
</script>
