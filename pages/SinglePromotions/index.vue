<template>
  <div class="container p-6">
    <h1 class="text-2xl font-semibold mb-6">Add Promotion</h1>
    
    <!-- Product Selection Section -->
    <div class="mb-8">
      <label class="block mb-2 font-medium">Select Product*</label>
      
      <!-- Products Table -->
      <div class="overflow-x-auto border rounded-lg">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-sm font-medium text-gray-500">Product ID</th>
              <th class="px-6 py-3 text-left text-sm font-medium text-gray-500">Product Name</th>
              <th class="px-6 py-3 text-left text-sm font-medium text-gray-500">Brand</th>
              <th class="px-6 py-3 text-left text-sm font-medium text-gray-500">Gender</th>
              <th class="px-6 py-3 text-left text-sm font-medium text-gray-500">Price</th>
              <th class="px-6 py-3 text-left text-sm font-medium text-gray-500">Action</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="product in products" :key="product.id">
              <td class="px-6 py-4 text-sm text-gray-900">{{ product.id }}</td>
              <td class="px-6 py-4 text-sm text-gray-900">{{ product.name }}</td>
              <td class="px-6 py-4 text-sm text-gray-900">{{ product.brand }}</td>
              <td class="px-6 py-4 text-sm text-gray-900">{{ product.gender }}</td>
              <td class="px-6 py-4 text-sm text-gray-900">${{ product.price }}</td>
              <td class="px-6 py-4 text-sm">
                <input 
                  type="checkbox" 
                  v-model="selectedProducts" 
                  :value="product.id"
                  class="rounded border-gray-300"
                >
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Discount Section -->
    <div class="mb-8">
      <label class="block mb-2 font-medium">Discount</label>
      <input 
        type="number" 
        v-model="discount"
        placeholder="$0.00"
        class="w-full p-2 border rounded-md"
      >
      <p class="mt-1 text-sm text-gray-500">price after discount</p>
    </div>

    <!-- Add Promotion Button -->
    <button 
      @click="handleAddPromotion"
      class="bg-teal-500 text-white px-6 py-2 rounded-md hover:bg-teal-600 transition-colors"
    >
      Add Promotion
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Mocked products data
const products = ref([
  {
    id: 'P001',
    name: 'Y sles Perfume',
    brand: 'Givenchy',
    gender: 'Woman',
    price: '65.45'
  },
  {
    id: 'P002',
    name: "L'instant Magic Perfume",
    brand: 'Guerlain Perfume',
    gender: 'Woman',
    price: '65.45'
  },
  {
    id: 'P003',
    name: 'Sauvage Cologne',
    brand: 'Christian Dior',
    gender: 'Man',
    price: '65.45'
  },
  {
    id: 'P004',
    name: 'Miss Dior',
    brand: 'Christian Dior',
    gender: 'Woman',
    price: '65.45'
  },
  {
    id: 'P005',
    name: "L'instant Magic Perfume",
    brand: 'Guerlain Perfume',
    gender: 'Woman',
    price: '65.45'
  },
  {
    id: 'P006',
    name: 'Sauvage Cologne',
    brand: 'Christian Dior',
    gender: 'Man',
    price: '65.45'
  }
]);

const selectedProducts = ref([]);
const discount = ref('0.00');

const handleAddPromotion = () => {
  // Mock API payload structure that will be used later
  const payload = {
    products: selectedProducts.value,
    discount: parseFloat(discount.value)
  };
  
  console.log('Promotion data to be sent:', payload);
  // Later this will be replaced with actual API call
};
</script>