<template>
  <div>
    <div class="demo-upload-list" v-for="item in uploadList" :key="item.id">
      <template v-if="item.status === 'finished'">
        <img :src="getRealUrl(item)">
        <div class="demo-upload-list-cover">
          <Icon type="ios-eye-outline" @click.native="handlePreview(item)"></Icon>
          <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
        </div>
      </template>
      <template v-else>
        <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
      </template>
    </div>
    <Upload
      ref="upload"
      :type="type"
      :multiple="selectMore"
      :show-upload-list="isShowUploadList"
      :default-file-list="defaultList"
      :on-success="handleSuccess"
      :on-error="handleError"
      :format="format"
      :max-size="maxSize"
      :on-format-error="handleFormatError"
      :on-exceeded-size="handleMaxSize"
      :before-upload="handleBeforeUpload"
      :action="uploadUrl"
      :headers="headers"
      style="display: inline-block;width:58px;">
      <!-- 放置相机图标 -->
      <div style="width: 58px;height:58px;line-height: 58px;">
        <Icon type="ios-camera" size="20"></Icon>
      </div>
    </Upload>
    <!-- 图片预览窗口 -->
    <Modal title="图片预览" v-model="imgVisible">
      <img :src="perviewUrl" v-if="imgVisible" style="width: 100%">
    </Modal>
  </div>
</template>

<script>
import * as util from "@/libs/util";
import config from "@/config/index";

const { baseUrl } = config;
export default {
  name: "FileUpload",
  props: {
    // 操作标志：区分是上传"用户头像"，还是上传商品封面等......
    operateType: {
      type: String,
      required: true
    },
    // 上传空间的类型select（点击选择），drag（支持拖拽）
    type: {
      type: String,
      default: function() {
        return "drag";
      }
    },
    // 是否展示上传列表
    isShowUploadList: {
      type: Boolean,
      default: function() {
        return false;
      }
    },
    // 默认图片集合
    defaultList: {
      type: Array
    },
    // 是否可以多选
    selectMore: {
      type: Boolean,
      default: function() {
        return false;
      }
    },
    // 上传格式限制
    format: {
      type: Array,
      default: function() {
        return ["jpg", "jpeg", "png"];
      }
    },
    // 上传文件最大限制
    maxSize: {
      type: Number,
      default: function() {
        return 10240;
      }
    },
    // 上传个数限制
    uploadCount: {
      type: Number,
      default: function() {
        return 1;
      }
    },
    // 上传路径
    uploadUrl: {
      type: String,
      default: function() {
        return "//jsonplaceholder.typicode.com/posts/";
      }
    }
  },
  data() {
    return {
      //上传文件名称
      fileName: "",
      imgName: "",
      imgVisible: false,
      // 预览图片的路径
      perviewUrl: "",
      uploadList: [],
      // 上传文件的请求头信息
      headers: {
        Authorization: "Bearer " + util.getToken()
      },
      // 图片路径前缀
      // urlPrefix: 'https://www.moregs.com/mojisi-shop/'
      urlPrefix: "https://www.moregs.com/mojisi-shop/mapi"
    };
  },
  mounted: function() {
    let that = this;
    // 获取上传的图片
    let result = window.setTimeout(() => {
      that.uploadList = that.$refs.upload.fileList;
    }, 1000);
    // console.log(that.selectMore)
  },
  methods: {
    /**
     * @description 刷新文件列表
     */
    refreshFileList: function() {
      this.$refs.upload.clearFiles();
      this.uploadList = this.$refs.upload.fileList;
    },

    /**
     * @description 获取真实的图片展示路劲
     * @param {Object} item 当前图片项
     */
    getRealUrl: function(item) {
      // 处理上传成功后的图片展示
      if (item.response) {
        if (item.response.data && item.response.data.data.match(/^http/)) {
          return item.response.data.data;
        } else {
          return this.urlPrefix + "" + item.response.data.data;
        }
      } else if (item.uid) {
        // 处理默认展示的图片
        return item.url;
      }
    },

    /**
     * 预览图片
     * @param {Object} 文件对象
     */
    handlePreview(item) {
      this.imgName = item.name;
      this.imgVisible = true;
      this.perviewUrl = this.getRealUrl(item);
    },

    /**
     * 移除图片
     * @param {Object} file 要移除的图片
     */
    handleRemove(file) {
      const fileList = this.$refs.upload.fileList;
      this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
      let result = {
        operateType: this.operateType,
        file: file
      };
      this.$emit("init-img", result);
    },

    /**
     * 上传之前的回调函数
     */
    handleBeforeUpload: function() {
      const check = this.uploadList.length < this.uploadCount;
      if (!check) {
        this.$Notice.warning({
          title: "上传数量不能超过" + this.uploadCount
        });
      }
      return check;
    },

    /**
     * 上传文件格式错误的回调函数
     */
    handleFormatError(file, fileList) {
      let result = {
        operateType: this.operateType,
        file: file,
        fileList: fileList
      };
      this.$emit("format-error", result);
    },

    /**
     * 上传文件过大回调函数
     */
    handleMaxSize(file, fileList) {
      let result = {
        operateType: this.operateType,
        file: file,
        fileList: fileList
      };
      this.$emit("exceeded-maxSize", result);
    },

    /**
     * 上传成功回调
     */
    handleSuccess: function(res, file, fileList) {
      let result = {
        operateType: this.operateType,
        response: res,
        file: file,
        fileList: fileList
      };
      this.$emit("upload-success", result);
    },

    /**
     * 上传失败回调函数
     */
    handleError: function(error, file, fileList) {
      let result = {
        operateType: this.operateType,
        error: error,
        file: file,
        fileList: fileList
      };
      this.$emit("upload-fail", result);
    }
  }
};
</script>

<style>
</style>
