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
                    <FormItem label="商品主图">
                        <FileUpload 
                        operate-type="goodsImg" 
                        v-on:before-upload="beforeUpload"
                        v-on:format-error="formatError"
                        v-on:exceeded-maxSize="exceededMaxSize"
                        v-on:upload-success="uploadSuccess"
                        v-on:upload-fail="uploadFail"
                        ></FileUpload>
                    </FormItem>
                    <FormItem label="商品分类">
                        <Select v-model="basicInfo.goodsType" class="basic_input">
                            <Option value="beijing">New York</Option>
                            <Option value="shanghai">London</Option>
                            <Option value="shenzhen">Sydney</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="商品标签">
                        <CheckboxGroup v-model="basicInfo.goodsLabel">
                            <Checkbox label="Eat"></Checkbox>
                            <Checkbox label="Sleep"></Checkbox>
                            <Checkbox label="Run"></Checkbox>
                            <Checkbox label="Movie"></Checkbox>
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
                        v-on:before-upload="beforeUpload"
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
                        v-on:before-upload="beforeUpload"
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
            <Button type="info" class="submit">提交</Button>
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
      operateFlag: '',
      goodsId: '',
      // 富文本编辑器对象
      editorObj: {},
      // 选中的菜单项
      selectTab: '1',
      // 基本信息
      basicInfo: {
        goodsName: '',
        goodsType: '',
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
      }
    }
  },
  created: function () {
    this.operateFlag = this.$route.params.flag
    this.goodsId = this.$route.params.goodsId
  },
  mounted: function () {
    this.initEditor()
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
     * 上传之前处理
     */
    beforeUpload: function(params) {
        console.log("----------上传之前触发--------")
        console.log(params)
    },

    /**
     * 上传文件格式错误
     */
    formatError:function(params) {
        console.log("----------上传格式错误--------")
        console.log(params)
    },

    /**
     * 上传文件大小超出限制
     */
    exceededMaxSize: function(params) {
        console.log("----------上传文件超出限制--------")
        console.log(params)
    },
    
    /**
     * 上传成功
     */
    uploadSuccess: function(params) {
        console.log("----------上传成功--------")
        console.log(params)
    },

    /**
     * 上传失败
     */
    uploadFail: function(params) {
        console.log("----------上传失败--------")
        console.log(params)
    }
  }
}
</script>

<style>
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
