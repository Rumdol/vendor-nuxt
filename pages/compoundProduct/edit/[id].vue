<template>

  <el-form :model="form"
           ref="formRef"
           :rules="rules"
           label-width="auto" class="border border-gray:10 shadow p-4 w-[1200px] text-lg">
    <h1 class="text-3xl text-center">Create Compound Product</h1>
    <div class="flex">
      <!-- Select Product -->
      <el-form-item class="p-4" label="Select Compound Product">
        <el-transfer
          v-model="value"
          filterable
          :filter-method="filterMethod"
          :titles="['Products', 'Compound Products']"
          filter-placeholder="Search..."
          :data="data"
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
          <el-switch v-model="form.status" />
        </el-form-item>
      </div>
    </div>
    <el-form-item>
      <el-button type="primary" @click="submit">Submit</el-button>
      <el-button @click="navigateTo('/compoundProduct')">Cancel</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { ref} from 'vue'
import { useProductStore } from '~/store/product.js'
import { useCompoundStore } from '~/store/compoundproduct.js'
import { useRoute } from 'vue-router'

const form = reactive({
  image: null,
  product_code: '',
  title: '',
  slug: '',
  gender: '',
  price: '',
  description: '',
  status: 1,
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
const { getProduct } = productStore;
const compoundStore = useCompoundStore();
const { updateCompound, showCompound } = compoundStore;
const route = useRoute;
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
const loadCompound = async () => {
  try {
    const id = route.params.id
    compoundData.value = await showCompound(id)
    console.log('data:', compoundData)
    if (compoundData.value.image) {
      form.image = {
        name: compoundData.value.image.split('/').pop(),
        url: compoundData.value.image,
        uid: compoundData.value.image,
      }
      existingImage.value = compoundData.value.image
      console.log(form.image)
    } else {
      form.image = null
    }
    form.product_code = compoundData.value.product_code || ''
    form.title = compoundData.value.title || ''
    form.description = compoundData.value.description || ''
    form.slug = compoundData.value.slug || ''
    form.price = compoundData.value.price || ''
    form.gender = compoundData.value.gender || ''
    form.compound_products = compoundData.value.compound.map((product) => product.id);
    transferData.value = compoundData.value.compound.map((product) => ({
      label: product.title,
      key: product.id,
    }));
    console.log(form)
  } catch (error) {
    console.log('Failed to load product: ' + error)
  }
}
console.log('Product show: ', compoundData)
//fetch product to transfer to compound
const fetchProduct = async (params={}) => {
  try{
    const response = await getProduct(params);
    //map the products to the transfer data
    transferData.value = response.data.map((products) => ({
      label: products.title,
      key: products.id,
    }))

  }catch(error){
    console.log('Failed to fetch Product', error);
  }
}

const submit = async () => {
  try{
    //validate the form before process
    await formRef.value.validate();

    //prepare compound product data
    const compoundProducts = selectedProducts.value.map((id) => ({product_id: id}));

    const formData = new FormData();

    formData.append('product_code', form.product_code);
    if (form.image) {
      console.log(form.image.raw);
      formData.append('image', form.image.raw);
    }
    formData.append('title', form.title);
    formData.append('slug', form.slug);
    formData.append('price', form.price);
    formData.append('description', form.description);
    formData.append('gender', form.gender);
    formData.append('status', form.status ? 1 : 0);
    formData.append('compound_products', JSON.stringify(compoundProducts))
    const { data } = await updateCompound(formData);
    navigateTo('/compoundProduct')
  }catch(error){
    console.error('Compound Product creation failed', error);
  }
}
const handleUploadSuccess = (response, file, fileList) => {
  form.image = file;
};

const handleRemove = () => {
  form.image = null; // Clear the image when removed
};

const filterMethod = (query, item) => {
  console.log({ query, item })
  return item.label.toLowerCase().includes(query.toLowerCase())
}

</script>

