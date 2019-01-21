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
                        <Input v-model="basicInfo.goodsName" placeholder="商品主图" class="basic_input"/>
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
                    <FormItem label="图片">
                        <Input v-model="basicInfo.goodsName" placeholder="图片" class="basic_input"/>
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
                         <div>
                            <div class="demo-upload-list" v-for="item in shareImgUploadList" :key="item.id">
                                <template v-if="item.status === 'finished'">
                                    <img :src="item.url">
                                    <div class="demo-upload-list-cover">
                                        <Icon type="ios-eye-outline" @click.native="handleViewUserImg(item.name)"></Icon>
                                        <Icon type="ios-trash-outline" @click.native="handleRemoveUserImg(item)"></Icon>
                                    </div>
                                </template>
                                <template v-else>
                                    <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                                </template>
                            </div>
                            <Upload
                                ref="uploadShareImg"
                                :show-upload-list="false"
                                :default-file-list="shareImgDefaultList"
                                :on-success="handleShareImgSuccess"
                                :format="['jpg','jpeg','png']"
                                :max-size="10240"
                                :on-format-error="handleFormatError"
                                :on-exceeded-size="handleMaxSize"
                                :before-upload="handleShareImgBeforeUpload"
                                multiple
                                type="drag"
                                action="//jsonplaceholder.typicode.com/posts/"
                                style="display: inline-block;width:58px;">
                                <!-- 放置相机图标 -->
                                <div style="width: 58px;height:58px;line-height: 58px;">
                                    <Icon type="ios-camera" size="20"></Icon>
                                </div>
                            </Upload>
                            <!-- 图片预览窗口 -->
                            <Modal title="图片预览" v-model="shareImgVisible">
                                <img :src="'http://pic43.photophoto.cn/20170506/0470102348231008_b.jpg'" v-if="shareImgVisible" style="width: 100%">
                            </Modal>
                        </div>
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
import Editor from "wangeditor";
import "wangeditor/release/wangEditor.min.css";
export default {
  name: "goods_detail",
  components: {
    Editor
  },
  data() {
    return {
      operateFlag: "",
      goodsId: "",
      // 富文本编辑器对象
      editorObj: {},
      // 选中的菜单项
      selectTab: "1",
      // 基本信息
      basicInfo: {
        goodsName: "",
        goodsType: "",
        goodsLabel: []
      },
      // 商品规格信息
      specificationInfo: {
        sName: "",
        sItems: "",
        sImg: "",
        linePrice: "",
        salePrice: "",
        costprice: "",
        inventory: "",
        model: ""
      },
      // 分享信息
      shareInfo: {
        shareTitle: "",
        shareDesc: "",
        shareImg: ""
      },
      shareImgDefaultList:[],
      shareImgName: '',
      shareImgVisible: false,
      shareImgUploadList:[],
    };
  },
  created: function() {
    this.operateFlag = this.$route.params.flag;
    this.goodsId = this.$route.params.goodsId;
    console.log(this.operateFlag + "------" + this.goodsId);
  },
  mounted: function() {
    this.initEditor();
    // 获取上传的分享图片
    this.shareImgUploadList = this.$refs.uploadShareImg.fileList
  },
  methods: {
    /**
     * 选中tab
     */
    selectItem: function(name) {
      console.log(typeof name);
      this.selectTab = name;
    },

    /**
     * 初始化富文本编辑框
     */
    initEditor: function() {
      // 初始化富文本编辑器
      var editor = new Editor("#editor");
      editor.create();
      this.editorObj = editor;
    },

    // #################分享：上传图片##################
    /**
     * 预览用户头像
     * @param {String} name 图片名称
     */
    handleViewUserImg(name) {
      this.shareImgName = name;
      this.shareImgVisible = true;
    },

    /**
     * 移除用户头像
     * @param {Object} file 要移除的图片
     */
    handleRemoveUserImg(file) {
      const fileList = this.$refs.uploadShareImg.fileList;
      this.$refs.uploadShareImg.fileList.splice(fileList.indexOf(file), 1);
    },

    /**
     * 上传用户头像成功回调
     *
     */
    handleShareImgSuccess: function(res, file) {
      console.log("上传用户头像成功");
      // file.url = 'https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar';
      // file.name = '7eb99afb9d5f317c912f08b5212fd69a';
      console.log(res);
      console.log(file);
    },

    /**
     * 上传用户头像之前的回调函数
     */
    handleShareImgBeforeUpload: function() {
      const check = this.shareImgUploadList.length < 1;
      if (!check) {
        this.$Notice.warning({
          title: "最多上传一张用户头像"
        });
      }
      return check;
    },

    /**
     * 上传文件格式错误的回调函数
     */
    handleFormatError(file) {
      this.$Notice.warning({
        title: "文件格式错误",
        desc: "请上传JPG或者PNG格式的图片"
      });
    },

    /**
     * 上传文件过大回调函数
     */
    handleMaxSize(file) {
      this.$Notice.warning({
        title: "文件过大",
        desc: "上传图片大小不能超过10M"
      });
    }
  }
};
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

