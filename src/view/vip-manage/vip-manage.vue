<template>
    <div>
         <!-- 搜索框 -->
         <Input clearable placeholder="会员账号" class="vip_search" v-model="account"/>
         <Input clearable placeholder="会员昵称" class="vip_search" v-model="nickname"/>
         <Input clearable placeholder="会员手机" class="vip_search" v-model="phone"/>
         <!-- 注册时间 -->
         <DatePicker type="date" placeholder="Select date" class="vip_search" @on-change="changeDate"></DatePicker>
         <Button type="info" icon="ios-search" class="btn" @click="doSearch"></Button>
         <!-- 表格 -->
         <Table stripe border :columns="columns" :data="tableData" class="vip_table"></Table>
         <!-- 分页 -->
         <Page :total="totalPage" show-elevator show-sizer class="vip_page" @on-change="changePage" @on-page-size-change="changePageSize"/>
    </div>
</template>

<script>
import * as VIPConst from './vip-manage'
import request from '@/api/request'
export default {
  name: 'vip-manage',
  data () {
    return {
      account: '',
      nickname: '',
      phone: '',
      date: '',
      // 表格数据
      columns: [
        { title: '账号', key: 'account' },
        { title: '昵称', key: 'nickname' },
        { title: '手机号', key: 'phone' },
        { title: '积分', key: 'score' },
        { title: '注册时间', key: 'registerTime' },
        {
          title: '操作',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.toVipDetail()
                  }
                }
              }, '查看')])
          }
        }
      ],
      tableData: [
        { account: '会员标签', nickname: '普通会员', phone: '15136245578', score: '66666', registerTime: '2018-11-23' },
        { account: '会员标签', nickname: '普通会员', phone: '15136245578', score: '66666', registerTime: '2018-11-23' },
        { account: '会员标签', nickname: '普通会员', phone: '15136245578', score: '66666', registerTime: '2018-11-23' },
        { account: '会员标签', nickname: '普通会员', phone: '15136245578', score: '66666', registerTime: '2018-11-23' },
        { account: '会员标签', nickname: '普通会员', phone: '15136245578', score: '66666', registerTime: '2018-11-23' },
        { account: '会员标签', nickname: '普通会员', phone: '15136245578', score: '66666', registerTime: '2018-11-23' },
        { account: '会员标签', nickname: '普通会员', phone: '15136245578', score: '66666', registerTime: '2018-11-23' },
        { account: '会员标签', nickname: '普通会员', phone: '15136245578', score: '66666', registerTime: '2018-11-23' },
        { account: '会员标签', nickname: '普通会员', phone: '15136245578', score: '66666', registerTime: '2018-11-23' },
        { account: '会员标签', nickname: '普通会员', phone: '15136245578', score: '66666', registerTime: '2018-11-23' }
      ],
      // 页面总行数
      totalPage: 100,
      // 当前页码
      pageIndex: 1,
      // 页面大小
      pageSize: 10
    }
  },
  methods: {
    /**
     * 改变日期
     */
    changeDate: function (date) {
      this.date = date
    },

    /**
    * 更改页码
    */
    changePage: function (pageIndex) {
    //    this.pageIndex = pageIndex
      console.log(pageIndex)
    // request("v1/user/userInfo","get",null,function(data){
    //     console.log(data)
    // })
    },

    /**
    * 更改页面大小
    */
    changePageSize: function (pageSize) {
      console.log(pageSize)
    //    this.pageSize = pageSize
    },

    /**
     * 执行搜索
     */
    doSearch: function () {
      let param = new FormData()
      param.append('account', this.account)
      param.append('nickname', this.nickname)
      param.append('phone', this.phone)
      param.append('date', this.date)
    //   request("v1/vip/vipInfo", "post", param, function(res) {
    //     console.log(res);
    //   });
    },

    /**
     * 跳转会员详情
     */
    toVipDetail: function () {
      this.$router.push({
        name: 'vip_detail'
      })
    }
  }
}
</script>

<style>
    .vip_search {
        width: 200px;
        margin-left: 10px;
    }

    .btn {
        margin-left: 10px;
        width: 50px;
    }

    .vip_table {
        margin-top: 20px;
    }

    .vip_page{
        margin-top: 20px ;
    }
</style>
