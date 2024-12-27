import BaseService from './BaseService'

let instance = null
class CompoundService extends BaseService {
  constructor() {
    super('compound')
  }

  static getInstance() {
    if (!instance) {
      instance = new CompoundService()
    }
    return instance
  }

  async getCompound(payload = {}) {

    // Convert the filtered parameters to a query string
    const queryParams = new URLSearchParams(payload).toString()

    // Make the API call with the query parameters
    return await this._get(`${this._prefix}?${queryParams}`, {})
  }

  async createCompound(payload = {}) {
    return await this._post(`${this._prefix}`, payload)
  }

  async showCompound(id) {
    return await this._get(`${this._prefix}/${id}`);
  }
  async updateCompound(id, payload={}) {
    return await this._post(`${this._prefix}/update/${id}`, payload);
  }
  async deleteCompound(id) {
    return await this._delete(`${this._prefix}/${id}`);
  }
}

export default CompoundService
