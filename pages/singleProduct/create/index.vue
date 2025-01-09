<template>

  <el-form :model="form"
           ref="formRef"
           :rules="rules"
           label-width="auto" class="border border-gray:10 shadow p-4 w-[800px] text-lg">
    <h1 class="text-3xl text-center">Create Product</h1>

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
    <el-form-item label="Product code" prop="product_code">
      <el-input v-model="form.product_code" placeholder="please select category for your product code">
      </el-input>
    </el-form-item>
    <el-form-item label="Title" prop="title">
      <el-input v-model="form.title" @input="form.slug = Slug(form.title)" />
      <p>Slug: {{ form.slug }}</p>
    </el-form-item>
    <el-form-item label="Category" prop="category">
      <el-select-v2
        v-model="form.category"
        :options="categoryData"
        :props="props"
        placeholder="Please select categories"
        style="width: 240px"
        filterable
      />
    </el-form-item>
    <el-form-item label="Gender" prop="gender">
      <el-select v-model="form.gender" placeholder="please select your product gender">
        <el-option label="male" value="male" />
        <el-option label="female" value="female" />

      </el-select>
    </el-form-item>
    <el-form-item label="Price" prop="price">
      <el-input v-model.number="form.price" />
    </el-form-item>
    <el-form-item label="Volume" prop="volume">
      <el-input v-model.number="form.volume" />
    </el-form-item>

    <el-form-item label="Description" prop="description">
      <el-input v-model="form.description" type="textarea" />
    </el-form-item>
    <el-form-item label="In stock" prop="status">
      <el-switch v-model="form.status" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">Create</el-button>
      <el-button @click="navigateTo('/singleProduct')">Cancel</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { ref} from 'vue'
import { useProductStore} from '~/store/product.js'
import { useCategoryStore } from '~/store/category.js'

const form = reactive({
  image: null,
  product_code: '',
  title: '',
  slug: '',
  fragrance_family: '',
  gender: '',
  price: '',
  volume: '',
  description: '',
  category: '',
  status: 0,
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

const categoryStore = useCategoryStore()
const {getCategory } = categoryStore;
const categoryData = ref([])
const currentPage = ref(1)

const props = {
  label: 'name', // Field to display in dropdown
  value: 'id',   // Field used for binding selected values
}
const selectedCategories = ref([])
//Get category to show on the table
const fetchCategories = async () => {
  try {
    const response = await getCategory({
      page: currentPage.value,
    })

    console.log('response',response);

    const categoriesData = response.data?.map((item) => ({
      id: item.id,
      name: item.name,
    })) || [];

    categoryData.value = categoriesData;
    console.log('Categories (id and name only):', categoryData.value);
  } catch (error) {
    console.log('Failed to fetch categories', error)
    ElMessage('Failed the fetch category', error)
  }
}

console.log('fetchCategory', fetchCategories());
const productStore = useProductStore()
const { createProduct } = productStore

const Slug = (title) => {
  return title
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
};

const formRef = ref(null)
const createNewProduct = async () => {
  try{
    const formData = new FormData();

    formData.append('product_code', form.product_code);
    if (form.image) {
      console.log(form.image.raw);
      formData.append('image', form.image.raw);
    }
    formData.append('title', form.title);
    formData.append('slug', form.slug);
    formData.append('price', form.price);
    formData.append('volume', form.volume);
    formData.append('description', form.description);
    formData.append('gender', form.gender);
    formData.append('category_id', form.category);
    formData.append('status', form.status ? 1 : 0);

    const { data } = await createProduct(formData);
    navigateTo('/singleProduct')
  }catch(error){
    console.error('Product creation failed', error);
  }
}
const handleUploadSuccess = (response, file, fileList) => {
  form.image = file;
};


const handleRemove = () => {
  form.image = null; // Clear the image when removed
};


const onSubmit = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      createNewProduct();
    } else {
      console.log('Form validation failed');
    }
  });
}

</script>
