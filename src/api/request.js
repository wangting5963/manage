import axios from '@/libs/api.request'
/**
 * 公共请求方法
 * @param {String} url 请求路径
 * @param {String} method 请求方式 "get/post"
 * @param {Object} data 请求参数
 * @param {Function} callback 回调函数
 */
export default function request(url,method,data,callback) {
    axios.request({
        url: url,
        method: method,
        data:data,
    }).then(function(res) {
        callback(res)
    })
}