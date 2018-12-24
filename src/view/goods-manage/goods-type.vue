<template>
    <div>
        <Button type="info" @click="toTypeDetail">新增分类</Button>
        <Table border :columns="columns" :data="tableData" class="type_table"></Table>
        <!-- 分页 -->
        <Page :total="totalPage" show-elevator show-sizer class="type_page" @on-change="changePage" @on-page-size-change="changePageSize"/>
    </div>
</template>

<script>
export default {
    name:"goods-type",
    data() {
        return {
            columns:[
                {title:"分类名称",key:"typeName"},
                {title:"分类排序",key:"typeSort"},
                {title:"是否显示",key:"typeStatus"},
                {
                    title:"编辑",
                    render:(h,params) => {
                        return h('Button',{
                            props:{
                                type:"info"
                            },
                            on:{
                                click:() =>{
                                    // 跳转到类型详情页
                                    this.toTypeDetail()
                                }
                            }  
                        },"编辑");
                    }
                },
                {
                    title:"删除",
                    render:(h,params) => {
                        return h("Button",{
                            props:{
                                type:"error"
                            },
                            on:{
                                click:() =>{
                                    // console.log(params)
                                    // 打开对话框
                                    this.$Modal.confirm({
                                        title: "删除分类",
                                        content: "是否删除该分类及其子分类",
                                        onOk:() => {
                                            this.delType(params)
                                        }
                                    })
                                }
                            }
                        },"删除");
                    }
                }
            ],
            tableData:[
                {"typeName":"日常用品","typeSort":"创建时间倒序","typeStatus":"是"},
                {"typeName":"日常用品","typeSort":"创建时间倒序","typeStatus":"是"},
                {"typeName":"日常用品","typeSort":"创建时间倒序","typeStatus":"是"},
                {"typeName":"日常用品","typeSort":"创建时间倒序","typeStatus":"是"},
                {"typeName":"日常用品","typeSort":"创建时间倒序","typeStatus":"是"},
                {"typeName":"日常用品","typeSort":"创建时间倒序","typeStatus":"是"},
                {"typeName":"日常用品","typeSort":"创建时间倒序","typeStatus":"是"},
                {"typeName":"日常用品","typeSort":"创建时间倒序","typeStatus":"是"},
                {"typeName":"日常用品","typeSort":"创建时间倒序","typeStatus":"是"},
                {"typeName":"日常用品","typeSort":"创建时间倒序","typeStatus":"是"}
            ],
            // 总页数
            totalPage: 100
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
         * 打开确认框(确认删除该分类)
         */
        delType: function(params) {
            console.log(params)
        },

        /**
         * 跳转到类别详情页
         */
        toTypeDetail: function() {
            this.$router.push({
                name:"type_detail"
            })
        }
    }
}
</script>

<style>
    .type_table{
        margin-top: 20px;
    }

    .type_page{
        margin-top: 20px;
    }
</style>


