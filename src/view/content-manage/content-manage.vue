<template>
    <div>
         <!-- 搜索框 -->
         <Input clearable placeholder="作者名称" style="width:200px;" v-model="auchorName"/>
         <Input clearable placeholder="内容标题" class="content_search" v-model="title"/>
         <DatePicker type="daterange" placement="bottom-end" placeholder="发布时间" class="content_search"></DatePicker>
         <Button type="info" icon="ios-search" class="content_btn" @click="doSearch"></Button>
         <!-- 新增内容 -->
         <Button type="info" class="content_btn" @click="toContentDetail">新增内容</Button>
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
      auchorName: "",
      // 内容标题
      title: "",
      // 总页数
      totalPage:100,
      // 表格列
      columns:[
          {title:"标题",key:"title"},
          {title:"内容摘要",key:"synopsis"},
          {title:"作者",key:"author"},
          {title:"点击量",key:"hitCount"},
          {title:"发布时间",key:"publishTime"},
          {title:"操作",render:(h,params)=>{
              return h("div",[
                  h("Button",{
                      props:{
                          type:"info",
                          size:"small"
                      },
                      on:{
                          click:()=>{
                              // 跳转到内容详情页
                              this.toContentDetail()
                          }
                      }
                  },"编辑"),
                  h("Button",{
                      props:{
                          type:"error",
                          size:"small"
                      },
                      style:{
                          marginLeft:"10px"
                      },
                      on:{
                          click:() => {
                              this.$Modal.confirm({
                                title: "删除内容",
                                content: "是否删除该内容",
                                onOk:() => {
                                    this.delContent(params) 
                                }
                            })
                          }
                      }
                  },"删除"),
              ])
          }}
      ],
      // 表格内容
      tableData:[
          {"contentId":"1","title":"内容标题","synopsis":"内容摘要","author":"作者","hitCount":"点击量","publishTime":"发布时间"},
          {"contentId":"2","title":"内容标题","synopsis":"内容摘要","author":"作者","hitCount":"点击量","publishTime":"发布时间"},
          {"contentId":"3","title":"内容标题","synopsis":"内容摘要","author":"作者","hitCount":"点击量","publishTime":"发布时间"},
          {"contentId":"4","title":"内容标题","synopsis":"内容摘要","author":"作者","hitCount":"点击量","publishTime":"发布时间"},
          {"contentId":"5","title":"内容标题","synopsis":"内容摘要","author":"作者","hitCount":"点击量","publishTime":"发布时间"},
          {"contentId":"6","title":"内容标题","synopsis":"内容摘要","author":"作者","hitCount":"点击量","publishTime":"发布时间"},
          {"contentId":"7","title":"内容标题","synopsis":"内容摘要","author":"作者","hitCount":"点击量","publishTime":"发布时间"},
          {"contentId":"8","title":"内容标题","synopsis":"内容摘要","author":"作者","hitCount":"点击量","publishTime":"发布时间"},
          {"contentId":"8","title":"内容标题","synopsis":"内容摘要","author":"作者","hitCount":"点击量","publishTime":"发布时间"},
          {"contentId":"8","title":"内容标题","synopsis":"内容摘要","author":"作者","hitCount":"点击量","publishTime":"发布时间"}
      ]
    };
  },
  methods: {

    /**
     * 更改页码
     */
    changePage: function(pageIndex) {
      //    this.pageIndex = pageIndex
      console.log(pageIndex);
      // request("v1/user/userInfo","get",null,function(data){
      //     console.log(data)
      // })
    },

    /**
     * 更改页面大小
     */
    changePageSize: function(pageSize) {
      console.log(pageSize);
      //    this.pageSize = pageSize
    },

    /**
     * 执行搜索
     */
    doSearch:function() {
        console.log("搜索")
    },

    /**
     * 跳转到内容详情页
     */
    toContentDetail: function() {
        this.$router.push({
            name:"content_detail"
        })
    },

    /**
     * 删除指定内容
     */
    delContent: function(params) {
        console.log(params)
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

