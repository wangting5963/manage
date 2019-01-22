<template>
    <div>
         <Form :v-model="formData" label-position="left" :label-width="100" class="my_form">
            <FormItem label="标题">
                <Input clearable class="content_detail_input special" v-model="formData.title" placeholder="输入内容标题"/>
            </FormItem>
            <FormItem label="作者头像">
                <FileUpload 
                    operate-type="authorHead" 
                    v-on:before-upload="beforeUpload"
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
                <FileUpload 
                    operate-type="contentCover" 
                    v-on:before-upload="beforeUpload"
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
export default {
  data() {
    return {
      // 表单内容
      formData: {
        title: "内容标题",
        author: "作者名称",
        authorImg: "http://pic43.photophoto.cn/20170506/0470102348231008_b.jpg"
      },
      // 富文本编辑器对象
      editorObj: {}
    };
  },
  components: {
    Editor,
    FileUpload
  },
  methods: {
    /**
     * 提交表单
     */
    submitForm: function() {
      console.log("提交表单");
      console.log("-------------富文本编辑框内容------------");
      console.log(this.editorObj.txt.html());
      console.log(this.editorObj.txt.text());
      console.log("-------------追加HTML内容------------");
      this.editorObj.txt.append(
        '<img src="http://pic1.nipic.com/2008-12-30/200812308231244_2.jpg" style="width:100px;height="80px;"></img>'
      );
      console.log(this.editorObj.txt.html());
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
    },

    // **********************文本编辑框****************************
    initEditor: function() {
      // 初始化富文本编辑器
      var editor = new Editor("#editor");
      editor.customConfig.uploadImgShowBase64 = true; // 使用 base64 保存图片
      //   editor.customConfig.uploadImgServer = '/upload'  // 上传图片到服务器,获取到返回的路径的时候，使用editor.txt.append(<img>)方法拼接展示
      editor.customConfig.uploadImgHooks = {
        before: function(xhr, editor, files) {
          // 图片上传之前触发
          // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，files 是选择的图片文件

          // 如果返回的结果是 {prevent: true, msg: 'xxxx'} 则表示用户放弃上传
          // return {
          //     prevent: true,
          //     msg: '放弃上传'
          // }
          console.log("上传之前触发");
        },
        success: function(xhr, editor, result) {
          // 图片上传并返回结果，图片插入成功之后触发
          // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
        },
        fail: function(xhr, editor, result) {
          // 图片上传并返回结果，但图片插入错误时触发
          // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
        },
        error: function(xhr, editor) {
          // 图片上传出错时触发
          // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
        },
        timeout: function(xhr, editor) {
          // 图片上传超时时触发
          // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
        },
        // 如果服务器端返回的不是 {errno:0, data: [...]} 这种格式，可使用该配置
        // （但是，服务器端返回的必须是一个 JSON 格式字符串！！！否则会报错）
        customInsert: function(insertImg, result, editor) {
          // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
          // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果
          // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
          var url = result.url;
          insertImg(url);
          // result 必须是一个 JSON 格式字符串！！！否则报错
        }
      };
      editor.create();
      this.editorObj = editor;
    }
  },
  mounted() {
    this.initEditor();
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
