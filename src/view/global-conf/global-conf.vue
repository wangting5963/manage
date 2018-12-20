<template>
    <div>
        <!-- 搜索框 -->
        <Input search placeholder="配置项名称" class="conf_search" @on-search="doSearch" v-model="searchInfo"/>
        <!-- 表格 -->
        <Table stripe border :columns="columns1" :data="data1" class="info_table"></Table>
        <!-- 分页 -->
        <Page :total="100" show-elevator class="page_index"/>
    </div>
</template>

<script>
export default {
    name: 'global-conf',
    data() {
        return {
            searchInfo: "",
            columns1: [
                {
                    title:"配置项名",
                    key:"configName"
                },
                {
                    title:"配置项值",
                    key:"configContent"
                },
                {
                    title:"操作",
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        this.showConfirm(params)
                                    }
                                }
                            }, '修改')]);
                    }
                }

            ],
            data1:[
                {configName:"会员标签",configContent:"普通会员"},
                {configName:"积分来源",configContent:"每日签到"},
                {configName:"积分来源",configContent:"每日签到"},
                {configName:"积分来源",configContent:"每日签到"},
                {configName:"积分来源",configContent:"每日签到"},
                {configName:"积分来源",configContent:"每日签到"},
                {configName:"积分来源",configContent:"每日签到"}
            ],
            // 修改后的配置项内容
            modifyContent: ""
        }
    },
    methods: {
       /**
        * 执行搜索
        */
       doSearch: function() {
           console.log(this.searchInfo)
           this.searchInfo = ""
       },
       /**
        * 弹出修改配置项信息弹框
        * @param {Obejct} params 父级元素传递过来的参数
        */
       showConfirm: function(params) {
           let that = this
           that.modifyContent = params.row.configContent
           that.$Modal.confirm({
               title:"修改配置项",
               onOk:that.confirmModify,
               render:(h) => {
                   return h("div",
                        [
                            h("Input",{
                                props: {
                                    type: "text",
                                    value: params.row.configName,
                                    disabled: true
                                }
                            }),
                            h("Input",{
                                props: {
                                    type: "text",
                                    value: that.modifyContent,
                                    clearable:true
                                },
                                style:{
                                    marginTop: "10px"
                                },
                                on:{
                                    input: function(event) {
                                        that.modifyContent = event
                                    }
                                }
                            }),
                        ]
                   )
               }
           })
       },
       /**
        * 确认修改配置项
        * @param {String} content 修改后的内容
        */
       confirmModify: function(content) {
           console.log(this.modifyContent)
       }
    }
}
</script>

<style>
    .conf_search{
        width: 300px;
    }

    .info_table{
        margin-top: 50px;
    }

    .page_index{
        margin-top: 50px ;
    }
</style>

