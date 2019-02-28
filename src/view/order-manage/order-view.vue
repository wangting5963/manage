<template>
  <div>
    <div class="step_panel">
      <Steps :current="currentStep">
        <Step title="待支付" content="用户未支付"></Step>
        <Step title="已支付" content="用户已支付"></Step>
        <Step title="处理中" content="订单处理中"></Step>
        <Step title="已完成" content="收到货物"></Step>
        <Step title="已删除" content="收到货物"></Step>
      </Steps>
    </div>
    <Divider dashed style="margin-top:20px;">订单信息</Divider>
    <div class="demo-split">
      <Split v-model="split">
        <div slot="left" class="demo-split-pane">
          <Form :model="order" :label-width="80">
            <FormItem label="订单编号">
              <Input disabled v-model="order.orderno" placeholder="订单编号" class="input_node"/>
            </FormItem>
            <FormItem label="支付方式">
              <Input disabled v-model="order.paytype" placeholder="支付方式" class="input_node"/>
            </FormItem>
            <FormItem label="快递公司">
              <Input disabled v-model="order.expressname" placeholder="快递公司" class="input_node"/>
            </FormItem>
            <FormItem label="快递单号">
              <Input disabled v-model="order.expresscode" placeholder="快递单号" class="input_node"/>
              <Button type="info" style="margin-left:5px;" @click="showShipmentsDialog">修改</Button>
            </FormItem>
            <FormItem label="收货地址">
              <Input disabled v-model="order.address" placeholder="收货地址" class="input_node"/>
            </FormItem>
            <FormItem label="买家电话">
              <Input disabled v-model="order.phonenum" placeholder="买家留言" class="input_node"/>
            </FormItem>
          </Form>
        </div>
        <div slot="right" class="demo-split-pane">
          <Table border :columns="columns" :data="tableData"></Table>
        </div>
      </Split>
    </div>
    <!-- 订单总计 -->
    <Divider dashed style="margin-top:20px;">订单总计</Divider>
    <div class="total_panel">
      <label class="total _count">总计商品数量：<span class="sum">{{ goodsCount }}</span></label>
      <label class="total _price">总计商品金额：<span class="sum">￥{{ orderTotalPrice }}元</span></label>
    </div>
  </div>
</template>

<script>
  export default {
    name: "order-view",
    data() {
      return {
        // 订单当前执行步骤
        currentStep: 0,
        // 面板分割比例
        split: 0.4,
        // 当前订单信息
        order: {},
        // 订单总价
        orderTotalPrice: 0,
        // 订单中商品的总数量
        goodsCount: 0,
        // 商品表格信息
        columns: [
          {
            title: "商品",
            width: 260,
            render: (h, params) => {
              return h(
                "div",
                {
                  style: {
                    display: "flex",
                    "align-items": "center"
                  }
                },
                [
                  h("div", {
                    style: {
                      width: "40px",
                      height: "40px",
                      background:
                      // "url(" + params.row.goods.url + ") no-repeat center",
                        "url('" + params.row.goodsimg + "') no-repeat center",
                      backgroundSize: "100% 100%"
                    }
                  }),
                  h(
                    "div",
                    {
                      style: {
                        marginLeft: "5px"
                      }
                    },
                    // params.row.goods.name + "/" + params.row.goods.model
                    params.row.goodsname
                  )
                ]
              );
            }
          },

          {key: "unitprice", title: "单格"},
          {key: "amount", title: "数量", width: 70},
          {key: "totalprice", title: "总价"},
          {
            title: "操作",
            render: (h, params) => {
              return h("div", [
                h("div", {style: {marginTop: "2px", marginBottom: "2px"}}, [

                  h(
                    "Button",
                    {
                      props: {
                        type: "error",
                        size: "small"
                      },
                      style: {
                        marginLeft: "10px"
                      },
                      on: {
                        click: () => {
                          this.$Modal.confirm({
                            title: "退款",
                            content: "是否确认退款该商品？",
                            onOk: () => {
                              this.orderDetailRefund(params.row.id);
                            }
                          });
                        }
                      }
                    },
                    "退款"
                  )
                ])
              ]);
            }
          }


        ],
        tableData: []
      };
    },
    mounted: function () {
      let orderId = this.$route.params.orderId;
      this.getOrderInfoById(orderId);
    },
    methods: {
      /**
       * 获取指定订单信息（备注：该接口是查询所有订单的接口）
       */
      getOrderInfoById: function (orderId) {
        let that = this;
        this.request("/mapi/order/select.do", "post", {id: orderId}, function (res) {
          let result = res.data
          if (result && result.code === 200) {
            // 订单信息
            let orderInfo = result.data;
            if (orderInfo && orderInfo.list) {
              that.order = orderInfo;
              that.currentStep = orderInfo.orderstatus - 1;
              that.tableData = orderInfo.list;
              that.goodsCount = orderInfo.list.length;
              that.orderTotalPrice = orderInfo.orderprice;
            }
          }
        })
      },

      /**
       * 发送快递的弹框
       */
      showShipmentsDialog: function () {
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
      confirmShipments: function () {
        console.log(
          "------确认发货-------快递公司：" +
          this.expressCompany +
          "------------快递单号：" +
          this.expressNo
        );
      },
      /**
       * 商品退款
       */
      orderDetailRefund: function (detailId) {
        let that = this;
        this.request("/mapi/order/orderDetailRefund.do", "post", {detailId: detailId}, function (res) {
          let result = res.data;
          if (result && result.code === 200) {
            that.$Notice.success({
              title: '该商品已退款，订单已修改!'
            })
          } else {
            that.$Notice.warning({
              title: result.msg
            })
          }
        })
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

  .page {
    margin-top: 20px;
  }

  .demo-split {
    height: 600px;
    border: 1px solid #dcdee2;
  }

  .demo-split-pane {
    padding: 10px;
  }

  .total_panel {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .total {
    width: 50%;
    text-align: center;
    font-size: 16px;
  }

  .sum {
    color: black;
    font-size: 26px;
  }
</style>
