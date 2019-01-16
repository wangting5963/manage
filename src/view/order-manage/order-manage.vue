<template>
  <div>
    <Input placeholder="订单编号" class="order_head_input" clearable/>
    <Button type="info" icon="ios-search" style="margin-left:20px;" @click="getOrderInfo"></Button>
    <!-- 数据表格 -->
    <Table style="margin-top:20px;" border :columns="columns" :data="tableData"></Table>
    <!-- 分页 -->
    <Page :total="totalPage" show-elevator show-sizer class="page_index" @on-change="changePage"
          @on-page-size-change="changePageSize"/>
  </div>
</template>

<script>
import request from '@/api/request'

export default {
  name: 'order-manage',
  data () {
    return {
      orderNo: '',
      // 总页数
      totalPage: 100,
      // page
      page: 1,
      pageSize: 10,
      // 表格列
      columns: [
        { type: 'index', width: 60, align: 'center' },
        { title: '订单标号', key: 'orderno', width: 250 },
        { title: '订单总价', key: 'orderprice' },
        { title: '支付渠道', key: 'paytype' },
        { title: '订单状态', key: 'orderstatusStr' },
        { title: '创建时间', key: 'creattime' },
        // {title: "是否显示", key: "goodsShowStatus"},
        {
          title: '操作',
          render: (h, params) => {
            return h('div', [
              h('div', { style: { marginTop: '2px', marginBottom: '2px' } }, [
                h('Button', {
                  props: {
                    type: 'info',
                    size: 'small'
                  }
                }, '编辑'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  style: {
                    marginLeft: '10px'
                  }
                }, '删除')
              ])
            ])
          }
        }
      ],
      tableData: []
    }
  },
  methods: {
    /**
       * 获取所有订单信息
       */
    getOrderInfo: function () {
      // let formData = new FormData()
      // formData.append("page", "1")
      // formData.append("pageSize", "10")

      var that = this
      console.log(that.tableData)
      let params = {
        'page': that.page,
        'pageSize': that.pageSize
      }
      request('mapi/order/selective.do', 'post', params, function (res) {
        console.log(res)
        that.tableData = []

        if (res.data && res.data.code === 200) {
          console.debug(res)
          that.tableData = res.data.data.list
          that.totalPage = res.data.data.total
          // that.tableDate.destroy();
          console.log(that.tableData)
        } else {
          alert('没有查询到数')
        }
      })
    },
    /**
       * 更改页码
       */
    changePage: function (pageIndex) {
      //    this.pageIndex = pageIndex
      // console.log(pageIndex)
      this.page = pageIndex
      // request("v1/user/userInfo","get",null,function(data){
      //     console.log(data)
      // })
      this.getOrderInfo()
    },

    /**
       * 更改页面大小
       */
    changePageSize: function (pageSize) {
      // console.log(pageSize)
      this.pageSize = pageSize
      this.getOrderInfo()
      //    this.pageSize = pageSize
    }
  }
}
</script>

<style>
  .order_head_input {
    width: 200px;
    margin-left: 20px;
  }

  .order_head_input.first {
    margin-left: 0px;
  }
</style>
