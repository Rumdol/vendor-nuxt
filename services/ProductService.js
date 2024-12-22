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

    // Filter out null or undefined parameters
    const filteredParams = Object.fromEntries(
      Object.entries(payload).filter(([_, value]) => value != null),
    )

    // Convert the filtered parameters to a query string
    const queryParams = new URLSearchParams(filteredParams).toString()

    // Make the API call with the query parameters
    return await this._get(`${this._prefix}/all?${queryParams}`, {})
  }
  async getwishlist() {
    return await this._get(`${this._prefix}/wishlist`)
  }
  async showProduct(id) {
    return await this._get(`${this._prefix}/${id}`);
  }

}

export default ProductService
