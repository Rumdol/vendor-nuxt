import { defineStore } from 'pinia'
import CategoryService from '~/services/CategoryService.js'
import { ref, computed } from 'vue'


export const useCategoryStore = defineStore('category', () => {
  const category = ref([])
  const categoryService = CategoryService.getInstance()

  const getCategory = async (params) => {
    try {
      const { data } = await categoryService.getCategory(params)
      const categories = data || {};
      category.value = categories
      console.log('category:',categories)
      return categories
    } catch (error) {
      ElMessage.error(error.message || 'Get category failed')
      throw new Error(`Get category failed: ${error.message || 'Unknown error'}`)
    }
  }

  const createCategory = async (data) => {
    try {
      const response = await categoryService.createCategory(data);
      ElMessage.success('Category created successfully');
      return response.data;
    } catch (error) {
      ElMessage.error(error.message || 'Failed to create category');
      throw new Error(`Create category failed: ${error.message || 'Unknown error'}`);
    }
  };

  //search category
  const searchCategory = async (params) => {
    try{
      const response = await categoryService.searchCategory(params);
      this.category = response //update the category state
        return response
    }catch(error){
      ElMessage.error(error.message || 'Failed to search category');
      throw new Error(`Search category failed: ${error.message || 'Unknown error'}`);
    }
  }

  // Update category
  const updateCategory = async (id, data) => {
    try {
      const response = await categoryService.updateCategory(id, data);

      // Assuming you have a reactive category state
      category.value = response; // Update category state with the new data
      ElMessage.success('Category updated successfully');
      return response;
    } catch (error) {
      ElMessage.error(error.message || 'Failed to update category');
      throw new Error(`Update category failed: ${error.message || 'Unknown error'}`);
    }
  };


// Delete category by ID
  const deleteCategory = async (params) => {
    try {
      // Call the deleteCategory function from the service
      const deletedCategory = await categoryService.deleteCategory(params)
      ElMessage.success('Category deleted successfully')

      return deletedCategory  // Return the deleted category data
    } catch (error) {
      throw new Error('Failed to delete category in store: ' + error.message)
    }
  }

  //show category
  const showCategory = async (id) => {
    try {
      const response = await categoryService.showCategory(id);
      return response.data;
    } catch (error) {
      ElMessage.error(error.message || 'Failed to show category');
      throw new Error(`Show category failed: ${error.message || 'Unknown error'}`);
    }
  }
  return {
    category: computed(() => category.value),
    getCategory,
    createCategory,
    deleteCategory,
    updateCategory,
    showCategory
  }
})
