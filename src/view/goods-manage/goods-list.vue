<template>
  <div>
    <!-- 搜索 -->
    <Select v-model="type" style="width:200px" placeholder="请选择商品类型">
      <Option value="all">全部</Option>
      <Option v-for="item in typeList" :value="item.id" :key="item.id">{{ item.typename }}</Option>
    </Select>
    <Select v-model="label" style="width:200px;margin-left:20px;" placeholder="请选择商品标签">
      <Option value="all">全部</Option>
      <Option v-for="item in labelList" :value="item.id" :key="item.id">{{ item.labelName }}</Option>
    </Select>
    <!--<Input clearable placeholder="商品Id" v-model="id" class="goods_input"/>-->
    <!--<Input clearable placeholder="" v-model="model" class="goods_input"/>-->

    <Select v-model="project" style="width:200px;margin-left:20px;" placeholder="请选择所属项目">
      <Option value="all">全部</Option>
      <Option :value="configItem.configcode" v-for="configItem in projectList" :key="configItem.id">
        {{ configItem.configname }}
      </Option>
    </Select>

    <Input clearable placeholder="库存<" v-model="goodsStore" class="goods_input"/>
    <Input clearable placeholder="商品名称" v-model="name" class="goods_input"/>
    <Select v-model="status" style="width:200px;margin-left:20px;" placeholder="请选择商品状态">
      <Option value="all">全部</Option>
      <Option v-for="item in goodsStatusList" :value="item.statusId" :key="item.statusId">{{ item.statusName }}</Option>
    </Select>
    <Button type="info" icon="ios-search" style="margin-left:20px;" @click="doSearch"></Button>
    <Button type="info" style="margin-left:20px;" @click="toGoodsDetail('add')">添加商品</Button>
    <!-- 数据表格 -->
    <Table style="margin-top:20px;" border :columns="columns" :data="tableData"></Table>
    <!-- 分页 -->
    <Page :total="totalPage" show-elevator show-sizer class="page_index" @on-change="changePage"
          @on-page-size-change="changePageSize"/>
  </div>
</template>

