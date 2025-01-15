<template>
  <el-form :model="form" :rules="rules" ref="formRef" label-width="auto" class="w-[600px] border border-b-blue-200 rounded p-3">
    <h1 class="text-xl">Update Promotion</h1>
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
        <el-radio :label="0">Disable</el-radio>
        <el-radio :label="1">Enable</el-radio>
      </el-radio-group>
    </el-form-item>

    <el-form-item label="Description" prop="description">
      <el-input v-model="form.description" type="textarea" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">Update</el-button>
      <el-button @click="navigateTo('/Promotion')">Cancel</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import { useProductStore } from '~/store/product.js'
import { useDiscountStore } from '~/store/promotion.js'
import { useRoute } from 'vue-router'

const route = useRoute()

const form = reactive({
  title: '',
  product_id: '',
  discount: '',
  description: '',
  start_date: '',
  end_date: '',
  status: false,
})

// Function to format date as 'YYYY-MM-DD'
const formatDate = (date) => {
  const d = new Date(date)
  if (isNaN(d)) return ''
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const handleStartDateChange = (value) => {
  form.start_date = formatDate(value)
}

const handleEndDateChange = (value) => {
  form.end_date = formatDate(value)
}

const rules = {
  title: [{ required: true, message: 'Please enter a product title', trigger: 'blur' }],
  product_id: [{ required: true, message: 'Please select a product', trigger: 'change' }],
  discount: [{ required: true, message: 'Please enter discount percent', trigger: 'change' }],
  start_date: [{ required: true, message: 'Please select starting date', trigger: 'change' }],
  end_date: [
    { required: true, message: 'Please select ending date', trigger: 'change' },
    {
      validator: (rule, value, callback) => {
        if (value && form.start_date && new Date(value) < new Date(form.start_date)) {
          callback(new Error('End date cannot be before the start date'))
        } else {
          callback()
        }
      },
      trigger: 'change',
    },
  ],
  status: [{ required: true, message: 'Please select status', trigger: 'change' }],
}

const productStore = useProductStore()
const discountStore = useDiscountStore()
const { updateDiscount, showDiscount } = discountStore
const { getProduct } = productStore

const products = ref([])
const loading = ref(false)
const searchQuery = ref('')
const props = { label: 'name', value: 'id' }

// Fetch product data
const fetchProduct = async () => {
  try {
    loading.value = true
    const response = await getProduct({ search: searchQuery.value })
    products.value = response.data?.map((item) => ({
      id: item.id,
      name: item.title,
    })) || []
    loading.value = false
  } catch (error) {
    console.error('Failed to fetch products', error)
  }
}

// Load existing promotion data using `showDiscount`
const loadPromotionData = async () => {
  const promotionId = route.params.id
  try {
    const response = await showDiscount(promotionId)  // Using `showDiscount` to fetch promotion details
    Object.assign(form, response.data)

  } catch (error) {
    console.error('Failed to fetch promotion details', error)
  }
}

// Assuming updateDiscount expects an ID and form data as payload
const updatePromotion = async (promotionId, formData) => {
  try {
    await updateDiscount(promotionId, formData);  // Pass ID and formData
  } catch (error) {
    console.error('Promotion update failed', error);
    ElMessage.error('Failed to update promotion');
    throw error;  // Rethrow the error to be handled by the caller
  }
};

// Handle form submission
const onSubmit = async () => {
  const promotionId = route.params.id;  // Get the promotion ID from route params
  const formData = new FormData();
  // Manually append each field to formData
  formData.append('title', form.title);
  formData.append('product_id', form.product_id);
  formData.append('discount', form.discount);
  formData.append('description', form.description);
  formData.append('start_date', form.start_date);
  formData.append('end_date', form.end_date);
  formData.append('status', form.status );  // Convert boolean status to 1 or 0

  try {
    // Call updatePromotion with the promotion ID and form data
    await updatePromotion(promotionId, formData);
    ElMessage.success('Promotion updated successfully');
    navigateTo('/Promotion');
  } catch (error) {
    // If any error occurs, log and show an error message
    console.error('Failed to update promotion', error);
    ElMessage.error('Failed to update promotion');
  }
};


onMounted(() => {
  fetchProduct()
  loadPromotionData()
})
</script>
