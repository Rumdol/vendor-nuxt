<template>
  <el-form
    v-if="productData"
    :model="form"
    label-width="auto"
    class="border border-gray:10 shadow p-4 w-[800px] text-lg"
  >
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
      <el-input
        v-model="form.product_code"
        placeholder="please select category for your product code"
      >
      </el-input>
    </el-form-item>
    <el-form-item label="Title" prop="title">
      <el-input v-model="form.title" @input="form.slug = Slug(form.title)" />
      <p>Slug: {{ form.slug }}</p>
    </el-form-item>
    <el-form-item label="Category" prop="fragrance">
      <el-select
        v-model="form.fragrance_family"
        placeholder="please select category for your product"
      >
        <el-option label="fruit" value="fruit" />
        <el-option label="wood" value="wood" />
      </el-select>
    </el-form-item>
    <el-form-item label="Gender" prop="gender">
      <el-select
        v-model="form.gender"
        placeholder="please select your product gender"
      >
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
    <el-form-item label="out of stock" prop="status">
      <el-switch v-model="form.status" />
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="onSubmit">Save</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { useProductStore } from '~/store/product.js'

definePageMeta({
  middleware: ['authenticated'],
})
const route = useRoute()

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
  status: '',
})

const productStore = useProductStore()
const { showProduct, updateProduct } = productStore
const productData = ref()
const Slug = (title) => {
  return title
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '')
}
const existingImage = ref(null)
const loadProduct = async () => {
  try {
    const id = route.params.id
    productData.value = await showProduct(id)
    if (productData.value.image) {
      form.image = {
        name: productData.value.image.split('/').pop(),
        url: productData.value.image,
        uid: productData.value.image,
      }
      existingImage.value = productData.value.image
      console.log(form.image)
    } else {
      form.image = null
    }
    form.product_code = productData.value.product_code || ''
    form.title = productData.value.title || ''
    form.description = productData.value.description || ''
    form.slug = productData.value.slug || ''
    form.fragrance_family = productData.value.fragrance_family || ''
    form.price = productData.value.price || ''
    form.volume = productData.value.volume || ''
    form.gender = productData.value.gender || ''
    console.log(form)
  } catch (error) {
    console.log('Failed to load product: ' + error)
  }
}

// Handle successful image upload
const handleUploadSuccess = (response, file, fileList) => {
  form.image = file
}
const handlePreview = (file) => {
  window.open(file.url, '_blank')
}
// Handle file removal
const handleRemove = (file, fileList) => {
  form.image = null
}

// Handle form submission to update the category
const onSubmit = async () => {
  try {
    const id = route.params.id
    const formData = new FormData();

   // Include the existing image if a new one is not uploaded
    if (form.image) {
      formData.append('image', form.image.raw);
    }
    formData.append('product_code', form.product_code)
    formData.append('title', form.title)
    formData.append('slug', form.slug)
    formData.append('price', form.price)
    formData.append('volume', form.volume)
    formData.append('description', form.description)
    formData.append('gender', form.gender)
    formData.append('fragrance_family', form.fragrance_family)

    await updateProduct(id, formData)
    ElMessage.success('Product updated successfully!')
  } catch (error) {
    console.error(error)
  } finally {
    form.image = null
    form.product_code = ''
    form.title = ''
    form.description = ''
    form.slug = ''
    form.fragrance_family = ''
    form.price = ''
    form.volume = ''
    form.gender = ''
    navigateTo('/singleProduct')
  }
}

onMounted(() => {
  loadProduct()
})
</script>
