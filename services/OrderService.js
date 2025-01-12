import BaseService from './BaseService'

let instance = null
class OrderService extends BaseService {
  constructor() {
    super('orders')
  }

  static getInstance() {
    if (!instance) {
      instance = new OrderService()
    }
    return instance
  }

  async getOrder(payload = {}) {


    // Convert the filtered parameters to a query string
    const queryParams = new URLSearchParams(payload).toString()

    // Make the API call with the query parameters
    return await this._get(`${this._prefix}?${queryParams}`, {})
  }

  async showOrder(id) {
    return await this._get(`${this._prefix}/${id}`);
  }

  async approved(id) {
    return await this._post(`${this._prefix}/update/${id}`);
  }
  async reject(id) {
    return await this._post(`${this._prefix}/update/${id}`);
  }


}

export default OrderService
