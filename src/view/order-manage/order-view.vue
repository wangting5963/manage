<template>
  <div>
    <div>
      <Steps :current="1">
        <Step title="已支付" content="用户已支付"></Step>
        <Step title="待发货" content="还没有发货信息"></Step>
        <Step title="待收货" content="等待客户确认收货"></Step>
        <Step title="已完成" content="收到货物"></Step>
      </Steps>
    </div>
    <div style="margin-top: 20px">
      <label>
        订单编号：<Input v-model="order.orderNo" class="order_head_input first" clearable/>
      </label>
      <label> 订单状态：
        <Input v-model="order.orderstatusStr" class="order_head_input first" clearable/>
      </label>
      <label>
        订单金额：
        <Input v-model="order.orderprice" class="order_head_input first" clearable/>
      </label>
      <label> 创建时间：
        <Input v-model="order.creattime" class="order_head_input first" clearable/>
      </label>
    </div>
  </div>

</template>

<script>
export default {
  name: 'order-view',
  data () {
    return {
      order: {}
    }
  },
  mounted: function () {
    // this.$Message.info("id=" + this.$router.params.id);
    let orderId = this.$router.params.id
    this.$Message.info(orderId)
    this.getOrderInfoById(orderId)
  },
  methods: {

    getOrderInfoById: function (orderId) {
      this.request('/sale/order/selective.do', 'post', { 'id': orderId }, function (res) {
        let result = res.data

        console.log(result)
        if (result && result.code === 200) {
          // 渲染表格数据
          that.tableData = result.data.list
          // 设置数据总行数
          that.totalDataLong = result.data.total
        }
      })
    }

  }
}
</script>

<style scoped>

</style>
