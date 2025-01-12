import { defineStore } from 'pinia'
import CompoundService from '~/services/CompoundProductService.js'

export const useCompoundStore = defineStore('compound', () => {
  const compound = ref([])
  const compoundService = CompoundService.getInstance()

  const getCompound = async (params) => {
    try {
      const { data } = await compoundService.getCompound(params)
      const compounds = data || {}
      compound.value = compounds
      return compounds
    } catch (error) {
      ElMessage.error(error.message || 'Get compound product failed')
      throw new Error(`Get compound product failed: ${error.message || 'Unknown error'}`)
    }
  }

  const createCompound = async (params) => {
    try{
      const { data } = await compoundService.createCompound(params)
      ElMessage.success(`Product created successfully!`)
      return data;
    }catch(error){
      ElMessage.error(error.message || 'Failed to create product')
      throw new Error(`Create product failed: ${error.message || 'Unknown error'}`)
    }
  }

  const showCompound = async (params) => {
    try {
      const response = await compoundService.showCompound(params);
      return response.data;
    } catch (error) {
      ElMessage.error(error.message || 'Failed to fetch product')
      throw new Error(
        `Failed to fetch product: ${error.message || 'Unknown error'}`,
      )
    }
  }

  const updateCompound = async (id, params) => {
    try{
      const response = await compoundService.updateCompound(id, params)
      compound.value = response.data;
      return response.data
    }catch(error){
      ElMessage.error(error.message || 'Failed to update product')
      throw new Error(`Update product failed: ${error.message || 'Unknown error'}`)
    }
  }

  const deleteCompound = async (params) => {
    try {

      const deletedProduct = await compoundService.deleteCompound(params)
      ElMessage.success('Product deleted successfully')

      return deletedProduct  // Return the deleted category data
    } catch (error) {
      throw new Error('Failed to delete product in store: ' + error.message)
    }
  }
  return {
    compound: computed(() => compound.value),
    getCompound,
    showCompound,
    createCompound,
    deleteCompound,
    updateCompound
  }
})
