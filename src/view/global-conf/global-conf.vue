<template>
    <div>
        <!-- 搜索框 -->
        <Input search placeholder="配置项名称" class="conf_search" @on-search="doSearch" v-model="searchInfo"/>
        <!-- 表格 -->
        <Table stripe border :columns="columns" :data="tabledata" class="info_table"></Table>
        <!-- 分页 -->
        <Page :total="totalPage" show-elevator show-sizer class="page_index" @on-change="changePage" @on-page-size-change="changePageSize"/>
    </div>
</template>

<script>
import request from '@/api/request'
export default {
  name: 'global-conf',
  data () {
    return {
      searchInfo: '',
      columns: [
        {
          title: '配置项ID',
          key: 'configId'
        },
        {
          title: '配置项名',
          key: 'configName'
        },
        {
          title: '配置项值',
          key: 'configContent'
        },
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
                    this.showConfirm(params)
                  }
                }
              }, '修改')
            ])
          }
        }
      ],
      tabledata: [
        { configId: '1', configName: '会员标签', configContent: '普通会员/忠实会员/VIP/内侧会员' },
        { configId: '2', configName: '积分来源', configContent: '每日任务-签到/每日任务-查看商品/每日任务-分享/邀请好友/购物' }
      ],
      // 修改后的配置项内容
      modifyContent: '',
      // 数据总页数
      totalPage: 100,
      // 当前页码
      pageIndex: 1,
      // 页面大小
      pageSize: 10
    }
  },
  methods: {

    /**
        * 执行搜索
        */
    doSearch: function () {
      console.log(this.searchInfo)
      this.searchInfo = ''
    },

    /**
        * 弹出修改配置项信息弹框
        * @param {Obejct} params 父级元素传递过来的参数
        */
    showConfirm: function (params) {
      let that = this
      // 获取当前显示值
      that.modifyContent = params.row.configContent
      that.$Modal.confirm({
        title: '修改配置项',
        onOk: () => {
          that.confirmModify(params)
        },
        render: (h) => {
          return h('div',
            [
              h('Input', {
                props: {
                  type: 'text',
                  value: params.row.configName,
                  disabled: true
                }
              }),
              h('Input', {
                props: {
                  type: 'textarea',
                  value: that.modifyContent,
                  clearable: true
                },
                style: {
                  marginTop: '10px'
                },
                on: {
                  input: function (event) {
                    that.modifyContent = event
                  }
                }
              })
            ]
          )
        }
      })
    },

    /**
        * 确认修改配置项
        * @param {Object} params 修改的项信息
        */
    confirmModify: function (params) {
      // 新配置项内容
      let newContent = this.modifyContent
      // 修改项目主键
      let configId = params.row.configId
      let formData = new FormData()
      formData.append('configId', configId)
      formData.append('configContent', newContent)
      //    request("v1/user/zzz","post",formData,function(res){
      //        if (res.status === 200) {
      //            // 刷新列表数据
      //            params.row.configContent = newContent
      //        }
      //    })
      params.row.configContent = newContent
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
    }
  }
}
</script>

<style>
    .conf_search{
        width: 300px;
    }

    .info_table{
        margin-top: 20px;
    }

    .page_index{
        margin-top: 20px ;
    }
</style>
