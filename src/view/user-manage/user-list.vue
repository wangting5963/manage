<template>
  <div>
    <Table border :columns="columns" :data="tableData"></Table>
  </div>
</template>
<script>
export default {
  name: 'user-list',
  data () {
    return {
      // 表格列
      columns: [
        {
          title: '头像',
          width: 75,
          align: 'center',
          render: (h, params) => {
            return h('div', {
              style: {
                width: '40px',
                height: '40px',
                background: 'url(' + params.row.imgurl + ') no-repeat center',
                backgroundSize: '40px 40px'
              }
            })
          }
        },
        { title: '账号', key: 'username' },
        { title: '角色', key: 'roles' },
        { title: '昵称', key: 'likename' },
        {
          title: '操作',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'info',
                  size: 'small'
                },
                on: {
                  click: () => {
                    // 跳转到编辑/新增用户信息页面
                    this.$router.push({
                      name: 'add_user',
                      params: {
                        userId: params.row.id
                      }
                    })
                  }
                }
              }, '编辑'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                style: {
                  marginLeft: '20px'
                },
                on: {
                  click: () => {
                    this.$Modal.confirm({
                      title: '删除用户',
                      content: '是否删除该用户',
                      onOk: () => {
                        this.delUser(params)
                      }
                    })
                  }
                }
              }, '删除')
            ])
          }
        }
      ],
      // 表格数据
      tableData: [
        // {
        //   'userId': '1',
        //   'userImg': 'http://img.qqzhi.com/uploads/2018-12-05/132746110.jpg',
        //   'account': '666sss',
        //   'role': '管理员',
        //   'nickName': '钢铁侠'
        // },
        // {
        //   'userId': '2',
        //   'userImg': 'http://img.qqzhi.com/uploads/2018-12-05/132746110.jpg',
        //   'account': '666sss',
        //   'role': '管理员',
        //   'nickName': '钢铁侠'
        // },
        // {
        //   'userId': '3',
        //   'userImg': 'http://img.qqzhi.com/uploads/2018-12-05/132746110.jpg',
        //   'account': '666sss',
        //   'role': '管理员',
        //   'nickName': '钢铁侠'
        // },
        // {
        //   'userId': '4',
        //   'userImg': 'http://img.qqzhi.com/uploads/2018-12-05/132746110.jpg',
        //   'account': '666sss',
        //   'role': '管理员',
        //   'nickName': '钢铁侠'
        // },
        // {
        //   'userId': '5',
        //   'userImg': 'http://img.qqzhi.com/uploads/2018-12-05/132746110.jpg',
        //   'account': '666sss',
        //   'role': '管理员',
        //   'nickName': '钢铁侠'
        // },
        // {
        //   'userId': '6',
        //   'userImg': 'http://img.qqzhi.com/uploads/2018-12-05/132746110.jpg',
        //   'account': '666sss',
        //   'role': '管理员',
        //   'nickName': '钢铁侠'
        // },
        // {
        //   'userId': '7',
        //   'userImg': 'http://img.qqzhi.com/uploads/2018-12-05/132746110.jpg',
        //   'account': '666sss',
        //   'role': '管理员',
        //   'nickName': '钢铁侠'
        // },
        // {
        //   'userId': '8',
        //   'userImg': 'http://img.qqzhi.com/uploads/2018-12-05/132746110.jpg',
        //   'account': '666sss',
        //   'role': '管理员',
        //   'nickName': '钢铁侠'
        // }
      ]
    }
  },
  mounted: function () {
    this.getUserList()
  },
  methods: {

    /**
       * 获取用户列表
       */
    getUserList: function () {
      let that = this
      this.request('mapi/user/getAllUser.do', 'get', null, function (res) {
        if (res.data && res.data.code === 200) {
          let info = res.data.data
          that.tableData = info
        }
      })
    },

    /**
       * 删除用户
       */
    delUser: function (params) {
      console.log('--------删除用户---------')
      let that = this
      let userId = params.row.id
      console.log(userId)
      this.request('mapi/user/delete.do', 'post', { 'id': userId }, function (res) {
        console.log(res)
        that.tableData.splice(params.index, 1)
      })
    }
  }
}
</script>
<style>

</style>
