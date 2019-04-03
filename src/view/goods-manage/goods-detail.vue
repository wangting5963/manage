<template>
  <div>
    <!-- 顶部导航 -->
    <Menu mode="horizontal" theme="light" active-name="1" @on-select="selectItem">
      <div class="layout-nav">
        <MenuItem name="1">
          基本信息
        </MenuItem>
        <MenuItem name="5">
          规格型号
        </MenuItem>
        <MenuItem name="3">
          商品详情
        </MenuItem>
        <MenuItem name="4">
          分享描述
        </MenuItem>
        <!--<MenuItem name="2">-->
        <!--商品规格(已舍弃)-->
        <!--</MenuItem>-->
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
            <FileUpload :selectMore="selectMore"
                        ref="goodsNode"
                        operate-type="goodsImg"
                        :isMutiple= "ismutiple" 
                        :defaultList="defaultGoodsImgList"
                        :uploadUrl="uploadUrl"
                        :uploadCount="10"
                        v-on:init-img="initImgInfo"
                        v-on:format-error="formatError"
                        v-on:exceeded-maxSize="exceededMaxSize"
                        v-on:upload-success="uploadSuccess"
                        v-on:upload-fail="uploadFail"></FileUpload>
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
          <FormItem label="商品品牌" prop="brand">
            <Select v-model="basicInfo.brand" class="basic_input" style="width:120px;">
              <Option :value="configItem.configcode" v-for="configItem in brand" :key="configItem.id">
                {{ configItem.configname }}
              </Option>
            </Select>
          </FormItem>

          <FormItem label="ERP ItemCode" prop="erpsku">
            <Input v-model="basicInfo.erpsku" placeholder="ERP系统中的商品编号" class="basic_input"/>
          </FormItem>

          <FormItem label="产品描述" prop="remark">
            <Input v-model="basicInfo.remark" type="textarea" placeholder="产品描述"/>
          </FormItem>

        </Form>
      </div>


      <div class="detail_info" v-show="'5'===selectTab">


        <div class="parent" style="margin-top: 1rem">
          <Row>
            <Col span="2">图片</Col>
            <Col span="2">颜色</Col>
            <Col span="2">规格</Col>
            <Col span="2">成本价</Col>
            <Col span="2">划线价</Col>
            <Col span="2">销售价</Col>
            <Col span="2">到手价</Col>
            <Col span="2">积分系数</Col>
            <Col span="2">所需积分</Col>
            <Col span="2">库存</Col>
            <Col span="2">ERP SKU编号</Col>
          </Row>

          <Row>
            <Col span="2">
              <FileUpload ref="guige"
                          operate-type="guigeImg"
                          :defaultList="defaultGuigeImgList"
                          :uploadUrl="uploadUrl"
                          v-on:init-img="initImgInfo"
                          v-on:format-error="formatError"
                          v-on:exceeded-maxSize="exceededMaxSize"
                          v-on:upload-success="uploadSuccess"
                          v-on:upload-fail="uploadFail">
              </FileUpload>
            </Col>
            <Col span="2"><Input v-model="guigeItem.color" placeholder="颜色"/>
            </Col>
            <Col span="2"><Input v-model="guigeItem.model" placeholder="规格"/>
            </Col>
            <Col span="2"><Input v-model="guigeItem.costPrice" placeholder="成本价"/>
            </Col>
            <Col span="2"><Input v-model="guigeItem.linePrice" placeholder="划线价"/>
            </Col>
            <Col span="2"><Input v-model="guigeItem.marketPrice" placeholder="销售价" @on-change="setScore"/>
            </Col>
            <Col span="2"><Input v-model="guigeItem.arrivalPrice" placeholder="到手价" @on-change="setScore"/>
            </Col>
            <Col span="2"><Input value="10" placeholder="积分系数" readonly/>
            </Col>
            <Col span="2"><Input v-model="guigeItem.score" placeholder="所需积分" readonly/>
            </Col>
            <Col span="2">
              <InputNumber v-model="guigeItem.store" :min="0" style="width: 100%"/>
            </Col>
            <Col span="2"><Input v-model="guigeItem.sku_number" placeholder="ERP SKU编号"/>
            </Col>
            <Col span="2" style="text-align: center">
              <Button type="info" @click="guigeSave">保存</Button>
            </Col>

          </Row>
        </div>


        <Table style="margin-top:20px;" border :columns="columns" :data="guigeList"></Table>

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

          <FormItem label="成本价" prop="costprice">
            <Input v-model="specificationInfo.costprice" placeholder="成本价" class="basic_input"/>
          </FormItem>

          <FormItem label="销售价" prop="salePrice">
            <Input v-model="specificationInfo.salePrice" placeholder="销售价" class="basic_input" @on-change="setScore"/>
          </FormItem>

          <FormItem label="到手价" prop="arrivalPrice">
            <Input v-model="specificationInfo.arrivalPrice" placeholder="到手价" class="basic_input"
                   @on-change="setScore"/>
          </FormItem>

          <FormItem label="积分系数">
            <Input class="basic_input" value="10" readonly/>
          </FormItem>

          <FormItem label="所需积分">
            <Input v-model="specificationInfo.score" placeholder="所需积分" class="basic_input" readonly/>
          </FormItem>

          <FormItem label="库存" prop="inventory">
            <Input v-model="specificationInfo.inventory" placeholder="库存" class="basic_input"/>
          </FormItem>
          <FormItem label="商品型号" prop="model">
            <Input v-model="specificationInfo.model" placeholder="商品型号" class="basic_input"/>
          </FormItem>
        </Form>
      </div>
    </div>

    <!-- 提交或者返回 -->
    <div class="btn_group">
      <Button type="info" class="submit" @click="submitForm">提交</Button>
      <Button type="info" class="back" @click="goodsRelease" :disabled="btndis">发布上架</Button>
      <!--<Button type="info" class="preview" v-show="'3'===selectTab">预览</Button>-->
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
    props: {
      loadFlag: false
    },
    data() {
      return {
        guigeFlag: 'add',
        guigeItem: {
          // id: 0,
          imgArr: "",
          color: '',
          model: '',
          costPrice: '',
          linePrice: '',
          marketPrice: '',
          arrivalPrice: '',
          score: '',
          store: 1,
          sku_number: ''
        },
        columns: [
          {type: "index", width: 50, align: "center"},
          {
            title: "图片", width: 100,
            render: (h, params) => {

              return h('div', [
                h('img', {
                  attrs: {
                    src: params.row.imgArr
                  },
                  style: {
                    width: '40px',
                    height: '40px'
                  }
                }),

              ]);

            }
          },
          {title: "颜色", key: "color"},
          {title: "规格", key: "model"},
          {title: "规格编号", key: "paramNo"},
          {title: "成本价", key: "costPrice"},
          {title: "划线价", key: "linePrice"},
          {title: "销售价", key: "marketPrice"},
          {title: "到手价", key: "arrivalPrice"},
          {title: "积分", key: "score"},
          {title: "库存", key: "store"},
          {title: "SKU编号", key: "sku_number"},
          {
            title: "操作",
            render: (h, params) => {
              return h("div", [
                h("div", {style: {marginTop: "2px", marginBottom: "2px"}}, [
                  h(
                    "Button",
                    {
                      props: {
                        type: "info",
                        size: "small"
                      },
                      on: {
                        click: () => {
                          this.updateGuiGe(params.row);
                        }
                      }
                    },
                    "编辑"
                  ),
                  h(
                    "Button",
                    {
                      props: {
                        type: "error",
                        size: "small"
                      },
                      style: {
                        marginLeft: "10px"
                      },
                      on: {
                        click: () => {
                          this.$Modal.confirm({
                            title: "删除规格信息",
                            content: "是否删除该规格信息？",
                            onOk: () => {
                              this.removeItem(params);
                            }
                          });
                        }
                      }
                    },
                    "删除"
                  )
                ])
              ]);
            }
          }
        ],
        // 表格数据
        guigeList: [],
        defaultGuigeImgList: [],
        btndis: true,
        selectMore: true,
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
          brand: "",
          remark: "",
          erpsku: ""
        },
        specificationInfo: {
          sItems: '',
          linePrice: '',
          salePrice: '',
          costprice: '',
          inventory: '',
          model: '',
          arrivalPrice: '', //到手价
          score: ''//积分
        },
        shareInfo: {
          shareTitle: '',
          shareDesc: ''
        },
        sysConfig: [],
        brand: [],
        labelList: [],
        parentType: [],
        childrenType: [],
        defaultGoodsImgList: [],
        specificationImgUrl: "",
        defaultSpeImgList: [],
        shareImgUrl: "",
        guigeImgUrl: "",

        defaultShareImgList: [],
        ruleValidate: {
          goodsName: [
            {required: true, type: 'string', message: '商品名称不能为空', trigger: 'blur'}
          ],
          // parentType: [
          //   {required: true, type: 'string', message: '请选择一级分类', trigger: 'blur'}
          // ],
          childrenType: [
            {required: true, type: 'string', message: '请选择分类', trigger: 'blur'}
          ],
          goodsLabel: [
            {required: true, type: 'array', min: 1, message: '至少选择一个标签', trigger: 'change'}
          ],
          // sItems: [
          //   {required: true, type: 'string', message: '请输入规格项', trigger: 'blur'}
          // ],
          // linePrice: [
          //   {required: true, type: 'string', message: '划线价不能为空', trigger: 'blur'}
          // ],
          // salePrice: [
          //   {required: true, type: 'string', message: '销售价不能为空', trigger: 'blur'}
          // ],
          // arrivalPrice: [
          //   {required: true, type: 'string', message: '到手价不能为空', trigger: 'blur'}
          // ],
          // costprice: [
          //   {required: true, type: 'string', message: '成本价不能为空', trigger: 'blur'}
          // ],
          // inventory: [
          //   {required: true, type: 'string', message: '库存不能为空', trigger: 'blur'}
          // ],
          // model: [
          //   {required: true, type: 'string', message: '型号不能为空', trigger: 'blur'}
          // ],
          shareTitle: [
            {required: true, type: 'string', message: '分享标题不能为空', trigger: 'blur'}
          ],
          shareDesc: [
            {required: true, type: 'string', message: '分享描述不能为空', trigger: 'blur'}
          ],
          sysConfig: [
            {required: true, type: 'string', message: '商品所在项目不能为空', trigger: 'blur'}
          ],
          brand: [
            {required: true, type: 'string', message: '商品品牌不能为空', trigger: 'blur'}
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
        this.btndis = false;
      }

      this.getSysConfig();
      this.getBrand();
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
            responseEncoding: 'utf-8',
            headers: {'Content-Type': "application/json;charset=utf-8"}
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
        this.request("mapi/config/findAllConfigs.do", "post", null, {"configtype": "goodsType"}, function (res) {
          if (res.data && res.data.code === 200) {
            that.sysConfig = res.data.data;
          } else {
            console.error(res.data);
          }
        })
      },

      getBrand: function () {
        let that = this;
        this.request("mapi/config/findAllConfigs.do", "post", null, {"configtype": "brand"}, function (res) {
          if (res.data && res.data.code === 200) {
            that.brand = res.data.data;
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
          } else if (flag === "guigeImg") {
            this.guigeImgUrl = url
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

        this.request("mapi/item/select.do", "post", null, {id: id}, function (res) {
          if (res.data && res.data.code === 200) {
            let info = res.data.data
            that.basicInfo.goodsName = info.goodsname
            that.basicInfo.remark = info.remark;

            that.basicInfo.erpsku = info.sku_number;

            that.basicInfo.sysConfig = info.fk_configCode;

            that.basicInfo.brand = info.brand;

            that.basicInfo.parentType = info.parentname
            that.basicInfo.parentType = info.supertype + "-" + info.parentname
            that.getChildrenType(info.supertype)
            that.basicInfo.childrenType = info.goodstype + "-" + info.typename


            info.goodslabel.split(",").forEach((item, index) => {
              that.basicInfo.goodsLabel.push(item + "-" + info.labelname.split(",")[index])
            });

            that.shareInfo.shareTitle = info.sharetitle
            that.shareInfo.shareDesc = info.shareinfo
            that.editorObj.txt.html(info.detail)
            that.specificationImgUrl = info.specification
            that.shareImgUrl = info.shareimg


            if (info.specification !== undefined && info.specification !== null && info.specification !== "") {
              that.defaultSpeImgList.push({
                name: info.specification.substring(info.specification.lastIndexOf("/") + 1),
                url: info.specification
              })
            }

            if (info.shareimg !== undefined && info.shareimg !== null && info.shareimg !== "") {
              that.defaultShareImgList.push({
                name: info.shareimg.substring(info.shareimg.lastIndexOf("/") + 1),
                url: info.shareimg
              })
            }
            if (info.goodsimgarr.indexOf(",") !== -1) {
              let urlList = info.goodsimgarr.split(",")
              urlList.forEach(item => {
                if (item !== undefined && item !== null && item !== "") {
                  that.defaultGoodsImgList.push({name: item.substring(item.lastIndexOf("/") + 1), url: item})
                }
              })
            } else {
              if (info.goodsimgarr !== undefined && info.goodsimgarr !== null && info.goodsimgarr !== "") {
                that.defaultGoodsImgList.push({
                  name: info.goodsimgarr.substring(info.goodsimgarr.lastIndexOf("/") + 1),
                  url: info.goodsimgarr
                })
              }
            }

            that.guigeList = info.list;

            // // 处理规格型号以及上传的图片信息
          }
        })
      },

      /**
       * 查询所有商品标签
       */
      getAllLabel: function (page, pageSize) {
        let that = this
        this.request("/mapi/itemLabel/findAllWithoutPage.do", "get", null, null, function (res) {
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
        this.request("/mapi/itemcat/query.do", "post", null, {"superType": parentType}, function (res) {
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
        } else if (flag === "guigeImg") {
          this.guigeImgUrl = ""
        }
      },

      /**
       * 商品上架
       */
      goodsRelease: function () {
        let that = this;
        if (this.operateFlag === "modify") {
          this.request("mapi/item/reshelf.do", "post", null, {"id": this.goodsId}, function (res) {
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
       * 根据销售价以及到手价计算商品需要的积分
       */
      setScore: function (item) {
        var marketPrice = this.guigeItem.marketPrice;
        var arrivalPrice = this.guigeItem.arrivalPrice;

        var score = (marketPrice - arrivalPrice) * 10;

        if (score > 9999) {
          score = 9999;
        } else if (score < 99 && score > 0) {
          score = 99
        }
        this.guigeItem.score = score;
      },

      /**
       * 提交表单
       */
      submitForm: function () {
        let basicStatus = false

        let shareStatus = false
        let that = this
        // 验证表单
        this.$refs.basic.validate((valid) => {
          if (valid) {
            basicStatus = true
          }
        })
        // this.$refs.specification.validate((valid) => {
        //   if (valid) {
        //     specificationStatus = true
        //   }
        // })
        this.$refs.share.validate((valid) => {
          if (valid) {
            shareStatus = true
          }
        })

        if ("<p><br></p>" === this.editorObj.txt.html()) {
          shareStatus = false;
          that.$Notice.error({
            title: '商品详情不能为空'
          });
          return;
        }

        if (!basicStatus) {
          that.$Notice.error({
            title: '基本信息有误'
          });
        }

        if (!shareStatus) {
          that.$Notice.error({
            title: '分享信息有误'
          });
        }

        if (basicStatus && shareStatus) {
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


                  arrivalPrice: this.specificationInfo.arrivalPrice,
                  score: this.specificationInfo.score,

                  costprice: this.specificationInfo.costprice,
                  store: this.specificationInfo.inventory,
                  model: this.specificationInfo.model,
                  sharetitle: this.shareInfo.shareTitle,
                  shareinfo: this.shareInfo.shareDesc,
                  shareimg: this.shareImgUrl,
                  barcode: "",
                  detail: this.editorObj.txt.html(),
                  fk_configCode: this.basicInfo.sysConfig,
                  brand: this.basicInfo.brand,
                  list: this.guigeList
                }
                if (this.operateFlag === "modify") {
                  reqParam.id = this.goodsId

                  that.load.$emit('loading', true);

                  this.request("mapi/item/updateSelective.do", "post", "json", reqParam, function (res) {

                    if (res.data && res.data.code === 200) {
                      that.$Notice.success({
                        title: '修改成功'
                      })
                      that.load.$emit('loading', false);
                    } else {
                      that.$Notice.error({
                        title: '修改失败'
                      })
                    }
                    that.load.$emit('loading', false);
                  })
                } else if (this.operateFlag === "add") {
                  that.load.$emit('loading', true);
                  this.request("mapi/item/insert.do", "post", "json", reqParam, function (res) {
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
                      that.load.$emit('loading', false);
                    } else {
                      that.$Notice.error({
                        title: '添加失败'
                      })
                      that.load.$emit('loading', false);
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
              title: '至少上传一张商品主图'
            });
          }
        }
      },

      /**t
       * 添加规格到table中
       * */
      guigeSave: function () {
        let that = this;
        if (this.guigeImgUrl === undefined || this.guigeImgUrl === "") {
          that.$Notice.error({
            title: '规格型号图片不能为空'
          });
        } else if (this.guigeItem.color === undefined || this.guigeItem.color === "") {
          that.$Notice.error({
            title: '颜色不能为空'
          });
        } else if (this.guigeItem.marketPrice === undefined || this.guigeItem.marketPrice === "") {
          that.$Notice.error({
            title: '销售价不能为空'
          });
        } else if (this.guigeItem.arrivalPrice === undefined || this.guigeItem.arrivalPrice === "") {
          that.$Notice.error({
            title: '到手价不能为空'
          });
        } else {
          this.guigeItem.imgArr = this.guigeImgUrl;
          if (this.guigeFlag === "update") {
            that.guigeList.forEach(function (item, index) {
              if (item.id === that.guigeItem.id) {
                that.guigeList[index] = that.guigeItem;
              }
            });
          } else {
            that.guigeList.push(that.guigeItem);
          }
          this.guigeItem = {};
          this.guigeImgUrl = "";
          this.$refs.guige.refreshFileList();
          this.guigeFlag = "add";
        }
      },
      updateGuiGe: function (item) {
        this.guigeItem = item;
        this.guigeImgUrl = item.imgArr;
        this.guigeFlag = "update";
      },
      removeItem: function (item) {
        let that = this;
        if (item.row.id !== undefined && item.row.id > 0) {
          this.request("mapi/item/delete.do", "post", null, {paramId: item.row.id}, function (res) {
            if (res.data && res.data.code === 200) {
              that.$Notice.success({
                title: '成功'
              })
            } else {
              that.$Notice.error({
                title: '失败'
              })
            }
          })
        }
        that.guigeList.splice(item.index, 1)
      },

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

