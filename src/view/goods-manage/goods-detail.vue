<template>
  <div>
    <!-- 顶部导航 -->
    <Menu mode="horizontal" theme="light" active-name="1" @on-select="selectItem">
      <div class="layout-nav">
        <MenuItem name="1">
          基本信息
        </MenuItem>
        <MenuItem name="2">
          商品规格
        </MenuItem>
        <MenuItem name="3">
          商品详情
        </MenuItem>
        <MenuItem name="4">
          分享描述
        </MenuItem>
      </div>
    </Menu>
    <!-- 内容区域 -->
    <div class="content">
      <div class="basic_info" v-show="'1'===selectTab">
        <Form :model="basicInfo" :label-width="80" ref="basic" :rules="ruleValidate">
          <FormItem label="商品名称" prop="goodsName">
            <Input v-model="basicInfo.goodsName" placeholder="商品名称" class="basic_input"/>
          </FormItem>
          <FormItem label="商品主图" prop="goodsImg">
            <FileUpload ref="goodsNode"
                        operate-type="goodsImg"
                        :defaultList="defaultGoodsImgList"
                        :uploadUrl="uploadUrl"
                        :uploadCount="10"
                        v-on:init-img="initImgInfo"
                        v-on:format-error="formatError"
                        v-on:exceeded-maxSize="exceededMaxSize"
                        v-on:upload-success="uploadSuccess"
                        v-on:upload-fail="uploadFail"
            ></FileUpload>
          </FormItem>
          <FormItem label="商品分类" prop="childrenType">
            <Select v-model="basicInfo.parentType" class="basic_input" style="width:120px;"
                    @on-change="selectParentType">
              <Option :value="typeItem.id + '-' + typeItem.typename" v-for="typeItem in parentType" :key="typeItem.id">
                {{ typeItem.typename }}
              </Option>
            </Select>
            <Select v-model="basicInfo.childrenType" class="basic_input" style="width:120px; margin-left:10px;">
              <Option :value="typeItem.id + '-' + typeItem.typename" v-for="typeItem in childrenType"
                      :key="typeItem.id">{{ typeItem.typename }}
              </Option>
            </Select>
          </FormItem>
          <FormItem label="商品标签" prop="goodsLabel">
            <CheckboxGroup v-model="basicInfo.goodsLabel">
              <Checkbox v-for="label in labelList" :key="label.id" :label="label.id + '-' + label.labelName">
                {{ label.labelName }}
              </Checkbox>
            </CheckboxGroup>
          </FormItem>

          <FormItem label="所在项目" prop="sysConfig">
            <Select v-model="basicInfo.sysConfig" class="basic_input" style="width:120px;">
              <Option :value="configItem.configcode" v-for="configItem in sysConfig" :key="configItem.id">
                {{ configItem.configname }}
              </Option>
            </Select>
          </FormItem>

          <FormItem label="ERP Sku" prop="erpsku">
            <Input v-model="basicInfo.erpsku" placeholder="ERP系统中的商品编号" class="basic_input"/>
          </FormItem>

          <FormItem label="产品描述" prop="remark">
            <Input v-model="basicInfo.remark" type="textarea" placeholder="产品描述"/>
          </FormItem>

        </Form>
      </div>
      <div class="specification" v-show="'2'===selectTab">
        <Form :model="specificationInfo" :label-width="80" ref="specification" :rules="ruleValidate">
          <FormItem label="规格项" prop="sItems">
            <Input v-model="specificationInfo.sItems" placeholder="规格项" class="basic_input"/>
          </FormItem>
          <FormItem label="规格图片" prop="specificationImg" v-model="specificationImgUrl">
            <FileUpload ref="speNode"
                        operate-type="specification"
                        :defaultList="defaultSpeImgList"
                        :uploadUrl="uploadUrl"
                        v-on:init-img="initImgInfo"
                        v-on:format-error="formatError"
                        v-on:exceeded-maxSize="exceededMaxSize"
                        v-on:upload-success="uploadSuccess"
                        v-on:upload-fail="uploadFail"
            ></FileUpload>
          </FormItem>
          <FormItem label="划线价" prop="linePrice">
            <Input v-model="specificationInfo.linePrice" placeholder="划线价" class="basic_input"/>
          </FormItem>
          <FormItem label="销售价" prop="salePrice">
            <Input v-model="specificationInfo.salePrice" placeholder="销售价" class="basic_input"/>
          </FormItem>
          <FormItem label="成本价" prop="costprice">
            <Input v-model="specificationInfo.costprice" placeholder="成本价" class="basic_input"/>
          </FormItem>
          <FormItem label="库存" prop="inventory">
            <Input v-model="specificationInfo.inventory" placeholder="库存" class="basic_input"/>
          </FormItem>
          <FormItem label="商品型号" prop="model">
            <Input v-model="specificationInfo.model" placeholder="商品型号" class="basic_input"/>
          </FormItem>
        </Form>
      </div>
      <div class="detail_info" v-show="'3'===selectTab">
        <div id="editor" class="detail_editor"></div>
      </div>
      <div class="share_info" v-show="'4'===selectTab">
        <Form :model="shareInfo" :label-width="80" ref="share" :rules="ruleValidate">
          <FormItem label="分享标题" prop="shareTitle">
            <Input v-model="shareInfo.shareTitle" placeholder="分享标题" class="basic_input"/>
          </FormItem>
          <FormItem label="分享描述" prop="shareDesc">
            <Input v-model="shareInfo.shareDesc" placeholder="分享描述" class="basic_input"/>
          </FormItem>
          <FormItem label="分享图片" prop="shareImg" v-model="shareImgUrl">
            <!-- 使用自定义上传组件 -->
            <FileUpload ref="shareNode"
                        operate-type="share"
                        :defaultList="defaultShareImgList"
                        :uploadUrl="uploadUrl"
                        v-on:init-img="initImgInfo"
                        v-on:format-error="formatError"
                        v-on:exceeded-maxSize="exceededMaxSize"
                        v-on:upload-success="uploadSuccess"
                        v-on:upload-fail="uploadFail"
            ></FileUpload>
          </FormItem>
        </Form>
      </div>
    </div>
    <!-- 提交或者返回 -->
    <div class="btn_group">
      <Button type="info" class="submit" @click="submitForm">提交</Button>
      <Button type="info" class="back" @click="goodsRelease">发布上架</Button>
      <Button type="info" class="preview" v-show="'3'===selectTab">预览</Button>
    </div>
  </div>
