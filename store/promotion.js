import { defineStore } from 'pinia'
import DiscountService from '~/services/PromotionService.js'

export const useDiscountStore = defineStore('discount', () => {
  const productDiscounts = ref({})
  const discountService = DiscountService.getInstance()

  const getDiscount = async (params) => {
    try {
      const { data } = await discountService.getDiscount(params)
      productDiscounts.value = data || {}
      return data
    } catch (error) {
      ElMessage.error('Get product failed')
      throw new Error(`Get product failed: ${error.message || 'Unknown error'}`)
    }
  }

  const createDiscount = async (params) => {
    try{
      const { data } = await discountService.createDiscount(params)
      return data;
    }catch(error){
      throw new Error(`Create product failed: ${error.message || 'Unknown error'}`)
    }
  }

  const showDiscount = async (id) => {
    try {
      const response = await discountService.showDiscount(id);
      return response;
    } catch (error) {
      ElMessage.error('Failed to fetch product')
      throw new Error(
        `Failed to fetch product: ${error.message || 'Unknown error'}`,
      )
    }
  }
  const updateDiscount = async (id, params) => {
    try {
      const response = await discountService.updateDiscount(id, params);
      return response.data;
    } catch (error) {
      ElMessage.error('Failed to fetch product')
      throw new Error(
        `Failed to fetch product: 'Unknown error'}`,
      )
    }
  }
  const deleteDiscount = async (params) => {
    try {

      const deletedProduct = await discountService.deleteDiscount(params)
      ElMessage.success('Product deleted successfully')

      return deletedProduct  // Return the deleted category data
    } catch (error) {
      throw new Error('Failed to delete product in store: ' + error.message)
    }
  }
  return {
    productDiscounts: computed(() => productDiscounts.value),
    getDiscount,
    showDiscount,
    deleteDiscount,
    createDiscount,
    updateDiscount
  }
})
