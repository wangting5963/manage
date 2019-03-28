<template>
  <div>
    <div class="content">
      <div class="basic_info">
        <Form :model="brandInfo" :label-width="80" ref="basic" :rules="ruleValidate">
          <FormItem label="品牌名称" prop="configname">
            <Input v-model="brandInfo.configname" placeholder="品牌名称" class="basic_input"/>
          </FormItem>
          <FormItem label="品牌简称" prop="configcode">
            <Input v-model="brandInfo.configcode" placeholder="品牌简称" class="basic_input"/>
          </FormItem>
          <FormItem label="品牌图片" prop="brandImg">
            <FileUpload ref="brandNode"
                        operate-type="brandImg"
                        :defaultList="defaultBrandImgList"
                        :uploadUrl="uploadUrl"
                        :uploadCount="10"
                        v-on:init-img="initImgInfo"
                        v-on:format-error="formatError"
                        v-on:exceeded-maxSize="exceededMaxSize"
                        v-on:upload-success="uploadSuccess"
                        v-on:upload-fail="uploadFail"
            ></FileUpload>
          </FormItem>

          <FormItem label="品牌馆" prop="showStatus">
            <i-switch v-model="switch1" @on-change="change"></i-switch>
          </FormItem>

          <FormItem label="描述" prop="note">
            <Input v-model="brandInfo.note" type="textarea" placeholder="描述" style="width: 30%" :rows="6"/>
          </FormItem>

        </Form>
      </div>

    </div>
    <!-- 提交或者返回 -->
    <div class="btn_group">
      <Button type="info" class="submit" @click="submitForm">提交</Button>
      <!--<Button type="default" class="back" @click="close">关闭</Button>-->
    </div>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex'
  // 富文本编辑框
  import Editor from 'wangeditor'
  import 'wangeditor/release/wangEditor.min.css'
  // 引入自定义上传组件
  import FileUpload from '@/components/upload/upload'
  import * as util from '@/libs/util'
  import axios from '@/libs/api.request'
  import config from '@/config/index'

  const {baseUrl} = config
  export default {
    name: 'brand_detail',
    components: {
      Editor,
      FileUpload
    },
    data() {
      return {
        switch1: true,
        uploadUrl: baseUrl.upload,
        operateFlag: '',
        brandid: '',
        editorObj: {},
        brandInfo: {
          configtype: 'brand',
          configname: '',
          configcode: '',
          note: "",
          imgArr: "",
          showStatus: 0
        },
        defaultBrandImgList: [],
        ruleValidate: {
          configname: [
            {required: true, type: 'string', message: '品牌名称不能为空', trigger: 'blur'}
          ],
          configcode: [
            {required: true, type: 'string', message: '品牌简称不能为空', trigger: 'blur'}
          ]


        }
      }
    },
    created: function () {
      this.operateFlag = this.$route.params.flag
      this.brandid = this.$route.params.brandid
    },
    mounted: function () {
      if (this.operateFlag === "modify") {
        this.getBraandInfo(this.brandid)
      }
    },
    methods: {
      ...mapMutations([
        'closeTag'
      ]),


      //是否在品牌馆中
      change(status) {
        if (status) {
          this.brandInfo.showStatus = 0;
        } else {
          this.brandInfo.showStatus = 1;
        }
      },

      // **********************上传控件****************************
      /**
       * 上传文件格式错误
       */
      formatError: function (params) {
        this.$Notice.warning({
          title: '图格式必须为(jpeg、jpg、png)中的一种'
        });
      },

      /**
       * 上传文件大小超出限制
       */
      exceededMaxSize: function (params) {
        this.$Notice.warning({
          title: '单个文件不能超过10M'
        });
      },

      /**
       * 上传成功
       */
      uploadSuccess: function (params) {
        let flag = params.operateType
        if (params.response.code === 200) {
          // let url = params.response.data.data
          // if (flag === "brandImg") {
          //
          // } else if (flag === "specification") {
          //   this.specificationImgUrl = url
          // } else if (flag === "share") {
          //   this.shareImgUrl = url
          // }
        } else {
          this.$Notice.error({
            title: '上传失败，请重新上传'
          });
        }
      },

      /**
       * 上传失败
       */
      uploadFail: function (params) {
        this.$Notice.error({
          title: '上传失败，请重新上传'
        });
      },


      /**
       * @description 根据品牌id查询信息
       * @param {number}
       */
      getBraandInfo: function (id) {
        let that = this
        this.request("mapi/config/getConfInfoById.do", "post",null, {id: id}, function (res) {

          console.log(res)

          if (res.data && res.data.code === 200) {
            let info = res.data.data
            that.brandInfo.configname = info.configname;

            console.log(info.configname)

            that.brandInfo.configcode = info.configcode;
            that.brandInfo.note = info.note;

            if (info.imgArr.indexOf(",") !== -1) {
              let urlList = info.imgArr.split(",");
              urlList.forEach(item => {
                that.defaultBrandImgList.push({name: item.substring(item.lastIndexOf("/") + 1), url: item})
              })
            } else {
              that.defaultBrandImgList.push({
                name: info.imgArr.substring(info.imgArr.lastIndexOf("/") + 1),
                url: info.imgArr
              })
            }

            if (info.showStatus === 0) {
              that.switch1 = true;
            } else {
              that.switch1 = false;
            }

          }
        })
      },

      /**
       * 初始化图片数据
       */
      initImgInfo: function (result) {
        let flag = result.operateType
      },

      /**
       * 提交表单
       */
      submitForm: function () {
        let basicStatus = false

        let that = this
        // 验证表单
        this.$refs.basic.validate((valid) => {
          if (valid) {
            basicStatus = true
          }
        })

        if (basicStatus) {

          console.log(999)

          /**
           * 获取已经上传的商品主图（方便用户删除的时候进行清理，自定义的数组basicImgUrlList
           * 当控件删除其中一个图片的时候,虽然控件中是删除了，但是basicImgUrlList没法得知删除的是哪一个，所以没有办法清除
           * 这样就会造成问题：用户在界面上看不到图片了，但是点击提交仍然是有图片的，因为basicImgUrlList中没有清除
           * 所以更改为，直接获取上传控件内部的已上传文件地址进行提交，这样就和控件删除的时候保持一致了
           */
          let brandMain = this.$refs.brandNode.uploadList
          let uploadBoodsImg = []
          brandMain.forEach(item => {
            if (item.url) {
              uploadBoodsImg.push(item.url)
            } else if (item.response) {
              uploadBoodsImg.push(item.response.data.data)
            }
          })
          if (uploadBoodsImg && uploadBoodsImg.length > 0) {
            let reqParam = {
              configtype: "brand",
              configname: this.brandInfo.configname,
              configcode: this.brandInfo.configcode,
              note: this.brandInfo.note,
              imgArr: uploadBoodsImg.toString(),
              showStatus: parseInt(this.brandInfo.showStatus)
            }
            if (this.operateFlag === "modify") {
              reqParam.id = this.brandid;
              this.request("mapi/config/update.do", "post", null,reqParam, function (res) {
                if (res.data && res.data.code === 200) {
                  that.$Notice.success({
                    title: '修改成功'
                  })
                } else {
                  that.$Notice.error({
                    title: '修改失败'
                  })
                }
              })
            } else if (this.operateFlag === "add") {
              this.request("mapi/config/insert.do", "post",null, reqParam, function (res) {
                if (res.data && res.data.code === 200) {
                  that.$Notice.success({
                    title: '添加成功'
                  })
                  // 清空表单
                  that.$refs.basic.resetFields()
                } else {
                  that.$Notice.error({
                    title: '添加失败'
                  })
                }
              })
            }
          } else {
            this.$Notice.error({
              title: '至少上传一张图片'
            });
          }
        }

      },

      // close() {
      //   this.closeTag({
      //     name: 'brand_detail'
      //   })
      // }

    }
  }
</script>

<style scoped>
  /* 内容区高度 */
  .content {
    margin-top: 20px;
    padding-top: 20px;
  }

  /* w-e-text */
  .detail_editor {
    width: 666px;
    margin-left: 20px;
  }

  .w-e-text img {
    width: 50px;
    height: 50px;
  }

  .btn_group {
    margin-top: 20px;
    margin-left: 20px;
  }

  .back {
    margin-left: 10px;
  }

  .preview {
    margin-left: 10px;
  }

  /* 基本信息 */
  .basic_input {
    width: 260px;
  }
</style>

