<template>
    <div>
        <Input v-model="value" placeholder="订单编号" class="order_head_input first" clearable/>
        <Input v-model="value" placeholder="订单编号" class="order_head_input" clearable/>
        <Input v-model="value" placeholder="订单编号" class="order_head_input" clearable/>
        <Input v-model="value" placeholder="订单编号" class="order_head_input" clearable/>   
        <button @click="getOrderInfo">获取订单信息</button>
    </div>
</template>

<script>
import request from '@/api/request'
export default {
    name: 'order-manage',
    data() {
        return {
            orderNo:""
        }
    },
    methods:{
        /**
         * 获取所有订单信息
         */
        getOrderInfo:function(){
            let formData = new FormData()
            formData.append("page","1")
            formData.append("pageSize","10")
            request("mapi/order/selective.do","post",formData,function(res){
                console.log(res)
            })
        }
    }
}
</script>

<style>
    .order_head_input{
        width: 200px;
        margin-left: 20px;
    }

    .order_head_input.first{
        margin-left: 0px;
    }
</style>

