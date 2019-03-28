<template>
  <div>
    <Button type="primary" @click="openModule('add','')">新增活动</Button>
    <Table border :columns="columns" :data="tableData" class="label_table"></Table>
    <Page :total="totalPage" show-elevator show-sizer class="label_page" @on-change="changePage"
          @on-page-size-change="changePageSize"/>

    <Modal
      v-model="modal1"
      title="商品所属项目"
      @on-ok="confim">
      <div>
        项目编号:<Input placeholder="请输入唯一项目编号。不可重复！" v-model="configItem.configcode"/>

        项目名称:<Input placeholder="请输入项目名称！" v-model="configItem.configname"/>
      </div>
    </Modal>
  </div>
</template>

<script>
  export default {
    name: "goods-label",
    data() {
      return {
        modal1: false,
        operateFlag: "add",
        configItem: {},
        columns: [
          {type: "index", width: 50, align: "center"},
          {title: "项目编码", key: "configcode"},
          {title: "项目名称", key: "configname"},
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
                        this.openModule('modify', params);
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
                          title: "删除项目",
                          content: "是否删除该项目？",
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
        page: 1,
        pageSize: 10
      };
    },
    mounted: function () {
      // 查询所有商品标签
      this.getAllLabel();
    },
    methods: {

      openModule: function (flag, params) {
        this.modal1 = true;
        if (flag === "add") {
          this.configItem.id = "";
          this.configItem.configcode = "";
          this.configItem.configname = "";
        } else {
          this.configItem.id = params.row.id;
          this.configItem.configcode = params.row.configcode;
          this.configItem.configname = params.row.configname;
          this.operateFlag = "modify";
        }
      },

      /**
       * 提交输入的信息
       */
      confim: function () {
        let that = this;
        let patam = {
          "configtype": "goodsType",
          "configcode": this.configItem.configcode,
          "configname": this.configItem.configname,
          "id": this.configItem.id
        };

        if (this.configItem.configcode === "" || this.configItem.configcode === undefined) {
          this.$Message.error('项目编码不能为空!');
          return;
        } else if (this.configItem.configname === "" || this.configItem.configname === undefined) {
          this.$Message.error('项目名称不能为空!');
          return;
        }

        if (this.operateFlag === "add") {
          this.request("/mapi/config/insert.do", "post",null, patam,
            function (res) {
              if (res.data && res.data.code === 200) {
                that.$Message.info('添加成功！');
                that.getAllLabel();
              } else {
                that.$Message.error(res.data.msg);
              }
            })
        } else {
          this.request("/mapi/config/update.do", "post",null, patam,
            function (res) {
              if (res.data && res.data.code === 200) {
                that.$Message.info('修改成功！');
                that.getAllLabel();
              } else {
                that.$Message.error(res.data.msg);
              }
            })
        }
      },

      /**
       * 查询所有商品项目
       */
      getAllLabel: function (page, pageSize) {
        let that = this
        this.request("/mapi/config/findAllConfigsPage.do", "post",null,
          {
            page: this.page,
            pageSize: this.pageSize,
            "configtype": "goodsType"
          },
          function (res) {
            if (res.data && res.data.code === 200) {
              let info = res.data.data
              if (info.list.length > 0) {
                that.tableData = info.list
                that.totalPage = info.total
              }
            }
          })
      },

      /**
       * 调整页码
       */
      changePage: function (pageIndex) {
        this.page = pageIndex
        this.getAllLabel()
      },

      /**
       * 调整页面大小
       */
      changePageSize: function (pageSize) {
        this.pageSize = pageSize
        this.getAllLabel()
      },

      /**
       * 删除指定标签
       * @param {Object} romInfo 当前点击行信息
       */
      delLabel: function (romInfo) {
        let id = romInfo.row.id
        let that = this
        this.request("/mapi/config/delete.do", "post",null, {id: id}, function (res) {
          if (res.data.code === 200) {
            that.$Message.info('成功！');
            that.tableData.splice(romInfo.index, 1)
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
