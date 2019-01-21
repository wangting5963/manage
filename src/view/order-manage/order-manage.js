export var info = {
  // 表格列
  column: [
    { title: '订单号', key: 'orderNo', width: 100 },
    { title: '支付流水号', key: 'payNo', width: 100 },
    { title: '买家账号', key: 'buyerAccount', width: 120 },
    { title: '购买数量', key: 'buyCount', width: 70 },
    { title: '订单总额', key: 'orderPrice', width: 100 },
    { title: '支付方式', key: 'payWay', width: 70 },
    { title: '收货人', key: 'consignee', width: 80 },
    { title: '电话', key: 'phone', width: 120 },
    { title: '下单时间', key: 'orderTime', width: 120 },
    { title: '状态', key: 'orderStatus', width: 75 },
    {
      title: '操作',
      render: (h, params) => {
        return h('div', [
          h(
            'Button',
            {
              props: {
                type: 'info',
                size: 'small'
              },
              on: {
                click: () => {
                  this.showShipmentsDialog(params)
                }
              }
            },
            '发货'
          ),
          h(
            'Button',
            {
              props: {
                type: 'info',
                size: 'small'
              },
              style: {
                marginLeft: '10px'
              },
              on: {
                click: () => {
                  this.toOrderDetail()
                }
              }
            },
            '查看'
          ),
          h(
            'Button',
            {
              props: {
                type: 'info',
                size: 'small'
              },
              style: {
                marginLeft: '10px'
              },
              on: {
                click: () => {
                  this.showRemarkDialog(params)
                }
              }
            },
            '备注'
          )
        ])
      }
    }
  ],
  // 表格数据
  tableData: [
    {
      orderNo: '1',
      payNo: '123456',
      buyerAccount: '6666688888',
      buyCount: '10',
      orderPrice: '198',
      payWay: '微信',
      consignee: '王小虎',
      phone: '15136287868',
      orderTime: '2019-01-16',
      orderStatus: '已完成'
    }
  ]
}
