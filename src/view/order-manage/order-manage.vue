<template>
  <div>
    <Input v-model="orderNo" placeholder="订单编号" class="order_head_input first" clearable/>
    <DatePicker type="daterange" show-week-numbers placement="bottom-end" placeholder="下单时间" class="order_head_input"
                v-model="orderTime"></DatePicker>
    <Select v-model="orderStatus" class="order_head_input">
      <Option value="all" selected>----查询全部----</Option>
      <Option v-for="item in orderStatusList" :value="item.id" :key="item.id">{{ item.value }}</Option>
    </Select>
    <Button type="info" icon="ios-search" class="order_btn" @click="doSearch">搜索</Button>
    <Button type="info" class="order_btn" @click="exportOrderInfo">订单导出</Button>
    <!-- action是提交的路径 -->
    <!--<Upload action="//jsonplaceholder.typicode.com/posts/"-->
    <!--:format="['csv','xls','xlsx']"-->
    <!--:show-upload-list="uploadListStatus"-->
    <!--:on-success="importSuccess"-->
    <!--:on-format-error="handleFormatError"-->
    <!--class="upload">-->
    <!--<Button type="info">批量发货</Button>-->
    <!--</Upload>-->
    <Table ref="ordertable" border :columns="column" :data="tableData" class="order_table"></Table>
    <Page :total="totalDataLong" show-elevator show-sizer class="order_page" @on-change="changePage"
          @on-page-size-change="changePageSize"/>
  </div>
</template>

