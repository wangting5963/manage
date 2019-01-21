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
import * as util from '@/libs/util'
export default {
  components: {
    LoginForm
  },
  methods: {
    // 处理store中的状态
    // ...mapActions([
    //   'handleLogin',
    //   'getUserInfo'
    // ]),
    handleSubmit ({ userName, password }) {
      let that = this
      this.request("/auth/login","get",{"username":userName,"password":password},function(res) {
        if (res.data && res.data.code === 200) {
          let token = res.data.data
          if(token && token !== ""){
            // 保存token到Cookies
            util.setToken(token.split(" ")[1])
            // 跳转到首页
            that.$router.push({
              name: that.$config.homeName
            })
          }
        }
      })
    }
  }
}
</script>

<style>

</style>
