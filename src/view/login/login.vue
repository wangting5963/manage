<style lang="less">
@import "./login.less";
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
  data(){
    return {
      SIX_DAY_MILLISECOND : 518400000
    }
  },
  components: {
    LoginForm
  },
  methods: {
    ...mapActions([
      'handleLogin',
      'getUserInfo'
    ]),

    /**
     * @description 每间隔一段时间更新一次token
     */
    startSyncTokenTask(userName, password){
      let that = this
      winodw.setTimeout(()=>{
        request("auth/login.do","post",null,{"username":userName,"password":password},res=>{
          if (res.data && res.data.code === 200) {
            let token = res.data.data
            if (token && token !== '') {
              setToken(token.split(' ')[1])
            }
          }
        })
      },that.dataSIX_DAY_MILLISECOND)
    },

    /**
     * 处理登录
     */
    handleSubmit ({ userName, password }) {
      this.handleLogin({ userName, password }).then(res => {
        this.getUserInfo().then(res => {
          this.$router.push({
            name: this.$config.homeName
          })
        })
      })
    }
  }
}
</script>

<style>
</style>