<script>
  import {formatDate} from "@/libs/tools";

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
        orderStatusList: [],
        // 表格列
        column: [
          {type: "index", width: 60, align: "center"},
          {title: "订单编号", key: "orderno"},
          {title: "订单金额", key: "orderprice", width: 90},
          {title: "状态", key: "orderstatusStr", width: 100},
          {title: "支付方式", key: "paytype", width: 100},
          {title: "收货人", key: "contacts", width: 90},
          {
            title: "收货地址", render: (h, params) => {
              return h("div", params.row.receiver_province + params.row.receiver_city + params.row.receiver_district + params.row.address)
            }
          },


          {title: "下单时间", key: "creattime"},
          {
            title: "操作",
            render: (h, params) => {
              return h("div", [
                h(
                  "Button",
                  {
                    props: {
                      type: "error",
                      size: "small"
                    },
                    on: {
                      click: () => {
                        this.$Modal.confirm({
                          title: "删除订单",
                          content: "是否删除该订单",
                          onOk: () => {
                            this.delOrder(params);
                          }
                        });
                      }
                    }
                  },
                  "删除"
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
                        // 跳转订单详情
                        this.toOrderDetail(params.row);
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
                  "备注"
                )
              ]);
            }, width: 200
          }
        ],
        // 导出csv的模板和数据
        exportColumn: [
          {title: "下单时间", key: "creattime"},
          {title: "订单编号", key: "orderno"},
          {title: "商品名称", key: "goodsname"},
          {title: "商品价格", key: "unitprice"},
          {title: "购买数量", key: "amount"},
          {title: "订单金额", key: "totalprice"},
          {title: "订单状态", key: "orderstatusStr"},
          {title: "支付方式", key: "paytype"},
          {title: "收货人", key: "contacts"},
          {title: "收货地址", key: "address"},
          {title: "收货人电话", key: "phonenum"},
          {title: "信用卡号", key: "discountcode"},
          {title: "备注", key: "note"}
        ],
        exportData: [],
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
    mounted: function () {
      // 获取所有订单信息
      this.doSearch();
      // 查询所有订单状态字段
      this.getAllOrderStatus();
    },
    methods: {
      /**
       * 获取所有订单信息
       */
      getOrderInfo: function () {
        let params = {
          page: this.page,
          pageSize: this.pageSize
        };
        let that = this;
        this.request(
          "/mapi/order/selective.do",
          "post", null,
          params,
          this.setOrderList
        );
      },

      /**
       * 获取所有订单状态字段
       */
      getAllOrderStatus: function () {
        let that = this;
        this.request("mapi/order/getAllStatus.do", "get", null, null, function (res) {
          if (res.data && res.data.code === 200) {
            that.orderStatusList = res.data.data
          }
        })
      },

      /**
       * 更改页码
       */
      changePage: function (pageIndex) {
        this.page = pageIndex;
        this.doSearch();
      },

      /**
       * 更改页面大小
       */

      changePageSize: function (pageSize) {
        this.pageSize = pageSize;
        this.doSearch();
      },

      /**
       * 渲染订单列表
       */
      setOrderList: function (res) {
        let result = res.data;
        if (result && result.code === 200 && result.data) {
          // 渲染表格数据
          this.tableData = result.data.list;
          // 设置数据总行数
          this.totalDataLong = result.data.total;
          // 设置要导出的模板数据
          let tempData = result.data.list
          // console.log(tempData)
          // 初始化要导出的数据
          this.exportData = []
          tempData.forEach(element => {
            let tempInfo = {}
            if (element.list && element.list.length > 0) {
              tempInfo.goodsname = element.list[0].goodsname
              tempInfo.unitprice = element.list[0].unitprice
              tempInfo.amount = element.list[0].amount
              tempInfo.totalprice = element.list[0].totalprice
              tempInfo.phonenum = "\t" + element.phonenum
              tempInfo.discountcode = "\t" + element.list[0].discountcode
              tempInfo.note = element.list[0].note
            }
            tempInfo.creattime = "\t" + element.creattime
            tempInfo.orderno = element.orderno
            tempInfo.orderstatusStr = element.orderstatusStr
            tempInfo.paytype = element.paytype
            tempInfo.contacts = element.contacts
            tempInfo.address = element.receiver_province + element.receiver_city + element.receiver_district + element.address

            this.exportData.push(tempInfo)
          })
          // console.log(this.exportData)
        }
      },

      /**
       * 搜索
       */
      doSearch: function () {
        let params = {
          page: this.page,
          pageSize: this.pageSize,
          orderno: this.orderNo,
          orderstatus: this.orderStatus === "all" ? null : this.orderStatus,
          creattime: null,
          lasttime: null
        };
        // 格式化时间
        if (this.orderTime[0] !== "") {
          params.creattime = formatDate(this.orderTime[0], "time");
        }
        if (this.orderTime[1] !== "") {
          params.lasttime = formatDate(this.orderTime[1], "time");
        }
        this.request(
          "/mapi/order/selective.do",
          "post", null,
          params,
          this.setOrderList
        );
      },

      /**
       * 导出订单信息
       */
      exportOrderInfo: function () {
        this.$refs.ordertable.exportCsv({
          filename: "orderInfo",
          columns: this.exportColumn.filter((col, index) => index < 13),
          data: this.exportData.filter((data, index) => index < this.exportData.length)
        });
      },

      /**
       * 导入订单
       */
      importSuccess: function (res, file) {
        this.$Notice.warning({
          title: "批量发货",
          desc: "导入数据成功"
        });
      },

      /**
       * 上传格式异常
       */
      handleFormatError: function () {
        this.$Notice.warning({
          title: "文件格式错误",
          desc: "仅支持上传(csv、xls、xlsx)格式文件"
        });
      },

      /**
       * 删除订单
       */
      delOrder: function (params) {
        let that = this;
        if (params.row) {
          let orderNo = params.row.id;
          if (orderNo && orderNo !== "") {
            this.request(
              "/mapi/order/delete.do",
              "post", null,
              {id: orderNo},
              function (res) {
                if (res.data && res.data.code === 200) {
                  // 移除该数据
                  // that.tableData.splice(params.row.index, 1);
                  // 重新加载数据
                  that.doSearch();
                }
              }
            );
          }
        }
      },

      /**
       * 展示填写备注信息的弹框
       */
      showRemarkDialog: function (params) {
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
      submitOrderRemarkInfo: function () {
        console.log("-------提交订单备注信息------" + this.orderRemark);
      },

      /**
       * 跳转订单详情
       */
      toOrderDetail: function (item) {
        const route = {
          name: "order_view",
          params: {
            orderId: item.id,
            orderNo: item.orderno
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
