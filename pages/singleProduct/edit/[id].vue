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
    <el-form-item label="Category" prop="category">
      <el-select-v2
        v-model="form.category_id"
        :options="categoryData"
        :props="props"
        placeholder="Please select categories"
        style="width: 240px"
        filterable
      />
    </el-form-item>
    <el-form-item label="Tag" prop="tag_id">
      <el-select
        v-model="form.tag_id"
        :options="tagData"
        placeholder="Please select tag"
        filterable
        :props="props"
      >
        <el-option
          v-for="item in tagData"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="Gender" prop="gender">
      <el-select v-model="form.gender" placeholder="please select your product gender">
        <el-option label="Male" value="male" />
        <el-option label="Female" value="female" />
        <el-option label="Unisex" value="unisex" />

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
    <el-form-item label="Status" prop="status">
      <el-radio-group v-model="form.status">
        <el-radio :label="1">In Stock</el-radio>
        <el-radio :label="0">Out of Stock</el-radio>
      </el-radio-group>
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
import { useCategoryStore } from '~/store/category.js'
import { useTagStore} from '~/store/tag.js'

definePageMeta({
  middleware: ['authenticated'],
})
const route = useRoute()
const form = reactive({
  image: null,
  product_code: '',
  title: '',
  slug: '',
  gender: '',
  price: '',
  volume: '',
  description: '',
  category_id: '',
  status: '',
  tag_id: '',
});
const categoryStore = useCategoryStore()
const {getCategory } = categoryStore;
const categoryData = ref([])
const searchTerm = ref('')
const currentPage = ref(1);
const useTag = useTagStore();
const { getTag } = useTag;
const tagData = ref([])

const props = {
  label: 'name', // Field to display in dropdown
  value: 'id',   // Field used for binding selected values
}

const fetchCategories = async () => {
  try {
    const response = await getCategory({
      page: currentPage.value,
      search: searchTerm.value,
    })

    const categoriesData = response.data?.map((item) => ({
      id: item.id,
      name: item.name,
    })) || [];
    categoryData.value = categoriesData;
  } catch (error) {
    console.log('Failed to fetch categories', error)
    ElMessage('Failed the fetch category', error)
  }
}
const fetchTag = async () => {
  try {
    const response = await getTag()
    console.log('Fetched special categories:', response)

    tagData.value = response.map((item) => ({
      id: item.id,
      name: item.name,
    }))
  } catch (error) {
    ElMessage.error('Failed to fetch special categories')
    console.error('Error fetching special categories:', error)
  }
}
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
    // Get the category name based on category_id
    const selectedCategory = categoryData.value.find(
      (category) => category.id === productData.value.category_id
    )
    const selectedTag = tagData.value.find(
      (tags) => tags.id === productData.value.tag_id
    )
    form.category_id = selectedCategory ? selectedCategory.id : null
    form.tag_id = selectedTag ? selectedTag.id : null
    form.product_code = productData.value.product_code || ''
    form.title = productData.value.title || ''
    form.description = productData.value.description || ''
    form.slug = productData.value.slug || ''
    form.fragrance_family = productData.value.fragrance_family || ''
    form.price = productData.value.price || ''
    form.volume = productData.value.volume || ''
    form.gender = productData.value.gender || ''
    form.category_id = productData.value.category_id || ''
    form.tag_id = productData.value.tag_id || ''
    form.status = productData.value.status || ''
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
    if (form.image && form.image.raw) {
      // If it's a file (new image uploaded)
      formData.append('image', form.image.raw)
    } else if (form.image && form.image.url) {
      // If it's just a URL (image not uploaded, just needs to be saved)
      formData.append('image_url', form.image.url)
    }
    formData.append('product_code', form.product_code)
    formData.append('title', form.title)
    formData.append('slug', form.slug)
    formData.append('price', form.price)
    formData.append('volume', form.volume)
    formData.append('description', form.description)
    formData.append('gender', form.gender)
    formData.append('category_id', form.category_id)
    formData.append('status', form.status);
    formData.append('tag_id', form.tag_id);

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
    form.price = ''
    form.volume = ''
    form.gender = ''
    form.category_id = ''
    form.tag_id = ''
    form.status = ''
    navigateTo('/singleProduct')
  }
}

onMounted(() => {
  loadProduct()
  fetchCategories()
  fetchTag()
})
</script>
