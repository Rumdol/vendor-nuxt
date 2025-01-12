<script setup>
import { useAuthStore } from '~/store/auth'
import { onMounted, ref } from 'vue'
import { ElMessage } from 'element-plus'

definePageMeta({
  middleware: ['authenticated'],
})

const profileForm = ref({
  name: '',
  email: '',
  mobile: '',
  age: '',
  image: null,
  vendor_name: '',
  vendor_slug: '',
  vendor_address: '',
  vendor_description: '',
  vendor_paypal_client_id: '',
  vendor_logo: null,
})

const authStore = useAuthStore()
const profile = ref(null)
const isEditMode = ref(false)

const getProfile = async () => {
  try {
    profile.value = await authStore.getProfile()
    Object.assign(profileForm.value, profile.value) // Pre-fill the form with profile data
  } catch (error) {
    ElMessage.error('Failed to fetch profile.')
    console.error('Error fetching profile:', error)
  }
}

const updateProfile = async () => {
  try {
    const formData = new FormData()
    Object.keys(profileForm.value).forEach(key => {
      if (profileForm.value[key] !== null) {
        formData.append(key, profileForm.value[key])
      }
    })

    await authStore.updateProfile(formData)
    ElMessage.success('Profile updated successfully.')
    isEditMode.value = false
    await getProfile() // Refresh profile after update
  } catch (error) {
    ElMessage.error('Failed to update profile.')
    console.error('Error updating profile:', error)
  }
}

onMounted(() => {
  getProfile()
})
</script>

<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <el-card shadow="hover" class="w-full max-w-4xl mx-auto">
      <div class="flex justify-between">
        <h1 class="text-2xl font-semibold text-gray-700 mb-4">Settings</h1>
        <el-button type="primary" size="small" @click="isEditMode = !isEditMode">
          {{ isEditMode ? 'Cancel' : 'Edit' }}
        </el-button>
      </div>


      <template v-if="profile">
        <el-row :gutter="20" class="mb-6">
          <el-col :span="12">
            <div class="flex justify-between items-center">
              <h2 class="text-xl font-medium">Profile</h2>
            </div>

            <template v-if="isEditMode">
              <el-avatar :src="profile.image" size="large" />
              <el-form label-position="top" class="mt-4">
                <el-form-item label="Name">
                  <el-input v-model="profileForm.name" />
                </el-form-item>
                <el-form-item label="Email">
                  <el-input v-model="profileForm.email" />
                </el-form-item>
                <el-form-item label="Mobile">
                  <el-input v-model="profileForm.mobile" />
                </el-form-item>
                <el-form-item label="Age">
                  <el-input v-model="profileForm.age" type="number" />
                </el-form-item>
                <el-form-item label="Image">
                  <input type="file" @change="profileForm.image = $event.target.files[0]" />
                </el-form-item>
                <el-button type="success" @click="updateProfile">Save</el-button>
              </el-form>
            </template>

            <template v-else>
              <el-avatar :src="profile.image" size="large" />
              <p>Name: {{ profile.name }}</p>
              <p>Email: {{ profile.email }}</p>
              <p>Mobile: {{ profile.mobile }}</p>
              <p>Age: {{ profile.age }}</p>
            </template>
          </el-col>

          <el-col :span="12">
            <div class="flex justify-between items-center">
              <h2 class="text-xl font-medium">Vendor Profile</h2>
            </div>

            <template v-if="isEditMode">
              <el-form label-position="top" class="mt-4">
                <el-form-item label="Vendor Name">
                  <el-input v-model="profileForm.vendor_name" />
                </el-form-item>
                <el-form-item label="Slug">
                  <el-input v-model="profileForm.vendor_slug" />
                </el-form-item>
                <el-form-item label="Address">
                  <el-input v-model="profileForm.vendor_address" />
                </el-form-item>
                <el-form-item label="Description">
                  <el-input v-model="profileForm.vendor_description" />
                </el-form-item>
                <el-form-item label="PayPal Client ID">
                  <el-input v-model="profileForm.vendor_paypal_client_id" />
                </el-form-item>
              </el-form>
            </template>

            <template v-else>
              <p>Name: {{ profile.vendor_name }}</p>
              <p>Slug: {{ profile.vendor_slug }}</p>
              <p>Address: {{ profile.vendor_address }}</p>
              <p>Description: {{ profile.vendor_description }}</p>
              <p>PayPal Client ID: {{ profile.vendor_paypal_client_id }}</p>
            </template>
          </el-col>

        </el-row>
      </template>

      <template v-else>
        <div class="text-center">
          <el-spin tip="Loading profile..." />
        </div>
      </template>
    </el-card>
  </div>
</template>

<style scoped>
</style>
