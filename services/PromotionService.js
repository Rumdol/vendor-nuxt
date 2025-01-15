import BaseService from './BaseService'

let instance = null
class DiscountService extends BaseService {
  constructor() {
    super('discount')
  }

  static getInstance() {
    if (!instance) {
      instance = new DiscountService()
    }
    return instance
  }

  async getDiscount(payload = {}) {


    // Convert the filtered parameters to a query string
    const queryParams = new URLSearchParams(payload).toString()

    // Make the API call with the query parameters
    return await this._get(`${this._prefix}?${queryParams}`, {})
  }

  async createDiscount(payload = {}) {
    return await this._post(`${this._prefix}`, payload)
  }

  async showDiscount(id) {
    return await this._get(`${this._prefix}/${id}`);
  }
  async updateDiscount(id,payload={}) {
    return await this._post(`${this._prefix}/${id}`, payload);
  }
  async deleteProduct(id) {
    return await this._delete(`${this._prefix}/${id}`);
  }
}

export default DiscountService
