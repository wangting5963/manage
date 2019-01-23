<template>
  <div>
    <div class="step_panel">
      <Steps :current="0">
        <Step title="已支付" content="用户已支付"></Step>
        <Step title="待发货" content="还没有发货信息"></Step>
        <Step title="待收货" content="等待客户确认收货"></Step>
        <Step title="已完成" content="收到货物"></Step>
      </Steps>
    </div>
    <Divider dashed style="margin-top:20px;">订单信息</Divider>
    <div class="demo-split">
        <Split v-model="split">
            <div slot="left" class="demo-split-pane">
                <Form :model="order" :label-width="80">
                    <FormItem label="订单编号">
                        <Input v-model="order.orderId" placeholder="订单编号" class="input_node"/>
                    </FormItem>
                    <FormItem label="支付方式">
                        <Input v-model="order.orderId" placeholder="支付方式" class="input_node"/>
                    </FormItem>
                    <FormItem label="买家账号">
                        <Input v-model="order.orderId" placeholder="买家账号" class="input_node"/>
                    </FormItem>
                    <FormItem label="快递公司">
                        <Input v-model="order.orderId" placeholder="快递公司" class="input_node"/>
                    </FormItem>
                    <FormItem label="快递单号">
                        <Input v-model="order.orderId" placeholder="快递单号" class="input_node"/>
                        <Button type="info" style="margin-left:5px;" @click="showShipmentsDialog">修改</Button>
                    </FormItem>
                    <FormItem label="收货地址">
                        <Input v-model="order.orderId" placeholder="收货地址" class="input_node"/>
                    </FormItem>
                    <FormItem label="买家留言">
                        <Input v-model="order.orderId" placeholder="买家留言" class="input_node"/>
                    </FormItem>
                </Form>
            </div>
            <div slot="right" class="demo-split-pane">
               <Table border :columns="columns" :data="tableData"></Table>
                <!-- 分页 -->
                <Page :total="totalData" show-elevator show-sizer class="page" @on-change="changePage" @on-page-size-change="changePageSize"/>
            </div>
        </Split>
    </div>
    <!-- 订单总计 -->
    <Divider dashed style="margin-top:20px;">订单总计</Divider>
    <div class="total_panel">
      <label class="total _count">总计商品数量：<span class="sum">99</span></label>
      <label class="total _price">总计商品金额：<span class="sum">￥9999.99元</span></label>
    </div>
  </div>
</template>

