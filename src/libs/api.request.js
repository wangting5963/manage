import HttpRequest from '@/libs/axios'
import config from '@/config'
const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro
// 设置BaseUrl，BaseUrl将会拼接到设置的Url之前
const axios = new HttpRequest(baseUrl)
export default axios
