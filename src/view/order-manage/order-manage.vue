<template>
    <div>
        <button @click="getOrderInfo">获取订单详情</button>
        <!-- 数据绑定 -->
        <input v-model="value">  
        <!-- 获取绑定的值 -->
        <div>{{ value }}</div>
    </div>
</template>

<script>
import request from '@/api/request'
export default {
    name: 'order-manage',
    data() {
        return {
            value:""
        }
    },
    methods:{
        getOrderInfo:function(){
            request("mapi/order/selective.do","post",{"page":"1","pageSize":"10"},function(res){
                console.log(res)
            })
        }
    }
}
</script>

<style>

</style>

