import { defineStore } from 'pinia'
import TagService from '~/services/TagService.js'

export const useTagStore = defineStore('tag', () => {
  // Initialize state as an empty array since the response data is expected to be an array
  const tags = ref([])
  const tagService = TagService.getInstance()

  // Fetch special categories from the API
  const getTag = async () => {
    try {
      const response = await tagService.getTag()
      console.log('API Response:', response)
      tags.value = response?.data || [] // Safely handle null or undefined data
      return tags.value
    } catch (error) {
      ElMessage.error(error.message || 'Failed to fetch special categories')
      throw new Error(`Failed to fetch special categories: ${error.message || 'Unknown error'}`)
    }
  }

  return {
    tags: computed(() => tags.value), // Make state reactive and read-only for components
    getTag, // Expose the API call function
  }
})
