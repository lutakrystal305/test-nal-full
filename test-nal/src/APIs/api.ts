import axios from 'axios'
import JSONBig from 'json-bigint'
import { isEmpty, assign } from 'lodash'

const BASE_URL = 'http://localhost:3005/'
console.log(BASE_URL)
const singletonEnforcer = Symbol()

class AxiosClient {
  axiosClient: any
  constructor(enforcer: any) {
    if (enforcer !== singletonEnforcer) {
      throw new Error('Cannot initialize Axios client single instance')
    }
    this.axiosClient = axios.create({
      baseURL: BASE_URL,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })

    this.axiosClient.defaults.transformResponse = (data: any) =>
      JSONBig.parse(data)

    this.axiosClient.interceptors.response.use(
      (response: any) => {
        const { status, data } = response
        return {
          status,
          data,
        }
      },
      (error: any) => {
        if (error.response) {
          const { data, status } = error.response
          switch (status) {
            case 400:
              break
            case 500:
              break
            case 401:
              break
            case 404:
              break
            case 403:
              break
            default:
              break
          }
          throw data
        } else {
          throw error
        }
      }
    )
  }

  static get instance() {
    let axiosClientInstance
    if (!axiosClientInstance) {
      axiosClientInstance = new AxiosClient(singletonEnforcer)
    }

    return axiosClientInstance
  }

  setHeader = async (userToken = null) => {
    this.axiosClient.defaults.headers.common.Authorization = `Bearer ${userToken}`
  }

  get = async (resource: any, slug = '', config = {}) => {
    let { headers }: any = config
    if (!headers) {
      headers = this.axiosClient.defaults.headers
    }
    slug += ''
    const requestURL = isEmpty(slug) ? `${resource}` : `${resource}/${slug}`
    return this.axiosClient.get(requestURL, {
      data: null,
      ...assign(config, { headers }),
    })
  }

  post = async (resource: any, data: any, config = {}) => {
    return this.axiosClient.post(
      `${resource}`,
      data,
      assign(config, this.axiosClient.defaults.headers)
    )
  }

  update = async (resource: any, data: any, config = {}) =>
    this.axiosClient.put(
      `${resource}`,
      data,
      assign(config, this.axiosClient.defaults.headers)
    )

  put = async (resource: any, data: any, config = {}) =>
    this.axiosClient.put(
      `${resource}`,
      data,
      assign(config, this.axiosClient.defaults.headers)
    )

  patch = async (resource: any, data: any, config = {}) =>
    this.axiosClient.patch(
      `${resource}`,
      data,
      assign(config, this.axiosClient.defaults.headers)
    )

  delete = async (resource: any, data: any, config = {}) =>
    this.axiosClient.delete(`${resource}`, {
      data,
      ...assign(config, { headers: this.axiosClient.defaults.headers }),
    })
}

export default AxiosClient.instance
