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
      ElMessage.error('Get product failed')
      throw new Error(`Get product failed: ${error.message || 'Unknown error'}`)
    }
  }

  const getHistoryOrder = async (params) => {
    try {
      const { data } = await orderService.getHistoryOrder(params)
      const orders = data || {}
      order.value = orders
      return orders
    } catch (error) {
      ElMessage.error('Get product failed')
      throw new Error(`Get product failed: ${error.message || 'Unknown error'}`)
    }
  }

  const showHistoryOrder = async (params) => {
    try {
      const response = await orderService.showHistoryOrder(params);
      return response.data;
    } catch (error) {
      ElMessage.error('Failed to fetch product')
      throw new Error(
        `Failed to fetch product: ${error.message || 'Unknown error'}`,
      )
    }
  }

  const showOrder = async (params) => {
    try {
      const response = await orderService.showOrder(params);
      return response.data;
    } catch (error) {
      ElMessage.error('Failed to fetch product')
      throw new Error(
        `Failed to fetch product: ${error.message || 'Unknown error'}`,
      )
    }
  }

  const approve = async (id) => {
    try {
      await orderService.approved(id);
      ElMessage.success('Confirm order successfully')
    } catch (error) {
      ElMessage.error('Failed to fetch product')
      throw new Error(
        `Failed to fetch product: ${error.message || 'Unknown error'}`,
      )
    }
  }
  const reject = async (id) => {
    try {
      await orderService.reject(id);
      ElMessage.success('Cancelled order successfully')
    } catch (error) {
      ElMessage.error('Failed to fetch product')
      throw new Error(
        `Failed to fetch product: ${error.message || 'Unknown error'}`,
      )
    }
  }

  return {
    order: computed(() => order.value),
    getOrder,
    showOrder,
    showHistoryOrder,
    getHistoryOrder,
    approve,
    reject
  }
})
