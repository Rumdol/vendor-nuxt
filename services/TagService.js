import BaseService from './BaseService'

let instance = null
class TagService extends BaseService {
  constructor() {
    super('tag')
  }

  static getInstance() {
    if (!instance) {
      instance = new TagService()
    }
    return instance
  }

  async getTag() {


    // Make the API call with the query parameters
    return await this._get(`${this._prefix}`)
  }
}

export default TagService
