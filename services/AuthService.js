import BaseService from './BaseService'

let instance = null
class AuthService extends BaseService {
  constructor () {
    super('')
  }

  static getInstance () {
    if (!instance) {
      instance = new AuthService()
    }
    return instance
  }

  async login (req) {
    return await this._post(`${this._prefix}/login`, req)
  }

  async getMe () {
    return await this._get(`${this._prefix}/me`)
  }

  async logout (req) {
    return await this._post(`${this._prefix}/logout`, req)
  }

  //profile
  async getProfile (req) {
    return await this._get(`${this._prefix}/profile`, req)
  }

  //update profile
  async updateProfile (req) {
    return await this._post(`${this._prefix}/profile`, req)
  }
}

export default AuthService
