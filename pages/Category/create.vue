<script setup>
import { reactive, ref } from 'vue'
import { useCategoryStore } from '~/store/category.js'
import { useRoute, useRouter } from 'vue-router'

definePageMeta({
  middleware: ['authenticated'],
})

const route = useRoute()
const router = useRouter()
const categoryStore = useCategoryStore()

// Form validation reactive state
const formValidate = reactive({
  name: '',
  parent: '',
  icon: null,  // Store icon as a single file object
  description: '',
})

const formRef = ref(null)

// Validation rules
const rules = reactive({
  name: [
    { required: true, message: 'Please enter a name!', trigger: 'blur' },
  ],
  parent: [
    { required: true, message: 'Please enter a name!', trigger: 'blur' },
  ],
  icon: [
    { required: true, message: 'Please upload an icon!', trigger: 'blur' },
  ],
  description: [
    { required: true, message: 'Please enter a description!', trigger: 'blur' },
  ],
})

// Handle successful image upload
const handleUploadSuccess = (response, file, fileList) => {
  formValidate.icon = file
  console.log('Uploaded file:', file)
}

// Handle file removal
const handleRemove = (file, fileList) => {
  formValidate.icon = null
}

// Submit form
const onSubmit = async () => {
  if (!formRef.value) return

  formRef.value.validate(async (valid) => {
    if (valid) {
      try {
        // Prepare form data
        const formData = new FormData()
        formData.append('name', formValidate.name)
        formData.append('parent', formValidate.parent)
        formData.append('description', formValidate.description)
        formData.append('icon', formValidate.icon.raw)  // Pass raw file for binary upload

        // Create category via store
        await categoryStore.createCategory(formData)

        // Navigate after successful creation
        router.push('/category')
        console.log('Category created successfully!')
      } catch (error) {
        console.error('Failed to create category:', error.message)
      }
    } else {
      console.log('Error during form validation!')
    }
  })
}
</script>

<template>
  <div class="create-category-form">
    <div class="text-3xl mb-4">
      <strong>Create Category</strong>
    </div>

    <el-form ref="formRef" :model="formValidate" label-width="auto" class="max-w-lg justify-center items-center">
      <!-- Category Name -->
      <el-form-item label="Name" required prop="name">
        <el-input v-model="formValidate.name" />
      </el-form-item>

      <!-- Parent Category -->
      <el-form-item label="Parent" required prop="parent">
        <el-input v-model="formValidate.parent" />
      </el-form-item>

      <!-- Icon Upload -->
      <el-form-item label="Icon" required prop="icon">
        <el-upload
          list-type="picture-card"
          :on-success="handleUploadSuccess"
          :on-remove="handleRemove"
          :file-list="formValidate.icon ? [formValidate.icon] : []"
          :limit="1"
          accept="image/jpeg, image/png, image/jpg"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>

      <!-- Description -->
      <el-form-item label="Description" prop="description">
        <el-input v-model="formValidate.description" type="textarea" />
      </el-form-item>

      <!-- Action Buttons -->
      <el-form-item class="flex justify-between items-center ml-80">
        <el-button @click="router.push('/category')">Cancel</el-button>
        <el-button type="primary" @click="onSubmit">Create</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped lang="scss">
:root {
  font-family: Inter, sans-serif;
}

.create-category-form {
  display: flex;
  flex-direction: column;
  justify-items: center;
  padding: 2em;
  margin-top: 5%;
  margin-left: 25%;
  box-shadow: 3px 3px 3px 3px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  width: 700px;
  height: 700px;
}

.create-button {
  background-color: #00b69b;
  border: none;

  :hover {
    opacity: 0.5;
  }

  :active {
    opacity: 0.8;
  }
}
</style>
