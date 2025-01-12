import BaseService from './BaseService'

let instance = null
class ProductService extends BaseService {
  constructor() {
    super('product')
  }

  static getInstance() {
    if (!instance) {
      instance = new ProductService()
    }
    return instance
  }

  async getProduct(payload = {}) {


    // Convert the filtered parameters to a query string
    const queryParams = new URLSearchParams(payload).toString()

    // Make the API call with the query parameters
    return await this._get(`${this._prefix}?${queryParams}`, {})
  }

  async createProduct(payload = {}) {
    return await this._post(`${this._prefix}/create`, payload)
  }

  async showProduct(id) {
    return await this._get(`${this._prefix}/${id}`);
  }
  async updateProduct(id, payload={}) {
    return await this._post(`${this._prefix}/update/${id}`, payload);
  }
  async deleteProduct(id) {
    return await this._delete(`${this._prefix}/${id}`);
  }
}

export default ProductService
