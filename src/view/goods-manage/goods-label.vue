<template>
    <div>
        <Button type="info" @click="showDialog('new')">新增标签</Button>
        <Table border :columns="columns" :data="tableData" class="label_table"></Table>
        <Page :total="totalPage" show-elevator show-sizer class="label_page" @on-change="changePage" @on-page-size-change="changePageSize"/>
    </div>
</template>

<script>
export default {
  name: "goods-label",
  data() {
    return {
      columns: [
        { title: "标签名称", key: "labelName" },
        { title: "关联商品数（个）", key: "relategoods" },
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
                      this.showDialog("modify", params);
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
                    marginLeft: "20px"
                  },
                  on: {
                    click: () => {
                      this.$Modal.confirm({
                        title: "删除标签",
                        content: "是否删除该标签",
                        onOk: () => {
                          this.delLabel(params);
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
      tableData: [],
      totalPage: 0,
      // 修改后的标签值
      newLabel: "",
      page:1,
      pageSize:10
    };
  },
  mounted:function() {
    // 查询所有商品标签
    this.getAllLabel()
  },
  methods: {
    /**
     * 查询所有商品标签
     */
    getAllLabel:function(page,pageSize) {
      let that = this
      this.request("/mapi/itemLabel/findAll.do","post",null,{page:this.page,pageSize:this.pageSize},function(res){
        if(res.data && res.data.code === 200){
          let info = res.data.data
          if(info.list.length > 0){
            that.tableData = info.list
            that.totalPage = info.total
          }
        }
      })
    },

    /**
     * 调整页码
     */
    changePage: function(pageIndex) {
      this.page = pageIndex
      this.getAllLabel()
    },

    /**
     * 调整页面大小
     */
    changePageSize: function(pageSize) {
      this.pageSize = pageSize
      this.getAllLabel()
    },

    /**
     * 弹出修改或者新增标签的弹框
     * @param {String} flag new:新增  modify:修改
     * @param {Object} romInfo 当前点击行信息
     */
    showDialog: function(flag, romInfo) {
      let that = this;
      // 清空变量
      that.newLabel = "";
      let defaultValue = "";
      if (flag === "modify") {
        defaultValue = romInfo.row.labelName;
        this.newLabel = defaultValue;
      }
      this.$Modal.confirm({
        onOk: () => {
          that.addOrModiifyLabel(flag, romInfo);
        },
        render: h => {
          return h("Input", {
            props: {
              placeholder: "新的标签名称",
              value: defaultValue,
              clearable: true
            },
            on: {
              input: function(info) {
                that.newLabel = info;
              }
            }
          });
        }
      });
    },

    /**
     * 新增或者修改标签
     * @param {String} flag new:新增  modify:修改
     * @param {Object} romInfo 当前点击行信息
     */
    addOrModiifyLabel: function(flag, romInfo) {
      let that = this
      if(this.newLabel !== ""){
        if (flag === "new") {
          this.request("/mapi/itemLabel/insert.do","post",null,{labelName:this.newLabel},function(res){
            if(res.data.code === 200){
              that.getAllLabel()
            }
          })
        } else if (flag === "modify") {
          let params = {
            id:romInfo.row.id,
            labelName:this.newLabel,
            relategoods:romInfo.row.relategoods
          }
          this.request("/mapi/itemLabel/updateSelective.do","post",null,params,function(res){
            if(res.data.code === 200){
              that.getAllLabel()
            }
          })
        }
      } else {
        this.$Notice.warning({
          title: "警告",
          desc: "请输入类别名称"
        })
      }
    },

    /**
     * 删除指定标签
     * @param {Object} romInfo 当前点击行信息
     */
    delLabel: function(romInfo) {
      let id = romInfo.row.id
      let that = this
      this.request("/mapi/itemLabel/delete.do","post",null,{id:id},function(res){
        if(res.data.code === 200){
          that.tableData.splice(romInfo.index,1)
        }
      })
    }
  }
};
</script>

<style>
.label_table {
  margin-top: 20px;
}

.label_page {
  margin-top: 20px;
}
</style>
