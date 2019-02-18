<template>
  <div>
    <Input v-model="orderNo" placeholder="订单编号" class="order_head_input first" clearable/>
    <DatePicker type="daterange" show-week-numbers placement="bottom-end" placeholder="申请时间" class="order_head_input"
                v-model="orderTime"></DatePicker>
    <Select v-model="orderStatus" class="order_head_input">
      <Option value="all" selected>----查询全部----</Option>
      <Option v-for="item in orderStatusList" :value="item.id" :key="item.id">{{ item.value }}</Option>
    </Select>
    <Button type="info" icon="ios-search" class="order_btn" @click="doSearch">搜索</Button>
    <Table ref="refoundtable" border :columns="column" :data="tableData" class="order_table"></Table>
    <Page :total="totalDataLong" show-elevator show-sizer class="order_page" @on-change="changePage"
          @on-page-size-change="changePageSize"/>
  </div>
</template>

<script>
import { formatDate } from "@/libs/tools";

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
      // 退款状态
      orderStatus: "",
      // 订单状态列表
      orderStatusList: [
        { id: "0", value: "待审核" },
        { id: "1", value: "被拒绝" },
        { id: "2", value: "已退款" }
      ],
      // 表格列
      column: [
        { type: "index", width: 60, align: "center" },
        { title: "订单编号", key: "orderno", width: 200 },
        { title: "申请人", key: "contacts", width: 100 },
        { title: "申请时间", key: "created", width: 150 },
        { title: "联系电话", key: "phonenum", width: 120 },
        { title: "退款理由", key: "note", width: 300 },
        { title: "状态", key: "refundstatus", width: 100 },
        {
          title: "操作",
          width: 100,
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
                      // 跳转订单详情
                      this.toOrderDetail(params.row.orderno,params.row.id,params.row.detailid);
                    }
                  }
                },
                "查看"
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
    // 获取所有订单信息
    this.doSearch();
    // 查询所有退款订单状态字段
    // this.getAllOrderStatus();
  },
  methods: {
    /**
     * 获取所有订单状态字段
     */
    getAllOrderStatus: function() {
      let that = this;
      this.request("mapi/order/getAllStatus.do", "get", null, function(res) {
        if (res.data && res.data.code === 200) {
          that.orderStatusList = res.data.data;
        }
      });
    },

    /**
     * 更改页码
     */
    changePage: function(pageIndex) {
      this.page = pageIndex;
      this.doSearch();
    },

    /**
     * 更改页面大小
     */

    changePageSize: function(pageSize) {
      this.pageSize = pageSize;
      this.doSearch();
    },

    /**
     * 搜索
     */
    doSearch: function() {
      let that = this
      let params = {
        page: this.page,
        pageSize: this.pageSize,
        orderno: this.orderNo,
        refundstatus: this.orderStatus === "all" ? null : this.orderStatus,
        created: null,
        updated: null
      };
      // 格式化时间
      if (this.orderTime[0] !== "") {
        params.created = formatDate(this.orderTime[0], "time");
      }
      if (this.orderTime[1] !== "") {
        params.updated = formatDate(this.orderTime[1], "time");
      }
      this.request("/mapi/order/queryRefund.do", "post", params, function(res) {
        console.log(res)
        let result = res.data;
        if (result && result.code === 200 && result.data) {
          let info = result.data.list;
          if (info && info.length > 0) {
            info.forEach(element => {
              if (element) {
                if (element.refundstatus == 0 || element.refundstatus == "0") {
                  element.refundstatus = "待审核";
                } else if (element.refundstatus === 1) {
                  element.refundstatus = "被拒绝";
                } else if (element.refundstatus === 2) {
                  element.refundstatus = "已退款";
                }
              }
            });
          }
          // 渲染表格数据
          that.tableData = result.data.list;
          // 设置数据总行数
          that.totalDataLong = result.data.total;
        }
      })
    },

    /**
     * 跳转退款详情页面
     */
    toOrderDetail: function(orderNo,index,detailId) {
      if (orderNo && orderNo !== "") {
        let route = {
          name: "aftersale-detail",
          params: {
            orderNo: orderNo,
            index:index,
            detailId:detailId
          }
        };
        this.$router.push(route);
      }
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
