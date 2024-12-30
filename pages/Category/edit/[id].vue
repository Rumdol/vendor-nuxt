<template>
  <div class="edit-category-form">
    <div class="text-3xl mb-4">
      <strong>Edit Category</strong>
    </div>
    <el-form
      ref="formRef"
      :model="formValidate"
      label-width="auto"
      class="max-w-lg justify-center items-center"
      @submit.prevent="onSubmit"
    >
      <el-form-item label="Name" required prop="name">
        <el-input v-model="formValidate.name" />
      </el-form-item>

      <el-form-item label="Parent" required prop="parent">
        <el-input v-model="formValidate.parent" />
      </el-form-item>

      <!-- Icon Upload -->
      <el-form-item label="Icon" required prop="icon">
        <el-upload
          list-type="picture-card"
          :on-success="handleUploadSuccess"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="formValidate.icon ? [formValidate.icon] : []"
          :limit="1"
          accept="image/jpeg, image/png, image/jpg"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>

      <el-form-item label="Description" prop="description">
        <el-input v-model="formValidate.description" type="textarea" />
      </el-form-item>

      <!-- Action Buttons -->
      <el-form-item class="flex justify-between items-center ml-80">
        <el-button @click="router.push('/category')">Cancel</el-button>
        <el-button type="primary" @click="onSubmit" class="update-button">Save Changes</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import { useCategoryStore } from '~/store/category.js';
import { ElMessage } from 'element-plus';

// Define meta for the page, ensuring authentication middleware is applied
definePageMeta({
  middleware: ['authenticated'],
});

// Get route and router instances
const route = useRoute();
const router = useRouter();

// References for the category data and form validation
const formValidate = reactive({
  name: '',
  parent: '',
  icon: null, // For storing the image file
  description: '',
});

// Category store instance
const categoryStore = useCategoryStore();

// Load the category data for editing when the component mounts
const loadCategory = async () => {
  try {
    const id = route.params.id;
    const categoryData = await categoryStore.showCategory(id);

    // Create a mock file object for the icon (based on the URL)
    if (categoryData.category.icon) {
      formValidate.icon = {
        name: categoryData.category.icon.split('/').pop(), // Get the file name from the URL
        url: categoryData.category.icon, // Keep the original URL for display
        uid: categoryData.category.icon, // Assign a unique identifier
      };
    } else {
      formValidate.icon = null;
    }

    formValidate.name = categoryData.category.name || '';
    formValidate.parent = categoryData.category.parent || 0;
    formValidate.description = categoryData.category.description || '';
  } catch (error) {
    ElMessage.error('Failed to load category: ' + error.message);
    navigateTo('/category');
  }
};


// Handle successful image upload
const handleUploadSuccess = (response, file, fileList) => {
  formValidate.icon = file;
}
const handlePreview = (file) => {
  window.open(file.url, '_blank');
}
// Handle file removal
const handleRemove = (file, fileList) => {
  formValidate.icon = null
}

// Handle form submission to update the category
const onSubmit = async () => {
  try {
    const id = route.params.id;
    const formData = new FormData();

    // Append other form fields
    formData.append('name', formValidate.name);
    formData.append('parent', formValidate.parent);
    formData.append('description', formValidate.description);
    formData.append('icon', formValidate.icon.raw);

    await categoryStore.updateCategory(id, formData);
    ElMessage.success('Category updated successfully!');
  } catch (error) {
    console.error(error);
  } finally {
    // Reset the form
    formValidate.name = '';
    formValidate.parent = '';
    formValidate.icon = null;
    formValidate.description = '';
    navigateTo('/category');
  }
};



// Fetch category data when the component is mounted
onMounted(loadCategory);
</script>

<style scoped lang="scss">
.edit-category-form {
  display: flex;
  flex-direction: column;
  justify-items: center;
  padding: 2em;
  margin-top: 5%;
  margin-left: 25%;
  box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  width: 700px;
  height: 700px;
}

.update-button {
  background-color: #00b69b;
  border: none;

  :hover {
    opacity: 0.5;
  }

  :active {
    opacity: 0.8;
  }
}

.upload-file-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
