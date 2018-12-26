<template>
    <div>
        <Button type="info" @click="toTypeDetail('new',{})">新增分类</Button>
        <Table border :columns="columns" :data="tableData" class="type_table"></Table>
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
                    title:"操作",
                    render:(h,params) => {
                        return h("div",[
                            h('Button',{
                                props:{
                                    type:"info",
                                    size:"small"
                                },
                                on:{
                                    click:() =>{
                                        // 跳转到类型详情页
                                        this.toTypeDetail("modify",params)
                                    }
                                }  
                            },"编辑"),
                            h("Button",{
                                props:{
                                    type:"error",
                                    size:"small"
                                },
                                style:{
                                    marginLeft:"20px"
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
                            },"删除")
                        ])
                        return ;
                    }
                }
            ],
            /**
             * 数据中包含的是一级分类和二级分类，数字列代表的是排序列，调整了数值代表更改了当前类型的排序。
             * 二级菜单前面添加"---",调整二级分类的排序数字只会影响他在二级分类中的顺序。调整一级分类的排序数字只会影响
             * 一级分类的排序，越小越靠前
             */
            tableData:[
                {"typeId":"1","typeName":"日常用品","parentType":"","typeSort":"0","typeStatus":"是"},
                {"typeId":"2","typeName":"---日常用品1","parentType":"日常用品","typeSort":"1","typeStatus":"是"},
                {"typeId":"3","typeName":"---日常用品2","parentType":"日常用品","typeSort":"2","typeStatus":"是"},
                {"typeId":"4","typeName":"---日常用品3","parentType":"日常用品","typeSort":"3","typeStatus":"是"},
                {"typeId":"5","typeName":"---日常用品4","parentType":"日常用品","typeSort":"4","typeStatus":"是"},
                {"typeId":"6","typeName":"---日常用品5","parentType":"日常用品","typeSort":"5","typeStatus":"是"},
                {"typeId":"7","typeName":"---日常用品6","parentType":"日常用品","typeSort":"6","typeStatus":"是"},
                {"typeId":"8","typeName":"---日常用品7","parentType":"日常用品","typeSort":"7","typeStatus":"是"},
                {"typeId":"9","typeName":"---日常用品8","parentType":"日常用品","typeSort":"8","typeStatus":"是"},
                {"typeId":"10","typeName":"---日常用品9","parentType":"日常用品","typeSort":"9","typeStatus":"是"}
            ]
        }
    },
    methods: {

        /**
         * 打开确认框(确认删除该分类)
         */
        delType: function(params) {
            console.log(params)
        },

        /**
         * 跳转到类别详情页
         * @param {String} operateFlag 操作标志： new 新增   modify 修改
         */
        toTypeDetail: function(operateFlag,reqParams) {
            reqParams.flag = operateFlag
            this.$router.push({
                name:"type_detail",
                params: reqParams
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


