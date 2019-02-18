<template>
    <div @click="stopPreview">
        <Form :model="orderInfo" :label-width="80">
            <FormItem label="订单编号">
                <Input v-model="orderInfo.orderno" disabled placeholder="订单编号" class="basic_input"/>
            </FormItem>
            <FormItem label="申请人">
                <Input v-model="orderInfo.contacts" disabled placeholder="" class="basic_input"/>
            </FormItem>
            <FormItem label="联系电话">
                <Input v-model="orderInfo.phonenum" disabled placeholder="联系电话" class="basic_input"/>
            </FormItem>
            <FormItem label="退款理由">
                <Input v-model="orderInfo.note" disabled type="textarea" :rows="5" class="basic_input special"/>
            </FormItem>
            <FormItem label="截图信息">
                <img :src="orderInfo.imgurl" class="img" @click.stop="preview">
            </FormItem>
            <Button type="info" class="pass" @click="confirm">确认</Button>
            <Button type="info" class="refuse" @click="refuse">拒绝</Button>
        </Form>
        <!-- 图片预览框 -->
        <div class="preview_box" v-show="canPreview" v-bind:style="previewBoxStyle" @click.stop></div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            index:"",
            orderNo:"",
            previewImg:"",
            canPreview:false,
            previewBoxStyle:{},
            // 订单详情信息
            orderInfo: {},
            // 拒绝退货理由
            refundReason:""
        }
    },
    created:function() {
        this.orderNo = this.$route.params.orderNo
        this.index = this.$route.params.index
    },
    mounted: function() {
        this.getRefundOrderInfo()
    },
    methods: {
        getRefundOrderInfo:function() {
            let that = this
            let params = {
                    page: 1,
                    pageSize: 10,
                    orderno: this.orderNo,
                    refundstatus: null,
                    created: null,
                    updated: null
                };
                this.request("/mapi/order/queryRefund.do","post",params,function(res) {
                    let result = res.data
                    if (result && result.code === 200 && result.data) {
                        // 渲染表格数据
                        that.orderInfo = result.data.list[0]
                        that.previewImg = result.data.list[0].imgurl
                    }
                }
            );
        },

        /**
         * 确认退款
         */
        confirm:function() {
             let that = this
             this.request("/mapi/order/dealRefund.do","post",{id:this.index,refundstatus:2},function(res) {
                if (res.data && res.data.code === 200) {
                    that.$Notice.success({
                        title: '结果',
                        desc: '操作成功'
                    });
                }
             })
        },

        /**
         * 拒绝退款
         */
        refuse:function() {
            this.showRemarkDialog()
        },

        /**
         * 展示填写备注信息的弹框
         */
        showRemarkDialog: function() {
            this.$Modal.confirm({
                onOk: this.refuseRefund,
                render: h => {
                return h("div", [
                    h("Input", {
                    props: {
                        type: "textarea",
                        placeholder: "输入拒绝退货理由"
                    },
                    on: {
                        input: val => {
                            this.refundReason = val;
                        }
                    }
                    })
                ])
                }
            });
        },

        /**
         * 提交拒绝退货
         */
        refuseRefund:function() {
            let that = this
            let params = {
                id:this.index,
                refundstatus: 1,
                refusednote: this.refundReason
            }
            if(this.refundReason === "") {
                this.$Notice.warning({
                    title: '警告',
                    desc: '请输入拒绝理由'
                });
            } else {
                 that.request("/mapi/order/dealRefund.do","post",params,function(res) {
                   if (res.data && res.data.code === 200) {
                        that.$Notice.success({
                            title: '结果',
                            desc: '操作成功'
                        });
                    }
                })
            }
        },

        /**
         * 图片预览
         */
        preview:function() {
            this.canPreview = true
            this.previewBoxStyle = {
                background: "white url("+ this.previewImg +") no-repeat center center",
                "background-size": "cover"
            }
        },

        /**
         * 停止预览
         */
        stopPreview: function() {
            this.canPreview = false
        }
    }
}
</script>
<style scoped>
    .basic_input{
        width: 300px;
    }

    .img{
        width: 300px;
        height: auto;
        cursor: pointer;
    }

    .pass{
        margin-left: 20px;
    }

    .refuse{
        margin-left: 20px;
    }

    /* 图片预览框 */
    .preview_box{
        width: 600px;
        height:400px;
        position: fixed;
        top: 25%;
        left: 50%;
        box-shadow: 0px 0px 2px 1px gray;
    }
</style>



