<template>
  <el-form :model="form"  :rules="rules" ref="formRef" label-width="auto" class="w-[600px]">
    <h1>Create Promotion</h1>
    <el-form-item label="Title" prop="title">
      <el-input v-model="form.title" />
    </el-form-item>
    <el-form-item label="Product" prop="product_id">
      <el-select
        v-model="form.product_id"
        :options="products"
        placeholder="Please select products"
        filterable
        remote
        :remote-method="searchProducts"
        :loading="loading"
        :props="props"
      >
        <el-option
          v-for="product in products"
          :key="product.id"
          :label="product.name"
          :value="product.id"
        />
      </el-select>
    </el-form-item>
    <div class="flex gap-3">
      <el-form-item label="Start Date" prop="start_date">
        <el-date-picker
          v-model="form.start_date"
          type="date"
          placeholder="Pick a Date"
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD"
          @change="handleStartDateChange"
        />
      </el-form-item>
      <el-form-item label="End Date" prop="end_date">
        <el-date-picker
          v-model="form.end_date"
          type="date"
          placeholder="Pick a Date"
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD"
          @change="handleEndDateChange"
        />
      </el-form-item>
    </div>
    <el-form-item label="Discount" prop="discount">
      <el-input v-model="form.discount" />
    </el-form-item>
    <el-form-item label="Status" prop="status">
      <el-radio-group v-model="form.status">
        <el-radio :label="1">Enable</el-radio>
        <el-radio :label="0">Disable</el-radio>
      </el-radio-group>
    </el-form-item>

    <el-form-item label="Description" prop="description">
      <el-input v-model="form.description" type="textarea" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">Create</el-button>
      <el-button @click="navigateTo('/Promotion')">Cancel</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import { useProductStore } from '~/store/product.js'
import { useDiscountStore} from '~/store/promotion.js'

const form = reactive({
  title: '',
  product_id: '',
  discount: '',
  description: '',
  start_date:'',
  end_date: '',
  status: '',
})

// Function to format date as 'YYYY-MM-DD'
const formatDate = (date) => {
  const d = new Date(date);
  if (isNaN(d)) return '';
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Watch the form date values to ensure consistent formatting
const handleStartDateChange = (value) => {
  form.start_date = formatDate(value);
};

const handleEndDateChange = (value) => {
  form.end_date = formatDate(value);
};
const rules = {
  title: [
    { required: true, message: 'Please enter a product title', trigger: 'blur' },
  ],
  product_id: [
    { required: true, message: 'Please select a product', trigger: 'change' },
  ],
  discount: [
    { required: true, message: 'Please enter discount percent', trigger: 'change' },
  ],
  start_date: [
    { required: true, message: 'Please select starting date', trigger: 'change' },
  ],
  end_date: [
    {
      required: true,
      message: 'Please select ending date',
      trigger: 'change'
    },
    {
      validator: (rule, value, callback) => {
        if (value && form.start_date && new Date(value) < new Date(form.start_date)) {
          callback(new Error('End date cannot be before the start date'));
        } else {
          callback(); // Validation passed
        }
      },
      trigger: 'change',
    },
  ],
  status: [
    { required: true, message: 'Please select status', trigger: 'change' },
  ],
};

const productStore = useProductStore()
const discountStore = useDiscountStore()
const { createDiscount } = discountStore
const {getProduct} = productStore
const products = ref([])           // To store fetched products
const loading = ref(false)        // To track loading state for search
const currentPage = ref(1)        // Current page for pagination
const totalPages = ref(1)         // Total number of pages from the API (if available)
const searchQuery = ref('')       // Search query to filter products
const props = {
  label: 'name', // Field to display in dropdown
  value: 'id',   // Field used for binding selected values
}
// Fetch product data from API with pagination and search query
const fetchProduct = async () => {
  try {
    loading.value = true

    // Fetch products with pagination and search query
    const response = await getProduct({
      page: currentPage.value,
      search: searchQuery.value,
    })

    products.value = response.data?.map((item) => ({
      id: item.id,
      name: item.title,  // Adjust 'title' if needed
    })) || []

    // Update totalPages if the response includes it
    totalPages.value = response.total_pages || 1
    loading.value = false
  } catch (error) {
    console.log('Failed to fetch products', error)
    ElMessage.error('Failed to fetch products')
    loading.value = false
  }
}

// Handle search functionality
const searchProducts = (query) => {
  searchQuery.value = query
  currentPage.value = 1  // Reset to first page on search
  fetchProduct()         // Fetch products based on search query
}
const formRef = ref(null)
// Handle form submission
const create = async () => {
  try {
    const formData = new FormData();
    Object.keys(form).forEach((key) => {
      formData.append(key, form[key]);
    });

    await createDiscount(formData);
    ElMessage.success('Promotion created successfully');
    navigateTo('/Promotion');
  } catch (error) {
    console.error('Promotion creation failed', error);
    ElMessage.error('Failed to create promotion');
  }
};
const onSubmit = async () => {
  try {
    // Attempt to validate the form
    await formRef.value.validate();

    // If validation passes, proceed to create
    create();
  } catch (error) {
    // If validation fails, log the error (or handle it as needed)
    console.error('Form validation failed:', error);
  }
};

onMounted(() => {
  fetchProduct()
})


</script>
