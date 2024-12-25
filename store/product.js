import { defineStore } from 'pinia'
import ProductService from '~/services/ProductService.js'

export const useProductStore = defineStore('product', () => {
  const product = ref([])
  const productService = ProductService.getInstance()

  const getProduct = async (params) => {
    try {
      const { data } = await productService.getProduct(params)
      const products = data || {}
      product.value = products
      return products
    } catch (error) {
      ElMessage.error(error.message || 'Get product failed')
      throw new Error(`Get product failed: ${error.message || 'Unknown error'}`)
    }
  }
  const createProduct = async (params) => {
    try{
      const { data } = await productService.createProduct(params)
      ElMessage.success(`Product created successfully!`)
      return data;
    }catch(error){
      ElMessage.error(error.message || 'Failed to create product')
      throw new Error(`Create product failed: ${error.message || 'Unknown error'}`)
    }
  }

  const showProduct = async (params) => {
    try {
      const response = await productService.showProduct(params);
      return response.data;
    } catch (error) {
      ElMessage.error(error.message || 'Failed to fetch product')
      throw new Error(
        `Failed to fetch product: ${error.message || 'Unknown error'}`,
      )
    }
  }

  const updateProduct = async (id, data) => {
    try{
      const response = await productService.updateProduct(id, data)
      product.value = response.data;
      return response.data
    }catch(error){
      ElMessage.error(error.message || 'Failed to update product')
      throw new Error(`Update product failed: ${error.message || 'Unknown error'}`)
    }
  }

  const deleteProduct = async (params) => {
    try {

      const deletedProduct = await productService.deleteProduct(params)
      ElMessage.success('Product deleted successfully')

      return deletedProduct  // Return the deleted category data
    } catch (error) {
      throw new Error('Failed to delete product in store: ' + error.message)
    }
  }
  return {
    product: computed(() => product.value),
    getProduct,
    showProduct,
    createProduct,
    deleteProduct,
    updateProduct
  }
})
