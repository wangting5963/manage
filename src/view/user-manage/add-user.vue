<template>
    <div>
        <Form :v-model="formData" label-position="left" :label-width="100">
            <FormItem label="用户头像">
               <FileUpload
                    operate-type="userHead"
                    v-on:before-upload="beforeUpload"
                    v-on:format-error="formatError"
                    v-on:exceeded-maxSize="exceededMaxSize"
                    v-on:upload-success="uploadSuccess"
                    v-on:upload-fail="uploadFail"
                ></FileUpload>
            </FormItem>
            <FormItem label="角色">
                <Select v-model="formData.role"  style="width:260px">
                    <Option v-for="roleInfo in roleList" :key="roleInfo.roleId" :value="roleInfo.roleName">{{ roleInfo.roleName }}</Option>
                </Select>
            </FormItem>
             <FormItem label="账号">
                <Input clearable v-model="formData.account" style="width:260px;" placeholder="输入账号"/>
            </FormItem>
             <FormItem label="密码">
                <Input clearable v-model="formData.password" style="width:260px;" placeholder="输入密码"/>
            </FormItem>
             <FormItem label="昵称">
                <Input clearable v-model="formData.nickname" style="width:260px;" placeholder="输入昵称"/>
            </FormItem>
            <FormItem label="描述">
                <Input type="textarea" clearable v-model="formData.des" style="width:260px;" placeholder="输入描述信息"/>
            </FormItem>
            <FormItem label="姓名">
                <Input clearable v-model="formData.name" style="width:260px;" placeholder="输入真实姓名"/>
            </FormItem>
            <FormItem label="性别">
                <RadioGroup v-model="formData.sex">
                    <Radio label="男"></Radio>
                    <Radio label="女" style="margin-left:5px;"></Radio>
                </RadioGroup>
            </FormItem>
            <FormItem>
                <Button type="info" @click="submitForm">提交</Button>
            </FormItem>
        </Form>
    </div>
</template>
<script>
// 引入自定义上传组件
import FileUpload from '@/components/upload/upload'
export default {
  name: 'add-user',
  data () {
    return {
      // 已有的角色信息
      roleList: [
        { roleId: '1', roleName: '管理员' },
        { roleId: '2', roleName: 'WEB工程师' },
        { roleId: '3', roleName: 'JAVA工程师' },
        { roleId: '4', roleName: '运维工程师' }
      ],
      // 表单内容
      formData: {
        // account: "",
        // password: "123456",
        // authorImg: "http://pic43.photophoto.cn/20170506/0470102348231008_b.jpg",
        // nickname: "钢铁侠",
        // name: "真实姓名",
        // sex: "男",
        // des: "描述信息",
        // role: "管理员"
      },
      // 用户id
      userId: ''
    }
  },
  components: {
    FileUpload
  },
  methods: {
    /**
     * 获取用户详情
     */
    getUserDetail: function () {
      let that = this
      this.request('mapi/user/getUserById.do', 'post',null, { 'id': this.userId }, function (res) {
        console.log(res)
        that.formData.account = res.data.data.username,
        that.formData.role = res.data.data.roles,
        that.formData.nickname = res.data.data.likename
        // console.log(that.formData)
        that.$set(that.formData, that.formData)
      })
    },
    // **********************上传控件****************************
    /**
     * 上传之前处理
     */
    beforeUpload: function (params) {
      console.log('----------上传之前触发--------')
      console.log(params)
    },

    /**
     * 上传文件格式错误
     */
    formatError: function (params) {
      console.log('----------上传格式错误--------')
      console.log(params)
    },

    /**
     * 上传文件大小超出限制
     */
    exceededMaxSize: function (params) {
      console.log('----------上传文件超出限制--------')
      console.log(params)
    },

    /**
     * 上传成功
     */
    uploadSuccess: function (params) {
      console.log('----------上传成功--------')
      console.log(params)
    },

    /**
     * 上传失败
     */
    uploadFail: function (params) {
      console.log('----------上传失败--------')
      console.log(params)
    },

    /**
     * 提交表单
     */
    submitForm: function () {
      console.log('-------提交----------')
    }
  },
  mounted () {
    // 获取请求参数
    this.userId = this.$route.params.userId
    alert(this.userId)
    this.getUserDetail()
  }



}
</script>
<style>
</style>
