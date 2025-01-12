import { defineStore } from 'pinia'
import OrderService from '~/services/OrderService'

export const useOrderStore = defineStore('product', () => {
  const order = ref([])
  const orderService = OrderService.getInstance()

  const getOrder = async (params) => {
    try {
      const { data } = await orderService.getOrder(params)
      const orders = data || {}
      order.value = orders
      return orders
    } catch (error) {
      ElMessage.error(error.message || 'Get product failed')
      throw new Error(`Get product failed: ${error.message || 'Unknown error'}`)
    }
  }

  const showOrder = async (params) => {
    try {
      const response = await orderService.showOrder(params);
      return response.data;
    } catch (error) {
      ElMessage.error(error.message || 'Failed to fetch product')
      throw new Error(
        `Failed to fetch product: ${error.message || 'Unknown error'}`,
      )
    }
  }

  return {
    order: computed(() => product.value),
    getOrder,
  }
})
