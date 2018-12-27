<template>
    <div>
         <Form :v-model="formData" label-position="left" :label-width="100" class="my_form">
            <FormItem label="标题">
                <Input clearable class="content_detail_input special" v-model="formData.title" placeholder="输入内容标题"/>
            </FormItem>
            <FormItem label="作者头像">
                <!-- 作者头像 -->
                <div>
                    <div class="demo-upload-list" v-for="item in userImgUploadList" :key="item.id">
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
                        ref="uploadUserImg"
                        :show-upload-list="false"
                        :default-file-list="userImgDefaultList"
                        :on-success="handleUserImgSuccess"
                        :format="['jpg','jpeg','png']"
                        :max-size="10240"
                        :on-format-error="handleFormatError"
                        :on-exceeded-size="handleMaxSize"
                        :before-upload="handleUserImgBeforeUpload"
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
                    <Modal title="图片预览" v-model="userImgVisible">
                        <img :src="'http://pic43.photophoto.cn/20170506/0470102348231008_b.jpg'" v-if="userImgVisible" style="width: 100%">
                    </Modal>
                </div>
            </FormItem>
            <FormItem label="作者姓名">
                <Input clearable v-model="formData.author" style="width:260px;" placeholder="输入作者名称"/>
            </FormItem>
            <FormItem label="封面图片">
                <div>
                    <div class="demo-upload-list" v-for="item in uploadList" :key="item.id">
                        <template v-if="item.status === 'finished'">
                            <img :src="item.url">
                            <div class="demo-upload-list-cover">
                                <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
                                <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                            </div>
                        </template>
                        <template v-else>
                            <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                        </template>
                    </div>
                    <Upload
                        ref="upload"
                        :show-upload-list="false"
                        :default-file-list="defaultList"
                        :on-success="handleSuccess"
                        :format="['jpg','jpeg','png']"
                        :max-size="10240"
                        :on-format-error="handleFormatError"
                        :on-exceeded-size="handleMaxSize"
                        :before-upload="handleBeforeUpload"
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
                    <Modal title="图片预览" v-model="visible">
                        <img :src="'http://pic43.photophoto.cn/20170506/0470102348231008_b.jpg'" v-if="visible" style="width: 100%">
                    </Modal>
                </div>
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
import Editor from 'wangeditor'
import 'wangeditor/release/wangEditor.min.css'
export default {
    data() {
        return {
            // 表单内容
            formData:{
                title:"内容标题",
                author:"作者名称",
                authorImg:"http://pic43.photophoto.cn/20170506/0470102348231008_b.jpg"
            },
            // ********上传图片部分*********
            
            // 上传用户头像
            userImgDefaultList:[],
            userImgName: '',
            userImgVisible: false,
            userImgUploadList:[],

            // 内容封面默认图片
            defaultList: [
                    // {
                    //     'name': 'a42bdcc1178e62b4694c830f028db5c0',
                    //     'url': 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar'
                    // }
            ],
            imgName: '',
            visible: false,
            uploadList: [],
            // 富文本编辑器对象
            editorObj:{}
        }
    },
    components:{
        Editor
    },
    methods:{

        /**
         * 提交表单
         */
        submitForm:function() {
            console.log("提交表单")
            console.log("-------------富文本编辑框内容------------")
            console.log(this.editorObj.txt.html())
            console.log(this.editorObj.txt.text())
        },

        /**
         * 返回：内容列表页
         */
        goBack:function() {
            this.$router.back()
        },

        /**
         * 预览内容
         */
        preview:function() {
            console.log("预览内容")
        },

        // *********上传图片部分 START**********
        /**
         * 预览封面图片
         * @param {String} name 图片名称
         */
        handleView (name) {
            this.imgName = name;
            this.visible = true;
        },

        /**
         * 预览用户头像
         * @param {String} name 图片名称
         */
        handleViewUserImg (name) {
            this.userImgName = name;
            this.userImgVisible = true;
        },
        
        /**
         * 移除封面图片
         * @param {Object} file 要移除的图片
         */
        handleRemove (file) {
            const fileList = this.$refs.upload.fileList;
            this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
        },

        /**
         * 移除用户头像
         * @param {Object} file 要移除的图片
         */
        handleRemoveUserImg (file) {
            const fileList = this.$refs.uploadUserImg.fileList;
            this.$refs.uploadUserImg.fileList.splice(fileList.indexOf(file), 1);
        },

        /***
         * 上传成功后的回调函数
         */
        handleSuccess (res, file) {
            console.log("上传封面成功")
            // file.url = 'https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar';
            // file.name = '7eb99afb9d5f317c912f08b5212fd69a';
            console.log(res)
            console.log(file)
        },

        /**
         * 上传用户头像成功回调
         * 
         */
        handleUserImgSuccess:function(res, file) {
            console.log("上传用户头像成功")
            // file.url = 'https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar';
            // file.name = '7eb99afb9d5f317c912f08b5212fd69a';
            console.log(res)
            console.log(file)
        },
        

        /**
         * 上传封面之前的回调函数
         * @param {String} flag 标志：cover 封面、 userImg 用户头像
         */
        handleBeforeUpload () {
            const check = this.uploadList.length < 1;
            if (!check) {
                this.$Notice.warning({
                    title: '最多上传一张封面'
                });
            }
            return check;
        },

        /**
         * 上传用户头像之前的回调函数
         */
        handleUserImgBeforeUpload:function() {
            const check = this.userImgUploadList.length < 1;
            if (!check) {
                this.$Notice.warning({
                    title: '最多上传一张用户头像'
                });
            }
            return check;
        },

        /**
         * 上传文件格式错误的回调函数
         */
        handleFormatError (file) {
            this.$Notice.warning({
                title: '文件格式错误',
                desc: '请上传JPG或者PNG格式的图片'
            });
        },

        /**
         * 上传文件过大回调函数
         */
        handleMaxSize (file) {
            this.$Notice.warning({
                title: '文件过大',
                desc: '上传图片大小不能超过10M'
            });
        },
        // *********上传图片部分 END**********

        /**
         * 初始化富文本编辑框
         */
        initEditor:function() {
            // 初始化富文本编辑器
            var editor = new Editor('#editor')
            editor.create()
            this.editorObj = editor
        }
    },
    mounted () {
        this.initEditor()
        // 获取上传的用户头像
        this.userImgUploadList = this.$refs.uploadUserImg.fileList
        // 获取上传的内容封面
        this.uploadList = this.$refs.upload.fileList
    }
}
</script>
<style>
    .content_detail_btn{
        width:80px;
        margin-left: 20px;
    }
    .content_detail_btn.special{
        margin-left: 0px;
    }
    .user_img{
        display: block;
        width: 100px;
        height: 100px;
    }
    .content_detail_input{
        width: 120px;
        margin-top: 10px;
    }
    .content_detail_input.special{
        width: 260px;
        margin-top: 0px;
    }
    /* 上传图片部分 START*/
    .demo-upload-list{
        display: inline-block;
        width: 60px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        margin-right: 4px;
    }
    .demo-upload-list img{
        width: 100%;
        height: 100%;
    }
    .demo-upload-list-cover{
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
    }
    .demo-upload-list:hover .demo-upload-list-cover{
        display: block;
    }
    .demo-upload-list-cover i{
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
    }
    /* 上传图片部分 END*/
</style>
