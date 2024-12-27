<script setup>
import {ref, onMounted} from 'vue'
import { useCompoundStore } from '~/store/compoundproduct.js'
import {useDebounce} from '~/composables/useDebounce.js';

const compound = ref([]);
const totalItems = ref(0);
const currentPage = ref(1);
const searchTerm = ref('');
const itemsPage = ref(5);
const compoundStore = useCompoundStore();
const { getCompound, deleteCompound } = compoundStore;

//for search debounce
const { debounce } = useDebounce()

const fetchCompound = async () => {
  try{
    const params = {
      page: currentPage.value,
      search: searchTerm.value,
      per_page: itemsPage.value,
    }
    const data = await getCompound(params);
    compound.value = data?.data || [];
    totalItems.value = data?.total || 0;
  }catch(error){
    console.log('Failed to fetch Product', error);
  }
}

// Handle search (debounced)
const searchHandler = debounce(async () => {
  currentPage.value = 1; // Reset to the first page on search
  await fetchCompound();
}, 500);

// Trigger search when the button is clicked
const handleSearch = async () => {
  await searchHandler();
}

const handleDelete = async (id) => {
  try{
    await deleteCompound(id)
    ElMessage.success('Compound Product deleted successfully.');
    await fetchCompound();
  }catch(error){
    console.log('Failed to fetch Compound product', error);
    ElMessage.error('Failed to fetch Compound Product', error);
  }
}

const confirmDelete = async (id) => {
  try{
    await ElMessageBox.confirm(
      'Are you sure you want to delete this compound product?',
      'Delete this compound product?',
      {
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        type: 'warning'
      }
    )
    await handleDelete(id)
  }catch(error){
    if( error !== 'cancel'){
      ElMessage.error('Error while confirming delete: ' + error.message);
    }else{
      ElMessage.info('Product deletion cancelled')
    }
  }
}

const onPageChange = (page) => {
  currentPage.value = page;
  fetchCompound();
}
onMounted(fetchCompound);

</script>

<template>
  <div>
    <h1 class="text-3xl mb-4">Compound Product</h1>
    <div class="flex justify-between align-center items-center">
      <div class="relative w-full max-w-sm">
        <!-- Input Box -->
        <input
          v-model="searchTerm"
          type="text"
          placeholder="Search Product by name"
          @input="handleSearch"
          class="w-full p-3 pr-10 border rounded-md focus:outline-none"
        />
        <i
          class="fa-solid fa-magnifying-glass absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
        ></i>
      </div>
      <button class="bg-primary p-3 rounded hover:opacity-50 active:opacity-100" @click="navigateTo('/CompoundProduct/create')">Create Product</button>
    </div>
    <div class="border border-gray-200 mt-1.5 rounded">
      <el-table :data="compound" >
        <el-table-column prop="product_code" label="Product code" width="200" />
        <el-table-column label="Image" width="100">
          <template #default="{ row }">
            <el-image :src="row.image" alt="Product Image" />
          </template>
        </el-table-column>
        <el-table-column prop="title" label="Title" width="300" />
        <el-table-column prop="price" label="Price" width="300" />
        <el-table-column prop="created_at" label="Date" width="200" />
        <<el-table-column prop="status" label="Status" width="300">
        <template #default="{ row }">
    <span :class="{'text-green-500': row.status === 1, 'text-red-500': row.status === 0}">
      {{ row.status === 1 ? 'In Stock' : 'Out of Stock' }}
    </span>
        </template>
      </el-table-column>
        <el-table-column  label=" " width="180" >
          <template #default="{ row }">
            <el-button @click="navigateTo(`/compoundProduct/edit/${row.id}`)">
              <i class="fa-solid fa-pen-to-square"></i>
            </el-button>
            <el-button type="danger" plain @click="confirmDelete(row.id)">
              <i class="fa-solid fa-trash"></i>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- Pagination -->
    <el-pagination
      v-model:currentPage="currentPage"
      :page-size="itemsPage"
      :total="totalItems"
      layout="prev, pager, next"
      @current-change="onPageChange"
    />
  </div>
</template>

<style scoped lang="scss">

</style>
