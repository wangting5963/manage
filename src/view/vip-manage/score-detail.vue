<template>
    <div class="parent">
        <div class="search-header">
            <Input clearable placeholder="渠道" class="form-input" v-model="searchChannel"/>     
            <DatePicker type="date" class="form-input" placeholder="时间" @on-change="changeDate"></DatePicker>
            <Button type="info" icon="ios-search" style="margin-left:20px;" @click="searchScoreDetail">搜索</Button>
        </div>
        <!-- 数据列表 -->
        <Table :columns="scoreColumn" :data="scoreData" stripe border></Table>
        <!-- 分页 -->
        <Page :total="100" show-sizer class-name="page-component" @on-change="changePage" @on-page-size-change="changePageSize"/>
    </div>
</template>

<script>
export default {
  name: "remain_detail",
  data() {
    return {
      // 搜索条件----->时间
      searchTime: "",
      // 搜索条件----->渠道
      searchChannel: "分享小程序",
      scoreColumn: [
        {
          type: "index",
          title: "序号",
          key: "id"
        },
        {
          title: "积分渠道",
          key: "scoreChannel"
        },
        {
          title: "变更时间",
          key: "updateTime"
        },
        {
          title: "积分值",
          key: "scoreValue"
        }
      ],
      scoreData: [
          {"id":"1","scoreChannel":"分享","updateTime":"2019-04-09 12:24:26","scoreValue":"666"},
          {"id":"2","scoreChannel":"注册","updateTime":"2019-04-09 12:24:26","scoreValue":"666"},
          {"id":"3","scoreChannel":"签到","updateTime":"2019-04-09 12:24:26","scoreValue":"666"},
          {"id":"4","scoreChannel":"邀请","updateTime":"2019-04-09 12:24:26","scoreValue":"666"},
          {"id":"5","scoreChannel":"转发","updateTime":"2019-04-09 12:24:26","scoreValue":"666"},
          {"id":"6","scoreChannel":"下单","updateTime":"2019-04-09 12:24:26","scoreValue":"666"},
          {"id":"7","scoreChannel":"收藏","updateTime":"2019-04-09 12:24:26","scoreValue":"666"}
      ]
    };
  },

  methods: {
      /**
       * 更改当前页码
       */
      changePage: function(res) {
        console.log(res)
      },

      /**
       * 更改页面大小
       */
      changePageSize: function(res) {
        console.log(res)
      },

      /**
       * 更改日期
       */
      changeDate: function(res) {
          this.searchTime = res
      },

      /**
       * 搜索积分明细信息
       */
      searchScoreDetail: function() {
          console.log(this.searchChannel)
          console.log(this.searchTime)
      }
  }
};
</script>
<style scoped>
.search-header{
    margin-bottom: 20px;
}
.form-input {
  width: 200px;
  margin-left: 15px;
}
.page-component{
    margin-top: 20px;
}
</style>



