import { defineStore } from 'pinia'
import SpecialCategoryService from '~/services/SpecialCategoryService.js'

export const useSpecialStore = defineStore('tag', () => {
  // Initialize state as an empty array since the response data is expected to be an array
  const specialCategory = ref([])
  const specialService = SpecialCategoryService.getInstance()

  // Fetch special categories from the API
  const fetchSpecial = async () => {
    try {
      const response = await specialService.getSpecial()
      console.log('API Response:', response)
      specialCategory.value = response?.data || [] // Safely handle null or undefined data
      return specialCategory.value
    } catch (error) {
      ElMessage.error(error.message || 'Failed to fetch special categories')
      throw new Error(`Failed to fetch special categories: ${error.message || 'Unknown error'}`)
    }
  }

  return {
    specialCategory: computed(() => specialCategory.value), // Make state reactive and read-only for components
    fetchSpecial, // Expose the API call function
  }
})
