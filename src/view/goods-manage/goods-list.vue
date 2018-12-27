<template>
    <div>
        <!-- 搜索 -->
        <Select v-model="goodsType" style="width:200px" placeholder="请选择商品类型">
            <Option v-for="item in typeList" :value="item.typeId" :key="item.typeId">{{ item.typeName }}</Option>
        </Select>
        <Select v-model="goodsLabel" style="width:200px;margin-left:20px;" placeholder="请选择商品标签">
            <Option v-for="item in labelList" :value="item.labelId" :key="item.labelId">{{ item.labelName }}</Option>
        </Select>
        <Input clearable placeholder="商品Id" class="goods_input"/>
        <Input clearable placeholder="商品型号" class="goods_input"/>
        <Input clearable placeholder="库存<" class="goods_input"/>
        <Input clearable placeholder="商品名称" class="goods_input first_input"/>
        <Select v-model="goodsStatus" style="width:200px;margin-left:20px;margin-top:20px;" placeholder="请选择商品状态">
            <Option v-for="item in goodsStatusList" :value="item.statusId" :key="item.statusId">{{ item.statusName }}</Option>
        </Select>
        <Button type="info" icon="ios-search" style="margin-top:20px;margin-left:20px;" @click="doSearch"></Button>   
        <Button type="info" style="margin-top:20px;margin-left:20px;">添加商品</Button>
        <!-- 数据表格 -->
        <Table style="margin-top:20px;" border :columns="columns" :data="tableData"></Table>
        <!-- 分页 -->
        <Page :total="totalPage" show-elevator show-sizer class="page_index" @on-change="changePage" @on-page-size-change="changePageSize"/>
    </div>
</template>

<script>
export default {
    name:"goods-list",
    data() {
        return {
            // 选择的商品分类
            goodsType: "",
            // 总的商品分类列表
            typeList: [
                {"typeId":"1","typeName":"类型名称"},
                {"typeId":"2","typeName":"类型名称"},
                {"typeId":"3","typeName":"类型名称"},
                {"typeId":"4","typeName":"类型名称"},
                {"typeId":"5","typeName":"类型名称"}
            ],
            // 选择的商品标签
            goodsLabel:"",
            // 总的商品标签
            labelList:[
                {"labelId":"1","labelName":"标签名称"},
                {"labelId":"2","labelName":"标签名称"},
                {"labelId":"3","labelName":"标签名称"},
                {"labelId":"4","labelName":"标签名称"},
                {"labelId":"5","labelName":"标签名称"}
            ],
            // 选择的商品状态
            goodsStatus:"1",
            // 商品状态集合
            goodsStatusList:[
                {"statusId":"1","statusName":"已上架"},
                {"statusId":"2","statusName":"已下架"},
                {"statusId":"3","statusName":"已删除"}
            ],
            // 表格列
            columns:[
                {title:"ID",key:"goodsId",width:50},
                {title:"商品名称",key:"goodsName"},
                {title:"积分值",key:"goodsScore"},
                {title:"商品价格",key:"goodsPrice"},
                {title:"商品库存",key:"goodsStore"},
                {title:"商品分类",key:"goodsType"},
                {title:"是否显示",key:"goodsShowStatus"},
                {title:"操作",render:(h,params) =>{
                        return h("div",[
                            h("div",{style:{marginTop:"2px",marginBottom:"2px"}},[
                                h("Button",{
                                    props:{
                                        type:"info",
                                        size:"small"
                                    }
                                },"编辑"),
                                h("Button",{
                                    props:{
                                        type:"error",
                                        size:"small"
                                    },
                                    style:{
                                        marginLeft:"10px"
                                    }
                                },"删除")
                            ])
                        ])
                    }
                }
            ],
            // 表格数据
            tableData:[
                {"goodsId":"1","goodsName":"华为手机","goodsScore":"10000","goodsPrice":"999.0","goodsStore":"66","goodsType":"移动设备","goodsShowStatus":"是"},
                {"goodsId":"2","goodsName":"华为手机","goodsScore":"10000","goodsPrice":"999.0","goodsStore":"66","goodsType":"移动设备","goodsShowStatus":"是"},
                {"goodsId":"3","goodsName":"华为手机","goodsScore":"10000","goodsPrice":"999.0","goodsStore":"66","goodsType":"移动设备","goodsShowStatus":"是"},
                {"goodsId":"4","goodsName":"华为手机","goodsScore":"10000","goodsPrice":"999.0","goodsStore":"66","goodsType":"移动设备","goodsShowStatus":"是"},
                {"goodsId":"5","goodsName":"华为手机","goodsScore":"10000","goodsPrice":"999.0","goodsStore":"66","goodsType":"移动设备","goodsShowStatus":"是"},
                {"goodsId":"6","goodsName":"华为手机","goodsScore":"10000","goodsPrice":"999.0","goodsStore":"66","goodsType":"移动设备","goodsShowStatus":"是"},
                {"goodsId":"7","goodsName":"华为手机","goodsScore":"10000","goodsPrice":"999.0","goodsStore":"66","goodsType":"移动设备","goodsShowStatus":"是"},
                {"goodsId":"8","goodsName":"华为手机","goodsScore":"10000","goodsPrice":"999.0","goodsStore":"66","goodsType":"移动设备","goodsShowStatus":"是"},
                {"goodsId":"9","goodsName":"华为手机","goodsScore":"10000","goodsPrice":"999.0","goodsStore":"66","goodsType":"移动设备","goodsShowStatus":"是"},
                {"goodsId":"10","goodsName":"华为手机","goodsScore":"10000","goodsPrice":"999.0","goodsStore":"66","goodsType":"移动设备","goodsShowStatus":"是"}
            ],

            // 总页数
            totalPage:100,

            /**
            * 更改页码
            */
            changePage: function (pageIndex) {
                //    this.pageIndex = pageIndex
                console.log(pageIndex)
                // request("v1/user/userInfo","get",null,function(data){
                //     console.log(data)
                // })
            },

            /**
                * 更改页面大小
                */
            changePageSize: function (pageSize) {
                console.log(pageSize)
                //    this.pageSize = pageSize
            },

            /**
             * 执行搜索
             */
            doSearch:function() {
                console.log("搜索")
            }
        }
    }
}
</script>

<style>
    .goods_input{
        width: 200px;
        margin-left: 20px;
    }
    .first_input{
        margin-left: 0px;
        margin-top: 20px;
    }
    .page_index{
        margin-top: 20px;
    }
</style>


