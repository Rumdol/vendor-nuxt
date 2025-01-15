<template>

  <el-form :model="form"
           ref="formRef"
           :rules="rules"
           label-width="auto" class="border border-gray:10 shadow p-4 w-[1500px] text-lg">
    <h1 class="text-3xl text-center">Create Compound Product</h1>
    <div class="flex">
      <!-- Select Product -->
      <el-form-item class="p-4" label="Select Compound Product" prop="compound_products">
        <el-transfer
          v-model="selectedProducts"
          filterable
          :filter-method="filterMethod"
          :titles="['Available Products', 'Compound Products']"
          filter-placeholder="Search..."
          :data="transferData"
        />
      </el-form-item>
      <!-- Icon Upload -->
      <el-form-item label="Image" required prop="image">
        <el-upload
          list-type="picture-card"
          :on-success="handleUploadSuccess"
          :on-remove="handleRemove"
          :file-list="form.image ? [form.image] : []"
          :limit="1"
          accept=".jpeg, .png, .jpg"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>
    </div>
    <div class="flex">
      <div>
        <el-form-item label="Product code" prop="product_code" class="w-[500px]">
          <el-input v-model="form.product_code" placeholder="please select category for your product code">
          </el-input>
        </el-form-item>
        <el-form-item label="Title" prop="title" class="w-[500px]">
          <el-input v-model="form.title" @input="form.slug = Slug(form.title)" />
          <p>Slug: {{ form.slug }}</p>
        </el-form-item>
        <el-form-item label="Gender" prop="gender" class="w-[500px]">
          <el-select v-model="form.gender" placeholder="please select your product gender">
            <el-option label="male" value="male" />
            <el-option label="female" value="female" />
            <el-option label="female" value="prefer not to say" />
          </el-select>
        </el-form-item>
      </div>

      <div>
        <el-form-item label="Price" prop="price" class="w-[500px]">
          <el-input v-model.number="form.price" />
        </el-form-item>
        <el-form-item label="Description" prop="description" class="w-[500px]">
          <el-input v-model="form.description" type="textarea" />
        </el-form-item>
          <el-form-item label="In stock" prop="status" class="w-[500px]">
            <el-switch v-model="form.status" :active-value="1" :inactive-value="0" />
          </el-form-item>
      </div>
    </div>
    <el-form-item>
      <el-button type="primary" @click="submit">Submit</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { ref, onMounted, reactive} from 'vue'
import { useProductStore } from '~/store/product.js'
import { useCompoundStore } from '~/store/compoundproduct.js'
import { useRoute } from 'vue-router'
definePageMeta({
  middleware: ['authenticated'],
})
const form = reactive({
  image: null,
  product_code: '',
  title: '',
  slug: '',
  gender: '',
  price: '',
  description: '',
  status: '',
  compound_products: []
});

const rules = {
  product_code: [
    { required: true, message: 'Please enter a product code', trigger: 'blur' },
    { min: 5, message: 'Product code must be at least 3 characters long', trigger: 'blur' },
  ],
  title: [
    { required: true, message: 'Please enter a product title', trigger: 'blur' },
    {message: 'Product title must be at least 3 characters long', trigger: 'blur' },
  ],
  fragrance_family: [
    { required: true, message: 'Please select a fragrance family', trigger: 'change' },
  ],
  gender: [
    { required: true, message: 'Please select a gender', trigger: 'change' },
  ],
  price: [
    { required: true, message: 'Please enter the price', trigger: 'blur' },
    { type: 'number', message: 'Price must be a valid number', trigger: 'blur' },
  ],
  volume: [
    { required: true, message: 'Please enter the volume', trigger: 'blur' },
    { type: 'number', message: 'Volume must be a valid number', trigger: 'blur' },
  ],
  description: [
    { required: true, message: 'Please enter a description', trigger: 'blur' },
    {message: 'Description must be at least 10 characters long', trigger: 'blur' },
  ],
  image: [
    { required: true, message: 'Please upload an image', trigger: 'blur' },
  ]
};

const transferData = ref([]);
const selectedProducts = ref([]);
const productStore = useProductStore();
const { getProduct} = productStore;
const compoundStore = useCompoundStore();
const { updateCompound, showCompound } = compoundStore;
const route = useRoute();
const formRef = ref(null);
const Slug = (title) => {
  return title
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
};
const compoundData = ref()
const existingImage = ref(null)
const loadCompound = async (compound_id) => {
  try {
    compoundData.value = await showCompound(compound_id)
    if (compoundData.value.image) {
      form.image = {
        name: compoundData.value.image.split('/').pop(),
        url: compoundData.value.image,
        uid: compoundData.value.image,
      }
      existingImage.value = compoundData.value.image
    } else {
      form.image = null
    }
    form.product_code = compoundData.value.product_code || ''
    form.title = compoundData.value.title || ''
    form.description = compoundData.value.description || ''
    form.slug = compoundData.value.slug || ''
    form.price = compoundData.value.price || ''
    form.gender = compoundData.value.gender || ''
    // Set selected products
    selectedProducts.value = compoundData.value.products.map((product) => product.id);

    // Set transfer data with both selected and unselected products
    transferData.value = compoundData.value.products.map((product) => ({
      label: product.title,
      key: product.id,
    }));
  } catch (error) {
    console.log('Failed to load product: ' + error)
  }
}
//fetch product to transfer to compound
const fetchProduct = async (params = {}) => {
  try {
    let currentPage = 1;
    let products = [];
    let totalPages;

    do {
      const response = await getProduct({ page: currentPage }); // Adjust this for your API call
      products = products.concat(response.data);
      totalPages = response.last_page;
      currentPage++;
    } while (currentPage <= totalPages);

    transferData.value = products.map((product) => ({
      label: product.title,
      key: product.id,
    }));
  } catch (error) {
    console.log('Failed to fetch Product', error)
  }
}

const submit = async () => {
  try{
    const compound_id = route.params.id;
    //validate the form before process
    await formRef.value.validate();
    //prepare compound product data
    const compoundProducts = selectedProducts.value.map((id) => ({product_id: id}));
    const formData = new FormData();

    formData.append('product_code', form.product_code);
    // Include the existing image if a new one is not uploaded
    if (form.image && form.image.raw) {
      // If it's a file (new image uploaded)
      formData.append('image', form.image.raw)
    } else if (form.image && form.image.url) {
      // If it's just a URL (image not uploaded, just needs to be saved)
      formData.append('image_url', form.image.url)
    }
    formData.append('title', form.title);
    formData.append('slug', form.slug);
    formData.append('price', form.price);
    formData.append('description', form.description);
    formData.append('gender', form.gender);
    formData.append('status', form.status ? 1 : 0);
    formData.append('compound_products', JSON.stringify(compoundProducts))
    await updateCompound(compound_id, formData);
    ElMessage.success('Product updated successfully!')
  }catch(error){
    console.error('Compound Product creation failed', error);
  }finally {
    form.image = null
    form.product_code = ''
    form.title = ''
    form.description = ''
    form.slug = ''
    form.price = ''
    form.gender = ''
    form.status = 0
    selectedProducts.value = []
    navigateTo('/compoundProduct')
  }
}


const handleUploadSuccess = (response, file, fileList) => {
  form.image = file;
};

const handleRemove = () => {
  form.image = null; // Clear the image when removed
};

const filterMethod = (query, item) => {
  return item.label.toLowerCase().includes(query.toLowerCase())
}

onMounted(() => {
  const compound_id = route.params.id;
  fetchProduct();
  loadCompound(compound_id);  // Pass the correct ID here
})
</script>

