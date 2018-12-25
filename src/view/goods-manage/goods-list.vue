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
                {"typeId":"5","typeName":"类型名称"},
                {"typeId":"6","typeName":"类型名称"},
                {"typeId":"7","typeName":"类型名称"},
                {"typeId":"8","typeName":"类型名称"},
                {"typeId":"9","typeName":"类型名称"}
            ],
            // 选择的商品标签
            goodsLabel:"",
            // 总的商品标签
            labelList:[
                {"labelId":"1","labelName":"标签名称"},
                {"labelId":"2","labelName":"标签名称"},
                {"labelId":"3","labelName":"标签名称"},
                {"labelId":"4","labelName":"标签名称"},
                {"labelId":"5","labelName":"标签名称"},
                {"labelId":"6","labelName":"标签名称"},
                {"labelId":"7","labelName":"标签名称"},
                {"labelId":"8","labelName":"标签名称"}
            ],
            // 选择的商品状态
            goodsStatus:"1",
            // 商品状态集合
            goodsStatusList:[
                {"statusId":"1","statusName":"已上架"},
                {"statusId":"2","statusName":"已下架"},
                {"statusId":"3","statusName":"已删除"}
            ]
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
</style>


