<template>
  <div v-if="discounts" class="container p-6">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-semibold pb-6">Promotion</h1>
      <!-- Add Promotion Button -->
      <button
        @click="navigateTo('/Promotion/create')"
        class="bg-teal-500 text-white px-6 py-2 rounded-md hover:bg-teal-600 transition-colors"
      >
        Add Promotion
      </button>
    </div>
    <!-- Search Bar Section -->
    <div class="pb-4">
      <input
        type="text"
        placeholder="Search promotion products..."
        class="w-80 px-4 py-2 border border-gray-300 rounded-lg"
        v-model="searchQuery"
        @input="handleSearch"
      />
    </div>
    <!-- Product Selection Section -->
    <div>
      <!-- Tab Status -->
      <el-tabs
        v-model="activeName"
        type="card"
        class="tab"
        @tab-click="handleClick"
      >
        <el-tab-pane label="Pending" name="pending"></el-tab-pane>
        <el-tab-pane label="Active" name="active"></el-tab-pane>
        <el-tab-pane label="Expired" name="expired"></el-tab-pane>
      </el-tabs>

      <!-- Products Table -->
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
        <tr>
          <th class="px-6 py-3 text-left text-sm font-medium text-gray-500">Product ID</th>
          <th class="px-6 py-3 text-left text-sm font-medium text-gray-500">Title</th>
          <th class="px-6 py-3 text-left text-sm font-medium text-gray-500">Discount</th>
          <th class="px-6 py-3 text-left text-sm font-medium text-gray-500">Create Date</th>
          <th class="px-6 py-3 text-left text-sm font-medium text-gray-500">Due Date</th>
          <th class="px-6 py-3 text-left text-sm font-medium text-gray-500">View</th>
        </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
        <tr v-for="item in discounts" :key="item.id">
          <td class="px-6 py-4 text-sm text-gray-900">{{ item.product_id }}</td>
          <td class="px-6 py-4 text-sm text-gray-900">{{ item.title }}</td>
          <td class="px-6 py-4 text-sm text-gray-900">{{ item.discount }}%</td>
          <td class="px-6 py-4 text-sm text-gray-900">{{ item.created_at }}</td>
          <td class="px-6 py-4 text-sm text-gray-900">{{ item.end_date }}</td>
          <td class="px-6 py-4 text-sm text-gray-900">
            <button @click="navigateTo(`/Promotion/edit/${item.id}`)">
              <i class="fa-solid fa-eye"></i>
            </button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useDebounce } from '~/composables/useDebounce';
import { useDiscountStore } from '~/store/promotion.js';

const discounts = ref([]);
const filteredDiscounts = ref([]);
const searchQuery = ref('');
const activeName = ref('pending'); // Default tab
const perPage = ref(10); // Default items per page
const currentPage = ref(1);
const discountStore = useDiscountStore();
const { getDiscount } = discountStore;
const { debounce } = useDebounce();


// Fetch discounts from the API
const fetchDiscount = async () => {
  try {
    const params = {
      current_page: currentPage.value,
      per_page: perPage.value,
      tab: activeName.value, // Pass the active tab directly
      search: searchQuery.value // Include search query in the API call
    };
    const { data } = await getDiscount(params);
    discounts.value = data || [];
  } catch (error) {
    ElMessage.error('Failed to fetch discounts.');
  }
};

// Handle tab click and fetch discounts for the selected tab
const handleClick = async (tab) => {
  activeName.value = tab.props.name; // Get the name of the clicked tab
  currentPage.value = 1; // Reset to the first page
  await fetchDiscount(); // Fetch the discounts for the selected tab
};

// Handle search (debounced)
const searchHandler = debounce(async () => {
  currentPage.value = 1; // Reset to the first page on search
  await fetchDiscount(); // Fetch data based on the current search
}, 500);

const handleSearch = () => {
  searchHandler(); // Call debounce function for search
};

// Fetch initial data on component mount
onMounted(() => {
  fetchDiscount(); // Fetch discounts when the component mounts
});
</script>
