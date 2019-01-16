import axios from '@/libs/api.request'
import qs from 'qs'
/**
 * 公共请求方法
 * @param {String} url 请求路径
 * @param {String} method 请求方式 "get/post"
 * @param {Object} data 请求参数
 * @param {Function} callback 回调函数
 */
export default function request (url, method, data, callback) {
  if (method === 'get' || method === 'GET') {
    axios.request({
      url: url,
      method: method,
      params: data,
      responseEncoding: 'utf-8'
    }).then(function (res) {
      callback(res)
    })
  } else if (method === 'post' || method === 'POST') {
    axios.request({
      url: url,
      method: method,
      data: qs.stringify(data),
      responseEncoding: 'utf-8'
    }).then(function (res) {
      callback(res)
    })
  }
}
