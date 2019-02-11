<template>
    <div>
         <!-- 搜索框 -->
         <Input clearable placeholder="作者名称" style="width:200px;" v-model="author"/>
         <Input clearable placeholder="内容标题" class="content_search" v-model="title"/>
         <DatePicker type="daterange" placement="bottom-end" placeholder="发布时间" class="content_search" @on-change="selectDate"></DatePicker>
         <Button type="info" icon="ios-search" class="content_btn" @click="doSearch"></Button>
         <!-- 新增内容 -->
         <Button type="info" class="content_btn" @click="toContentDetail('add')">新增内容</Button>
         <!-- 列表 -->
         <Table stripe border :columns="columns" :data="tableData" class="content_table"></Table>
         <!-- 分页 -->
         <Page :total="totalPage" show-elevator show-sizer class="content_table" @on-change="changePage" @on-page-size-change="changePageSize"/>
    </div>
</template>

<script>
export default {
  name: "content-manage",
  data() {
    return {
      // 作者名称
      author: "",
      // 内容标题
      title: "",
      // 时间
      startDate: "",
      endDate: "",
      // 总条数
      totalPage: 1,
      page: 1,
      pageSize: 10,
      // 表格列
      columns: [
        { title: "标题", key: "title" },
        { title: "内容摘要", key: "intro" },
        { title: "作者", key: "author" },
        { title: "点击量", key: "hits" },
        { title: "发布时间", key: "publishtime" },
        {
          title: "操作",
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
                      // 跳转到内容详情页
                      this.toContentDetail("modify",params);
                    }
                  }
                },
                "编辑"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  style: {
                    marginLeft: "10px"
                  },
                  on: {
                    click: () => {
                      this.$Modal.confirm({
                        title: "删除内容",
                        content: "是否删除该内容",
                        onOk: () => {
                          this.delContent(params);
                        }
                      });
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      // 表格内容
      tableData: []
    };
  },
  mounted: function() {
    this.getContentList();
  },
  methods: {
    /**
     * 获取内容列表
     */
    getContentList: function() {
      let that = this;
      let params = { 
          page: this.page, 
          pageSize: this.pageSize, 
          author:this.author,
          title:this.title,
          publishtime:this.startDate,
          updated:this.endDate
      }
      this.request("mapi/content/findContentAll.do","post",params,function(res) {
          if (res.data && res.data.code === 200) {
            let info = res.data.data;
            that.totalPage = info.total;
            that.tableData = info.list;
          }
        }
      );
    },

    /**
     * 更改页码
     */
    changePage: function(pageIndex) {
      this.pageIndex = pageIndex;
      this.getContentList();
    },

    /**
     * 更改页面大小
     */
    changePageSize: function(pageSize) {
      this.pageSize = pageSize;
      this.getContentList();
    },

    /**
     * 选择时间
     */
    selectDate: function(date) {
      if(date[0] === "" || date[1] === "") {
        this.startDate = null
        this.endDate = null  
      } else {
        this.startDate = date[0]  + " 00:00:00"
        this.endDate = date[1] + " 00:00:00"  
      }
    },

    /**
     * 执行搜索
     */
    doSearch: function() {
      this.getContentList();
    },

    /**
     * 跳转到内容详情页
     */
    toContentDetail: function(flag,info) {
      let id
      if(info) {
        id = info.row.id
      } else {
        id = "null"
      }
      this.$router.push({
        name: "content_detail",
        params: {
          flag:flag,
          contentId:id
        }
      })
    },

    /**
     * 删除指定内容
     */
    delContent: function(params) {
      let that = this;
      let id = params.row.id;
      this.request("mapi/content/delete.do", "get", { id: id }, function(res) {
        if (res.data && res.data.code === 200) {
          that.tableData.splice(params.index, 1);
        }
      });
    }
  }
};
</script>

<style>
.content_search {
  width: 200px;
  margin-left: 20px;
}
.content_btn {
  margin-left: 20px;
}
.content_table {
  margin-top: 20px;
}
</style>