</template>

<script>
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
    name: 'goods_detail',
    components: {
      Editor,
      FileUpload
    },
    data() {
      return {
        uploadUrl: baseUrl.upload,
        operateFlag: '',
        goodsId: '',
        editorObj: {},
        selectTab: '1',
        basicInfo: {
          goodsName: '',
          parentType: '',
          childrenType: '',
          goodsLabel: [],
          sysConfig: "",
          remark: "",
          erpsku: ""
        },
        specificationInfo: {
          sItems: '',
          linePrice: '',
          salePrice: '',
          costprice: '',
          inventory: '',
          model: ''
        },
        shareInfo: {
          shareTitle: '',
          shareDesc: ''
        },
        sysConfig: [],
        labelList: [],
        parentType: [],
        childrenType: [],
        defaultGoodsImgList: [],
        specificationImgUrl: "",
        defaultSpeImgList: [],
        shareImgUrl: "",
        defaultShareImgList: [],
        ruleValidate: {
          goodsName: [
            {required: true, type: 'string', message: '商品名称不能为空', trigger: 'blur'}
          ],
          parentType: [
            {required: true, type: 'string', message: '请选择一级分类', trigger: 'change'}
          ],
          childrenType: [
            {required: true, type: 'string', message: '请选择二级分类', trigger: 'change'}
          ],
          goodsLabel: [
            {required: true, type: 'array', min: 1, message: '至少选择一个标签', trigger: 'change'}
          ],
          sItems: [
            {required: true, type: 'string', message: '请输入规格项', trigger: 'blur'}
          ],
          linePrice: [
            {required: true, type: 'string', message: '划线价不能为空', trigger: 'blur'}
          ],
          salePrice: [
            {required: true, type: 'string', message: '销售价不能为空', trigger: 'blur'}
          ],
          costprice: [
            {required: true, type: 'string', message: '成本价不能为空', trigger: 'blur'}
          ],
          inventory: [
            {required: true, type: 'string', message: '库存不能为空', trigger: 'blur'}
          ],
          model: [
            {required: true, type: 'string', message: '型号不能为空', trigger: 'blur'}
          ],
          shareTitle: [
            {required: true, type: 'string', message: '分享标题不能为空', trigger: 'blur'}
          ],
          shareDesc: [
            {required: true, type: 'string', message: '分享描述不能为空', trigger: 'blur'}
          ],
          sysConfig: [
            {required: true, type: 'string', message: '商品所在项目不能为空', trigger: 'blur'}
          ],
          erpsku: [
            {required: true, type: 'string', message: 'ERP关联商品编号不能为空', trigger: 'blur'}
          ]
        }
      }
    },
    created: function () {
      this.operateFlag = this.$route.params.flag
      this.goodsId = this.$route.params.goodsId
    },
    mounted: function () {
      this.initEditor()
      this.getAllLabel()
      this.getChildrenType(0)
      if (this.operateFlag === "modify") {
        this.getGoodsInfo(this.goodsId)
      }

      this.getSysConfig();
    },
    methods: {

      /**
       * 选中的tab
       */
      selectItem: function (name) {
        this.selectTab = name
      },

      // **********************文本编辑框****************************
      initEditor: function () {
        let that = this
        // 初始化富文本编辑器
        var editor = new Editor('#editor')

        // 添加请求头，进行身份认证
        editor.customConfig.uploadImgHeaders = {
          'Authorization': 'Bearer ' + util.getToken()
        }
        editor.customConfig.customUploadImg = function (files, insert) {
          let formData = new FormData()
          formData.append("file", files[0])
          axios.request({
            url: "mapi/upload.do",
            method: "post",
            data: formData,
            responseEncoding: 'utf-8'
          }).then(function (res) {
            if (res.data && res.data.code === 200) {
              insert(res.data.data.data)
            }
          })
        }
        editor.create()
        this.editorObj = editor
      },

      /**
       * 获取商品所在项目的集合信息
       */
      getSysConfig: function () {
        let that = this;
        this.request("mapi/config/findAllConfigs.do", "post", {"configtype": "goodsType"}, function (res) {
          if (res.data && res.data.code === 200) {
            that.sysConfig = res.data.data;
          } else {
            console.error(res.data);
          }
        })
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
          let url = params.response.data.data
          if (flag === "goodsImg") {
          } else if (flag === "specification") {
            this.specificationImgUrl = url
          } else if (flag === "share") {
            this.shareImgUrl = url
          }
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
       * @description 根据商品id查询商品信息
       * @param {number}
       */
      getGoodsInfo: function (id) {
        let that = this
        this.request("mapi/item/select.do", "post", {id: id}, function (res) {
          if (res.data && res.data.code === 200) {
            let info = res.data.data
            that.basicInfo.goodsName = info.goodsname
            that.basicInfo.remark = info.remark;

            that.basicInfo.erpsku = info.sku_number;

            that.basicInfo.sysConfig = info.fk_configCode
            that.basicInfo.parentType = info.parentname
            that.basicInfo.parentType = info.supertype + "-" + info.parentname
            that.getChildrenType(info.supertype)
            that.basicInfo.childrenType = info.goodstype + "-" + info.typename
            // if (typeof info.goodslabel === "number") {
            //   that.basicInfo.goodsLabel = [info.goodslabel + "-" + info.labelname]
            // } else if (typeof info.goodslabel === "array") {
            //   info.goodslabel.forEach((item, index) => {
            //     that.basicInfo.goodsLabel.push([item + "-" + info.labelname[index]])
            //   })
            // }

            info.goodslabel.split(",").forEach((item, index) => {
              that.basicInfo.goodsLabel.push(item + "-" + info.labelname.split(",")[index])
            });

            that.specificationInfo.sItems = info.specificationitem
            that.specificationInfo.linePrice = info.lineprice.toString()
            that.specificationInfo.salePrice = info.marketprice.toString()
            that.specificationInfo.costprice = info.costprice.toString()
            that.specificationInfo.inventory = info.store.toString()
            that.specificationInfo.model = info.model.toString()
            that.shareInfo.shareTitle = info.sharetitle
            that.shareInfo.shareDesc = info.shareinfo
            that.editorObj.txt.html(info.detail)
            that.specificationImgUrl = info.specification
            that.shareImgUrl = info.shareimg
            that.defaultSpeImgList.push({
              name: info.specification.substring(info.specification.lastIndexOf("/") + 1),
              url: info.specification
            })
            that.defaultShareImgList.push({
              name: info.shareimg.substring(info.shareimg.lastIndexOf("/") + 1),
              url: info.shareimg
            })
            if (info.goodsimgarr.indexOf(",") !== -1) {
              let urlList = info.goodsimgarr.split(",")
              urlList.forEach(item => {
                that.defaultGoodsImgList.push({name: item.substring(item.lastIndexOf("/") + 1), url: item})
              })
            } else {
              that.defaultGoodsImgList.push({
                name: info.goodsimgarr.substring(info.goodsimgarr.lastIndexOf("/") + 1),
                url: info.goodsimgarr
              })
            }
          }
        })
      },

      /**
       * 查询所有商品标签
       */
      getAllLabel: function (page, pageSize) {
        let that = this
        this.request("/mapi/itemLabel/findAllWithoutPage.do", "get", null, function (res) {
          if (res.data && res.data.code === 200) {
            let info = res.data.data
            if (info.length > 0) {
              that.labelList = info
            }
          }
        })
      },

      /**
       * 根据父分类id查询子分类
       */
      getChildrenType: function (parentType) {
        let that = this
        that.childrenType = []
        this.request("/mapi/itemcat/query.do", "post", {superType: parentType}, function (res) {
          let result = res.data
          if (result && result.code === 200) {
            if (result.data && result.data.length) {
              if (parentType === 0) {
                that.parentType = result.data
              } else {
                that.childrenType = result.data
              }
            }
          }
        })
      },

      selectParentType: function () {
        this.getChildrenType(this.basicInfo.parentType.split("-")[0])
      },

      /**
       * 初始化图片数据
       */
      initImgInfo: function (result) {
        let flag = result.operateType
        if (flag === "goodsImg") {

        } else if (flag === "specification") {
          this.specificationImgUrl = ""
        } else if (flag === "share") {
          this.shareImgUrl = ""
        }
      },

      /**
       * 商品上架
       */
      goodsRelease: function () {
        let that = this;
        if (this.operateFlag === "modify") {
          this.request("mapi/item/reshelf.do", "post", {"id": this.goodsId}, function (res) {
            if (res.data && res.data.code === 200) {
              that.$Notice.success({
                title: '发布上架成功'
              })
            } else {
              that.$Notice.error({
                title: '发布上架失败'
              })
            }
          })
        } else {
          that.$Notice.error({
            title: '当前状态无法上架发布'
          })
        }
      },

      /**
       * 提交表单
       */
      submitForm: function () {
        let basicStatus = false
        let specificationStatus = false
        let shareStatus = false
        let that = this
        // 验证表单
        this.$refs.basic.validate((valid) => {
          if (valid) {
            basicStatus = true
          }
        })
        this.$refs.specification.validate((valid) => {
          if (valid) {
            specificationStatus = true
          }
        })
        this.$refs.share.validate((valid) => {
          if (valid) {
            shareStatus = true
          }
        })
        if (basicStatus && specificationStatus && shareStatus) {
          // 分离标签id和标签名称
          let checkedLabel = this.basicInfo.goodsLabel
          let labelIdList = []
          let labelNameList = []
          checkedLabel.forEach(item => {
            labelIdList.push(item.split("-")[0])
            labelNameList.push(item.split("-")[1])
          })
          /**
           * 获取已经上传的商品主图（方便用户删除的时候进行清理，自定义的数组basicImgUrlList
           * 当控件删除其中一个图片的时候,虽然控件中是删除了，但是basicImgUrlList没法得知删除的是哪一个，所以没有办法清除
           * 这样就会造成问题：用户在界面上看不到图片了，但是点击提交仍然是有图片的，因为basicImgUrlList中没有清除
           * 所以更改为，直接获取上传控件内部的已上传文件地址进行提交，这样就和控件删除的时候保持一致了
           */
          let goodsMain = this.$refs.goodsNode.uploadList
          let uploadGoodsImg = []
          goodsMain.forEach(item => {
            if (item.url) {
              uploadGoodsImg.push(item.url)
            } else if (item.response) {
              uploadGoodsImg.push(item.response.data.data)
            }
          })
          if (uploadGoodsImg && uploadGoodsImg.length > 0) {
            if (this.specificationImgUrl && this.specificationImgUrl !== "") {
              if (this.shareImgUrl && this.shareImgUrl !== "") {
                if (this.editorObj.txt.html() && this.editorObj.txt.html() !== "") {
                  let reqParam = {
                    goodsname: this.basicInfo.goodsName,
                    sku_number: this.basicInfo.erpsku,
                    remark: this.basicInfo.remark,
                    goodsimgarr: uploadGoodsImg.toString(),
                    goodstype: this.basicInfo.childrenType.split("-")[0],
                    typename: this.basicInfo.childrenType.split("-")[1],
                    supertype: this.basicInfo.parentType.split("-")[0],
                    parentname: this.basicInfo.parentType.split("-")[1],
                    goodslabel: labelIdList.toString(),
                    labelname: labelNameList.toString(),
                    specificationitem: this.specificationInfo.sItems,
                    specification: this.specificationImgUrl,
                    lineprice: this.specificationInfo.linePrice,
                    marketprice: this.specificationInfo.salePrice,
                    costprice: this.specificationInfo.costprice,
                    store: this.specificationInfo.inventory,
                    model: this.specificationInfo.model,
                    sharetitle: this.shareInfo.shareTitle,
                    shareinfo: this.shareInfo.shareDesc,
                    shareimg: this.shareImgUrl,
                    barcode: "",
                    detail: this.editorObj.txt.html(),
                    fk_configCode: this.basicInfo.sysConfig
                  }
                  if (this.operateFlag === "modify") {
                    reqParam.id = this.goodsId
                    this.request("mapi/item/updateSelective.do", "post", reqParam, function (res) {
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
                    this.request("mapi/item/insert.do", "post", reqParam, function (res) {
                      if (res.data && res.data.code === 200) {
                        that.$Notice.success({
                          title: '添加成功'
                        })
                        // 清空表单
                        that.$refs.basic.resetFields()
                        that.$refs.specification.resetFields()
                        that.$refs.share.resetFields()
                        // 清空图片
                        that.specificationImgUrl = ""
                        that.shareImgUrl = ""
                        that.$refs.goodsNode.refreshFileList()
                        that.$refs.shareNode.refreshFileList()
                        that.$refs.speNode.refreshFileList()
                        // 清空富文本
                        that.editorObj.txt.html("<p></p>")
                      } else {
                        that.$Notice.error({
                          title: '添加失败'
                        })
                      }
                    })
                  }
                } else {
                  this.$Notice.error({
                    title: '请编辑商品详情'
                  });
                }
              } else {
                this.$Notice.error({
                  title: '请上传分享图'
                });
              }
            } else {
              this.$Notice.error({
                title: '请上传规格图'
              });
            }
          } else {
            this.$Notice.error({
              title: '至少上传一张商品主图'
            });
          }
        }
      }
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

