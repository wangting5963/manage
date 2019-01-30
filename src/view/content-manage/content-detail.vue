<template>
    <div>
         <Form :v-model="formData" label-position="left" :label-width="100" class="my_form" ref="myForm">
            <FormItem label="标题">
                <Input clearable class="content_detail_input special" v-model="formData.title" placeholder="输入内容标题"/>
            </FormItem>
            <FormItem label="作者头像">
                <FileUpload ref="authorNode"
                    operate-type="authorHead"
                    :uploadUrl="uploadUrl"
                    :defaultList="defaultAuthorImgList"
                    v-on:init-img="initImgInfo"  
                    v-on:format-error="formatError"
                    v-on:exceeded-maxSize="exceededMaxSize"
                    v-on:upload-success="uploadSuccess"
                    v-on:upload-fail="uploadFail"
                ></FileUpload>
            </FormItem>
            <FormItem label="作者姓名">
                <Input clearable v-model="formData.author" style="width:260px;" placeholder="输入作者名称"/>
            </FormItem>
            <FormItem label="封面图片">
                <FileUpload ref="coverNode"
                    operate-type="contentCover" 
                    :uploadUrl="uploadUrl"
                    :defaultList="defaultCoverImgList" 
                    v-on:init-img="initImgInfo"
                    v-on:format-error="formatError"
                    v-on:exceeded-maxSize="exceededMaxSize"
                    v-on:upload-success="uploadSuccess"
                    v-on:upload-fail="uploadFail"
                ></FileUpload>
            </FormItem>
            <FormItem label="详情内容">
               <div id="editor" style="width:666px;"></div>
            </FormItem>
            <FormItem>
                <Button type="info" class="content_detail_btn special" @click="submitForm">提交</Button>
                <Button type="info" class="content_detail_btn"  @click="goBack">返回</Button>
                <Button type="info" class="content_detail_btn" @click="preview">预览</Button>
            </FormItem>
        </Form>
    </div>
</template>
<script>
import Editor from "wangeditor";
import "wangeditor/release/wangEditor.min.css";
// 引入自定义上传组件
import FileUpload from '@/components/upload/upload'
import axios from '@/libs/api.request'
import config from '@/config/index'
const { baseUrl } = config
export default {
  data() {
    return {
      uploadUrl: baseUrl.upload,
      // 表单内容
      formData: {
        title: "内容标题",
        author: "作者名称"
      },
      // 富文本编辑器对象
      editorObj: {},
      operateFlag:"",
      contentId:"",
      authorImg:"",
      coverImg:"",
      defaultAuthorImgList:[],
      defaultCoverImgList:[]
    }
  },
  components: {
    Editor,
    FileUpload
  },
  created:function() {
    this.operateFlag = this.$route.params.flag     
    this.contentId = this.$route.params.contentId     
  },
  mounted:function() {
    this.initEditor()
    this.getContentDetail()
  },
  methods: {

    /**
     * 初始化图片数据
     */
    initImgInfo:function(result) {
      let flag = result.operateType
      if(flag === "authorHead") {
         this.authorImg = ""
      } else if(flag === "contentCover") {
         this.coverImg = ""
      }
    },

    /**
     * 查询内容详情
     */
    getContentDetail:function() {
      let that = this
      this.request("mapi/content/selectById.do","get",{id:this.contentId},function(res){
        if(res.data && res.data.code === 200) {
          let info = res.data.data
          that.formData.title = info.title,
          that.formData.author = info.author,
          that.authorImg = info.authorimg,
          that.coverImg = info.imgurl,
          that.editorObj.txt.html(info.detail)
          // 设置展示的图片
          that.defaultAuthorImgList.push({name:info.authorimg.substring(info.authorimg.lastIndexOf("/")+1),url:info.authorimg})
          that.defaultCoverImgList.push({name:info.imgurl.substring(info.imgurl.lastIndexOf("/")+1),url:info.imgurl})
        }
      })
    },

    /**
     * 提交表单
     */
    submitForm: function() {
      let that = this
      if(this.formData.title && this.formData.title !== "") {
        if(this.authorImg && this.authorImg !== "") {
          if(this.formData.author && this.formData.author !== "") {
            if(this.coverImg && this.coverImg !== "") {
              if(this.editorObj.txt.html() && this.editorObj.txt.html() !== "") {
                let reqParam = {
                  title: this.formData.title,
                  author: this.formData.author,
                  authorimg: this.authorImg,
                  imgurl: this.coverImg,
                  detail: this.editorObj.txt.html()                  
                }
                if(this.operateFlag === "modify") {
                    reqParam.id = this.contentId
                    this.request("mapi/content/update.do","post",reqParam,function(res){
                        if(res.data && res.data.code === 200) {
                              that.$Notice.success({
                                title: '修改成功'
                              })
                        } else {
                            that.$Notice.error({
                                title: '修改失败'
                            })
                        }
                    })
                } else if(this.operateFlag === "add"){
                    this.request("mapi/content/insertContent.do","post",reqParam,function(res){
                        if(res.data && res.data.code === 200) {
                              that.$Notice.success({
                                title: '添加成功'
                              })
                              // 清空表单
                              that.$refs.myForm.resetFields()
                              // 清空图片
                              that.authorImg = ""
                              that.coverImg = ""
                              that.$refs.coverNode.refreshFileList()
                              that.$refs.authorNode.refreshFileList()
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
                this.$Notice.warning({
                  desc: "详细内容不能为空"
                })
              }
            } else {
              this.$Notice.warning({
                desc: "请上传封面图片"
              })
            }
          } else {
            this.$Notice.warning({
              desc:"作者名称不能为空"
            })  
          }
        } else {
          this.$Notice.warning({
            desc:"请上传作者头像"
          })
        }
      } else {
        this.$Notice.warning({
          desc:"标题不能为空"
        })
      }
    },

    /**
     * 返回：内容列表页
     */
    goBack: function() {
      this.$router.back();
    },

    /**
     * 预览内容
     */
    preview: function() {
      console.log("预览内容");
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
        let flag = params.operateType
        if(params.response.code === 200) {
            let url = params.response.data.data
            if(flag === "authorHead") {
                this.authorImg = url
            } else if(flag === "contentCover"){
                this.coverImg = url
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
    uploadFail: function(params) {
        this.$Notice.error({
            title: '上传失败，请重新上传'
        })
    },

    // **********************文本编辑框****************************
    initEditor: function() {
      // 初始化富文本编辑器
      var editor = new Editor("#editor");
      editor.customConfig.customUploadImg = function (files, insert) {
            let formData = new FormData()
            formData.append("file",files[0])
            axios.request({
                url: "mapi/upload.do",
                method: "post",
                data: formData,
                responseEncoding: 'utf-8'
            }).then(function (res) {
                if(res.data && res.data.code === 200) {
                    insert(res.data.data.data)
                }
            })
      }
      editor.create()
      this.editorObj = editor
    }
  }
};
</script>
<style>
.content_detail_btn {
  width: 80px;
  margin-left: 20px;
}
.content_detail_btn.special {
  margin-left: 0px;
}
.user_img {
  display: block;
  width: 100px;
  height: 100px;
}
.content_detail_input {
  width: 120px;
  margin-top: 10px;
}
.content_detail_input.special {
  width: 260px;
  margin-top: 0px;
}
</style>
