import BaseService from './BaseService'

let instance = null
class DashboardService extends BaseService {
  constructor() {
    super('dashboard')
  }

  static getInstance() {
    if (!instance) {
      instance = new DashboardService()
    }
    return instance
  }

  async getDashboard(params = {}) {
    // Transform query parameters to a query string
    const queryParams = new URLSearchParams(params).toString();

    // Append query string to the endpoint if params exist
    const url = queryParams ? `${this._prefix}?${queryParams}` : this._prefix;

    // Make the API call and return the result
    return await this._get(url);
  }


}export default DashboardService