<script>
export default {
  name: "order-view",
  data() {
    return {
      // 面板分割比例
      split: 0.4,
      page:1,
      pageSize:10,
      // 当前页码
      orderPage: 1,
      // 页面大小
      orderPageSize: 10,
      // 数据总行数
      totalData:10,
      // 当前订单信息
      order: {},
      // 商品表格信息
      columns: [
        {
          title: "商品",
          width:260,
          render: (h, params) => {
            return h(
              "div",
              {
                style: {
                  display: "flex",
                  "align-items": "center"
                }
              },
              [h("div", {
                style: {
                  width: '40px',
                  height: '40px',
                  background: 'url('+ params.row.goods.url +') no-repeat center',
                  backgroundSize: '100% 100%'
                }
              }), h("div",{
                style:{
                  marginLeft: "5px"
                }
              },params.row.goods.name + "/" + params.row.goods.model)] 
            );
          }
        },
        { key: "specifications", title: "规格" },
        { key: "price", title: "价格" },
        { key: "count", title: "数量" ,width:70},
        { key: "score", title: "积分" ,width:70}
      ],
      tableData: [
        {
          goods: {
            url:
              "http://img.jituwang.com/uploads/allimg/151003/258203-1510030RP894.jpg",
            name: "苹果手机",
            model: "IphoneX"
          },
          specifications: "规格1",
          price: "66.60",
          count: "66",
          score: "6888"
        },
        {
          goods: {
            url:
              "http://img.jituwang.com/uploads/allimg/151003/258203-1510030RP894.jpg",
            name: "苹果手机",
            model: "IphoneX"
          },
          specifications: "规格1",
          price: "66.60",
          count: "66",
          score: "6888"
        },
        {
          goods: {
            url:
              "http://img.jituwang.com/uploads/allimg/151003/258203-1510030RP894.jpg",
            name: "苹果手机",
            model: "IphoneX"
          },
          specifications: "规格1",
          price: "66.60",
          count: "66",
          score: "6888"
        },
        {
          goods: {
            url:
              "http://img.jituwang.com/uploads/allimg/151003/258203-1510030RP894.jpg",
            name: "苹果手机",
            model: "IphoneX"
          },
          specifications: "规格1",
          price: "66.60",
          count: "66",
          score: "6888"
        },
        {
          goods: {
            url:
              "http://img.jituwang.com/uploads/allimg/151003/258203-1510030RP894.jpg",
            name: "苹果手机",
            model: "IphoneX"
          },
          specifications: "规格1",
          price: "66.60",
          count: "66",
          score: "6888"
        },
        {
          goods: {
            url:
              "http://img.jituwang.com/uploads/allimg/151003/258203-1510030RP894.jpg",
            name: "苹果手机",
            model: "IphoneX"
          },
          specifications: "规格1",
          price: "66.60",
          count: "66",
          score: "6888"
        },
        {
          goods: {
            url:
              "http://img.jituwang.com/uploads/allimg/151003/258203-1510030RP894.jpg",
            name: "苹果手机",
            model: "IphoneX"
          },
          specifications: "规格1",
          price: "66.60",
          count: "66",
          score: "6888"
        },
        {
          goods: {
            url:
              "http://img.jituwang.com/uploads/allimg/151003/258203-1510030RP894.jpg",
            name: "苹果手机",
            model: "IphoneX"
          },
          specifications: "规格1",
          price: "66.60",
          count: "66",
          score: "6888"
        },
        {
          goods: {
            url:
              "http://img.jituwang.com/uploads/allimg/151003/258203-1510030RP894.jpg",
            name: "苹果手机",
            model: "IphoneX"
          },
          specifications: "规格1",
          price: "66.60",
          count: "66",
          score: "6888"
        },
        {
          goods: {
            url:
              "http://img.jituwang.com/uploads/allimg/151003/258203-1510030RP894.jpg",
            name: "苹果手机",
            model: "IphoneX"
          },
          specifications: "规格1",
          price: "66.60",
          count: "66",
          score: "6888"
        }
      ]
    };
  },
  mounted: function() {
    let orderId = this.$route.params.orderId;
    this.getOrderInfoById(orderId);
  },
  methods: {
    /**
     * 获取指定订单信息（备注：该接口是查询所有订单的接口）
     */
    getOrderInfoById: function(orderId) {
      this.request(
        "/sale/order/selective.do",
        "post",
        { id: orderId, page: this.orderPage, pageSize: this.orderPageSize },
        function(res) {
          let result = res.data;
          if (result && result.code === 200) {
            console.log(result);
          }
        }
      )
    },

    /**
     * 发送快递的弹框
     */
    showShipmentsDialog: function() {
      this.$Modal.confirm({
        onOk: this.confirmShipments,
        render: h => {
          return h("div", [
            h("Input", {
              props: {
                type: "text",
                placeholder: "请填写快递公司",
                clearable: true
              },
              on: {
                input: company => {
                  this.expressCompany = company;
                }
              }
            }),
            h("Input", {
              props: {
                type: "text",
                placeholder: "请填写快递单号",
                clearable: true
              },
              style: {
                marginTop: "10px"
              },
              on: {
                input: number => {
                  this.expressNo = number;
                }
              }
            })
          ]);
        }
      });
    },

    /**
     * 确认发货
     */
    confirmShipments: function() {
      console.log(
        "------确认发货-------快递公司：" +
          this.expressCompany +
          "------------快递单号：" +
          this.expressNo
      );
    },

    /**
     * 更改页码
     */
    changePage: function(pageIndex) {
      this.page = pageIndex;
      // 重新查询订单关联的商品信息
      // this.getOrderInfo(this.page, this.pageSize);
    },

    /**
     * 更改页面大小
     */
    changePageSize: function(pageSize) {
      this.pageSize = pageSize;
    }
  }
};
</script>

<style scoped>
/* 步骤条 */
.step_panel {
  margin-top: 20px;
}
.input_node {
  width: 260px;
}
.page{
  margin-top: 20px;
}
.demo-split {
  height: 600px;
  border: 1px solid #dcdee2;
}
.demo-split-pane {
  padding: 10px;
}
.total_panel{
  display: flex;
  align-items: center;
  justify-content: center;
}
.total{
  width: 50%;
  text-align: center;
  font-size: 16px;
}
.sum{
  color: black;
  font-size: 26px;
}
</style>
