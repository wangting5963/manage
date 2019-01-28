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
                <Form :model="basicInfo" :label-width="80">
                    <FormItem label="商品名称">
                        <Input v-model="basicInfo.goodsName" placeholder="商品名称" class="basic_input"/>
                    </FormItem>
                    <!--  :uploadUrl="uploadUrl" -->
                    <FormItem label="商品主图">
                        <FileUpload 
                        operate-type="goodsImg" 
                        :uploadUrl="uploadUrl"
                        :uploadCount="10"
                        v-on:format-error="formatError"
                        v-on:exceeded-maxSize="exceededMaxSize"
                        v-on:upload-success="uploadSuccess"
                        v-on:upload-fail="uploadFail"
                        ></FileUpload>
                    </FormItem>
                    <FormItem label="商品分类">
                        <Select v-model="basicInfo.parentType" class="basic_input" style="width:120px;">
                            <Option :value="typeItem.id" v-for="typeItem in parentType" :key="typeItem.id">{{ typeItem.typename }}</Option>
                        </Select>
                        <Select v-model="basicInfo.childrenType" class="basic_input" style="width:120px; margin-left:10px;">
                            <Option :value="typeItem.id" v-for="typeItem in childrenType" :key="typeItem.id">{{ typeItem.typename }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="商品标签">
                        <CheckboxGroup v-model="basicInfo.goodsLabel">
                            <Checkbox v-for="label in labelList" :key="label.id" :label="label.id">{{ label.labelName }}</Checkbox>
                        </CheckboxGroup>
                    </FormItem>
                </Form>
            </div>
            <div class="specification" v-show="'2'===selectTab">
                <Form :model="specificationInfo" :label-width="80">
                    <FormItem label="商品名称">
                        <Input v-model="basicInfo.goodsName" placeholder="商品名称" class="basic_input"/>
                    </FormItem>
                    <FormItem label="规格项">
                        <Input v-model="basicInfo.goodsName" placeholder="规格项" class="basic_input"/>
                    </FormItem>
                    <FormItem label="规格图片">
                        <FileUpload 
                        operate-type="specification"
                        :uploadUrl="uploadUrl"
                        v-on:format-error="formatError"
                        v-on:exceeded-maxSize="exceededMaxSize"
                        v-on:upload-success="uploadSuccess"
                        v-on:upload-fail="uploadFail"
                        ></FileUpload>
                    </FormItem>
                    <FormItem label="划线价">
                        <Input v-model="basicInfo.goodsName" placeholder="划线价" class="basic_input"/>
                    </FormItem>
                    <FormItem label="销售价">
                        <Input v-model="basicInfo.goodsName" placeholder="销售价" class="basic_input"/>
                    </FormItem>
                    <FormItem label="成本价">
                        <Input v-model="basicInfo.goodsName" placeholder="成本价" class="basic_input"/>
                    </FormItem>
                    <FormItem label="库存">
                        <Input v-model="basicInfo.goodsName" placeholder="库存" class="basic_input"/>
                    </FormItem>
                    <FormItem label="商品型号">
                        <Input v-model="basicInfo.goodsName" placeholder="商品型号" class="basic_input"/>
                    </FormItem>
                </Form>
            </div>
            <div class="detail_info" v-show="'3'===selectTab">
                <div id="editor" class="detail_editor" style="width:666px;"></div>
            </div>
            <div class="share_info" v-show="'4'===selectTab">
                <Form :model="shareInfo" :label-width="80">
                    <FormItem label="分享标题">
                        <Input v-model="shareInfo.shareTitle" placeholder="分享标题" class="basic_input"/>
                    </FormItem>
                    <FormItem label="分享描述">
                        <Input v-model="shareInfo.shareDesc" placeholder="分享描述" class="basic_input"/>
                    </FormItem>
                    <FormItem label="分享图片">
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
      uploadUrl: 'http://192.168.50.106:8080/mapi/uploadFile.do',
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
        sName: '',
        sItems: '',
        sImg: '',
        linePrice: '',
        salePrice: '',
        costprice: '',
        inventory: '',
        model: ''
      },
      // 分享信息
      shareInfo: {
        shareTitle: '',
        shareDesc: '',
        shareImg: ''
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
      shareImgUrl:""
    }
  },
  created: function () {
    this.operateFlag = this.$route.params.flag
    this.goodsId = this.$route.params.goodsId
  },
  mounted: function () {
    this.initEditor()
    this.getAllLabel()
    this.getParentType()
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
            let url = params.response.data
            if(flag === "goodsImg") {
                this.basicImgUrlList.push(url)
            } else if(flag === "specification"){
                this.specificationImgUrl = url
            } else if(flag === "share"){
                this.shareImgUrl = url
            }
        }
    },

    /**
     * 上传失败
     */
    uploadFail: function(params) {
        console.log("----------上传失败--------")
        console.log(params)
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
     * 查询所有一级分类
     */
    getParentType:function(){
        let that = this
        this.request("/mapi/itemcat/query.do","post",{ superType: 0 },function(res) {
            let result = res.data
            if (result && result.code === 200) {
            if (result.data && result.data.length) {
               that.parentType = result.data
            }
          }
        })
    },

    /**
     * 提交表单
     */
    submitForm:function() {
        console.log(this.basicInfo)
        console.log(this.basicImgUrlList)
        console.log(this.specificationImgUrl)
        console.log(this.shareImgUrl)
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

.detail_editor {
  margin-left: 20px;
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
