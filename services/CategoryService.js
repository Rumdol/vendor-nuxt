import BaseService from './BaseService'

let instance = null
class CategoryService extends BaseService {
  constructor() {
    super('category')
  }

  static getInstance() {
    if (!instance) {
      instance = new CategoryService()
    }
    return instance
  }

  async getCategory(params = {}) {
    // Transform query parameters to a query string
    const queryParams = new URLSearchParams(params).toString();

    // Append query string to the endpoint if params exist
    const url = queryParams ? `${this._prefix}?${queryParams}` : this._prefix;

    // Make the API call and return the result
    return await this._get(url);
  }
  async createCategory(data = {}) {
    // Create a new category
    console.log(data);
    return await this._post(`${this._prefix}`, data);
  }

  async updateCategory(id, data) {
    return await this._post(`${this._prefix}/update/${id}`, data)
  }
  async SearchCategory(params) {
    const queryParams = new URLSearchParams(params).toString()
    const response = await this._get(`${this._prefix}/${queryParams}`);
    return response.data
  }
  async deleteCategory(id) {
    return await this._delete(`${this._prefix}/delete/${id}`)
  }

  //show
  async showCategory(id) {
    return await this._get(`${this._prefix}/${id}`)
  }

}export default CategoryService
