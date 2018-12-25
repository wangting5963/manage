<style lang="less">
  @import './login.less';
</style>

<template>
  <div class="login">
    <div class="login-con">
      <Card icon="log-in" title="欢迎登录" :bordered="false">
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit"></login-form>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import LoginForm from '_c/login-form'
import { mapActions } from 'vuex'
import request from '@/api/request'
import * as util from '@/libs/util'
export default {
  components: {
    LoginForm
  },
  methods: {
    // ...mapActions([
    //   'handleLogin',
    //   'getUserInfo'
    // ]),
    handleSubmit ({ userName, password }) {
      let that = this
      // let formData = new FormData()
      // formData.append("userName",userName)
      // formData.append("pwd",password)
      // request("v1/user/login","post",formData,function(res) {
      //   if (res.status === 200) {
      //     // 保存token到Cookies
      //     util.setToken(res.data.token)
      //     // 跳转到首页
      //     that.$router.push({
      //       name: that.$config.homeName
      //     })
      //   }
      // })

      // 保存token到Cookies
      util.setToken("SUIJIZIFUCHUANDAIBAIOTOKEN")
      // 跳转到首页
      that.$router.push({
        name: that.$config.homeName
      })
    }
  }
}
</script>

<style>

</style>
