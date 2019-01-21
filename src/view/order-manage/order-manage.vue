<template>
  <div>
    <Input v-model="orderNo" placeholder="订单编号" class="order_head_input first" clearable/>
    <DatePicker type="daterange" show-week-numbers placement="bottom-end" placeholder="下单时间" class="order_head_input"
                v-model="orderTime"></DatePicker>
    <Select v-model="orderStatus" class="order_head_input">
      <Option v-for="item in orderStatusList" :value="item.id" :key="item.id">{{ item.value }}</Option>
    </Select>
    <Button type="info" icon="ios-search" class="order_btn" @click="doSearch">搜索</Button>
    <Button type="info" class="order_btn" @click="exportOrderInfo">导出发货</Button>
    <!-- action是提交的路径 -->
    <Upload action="//jsonplaceholder.typicode.com/posts/"
            :format="['csv','xls','xlsx']"
            :show-upload-list="uploadListStatus"
            :on-success="importSuccess"
            :on-format-error="handleFormatError"
            class="upload">
      <Button type="info">批量发货</Button>
    </Upload>
    <Table ref="ordertable" border :columns="column" :data="tableData" class="order_table"></Table>
    <Page :total="totalDataLong" show-elevator show-sizer class="order_page" @on-change="changePage"
          @on-page-size-change="changePageSize"/>
  </div>
</template>

<script>
import request from "@/api/request";
export default {
  name: "order-manage",
  data() {
    return {
      // 数据总行数
      totalDataLong: 0,
      // 订单编号
      orderNo: "",
      // 下单时间
      orderTime: "",
      // 订单状态
      orderStatus: "",
      // 订单状态列表
      orderStatusList: [
        { id: "1", value: "待付款" },
        { id: "2", value: "待发货" },
        { id: "3", value: "已发货" },
        { id: "4", value: "已完成" },
        { id: "5", value: "已退款" }
      ],
      // 表格列
      column: [
        { type: "index", width: 60, align: "center" },
        { title: "订单编号", key: "orderno", width: 200 },
        { title: "订单金额", key: "orderprice", width: 90 },
        { title: "状态", key: "orderstatusStr", width: 100 },
        { title: "支付方式", key: "paytype", width: 100 },
        { title: "收货人", key: "contacts" },
        { title: "下单时间", key: "creattime" },
        {
          title: "操作",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "info",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.showShipmentsDialog(params);
                    }
                  }
                },
                "修改"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "info",
                    size: "small"
                  },
                  style: {
                    marginLeft: "10px"
                  },
                  on: {
                    click: () => {
                      console.log(params);
                      this.$Message.info("id=" + params.row.id);
                      this.createTagParams(params.row.id);
                    }
                  }
                },
                "查看"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "info",
                    size: "small"
                  },
                  style: {
                    marginLeft: "10px"
                  },
                  on: {
                    click: () => {
                      this.showRemarkDialog(params);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      // 表格数据
      tableData: [],
      // 订单备注信息
      orderRemark: "",
      // 快递公司
      expressCompany: "",
      // 快递单号
      expressNo: "",
      // 不显示上传列表
      uploadListStatus: false,
      // 页码
      page: 1,
      // 初始页面大小
      pageSize: 10
    };
  },
  mounted: function() {
    this.getOrderInfo();
  },
  methods: {
    /**
     * 获取所有订单信息
     */
    getOrderInfo: function() {
      let params = {
        page: this.page,
        pageSize: this.pageSize,
        orderno: this.orderNo
      };
      let that = this;
      this.request("/sale/order/selective.do", "post", params, function(res) {
        let result = res.data;
        if (result && result.code === 200) {
          // 渲染表格数据
          that.tableData = result.data.list;
          // 设置数据总行数
          that.totalDataLong = result.data.total;
        }
      });
    },

    /**
     * 更改页码
     */
    changePage: function(pageIndex) {
      this.page = pageIndex;
      this.getOrderInfo(this.page, this.pageSize);
    },

    /**
     * 更改页面大小
     */

    changePageSize: function(pageSize) {
      this.pageSize = pageSize;
    },

    /**
     * 搜索
     */
    doSearch: function() {
      console.log(this.orderTime);
      console.log(this.orderNo);
      console.log(this.orderStatus);
    },

    /**
     * 导出订单信息
     */
    exportOrderInfo: function() {
      this.$refs.ordertable.exportCsv({
        filename: "orderInfo",
        columns: this.column.filter((col, index) => index < 6),
        data: this.tableData.filter((data, index) => index < 6)
      });
    },

    /**
     * 导入订单
     */
    importSuccess: function(res, file) {
      // console.log(res)
      // console.log(file)
      this.$Notice.warning({
        title: "批量发货",
        desc: "导入数据成功"
      });
    },

    handleFormatError: function() {
      this.$Notice.warning({
        title: "文件格式错误",
        desc: "仅支持上传(csv、xls、xlsx)格式文件"
      });
    },

    /**
     * 发送快递的弹框
     */
    showShipmentsDialog: function(params) {
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
     * 展示填写备注信息的弹框
     */
    showRemarkDialog: function(params) {
      this.$Modal.confirm({
        onOk: this.submitOrderRemarkInfo,
        render: h => {
          return h("div", [
            h("Input", {
              props: {
                type: "textarea",
                placeholder: "备注"
              },
              on: {
                input: val => {
                  this.orderRemark = val;
                }
              }
            })
          ]);
        }
      });
    },

    /**
     * 提交订单备注信息
     */
    submitOrderRemarkInfo: function() {
      console.log("-------提交订单备注信息------" + this.orderRemark);
    },

    /**
     * 跳转订单详情
     */
    toOrderDetail: function() {
      console.log("-------跳转订单详情---------");
    },
    
    createTagParams(id) {
      const route = {
        name: "order_view",
        params: {
          id
        }
      };
      this.$router.push(route);
    }
  }
};
</script>

<style>
.order_head_input {
  width: 200px;
  margin-left: 20px;
}

.order_head_input.first {
  margin-left: 0px;
}

.order_btn {
  margin-left: 20px;
}

.upload {
  display: inline-block;
  margin-left: 20px;
}

.order_table {
  margin-top: 20px;
}

.order_page {
  margin-top: 20px;
}
</style>
