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

      <FormItem label="内容摘要">
        <Input v-model="formData.intro" type="textarea" :rows="4" placeholder="内容摘要..." style="width: 50%"/>
      </FormItem>

      <FormItem label="详情内容">
        <div id="editor" style="width:666px;"></div>
      </FormItem>
      <FormItem>
        <Button type="info" class="content_detail_btn special" @click="submitForm">提交</Button>
        <Button type="info" class="content_detail_btn" @click="goBack">返回</Button>
        <Button type="info" class="content_detail_btn" @click="preview">预览</Button>
        <Button type="warning" class="content_detail_btn wx" @click="addWxCard">添加小程序卡片</Button>
      </FormItem>
    </Form>
    <!-- 小程序卡片弹窗 -->
    <div class="mini-program" v-if="isShowCard">
      <!-- 关闭按钮 -->
      <Icon class="close-btn" type="ios-close-circle-outline" size="32" @click="closeWxCard"/>
      <div class="title">添加小程序卡片</div>
      <!-- 卡片模板选择 -->
      <div class="template-box">
        <div class="template-title">模板选择：</div>
        <div class="template">
          <div class="tem-img">
            <Icon type="md-checkmark-circle-outline" size="32"/>
          </div>
        </div>
      </div>
      <div class="path">
        <div class="min-title">小程序链接：</div>
        <input class="field" type="text" placeholder="请输入小程序链接（需要以'wx:'开头 ）" v-model="wxCardInfo.path">
      </div>
      <div class="main-title">
        <div class="min-title">卡片主标题：</div>
        <textarea class="field" placeholder="请输入主标题" v-model="wxCardInfo.mainTitle"></textarea>
      </div>
      <div class="next-title">
        <div class="min-title">卡片副标题：</div>
        <textarea class="field" placeholder="请输入副标题" v-model="wxCardInfo.nextTitlt"></textarea>
      </div>
      <div class="card-price">
        <div class="min-title goods-price">商品价格：</div>
        <input class="field" type="text" placeholder="商品价格（可以是￥150+300积分的形式）" v-model="wxCardInfo.priceInfo">
      </div>
      <!-- 预览效果：必须要有该元素，否则后面没法使用html2Canvas转换成图片 -->
      <div class="center-desc">预览效果</div>
      <div id="card">
          <div class="preview-card">
              <div class="big-title">{{ wxCardInfo.mainTitle }}</div>
              <div class="small-title">{{ wxCardInfo.nextTitlt }}</div>
              <div class="preview-price">{{ wxCardInfo.priceInfo }}</div>
          </div>
      </div>
      <Button class="confirm-btn" type="primary" @click="addCard">确认</Button>
    </div>
  </div>
