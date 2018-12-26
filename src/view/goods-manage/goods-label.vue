<template>
    <div>
        <Button type="info" @click="showDialog('new')">新增标签</Button>
        <Table border :columns="columns" :data="tableData" class="label_table"></Table>
        <Page :total="totalPage" show-elevator show-sizer class="label_page" @on-change="changePage" @on-page-size-change="changePageSize"/>
    </div>
</template>

<script>
export default {
    name:"goods-label",
    data() {
        return {
            columns:[
                {title:"标签名称",key:"labelName"},
                {title:"关联商品数（个）",key:"relateGoodsNum"},
                {
                    title:"操作",
                    render:(h,params) => {
                        return h("div",[
                            h("Button",{
                                props:{
                                    type:'info',
                                    size:'small'
                                },
                                on: {
                                    click: () =>{
                                    this.showDialog('modify',params)
                                    }
                                }
                            },"编辑"),
                            h("Button",{
                                props:{
                                    type:'error',
                                    size:'small'
                                },
                                style:{
                                    marginLeft:"20px"
                                },
                                on: {
                                click: () =>{
                                    this.$Modal.confirm({
                                            title: "删除标签",
                                            content: "是否删除该标签",
                                            onOk:() => {
                                                this.delLabel(params) 
                                            }
                                        })
                                    }
                                }
                            },"删除")
                        ])
                        return 
                    }
                }
            ],
            tableData:[
                {"labelId":"1","labelName":"安全","relateGoodsNum":1000},
                {"labelId":"2","labelName":"黑科技","relateGoodsNum":2000},
                {"labelId":"3","labelName":"绿色","relateGoodsNum":3000},
                {"labelId":"4","labelName":"绿色","relateGoodsNum":3000},
                {"labelId":"5","labelName":"绿色","relateGoodsNum":3000},
                {"labelId":"6","labelName":"绿色","relateGoodsNum":3000},
                {"labelId":"7","labelName":"绿色","relateGoodsNum":3000},
                {"labelId":"8","labelName":"绿色","relateGoodsNum":3000},
                {"labelId":"9","labelName":"绿色","relateGoodsNum":3000},
                {"labelId":"10","labelName":"绿色","relateGoodsNum":3000}
            ],
            totalPage: 100,
            // 修改后的标签值
            newLabel:""
        }
    },
    methods: {
        /**
         * 调整页码
         */
        changePage: function (pageIndex) {
            console.log("当前页码:"+ pageIndex)
        },

        /**
         * 调整页面大小
         */
        changePageSize:function (pageSize) {
            console.log("页面大小:"+ pageSize)
        },

        /**
         * 弹出修改或者新增标签的弹框
         * @param {String} flag new:新增  modify:修改
         * @param {Object} romInfo 当前点击行信息
         */
        showDialog: function(flag,romInfo) {
            let that = this
            // 清空变量
            that.newLabel = ""
            let defaultValue = ""
            if ("modify" === flag) {
                defaultValue = romInfo.row.labelName
                this.newLabel = defaultValue
            }
            this.$Modal.confirm({
                onOk:() => {
                    that.addOrModiifyLabel(flag,romInfo)
                },
                render:(h) => {
                    return h("Input",{
                        props:{
                            placeholder: '新的标签名称',
                            value: defaultValue
                        },
                        on:{
                            input:function(info) {
                                that.newLabel = info
                            }
                        }
                    })
                }
            })
        },

        /**
         * 新增或者修改标签
         * @param {String} flag new:新增  modify:修改
         * @param {Object} romInfo 当前点击行信息
         */
        addOrModiifyLabel: function(flag,romInfo) {
            if ("new" === flag) {
                console.log("新的标签名称为：" + this.newLabel)
            } else if ("modify" === flag) {
                console.log("当前修改项为：" + romInfo.row.labelId)
                console.log("修改后的标签值为：" + this.newLabel)
            }
        },

        /**
         * 删除指定标签
         * @param {Object} romInfo 当前点击行信息
         */
        delLabel: function(romInfo) {
            console.log(romInfo)
        }
    }
}
</script>

<style>
    .label_table{
        margin-top: 20px;
    }

    .label_page{
        margin-top: 20px;
    }
</style>


