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
                    <FormItem label="商品主图" prop="goodsImg" >
                        <FileUpload v-model="basicImgUrlList"
                        operate-type="goodsImg" 
                        :uploadUrl="uploadUrl"
                        :uploadCount="10"
                        v-on:format-error="formatError"
                        v-on:exceeded-maxSize="exceededMaxSize"
                        v-on:upload-success="uploadSuccess"
                        v-on:upload-fail="uploadFail"
                        ></FileUpload>
                    </FormItem>
                    <FormItem label="商品分类" prop="childrenType">
                        <Select v-model="basicInfo.parentType" class="basic_input" style="width:120px;" @on-change="selectParentType" >
                            <Option :value="typeItem.id + '-' + typeItem.typename" v-for="typeItem in parentType" :key="typeItem.id">{{ typeItem.typename }}</Option>
                        </Select>
                        <Select v-model="basicInfo.childrenType" class="basic_input" style="width:120px; margin-left:10px;">
                            <Option :value="typeItem.id + '-' + typeItem.typename" v-for="typeItem in childrenType" :key="typeItem.id">{{ typeItem.typename }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="商品标签" prop="goodsLabel">
                        <CheckboxGroup v-model="basicInfo.goodsLabel">
                            <Checkbox v-for="label in labelList" :key="label.id" :label="label.id + '-' + label.labelName">{{ label.labelName }}</Checkbox>
                        </CheckboxGroup>
                    </FormItem>
                </Form>
            </div>
            <div class="specification" v-show="'2'===selectTab">
                <Form :model="specificationInfo" :label-width="80" ref="specification" :rules="ruleValidate">
                    <FormItem label="规格项" prop="sItems">
                        <Input v-model="specificationInfo.sItems" placeholder="规格项" class="basic_input"/>
                    </FormItem>
                    <FormItem label="规格图片" prop="specificationImg" v-model="specificationImgUrl">
                        <FileUpload 
                        operate-type="specification"
                        :uploadUrl="uploadUrl"
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
                        <FileUpload 
                        operate-type="share" 
                        :uploadUrl="uploadUrl"
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
            <Button type="info" class="back">返回</Button>
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
export default {
  name: 'goods_detail',
  components: {
    Editor,
    FileUpload
  },
  data () {
    return {
      // 上传文件的地址
    //   uploadUrl: 'http://192.168.50.106:8080/mapi/uploadFile.do',
      uploadUrl: 'https://www.moregs.com/mojisi-shop/mapi/upload.do',
      operateFlag: '',
      goodsId: '',
      // 富文本编辑器对象
      editorObj: {},
      // 选中的菜单项
      selectTab: '1',
      // 基本信息
      basicInfo: {
        goodsName: '',
        parentType: '',
        childrenType: '',
        goodsLabel: []
      },
      // 商品规格信息
      specificationInfo: {
        sItems: '',
        linePrice: '',
        salePrice: '',
        costprice: '',
        inventory: '',
        model: ''
      },
      // 分享信息
      shareInfo: {
        shareTitle: '',
        shareDesc: ''
      },
      // 标签列表
      labelList:[],
      // 父级分类
      parentType:[],
      // 子分类
      childrenType:[],
      // 上传成功的商品图片路径集合
      basicImgUrlList:[],
      // 规格图片路径
      specificationImgUrl:"",
      // 分享图片路径
      shareImgUrl:"",
      // 表单验证部分
      ruleValidate: {
        goodsName: [
            { required: true,type: 'string', message: '商品名称不能为空', trigger: 'blur' }
        ],
        parentType: [
            { required: true, type: 'string', message: '请选择一级分类', trigger: 'change' }
        ],
        childrenType: [
            { required: true, type: 'string', message: '请选择二级分类', trigger: 'change' }
        ],
        goodsLabel: [
            { required: true, type: 'array', min: 1, message: '至少选择一个标签', trigger: 'change' }
        ],
        sItems: [
            { required: true, type: 'string', message: '请输入规格项', trigger: 'blur' }
        ],
        linePrice: [
            { required: true, type: 'string', message: '划线价不能为空', trigger: 'blur' }
        ],
        salePrice: [    
            { required: true, type: 'string', message: '销售价不能为空', trigger: 'blur' }
        ],
        costprice: [
            { required: true, type: 'string', message: '成本价不能为空', trigger: 'blur' }
        ],
        inventory: [
            { required: true, type: 'string', message: '库存不能为空', trigger: 'blur' }
        ],
        model: [
            { required: true, type: 'string', message: '型号不能为空', trigger: 'blur' }
        ],
        shareTitle: [
            { required: true, type: 'string', message: '分享标题不能为空', trigger: 'blur' }
        ],
        shareDesc: [
            { required: true, type: 'string', message: '分享描述不能为空', trigger: 'blur' }
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
    if(this.operateFlag === "modify") {
        this.getGoodsInfo(this.goodsId)
    }
    this.getGoodsInfo(14)
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
      // 初始化富文本编辑器
      var editor = new Editor('#editor')
      editor.customConfig.uploadImgShowBase64 = true   // 使用 base64 保存图片
    //   editor.customConfig.uploadImgServer = '/upload'  // 上传图片到服务器,获取到返回的路径的时候，使用editor.txt.append(<img>)方法拼接展示
      editor.customConfig.uploadImgHooks = {
            before: function (xhr, editor, files) {
                // 图片上传之前触发
                // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，files 是选择的图片文件
                
                // 如果返回的结果是 {prevent: true, msg: 'xxxx'} 则表示用户放弃上传
                // return {
                //     prevent: true,
                //     msg: '放弃上传'
                // }
                console.log("上传之前触发")
            },
            success: function (xhr, editor, result) {
                // 图片上传并返回结果，图片插入成功之后触发
                // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
            },
            fail: function (xhr, editor, result) {
                // 图片上传并返回结果，但图片插入错误时触发
                // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
            },
            error: function (xhr, editor) {
                // 图片上传出错时触发
                // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
            },
            timeout: function (xhr, editor) {
                // 图片上传超时时触发
                // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
            },
            // 如果服务器端返回的不是 {errno:0, data: [...]} 这种格式，可使用该配置
            // （但是，服务器端返回的必须是一个 JSON 格式字符串！！！否则会报错）
            customInsert: function (insertImg, result, editor) {
                // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
                // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果
                // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
                var url = result.url
                insertImg(url)
                // result 必须是一个 JSON 格式字符串！！！否则报错
            }
        }
      editor.create()
      this.editorObj = editor
    },

    // **********************上传控件****************************

    /**
     * 上传文件格式错误
     */
    formatError:function(params) {
        this.$Notice.warning({
            title: '图格式必须为(jpeg、jpg、png)中的一种'
        });
    },

    /**
     * 上传文件大小超出限制
     */
    exceededMaxSize: function(params) {
        this.$Notice.warning({
            title: '单个文件不能超过10M'
        });
    },
    
    /**
     * 上传成功
     */
    uploadSuccess: function(params) {
        console.log(params)
        let flag = params.operateType
        if(params.response.code === 200) {
            let url = params.response.data.data
            if(flag === "goodsImg") {
                this.basicImgUrlList.push(url)
            } else if(flag === "specification"){
                this.specificationImgUrl = url
            } else if(flag === "share"){
                this.shareImgUrl = url
            }
        } else {
            this.$Notice.error({
                title: '上传失败，请重新上传'
            });
            // 清除上传失败的图片
        }
    },

    /**
     * 上传失败
     */
    uploadFail: function(params) {
       this.$Notice.error({
            title: '上传失败，请重新上传'
       });
       // 清除上传失败的图片
    },


    /**
     * @description 根据商品id查询商品信息
     * @param {number}
     */
    getGoodsInfo:function(id) {
        let that = this
        this.request("mapi/item/select.do","post",{id:id},function(res){
            if(res.data && res.data.code === 200){
                let info = res.data.data
                console.log(info)
                that.basicInfo.goodsName = info.goodsname
                that.basicInfo.parentType = info.parentname
                that.basicInfo.parentType = info.supertype + "-" + info.parentname
                that.getChildrenType(info.supertype)
                that.basicInfo.childrenType = info.goodstype + "-" + info.typename
                if(typeof info.goodslabel === "number"){
                    that.basicInfo.goodsLabel = [info.goodslabel + "-" + info.labelname]
                } else if(typeof info.goodslabel === "array") {
                    info.goodslabel.forEach((item,index)=>{
                        that.basicInfo.goodsLabel.push([item + "-" + info.labelname[index]])
                    })
                }
                that.specificationInfo.sItems = info.specificationitem
                that.specificationInfo.linePrice = info.lineprice.toString()
                that.specificationInfo.salePrice = info.marketprice.toString()
                that.specificationInfo.costprice = info.costprice.toString()
                that.specificationInfo.inventory = info.store.toString()
                that.specificationInfo.model = info.model.toString()
                that.shareInfo.shareTitle = info.sharetitle
                that.shareInfo.shareDesc = info.shareinfo
                that.editorObj.txt.html(info.detail)
            }
        })
    },

     /**
     * 查询所有商品标签
     */
    getAllLabel:function(page,pageSize) {
      let that = this
      this.request("/mapi/itemLabel/findAllWithoutPage.do","get",null,function(res){
        if(res.data && res.data.code === 200){
          let info = res.data.data
          if(info.length > 0){
           that.labelList = info
          }
        }
      })
    },

    /**
     * 根据父分类id查询子分类
     */
    getChildrenType:function(parentType){
        let that = this
        that.childrenType = []
        this.request("/mapi/itemcat/query.do","post",{ superType: parentType },function(res) {
            let result = res.data
            if (result && result.code === 200) {
            if (result.data && result.data.length) {
                if(parentType === 0) {
                    that.parentType = result.data
                } else{
                    that.childrenType = result.data
                }
            }
          }
        })
    },

    selectParentType:function() {
        this.getChildrenType(this.basicInfo.parentType.split("-")[0])
    },

    /**
     * 提交表单
     */
    submitForm:function() {
        let basicStatus = false
        let specificationStatus = false
        let shareStatus = false
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
        if(basicStatus && specificationStatus && shareStatus) {
            // 分离标签id和标签名称
            let checkedLabel = this.basicInfo.goodsLabel
            let labelIdList = []
            let labelNameList = []
            checkedLabel.forEach(item=>{
                labelIdList.push(item.split("-")[0])
                labelNameList.push(item.split("-")[1])
            })
            if(this.basicImgUrlList && this.basicImgUrlList.length > 0) {
                if (this.specificationImgUrl && this.specificationImgUrl !== "") {
                    if (this.shareImgUrl && this.shareImgUrl !== "") {
                         if(editorObj.txt.html() && editorObj.txt.html() !== "") {
                             let reqParam = {
                                goodsname:this.basicInfo.goodsName,
                                goodsimgarr: this.basicImgUrlList.toString(),
                                goodstype:this.basicInfo.childrenType.split("-")[0],
                                typename:this.basicInfo.childrenType.split("-")[1],
                                supertype:this.basicInfo.parentType.split("-")[0],
                                parentname:this.basicInfo.parentType.split("-")[1],
                                goodslabel: labelIdList.toString(),
                                labelname: labelNameList.toString(),
                                specificationitem:this.specificationInfo.sItems,
                                specification:this.specificationImgUrl,
                                lineprice:this.specificationInfo.linePrice,
                                marketprice:this.specificationInfo.salePrice,
                                costprice:this.specificationInfo.costprice,
                                store:this.specificationInfo.inventory,
                                model:this.specificationInfo.model,
                                sharetitle:this.shareInfo.shareTitle,
                                shareinfo:this.shareInfo.shareDesc,
                                shareimg:this.shareImgUrl,
                                showstatus:0,
                                barcode:"",
                                detail:this.editorObj.txt.html()
                            }
                            if(this.operateFlag === "modify") {
                                reqParam.id = this.goodsId
                                this.request("mapi/item/insert.do","post",reqParam,function(res){
                                    this.$Notice.success({
                                        title: '修改成功'
                                    })
                                })
                            } else if(this.operateFlag === "add"){
                                this.request("mapi/item/insert.do","post",reqParam,function(res){
                                    this.$Notice.success({
                                        title: '添加成功'
                                    })
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
  width:666px;
  margin-left: 20px;
}

.w-e-text img{
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