<script>
  export default {
    name: "goods-list",
    data() {
      return {
        // 总的商品分类列表
        typeList: [],
        // 总的商品标签
        labelList: [],
        // 商品所属项目集合
        projectList: [],
        // 商品状态集合
        goodsStatusList: [
          {statusId: 0, statusName: "未上架"},
          {statusId: 1, statusName: "已上架"},
          {statusId: 2, statusName: "已下架"}
        ],
        // 筛选条件
        type: "",
        label: "",
        status: "",
        id: "",
        model: "",
        goodsStore: "",
        name: "",
        // 表格列
        columns: [
          {type: "index", width: 50, align: "center"},
          {title: "商品名称", key: "goodsname"},
          {title: "商品编号", key: "itemNo"},
          {
            title: "图片", width: 100,
            render: (h, params) => {

              return h('div', [
                h('img', {
                  attrs: {
                    src: params.row.goodsimgarr.split(",")[0]
                  },
                  style: {
                    width: '40px',
                    height: '40px'
                  }
                }),

              ]);

            }
          },

          // { title: "积分值", key: "score" },
          // {title: "商品价格", key: "marketprice", width: 100},
          // {title: "所需积分", key: "score", width: 100},
          // {title: "商品库存", key: "store", width: 100},
          {title: "商品标签", key: "labelname"},
          {
            title: "商品分类", render: (h, params) => {
              return h("div", params.row.parentname + "---" + params.row.typename)
            }
          },
          {title: "状态", width: 80, key: "showStatusStr"},
          {
            title: "操作",
            render: (h, params) => {
              return h("div", [
                h("div", {style: {marginTop: "2px", marginBottom: "2px"}}, [
                  h(
                    "Button",
                    {
                      props: {
                        type: "info",
                        size: "small"
                      },
                      on: {
                        click: () => {
                          // 跳转详情页
                          this.toGoodsDetail("modify", params);
                        }
                      }
                    },
                    "编辑"
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
                          this.$Modal.confirm({
                            title: "下架商品",
                            content: "是否下架该商品？",
                            onOk: () => {
                              this.instockGoods(params);
                            }
                          });
                        }
                      }
                    },
                    "下架"
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
                            title: "删除商品",
                            content: "是否删除该商品？",
                            onOk: () => {
                              this.delGoods(params);
                            }
                          });
                        }
                      }
                    },
                    "删除"
                  )
                ])
              ]);
            }
          }
        ],
        // 表格数据
        tableData: [],
        // 总页数
        totalPage: 0,
        page: 1,
        pageSize: 10
      };
    },
    mounted: function () {
      this.getAllGoods()
      this.getAllType()
      this.getAllLabel()
      this.getSysConfig()
    },
    methods: {

      /**
       * 查询所有商品标签
       */
      getAllLabel: function (page, pageSize) {
        let that = this
        this.request("/mapi/itemLabel/findAllWithoutPage.do", "get", null, null, function (res) {
          if (res.data && res.data.code === 200) {
            let info = res.data.data
            if (info.length > 0) {
              that.labelList = info
            }
          }
        })
      },

      /**
       * 查询所有商品分类
       */
      getAllType: function () {
        let that = this
        this.request("mapi/itemcat/findCatAll.do", "get", null, null, function (res) {
          if (res.data && res.data.code === 200) {
          }
          let allType = res.data.data
          if (allType && allType.length > 0) {
            let localAllType = []
            // 获取一级菜单
            let firstType = allType.filter(item => item.supertype === 0)
            // 获取一级菜单对应的二级菜单
            firstType.forEach(parentType => {
              let childrenType = allType.filter(item => item.supertype === parentType.id)
              // 融合一二级菜单
              childrenType.unshift(parentType)
              localAllType = localAllType.concat(childrenType)
            })
            that.typeList = localAllType
          }
        })
      },

      /**
       * 查询所有商品信息
       */
      getAllGoods: function () {
        let that = this
        let params = {
          page: this.page,
          pageSize: this.pageSize
        };
        this.request("mapi/item/findItemAll.do", "post", null, params, function (res) {
          that.applyGoodsList(res, that)
        })
      },

      /**
       * 渲染商品列表
       */
      applyGoodsList: function (res, that) {
        if (res.data && res.data.code === 200) {
          let returnInfo = res.data.data
          if (returnInfo) {
            that.totalPage = returnInfo.total
            let goodsList = returnInfo.list
            that.tableData = goodsList
          }
        }
      },

      /**
       * 跳转商品详情页
       */
      toGoodsDetail: function (flag, params) {
        let id
        if (params) {
          id = params.row.id
        } else {
          id = "null"
        }
        this.$router.push({
          name: "goods_detail",
          params: {
            flag: flag,
            goodsId: id
          }
        })
      },

      /**
       * 下架商品
       */
      instockGoods: function (params) {
        let that = this
        let id = params.row.id
        if (id) {
          this.request("mapi/item/instock.do", "post", null, {id: id}, function (res) {
            if (res.data && res.data.code === 200) {
              // 移除当前项
              that.tableData.splice(params.index, 1)
            }
          })
        }
      },
      /**
       * 删除商品
       */
      delGoods: function (params) {
        let that = this
        let id = params.row.id
        if (id) {
          this.request("mapi/item/delete.do", "post", null, {id: id}, function (res) {
            if (res.data && res.data.code === 200) {
              // 移除当前项
              // that.tableData.splice(params.index, 1)

              that.getAllGoods()
            }
          })
        }
      },

      /**
       * 更改页码
       */
      changePage: function (pageIndex) {
        this.page = pageIndex
        this.getAllGoods()
      },

      /**
       * 更改页面大小
       */
      changePageSize: function (pageSize) {
        this.pageSize = pageSize
        this.getAllGoods()
      },

      /**
       * 执行搜索
       */
      doSearch: function () {
        let that = this
        // 验证商品ID和库存量
        if (this.id && isNaN(parseInt(this.id))) {
          this.$Notice.warning({
            title: '警告',
            desc: 'id只能为数字'
          });
          return false
        }

        if (this.goodsStore && isNaN(parseInt(this.goodsStore))) {
          this.$Notice.warning({
            title: '警告',
            desc: '库存只能为数字'
          });
          return false
        }

        let reqParam = {
          id: this.id,
          goodstype: "all" === this.type ? "" : this.type,
          goodslabel: "all" === this.label ? "" : this.label,
          model: this.model,
          store: this.goodsStore,
          goodsname: this.name,
          showstatus: "all" === this.status ? "" : this.status,
          fk_configCode: "all" === this.project ? "" : this.project,
          page: this.page,
          pageSize: this.pageSize
        }
        this.request("mapi/item/findItemAll.do", "post", null, reqParam, function (res) {
          that.applyGoodsList(res, that)
        })
      },

      /**
       * 获取商品所在项目的集合信息
       */
      getSysConfig: function () {
        let that = this;
        this.request("mapi/config/findAllConfigs.do", "post", null, {"configtype": "goodsType"}, function (res) {
          if (res.data && res.data.code === 200) {
            that.projectList = res.data.data;
          } else {
            console.error(res.data);
          }
        })
      },
    }
  };
</script>

<style>
  .goods_input {
    width: 200px;
    margin-left: 20px;
  }

  .first_input {
    margin-left: 0px;
    margin-top: 20px;
  }

  .page_index {
    margin-top: 20px;
  }
</style>
