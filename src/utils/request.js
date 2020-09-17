import axios from 'axios'
import store from '@/store'
import jsonBig from 'json-bigint'

// var json = '{ "value" : 9223372036854775807, "v2": 123 }'

// console.log(jsonBig.parse(json))

const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/', // 基础路径

  // transformResponse 允许自定义原始的响应数据（字符串）
  transformResponse: [
    function(data) {
      try {
        // 如果转换成功则返回转换的数据结果
        return jsonBig.parse(data)
      } catch (err) {
        // 如果转换失败，则包装为统一数据格式并返回
        return {
          data
        }
      }
    }
  ]
})

// 请求拦截器
request.interceptors.request.use(
  function(config) {
    const { user } = store.state
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`
    }
    return config
  },
  function(error) {
    return Promise.reject(error)
  }
)
export default request