</template>
<script>
import Editor from "wangeditor";
import "wangeditor/release/wangEditor.min.css";
// 引入自定义上传组件
import FileUpload from "@/components/upload/upload";
import axios from "@/libs/api.request";
import config from "@/config/index";
import html2canvas from "html2canvas";
const { baseUrl } = config;
export default {
  data() {
    return {
      uploadUrl: baseUrl.upload,
      // 表单内容
      formData: {
        title: "",
        author: "",
        intro: ""
      },
      // 富文本编辑器对象
      editorObj: {},
      operateFlag: "",
      contentId: "",
      authorImg: "",
      coverImg: "",
      defaultAuthorImgList: [],
      defaultCoverImgList: [],
      isShowCard: false,
      // 小程序卡片信息
      wxCardInfo: {
        path: "../product-detail/product-detail?id=",
        mainTitle: "",
        nextTitlt: "",
        priceInfo: "",
        templateUrl: "https://www.moregs.com/moregs-oss/img/material/card.png"
      }
    };
  },
  components: {
    Editor,
    FileUpload
  },
  created: function() {
    this.operateFlag = this.$route.params.flag;
    this.contentId = this.$route.params.contentId;
  },
  mounted: function() {
    this.initEditor();
    this.getContentDetail();
  },
  methods: {
    /**
     * 初始化图片数据
     */
    initImgInfo: function(result) {
      let flag = result.operateType;
      if (flag === "authorHead") {
        this.authorImg = "";
      } else if (flag === "contentCover") {
        this.coverImg = "";
      }
    },

    /**
     * 查询内容详情
     */
    getContentDetail: function() {
      let that = this;
      this.request(
        "mapi/content/selectById.do",
        "get",
        null,
        { id: this.contentId },
        function(res) {
          if (res.data && res.data.code === 200) {
            let info = res.data.data;
            that.formData.title = info.title;
            that.formData.intro = info.intro;
            that.formData.author = info.author;
            that.authorImg = info.authorimg;
            that.coverImg = info.imgurl;
            that.editorObj.txt.html(info.detail);
            // 设置展示的图片
            that.defaultAuthorImgList.push({
              name: info.authorimg.substring(
                info.authorimg.lastIndexOf("/") + 1
              ),
              url: info.authorimg
            });
            that.defaultCoverImgList.push({
              name: info.imgurl.substring(info.imgurl.lastIndexOf("/") + 1),
              url: info.imgurl
            });
          }
        }
      );
    },

    /**
     * 提交表单
     */
    submitForm: function() {
      let that = this;
      // console.log(this.editorObj.txt.html())
      if (this.formData.title === undefined || this.formData.title === "") {
        this.$Notice.warning({
          desc: "标题不能为空"
        });
        return;
      } else if (this.formData.intro === "") {
        this.$Notice.warning({
          desc: "内容摘要不能为空"
        });
        return;
      }
      if (this.formData.title && this.formData.title !== "") {
        if (this.authorImg && this.authorImg !== "") {
          if (this.formData.author && this.formData.author !== "") {
            if (this.coverImg && this.coverImg !== "") {
              if (
                this.editorObj.txt.html() &&
                this.editorObj.txt.html() !== ""
              ) {
                let reqParam = {
                  title: this.formData.title,
                  intro: this.formData.intro,
                  author: this.formData.author,
                  authorimg: this.authorImg,
                  imgurl: this.coverImg,
                  detail: this.editorObj.txt.html()
                };
                if (this.operateFlag === "modify") {
                  reqParam.id = this.contentId;
                  this.request(
                    "mapi/content/update.do",
                    "post",
                    null,
                    reqParam,
                    function(res) {
                      if (res.data && res.data.code === 200) {
                        that.$Notice.success({
                          title: "修改成功"
                        });
                      } else {
                        that.$Notice.error({
                          title: "修改失败"
                        });
                      }
                    }
                  );
                } else if (this.operateFlag === "add") {
                  this.request(
                    "mapi/content/insertContent.do",
                    "post",
                    null,
                    reqParam,
                    function(res) {
                      if (res.data && res.data.code === 200) {
                        that.$Notice.success({
                          title: "添加成功"
                        });
                        // 清空表单
                        that.$refs.myForm.resetFields();
                        // 清空图片
                        that.authorImg = "";
                        that.coverImg = "";
                        that.$refs.coverNode.refreshFileList();
                        that.$refs.authorNode.refreshFileList();
                        // 清空富文本
                        that.editorObj.txt.html("<p></p>");
                      } else {
                        that.$Notice.error({
                          title: "添加失败"
                        });
                      }
                    }
                  );
                }
              } else {
                this.$Notice.warning({
                  desc: "详细内容不能为空"
                });
              }
            } else {
              this.$Notice.warning({
                desc: "请上传封面图片"
              });
            }
          } else {
            this.$Notice.warning({
              desc: "作者名称不能为空"
            });
          }
        } else {
          this.$Notice.warning({
            desc: "请上传作者头像"
          });
        }
      } else {
        this.$Notice.warning({
          desc: "标题不能为空"
        });
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
    formatError: function(params) {
      this.$Notice.warning({
        title: "图格式必须为(jpeg、jpg、png)中的一种"
      });
    },

    /**
     * 上传文件大小超出限制
     */
    exceededMaxSize: function(params) {
      this.$Notice.warning({
        title: "单个文件不能超过10M"
      });
    },

    /**
     * 上传成功
     */
    uploadSuccess: function(params) {
      let flag = params.operateType;
      if (params.response.code === 200) {
        let url = params.response.data.data;
        if (flag === "authorHead") {
          this.authorImg = url;
        } else if (flag === "contentCover") {
          this.coverImg = url;
        }
      } else {
        this.$Notice.error({
          title: "上传失败，请重新上传"
        });
      }
    },

    /**
     * 上传失败
     */
    uploadFail: function(params) {
      this.$Notice.error({
        title: "上传失败，请重新上传"
      });
    },

    // **********************文本编辑框****************************
    initEditor: function() {
      // 初始化富文本编辑器
      var editor = new Editor("#editor");
      // 粘贴文本的时候不自动去除样式
      editor.customConfig.pasteFilterStyle = false;
      editor.customConfig.customUploadImg = function(files, insert) {
        let formData = new FormData();
        formData.append("file", files[0]);
        axios
          .request({
            url: "mapi/upload.do",
            method: "post",
            data: formData,
            responseEncoding: "utf-8",
            headers: { "Content-Type": "application/json;charset=utf-8" }
          })
          .then(function(res) {
            if (res.data && res.data.code === 200) {
              // 对链接进行编码，避免链接中携带的空格或者特殊字符对富文本的解析造成困难
              insert(encodeURI(res.data.data.data));
            }
          });
      };
      editor.create();
      this.editorObj = editor;
    },

   

    /**
     * 打开添加小程序卡片的弹窗
     */
    addWxCard: function() {
      this.isShowCard = true;
    },

    /**
     * 关闭添加小程序卡片的弹窗
     */
    closeWxCard: function() {
      this.isShowCard = false;
    },

    /**
     * 添加小程序卡片
     */
    addCard: function() {
      let info = this.wxCardInfo;
      let that = this;
      let dom = document.getElementById("card");
      let width = dom.offsetWidth;
      let height = dom.offsetHeight;
      const scale = 2;
      setTimeout(function() {
        html2canvas(dom, {
          width: width,
          height: height,
          scale: scale,
          dpi: window.devicePixelRatio * 2,
          logging: false
        }).then(function(canvas) {
          const context = canvas.getContext("2d");
          // 【重要】关闭抗锯齿 https://segmentfault.com/a/1190000011478657
          context.mozImageSmoothingEnabled = false;
          context.webkitImageSmoothingEnabled = false;
          context.msImageSmoothingEnabled = false;
          context.imageSmoothingEnabled = false;
          let url = canvas.toDataURL();
          // 例如：../product-detail/product-detail?id=75
          that.editorObj.txt.append(
            "<a href='" + info.path + "'><img src=" + url + "></img></a>"
          );
        });
      }, 3000);
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

.content_detail_btn.wx {
  width: 120px;
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

/* 添加小程序的弹窗 */
.mini-program {
  width: 500px;
  min-height: 420px;
  background-color: white;
  position: fixed;
  top: 3%;
  left: 60%;
  border-radius: 5px;
  z-index: 10002;
  box-shadow: 0px 0px 2px rgba(127, 127, 127, 0.6);
  padding: 10px;
  padding-bottom: 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.mini-program .close-btn {
  position: absolute;
  right: 10px;
  top: 10px;
}

.mini-program .title {
  width: 100%;
  height: 30px;
  line-height: 30px;
  text-align: center;
  font-size: 14px;
  font-weight: bold;
}

.mini-program .template-box {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.template-box .template-title {
  font-size: 14px;
}

.template {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;
}

.template .tem-img {
  width: 250px;
  height: 100px;
  background: url("../../assets/images/card.png") no-repeat center center;
  background-size: contain;
}

.mini-program .path,
.main-title,
.next-title,
.card-price {
  margin-top: 25px;
  display: flex;
  align-items: center;
}

.path,
.main-title,
.next-title,
.card-price .min-title {
  font-size: 14px;
}

.field {
  width: 300px;
}

.card-price .goods-price {
  width: 83px;
  text-align: right;
}

.confirm-btn {
  width: 200px;
  margin: 30px auto;
}

/* 小程序卡片最终预览 */
.center-desc {
  width: 120px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  margin: 10px auto;
  font-size: 14px;
}

#card {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
}

.preview-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 330px;
  height: 129px;
  background: url("../../assets/images/card.png") no-repeat right;
  background-size: cover;
}

.preview-card .big-title {
  font-size: 14px;
  font-weight: bold;
  margin-left: 10px;
  width: 73%;
}

.preview-card .small-title {
  font-size: 12px;
  color: #909090;
  margin-left: 10px;
  width: 73%;
  margin-top: 2px;
}

.preview-card .preview-price {
  font-size: 12px;
  font-weight: bold;
  color: #911d17;
  margin-left: 10px;
  margin-top: 5px;
}
</style>
