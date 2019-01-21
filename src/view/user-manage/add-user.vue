<template>
    <div>
        <Form :v-model="formData" label-position="left" :label-width="100">
            <FormItem label="用户头像">
                <div>
                    <div class="demo-upload-list" v-for="item in userImgUploadList" :key="item.id">
                        <template v-if="item.status === 'finished'">
                            <img :src="item.url">
                            <div class="demo-upload-list-cover">
                                <Icon type="ios-eye-outline" @click.native="handleViewUserImg(item.name)"></Icon>
                                <Icon type="ios-trash-outline" @click.native="handleRemoveUserImg(item)"></Icon>
                            </div>
                        </template>
                        <template v-else>
                            <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                        </template>
                    </div>
                    <Upload
                        ref="uploadUserImg"
                        :show-upload-list="false"
                        :default-file-list="userImgDefaultList"
                        :on-success="handleUserImgSuccess"
                        :format="['jpg','jpeg','png']"
                        :max-size="10240"
                        :on-format-error="handleFormatError"
                        :on-exceeded-size="handleMaxSize"
                        :before-upload="handleUserImgBeforeUpload"
                        multiple
                        type="drag"
                        action="//jsonplaceholder.typicode.com/posts/"
                        style="display: inline-block;width:58px;">
                        <!-- 放置相机图标 -->
                        <div style="width: 58px;height:58px;line-height: 58px;">
                            <Icon type="ios-camera" size="20"></Icon>
                        </div>
                    </Upload>
                    <!-- 图片预览窗口 -->
                    <Modal title="图片预览" v-model="userImgVisible">
                        <img :src="'http://pic43.photophoto.cn/20170506/0470102348231008_b.jpg'" v-if="userImgVisible" style="width: 100%">
                    </Modal>
                </div>
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
export default {
  name: 'add-user',
  data () {
    return {
      // 已有的角色信息
      roleList: [
        { 'roleId': '1', 'roleName': '管理员' },
        { 'roleId': '2', 'roleName': 'WEB工程师' },
        { 'roleId': '3', 'roleName': 'JAVA工程师' },
        { 'roleId': '4', 'roleName': '运维工程师' }
      ],
      // 表单内容
      formData: {
        account: '666sss',
        password: '123456',
        authorImg: 'http://pic43.photophoto.cn/20170506/0470102348231008_b.jpg',
        nickname: '钢铁侠',
        name: '真实姓名',
        sex: '男',
        des: '描述信息',
        role: '管理员'
      },
      // 上传用户头像
      userImgDefaultList: [],
      userImgName: '',
      userImgVisible: false,
      userImgUploadList: []
    }
  },
  methods: {
    /**
         * 预览用户头像
         * @param {String} name 图片名称
         */
    handleViewUserImg (name) {
      this.userImgName = name
      this.userImgVisible = true
    },

    /**
         * 移除用户头像
         * @param {Object} file 要移除的图片
         */
    handleRemoveUserImg (file) {
      const fileList = this.$refs.uploadUserImg.fileList
      this.$refs.uploadUserImg.fileList.splice(fileList.indexOf(file), 1)
    },

    /**
         * 上传用户头像成功回调
         *
         */
    handleUserImgSuccess: function (res, file) {
      console.log('上传用户头像成功')
      // file.url = 'https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar';
      // file.name = '7eb99afb9d5f317c912f08b5212fd69a';
      console.log(res)
      console.log(file)
    },

    /**
         * 上传用户头像之前的回调函数
         */
    handleUserImgBeforeUpload: function () {
      const check = this.userImgUploadList.length < 1
      if (!check) {
        this.$Notice.warning({
          title: '最多上传一张用户头像'
        })
      }
      return check
    },

    /**
         * 上传文件格式错误的回调函数
         */
    handleFormatError (file) {
      this.$Notice.warning({
        title: '文件格式错误',
        desc: '请上传JPG或者PNG格式的图片'
      })
    },

    /**
         * 上传文件过大回调函数
         */
    handleMaxSize (file) {
      this.$Notice.warning({
        title: '文件过大',
        desc: '上传图片大小不能超过10M'
      })
    },

    /**
         * 提交表单
         */
    submitForm: function () {
      console.log('提交表单')
    }
  },
  mounted () {
    // 获取上传的用户头像
    this.userImgUploadList = this.$refs.uploadUserImg.fileList
  }
}
</script>
<style>
</style>
