<template>
    <div>
         <!-- 搜索框 -->
         <Input clearable placeholder="昵称" class="vip_search" v-model="nickname"/>
         <Input clearable placeholder="手机" class="vip_search" v-model="phone"/>
         <!-- 注册时间 -->
         <Date-picker type="daterange" placement="bottom-end" placeholder="注册时间" class="vip_search" @on-change="changeDate"></Date-picker>
         <Button type="info" icon="ios-search" class="btn" @click="doSearch"></Button>
         <!-- 表格 -->
         <Table stripe border :columns="columns" :data="tableData" class="vip_table"></Table>
         <!-- 分页 -->
         <Page :total="totalPage" show-elevator show-sizer class="vip_page" @on-change="changePage" @on-page-size-change="changePageSize"/>
    </div>
</template>

<script>
import * as VIPConst from "./vip-manage";
import request from "@/api/request";
export default {
  name: "vip-manage",
  data() {
    return {
      nickname: null,
      phone: null,
      date: null,
      lastDate: null,
      // 表格数据
      columns: [
        { title: "用户ID", key: "id" ,align: "center"},
        {
          title: "用户头像",
          align: "center",
          render: (h, params) => {
            return h("div", {
              style: {
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                background: "url('"+ params.row.imgurl +"') no-repeat center center",
                backgroundSize: "contain",
                marginLeft: "25%"
              }
            });
          }
        },
        { title: "昵称", key: "likename" },
        { title: "手机号", key: "mobile" },
        { title: "积分", key: "score", width: 80 },
        { title: "余额", key: "balance", width: 80 },
        { title: "注册时间", key: "creattime" ,width: 160},
        {
          title: "邀请人头像",
          align: "center",
          render: (h, params) => {
            return h("div", {
              style: {
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                background:
                  "url('"+ params.row.parentInfo.imgurl +"') no-repeat center center",
                backgroundSize: "contain",
                marginLeft: "25%"
              }
            });
          }
        },
        { title: "邀请人ID", key: "inviteUserId" },
        { title: "邀请人昵称", key: "inviteNickName" },
        { title: "邀请人手机号", key: "inviteUserPhone" },
        {
          title: "操作",
          width: 240,
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
                      this.switchPages("vip_detail");
                    }
                  }
                },
                "编辑"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "success",
                    size: "small"
                  },
                  style: {
                    marginLeft: "10px"
                  },
                  on: {
                    click: () => {
                      // 跳转积分明细
                      this.switchPages("score_detail");
                    }
                  }
                },
                "积分明细"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "warning",
                    size: "small"
                  },
                  style: {
                    marginLeft: "10px"
                  },
                  on: {
                    click: () => {
                      // 查看余额状况
                      this.switchPages("remain_detail");
                    }
                  }
                },
                "余额状况"
              )
            ]);
          }
        }
      ],
      tableData: [],
      // 页面总行数
      totalPage: 100,
      // 当前页码
      pageIndex: 1,
      // 页面大小
      pageSize: 10
    };
  },

  mounted: function() {
    this.getAllUserInfo();
  },

  methods: {
    /**
     * 获取用户所有信息
     */
    getAllUserInfo: function() {
      // 获取所有用户信息【包含上下级用户数据】
      let that = this
      let params = {
        page: this.pageIndex,
        pageSize: this.pageSize,
        likename: this.nickname,
        mobile: this.phone,
        creattime: this.date ? this.date + " 00:00:00" : null,
        updatetime: this.lastDate ? this.lastDate + " 00:00:00" : null 
      };
      request("mapi/user/getAllUser.do", "post", null, params, function(res) {
        if (res && res.data && res.data.code === 200) {
          let info = res.data.data
          that.tableData = info.list
          info.list.forEach(item=>{
            if(item.parentInfo) {
              item.inviteUserId = item.parentInfo.id
              item.inviteUserPhone = item.parentInfo.mobile
              item.inviteNickName = item.parentInfo.likename
            }
          })
          that.totalPage = info.total
          // console.log(info)
        }
      });
    },

    /**
     * 改变日期
     */
    changeDate: function(date) {
      this.date = date[0]
      this.lastDate = date[1]
    },

    /**
     * 更改页码
     */
    changePage: function(pageIndex) {
      this.pageIndex = pageIndex;
      this.getAllUserInfo();
    },

    /**
     * 更改页面大小
     */
    changePageSize: function(pageSize) {
      this.pageSize = pageSize;
      this.getAllUserInfo();
    },

    /**
     * 执行搜索
     */
    doSearch: function() {
      this.getAllUserInfo();
    },

    /**
     * 跳转页面
     * @param pageName: 标示跳转到哪个页面
     */
    switchPages: function(pageName) {
      this.$router.push({
        name: pageName
      });
    }
  }
};
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

.vip_page {
  margin-top: 20px;
}
</style>
