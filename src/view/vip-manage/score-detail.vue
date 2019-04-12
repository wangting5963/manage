<template>
    <div class="parent">
        <div class="search-header">
             <Select v-model="ruleType" style="width:200px" class="form-input">
                <Option value="all">-----查询所有-----</Option>
                <Option v-for="item in ruleTypeList" :value="item.ruleType" :key="item.id">{{ item.ruleName }}</Option>
            </Select>     
            <Date-picker type="daterange" placement="bottom-end" placeholder="时间" class="form-input" @on-change="changeDate"></Date-picker>
            <Button type="info" icon="ios-search" style="margin-left:20px;" @click="searchScoreDetail">搜索</Button>
        </div>
        <!-- 数据列表 -->
        <Table :columns="scoreColumn" :data="scoreData" stripe border></Table>
        <!-- 分页 -->
        <Page :total="totalPage" show-sizer class-name="page-component" @on-change="changePage" @on-page-size-change="changePageSize"/>
    </div>
</template>
<script>
import request from "@/api/request";
import { transformScoreTypeName } from "@/libs/util";
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
          title: "序号"
        },
        {
          title: "积分渠道",
          key: "ruleType"
        },
        {
          title: "变更时间",
          key: "created"
        },
        {
          title: "积分值",
          key: "ruleValue"
        }
      ],
      scoreData: [],
      userId: null,
      pageIndex: 0,
      pageSize: 10,
      ruleType: null,
      date: null,
      lastDate: null,
      totalPage: null,
      ruleTypeList: [
        {
          "id":"1",
          "ruleType":"sign",
          "ruleName":"签到"
        },
        {
          "id":"2",
          "ruleType":"share",
          "ruleName":"分享"
        },
        {
          "id":"3",
          "ruleType":"register",
          "ruleName":"注册"
        },
        {
          "id":"4",
          "ruleType":"focus",
          "ruleName":"关注"
        },
        {
          "id":"5",
          "ruleType":"comment",
          "ruleName":"评论"
        },
        {
          "id":"6",
          "ruleType":"collection",
          "ruleName":"收藏"
        },
        {
          "id":"7",
          "ruleType":"order",
          "ruleName":"下单"
        },
        {
          "id":"8",
          "ruleType":"buy",
          "ruleName":"购买商品"
        },
      ]
    };
  },

  created: function() {
    this.userId = this.$route.params.userId;
  },

  mounted: function() {
    this.getTheUserScoreDetail();
  },

  methods: {
    /**
     * 查询当前用户积分明细
     */
    getTheUserScoreDetail: function() {
      let that = this;
      let params = {
        page: this.pageIndex,
        pageSize: this.pageSize,
        userId: this.userId,
        ruleType: this.ruleType === "all" ? null: this.ruleType,
        created: this.date ? this.date + " 00:00:00" : null,
        updated: this.lastDate ? this.lastDate + " 00:00:00" : null
      };
      request("mapi/score/findScoreHistory.do", "post", null, params, function(
        res
      ) {
        if (res && res.data && res.data.code === 200) {
          let info = res.data.data;
          that.scoreData = info.list;
          info.list.forEach(item => {
            if (item.ruleType === "sign") {
              item.ruleType = "签到";
            } else {
              item.ruleType = transformScoreTypeName(item.ruleName);
            }
          });
          that.totalPage = info.total;
        }
      });
    },

    /**
     * 更改当前页码
     */
    changePage: function(pageIndex) {
      this.pageIndex = pageIndex;
      this.getTheUserScoreDetail();
    },

    /**
     * 更改页面大小
     */
    changePageSize: function(pageSize) {
      this.pageSize = pageSize;
      this.getTheUserScoreDetail();
    },

    /**
     * 更改日期
     */
    changeDate: function(date) {
      this.date = date[0];
      this.lastDate = date[1];
    },

    /**
     * 搜索积分明细信息
     */
    searchScoreDetail: function() {
      this.getTheUserScoreDetail();
    }
  }
};
</script>
<style scoped>
.search-header {
  margin-bottom: 20px;
}
.form-input {
  width: 200px;
  margin-left: 15px;
}
.page-component {
  margin-top: 20px;
}
</style>



