<template>
  <div>
    <div class="step_panel">
      <Steps :current="currentStep">
        <Step title="待支付" content="用户未支付"></Step>
        <Step title="待发货" content="用户已支付"></Step>
        <Step title="待收货" content="货物运输中"></Step>
        <Step title="已完成" content="收到货物"></Step>
        <Step title="已取消" content="定单取消"></Step>
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
            <!--<FormItem label="快递公司">-->
            <!--<Input disabled v-model="order.expressname" placeholder="快递公司" class="input_node"/>-->
            <!--</FormItem>-->
            <!--<FormItem label="快递单号">-->
            <!--<Input disabled v-model="order.expresscode" placeholder="快递单号" class="input_node"/>-->
            <!--<Button type="info" style="margin-left:5px;" @click="showShipmentsDialog">修改</Button>-->
            <!--</FormItem>-->
            <FormItem label="收货地址">
              <Input disabled v-model="order.address" placeholder="收货地址" class="input_node"/>
            </FormItem>
            <FormItem label="买家电话">
              <Input disabled v-model="order.phonenum" placeholder="买家留言" class="input_node"/>
            </FormItem>
            <FormItem label="备注">
              <Input disabled v-model="order.note" placeholder="备注" class="input_node"/>
            </FormItem>
          </Form>
        </div>
        <div slot="right" class="demo-split-pane">
          <Button type="primary" style="margin-right: 5px;margin-bottom: 10px" @click="setExpress()">发货</Button>
          <Table border stripe :columns="columns" :data="tableData" @on-selection-change="setDetail"></Table>
        </div>
      </Split>
    </div>
    <!-- 订单总计 -->
    <Divider dashed style="margin-top:20px;">订单总计</Divider>
    <div class="total_panel">
      <label class="total _count">总计商品数量：<span class="sum">{{ goodsCount }}</span></label>
      <label class="total _price">总计商品金额：<span class="sum">￥{{ orderTotalPrice }}元</span></label>
    </div>


    <div>
      <Modal
        title="快递信息"
        v-model="model_express"
        :mask-closable="false">
        <div class="total_panel" style="margin-bottom: 10px">
          <Select v-model="express" class="basic_input" placeholder="请选择物流公司">
            <Option :value="configItem.configcode+','+configItem.configname" v-for="configItem in expressList"
                    :key="configItem.id">
              {{ configItem.configname }}
            </Option>
          </Select>
          <Input v-model="expressNo" placeholder="请输入快递单号" class="basic_input"/>
        </div>
        <Input v-model="note" type="textarea" :rows="4" placeholder="备注信息..."/>
        <!--自定义按钮，否则点击确定验证失败也会关闭modal-->
        <div slot="footer">
          <Button type="text" size="large" @click="model_express=false">取消</Button>
          <Button type="primary" size="large" @click="upsertExpress">确定</Button>
        </div>
      </Modal>


    </div>

  </div>
</template>

<script>
  export default {
    name: "order-view",
    data() {
      return {
        model_express: false,
        //物流信息
        express: "",
        expressNo: "",
        note: "",
        // 物流公司
        expressList: [],
        //需要发货的订单detail
        detailIdList: [],
        // 订单当前执行步骤
        currentStep: 0,
        // 面板分割比例
        split: 0.3,
        // 当前订单信息
        order: {},
        // 订单总价
        orderTotalPrice: 0,
        // 订单中商品的总数量
        goodsCount: 0,
        orderNo: "",
        // 商品表格信息
        columns: [
          {
            type: 'selection',
            width: 60,
            align: 'center',
            key: 'id'
          },
          {
            title: "商品",
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
                        "url('" + params.row.goodsImg + "') no-repeat center",
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
                    params.row.goodsName
                  )
                ]
              );
            }
          },

          {key: "unitPrice", title: "单价"},
          {key: "amount", title: "数量"},
          {key: "totalPrice", title: "总价"},
          {key: "detailStatusStr", title: "状态"},
          {key: "expressName", title: "物流公司"},
          {key: "expressNo", title: "快递单号"}
        ],
        tableData: []
      };
    },
    mounted: function () {
      // let orderId = this.$route.params.orderId;

      this.orderNo = this.$route.params.orderNo;

      this.getOrderInfoById();
      this.getSysConfig();
      this.selectDetShipByOrderNo();
    },
    methods: {
      /**
       * 获取指定订单信息（备注：该接口是查询所有订单的接口）
       */
      getOrderInfoById: function () {
        let that = this;
        this.request("/mapi/order/selectOrderByOrderNo.do", "get", null, {orderNo: this.orderNo}, function (res) {
          let result = res.data
          if (result && result.code === 200) {
            // 订单信息
            let orderInfo = result.data;
            that.order = orderInfo;
            that.currentStep = orderInfo.orderstatus - 1;
            // if (orderInfo && orderInfo.list) {
            //   that.order = orderInfo;
            //   that.currentStep = orderInfo.orderstatus - 1;
            //   that.tableData = orderInfo.list;
            //   that.goodsCount = orderInfo.list.length;
            that.orderTotalPrice = orderInfo.orderprice;
            // }
          }
        })
      },
      // 根据订单编号查看订单详细、物流信息
      selectDetShipByOrderNo: function () {
        let that = this;
        this.request("/mapi/order/selectDetShipByOrderNo.do", "get", null, {orderNo: this.orderNo}, function (res) {
          let result = res.data
          if (result && result.code === 200) {
            // 订单详细信息
            let list = result.data;

            that.tableData = list;
            that.goodsCount = list.length;
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
        this.request("/mapi/order/orderDetailRefund.do", "post", null, {detailId: detailId}, function (res) {
          let result = res.data;
          if (result && result.code === 200) {
            that.$Notice.success({
              title: '该商品已退款，金额：' + result.data.price
            })
          } else {
            that.$Notice.warning({
              title: result.msg
            })
          }
        })
      },
      /**
       * 填写发货信息
       * */
      setExpress: function () {
        let that = this;
        if (that.detailIdList.length <= 0) {
          that.$Notice.error({
            title: "请选择需要发货的订单详情"
          })
        } else {
          this.model_express = true;
        }
      },
      /**
       * 快递信息
       */
      getSysConfig: function () {
        let that = this;
        this.request("mapi/config/findAllConfigs.do", "post", null, {"configtype": "express"}, function (res) {
          if (res.data && res.data.code === 200) {
            that.expressList = res.data.data;
          } else {
            console.error(res.data);
          }
        })
      },
      setDetail: function (selection) {
        this.detailIdList = selection;
      },
      /**
       *确认保存物流信息
       * */
      upsertExpress: function () {
        let that = this;
        if (this.express === "") {
          that.$Notice.error({
            title: "请选择物流公司"
          })
        } else if (this.expressNo === "") {
          that.$Notice.error({
            title: "请输入物流单号"
          })
        } else {
          let tmpList = [];
          this.detailIdList.forEach(function (item) {
            tmpList.push(item.id);
          });

          let param = {
            orderno: this.orderNo,
            expressname: this.express.split(",")[1],
            expresscode: this.express.split(",")[0],
            expressno: this.expressNo,
            note: this.note,
            detailidStr: tmpList.toString()
          }

          this.request("mapi/order/upsertPackage.do", "post", null, param, function (res) {
            if (res.data && res.data.code === 200) {
              that.$Notice.success({
                title: "成功"
              })
              that.express = "";
              that.expressNo = "";
              that.note = "";
              that.model_express = false
            } else {
              that.$Notice.error({
                title: "失败"
              })
              console.error(res.data);
            }
          })

        }
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
