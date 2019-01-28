import Mock from 'mockjs'
import { login, logout, getUserInfo } from './login'
import { getTableData, getDragList, uploadImage } from './data'
import { getMessageInit, getContentByMsgId, hasRead, removeReaded, restoreTrash, messageCount } from './user'

// 配置Ajax请求延时，可用来测试网络延迟大时项目中一些效果
Mock.setup({
  timeout: 1000
})

// 登录相关和获取用户信息
// Mock.mock(/\/login/, login)
Mock.mock(/\/get_info/, getUserInfo)
Mock.mock(/\/logout/, logout)
Mock.mock(/\/get_table_data/, getTableData)
Mock.mock(/\/get_drag_list/, getDragList)
Mock.mock(/\/save_error_logger/, 'success')
Mock.mock(/\/image\/upload/, uploadImage)
Mock.mock(/\/message\/init/, getMessageInit)
Mock.mock(/\/message\/content/, getContentByMsgId)
Mock.mock(/\/message\/has_read/, hasRead)
Mock.mock(/\/message\/remove_readed/, removeReaded)
Mock.mock(/\/message\/restore/, restoreTrash)
Mock.mock(/\/message\/count/, messageCount)
Mock.mock(/\/getGoodsType/, function(){
  return [
    {"id":"1","name":"黑科技","showStatus":"1","sort":"1"},
    {"id":"2","name":"墨迹","showStatus":"0","sort":"2"},
    {"id":"3","name":"墨水","showStatus":"1","sort":"3"},
    {"id":"4","name":"墨子","showStatus":"1","sort":"4"},
    {"id":"5","name":"魔力","showStatus":"1","sort":"5"}
  ]
})
// Mock.mock(/\/findAllWithoutPage/, function(){
//   return [
//     {"id":"1","labelName":"黑科技","showStatus":"1","sort":"1"},
//     {"id":"2","labelName":"墨迹","showStatus":"0","sort":"2"},
//     {"id":"3","labelName":"墨水","showStatus":"1","sort":"3"},
//     {"id":"4","labelName":"墨子","showStatus":"1","sort":"4"},
//     {"id":"5","labelName":"魔力","showStatus":"1","sort":"5"}
//   ]
// })
export default Mock
