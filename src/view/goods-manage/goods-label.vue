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
                    title:"编辑",
                    render:(h,params) => {
                        return h("Button",{
                            props:{
                                type:'info'
                            },
                            on: {
                                click: () =>{
                                   this.showDialog('modify',params)
                                }
                            }
                        },"编辑")
                    }
                },
                {
                    title:"删除",
                    render:(h,params) => {
                        return h("Button",{
                            props:{
                                type:'error'
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
                    }
                }
            ],
            tableData:[
                {"labelName":"安全","relateGoodsNum":1000},
                {"labelName":"黑科技","relateGoodsNum":2000},
                {"labelName":"绿色","relateGoodsNum":3000},
                {"labelName":"绿色","relateGoodsNum":3000},
                {"labelName":"绿色","relateGoodsNum":3000},
                {"labelName":"绿色","relateGoodsNum":3000},
                {"labelName":"绿色","relateGoodsNum":3000},
                {"labelName":"绿色","relateGoodsNum":3000},
                {"labelName":"绿色","relateGoodsNum":3000},
                {"labelName":"绿色","relateGoodsNum":3000}
            ],
            totalPage: 100,

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
            let defaultValue = ""
            if ("modify" === flag) {
                defaultValue = romInfo.row.labelName
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
            console.log(romInfo)
            if ("new" === flag) {
                console.log(flag)
            } else if ("modify" === flag) {
                console.log(flag)
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


