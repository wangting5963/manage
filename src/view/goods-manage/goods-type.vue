<template>
    <div>
         <Tree :data="baseData" :load-data="loadTypeData" :render="renderContent"></Tree>
    </div>
</template>
<script>
export default {
  name: "goods-type",
  data() {
    return {
      baseData: [
        {
          title: "全部分类",
          // 设置展开子节点
          expand: false,
          loading: false,
          // 自定义当前节点的样式和内容
          render: (h, { root, node, data }) => {
            return h(
              "span",
              {
                style: {
                  display: "inline-block",
                  width: "100%"
                }
              },
              [
                h("span", [
                  h("Icon", {
                    props: {
                      type: "ios-folder-outline"
                    },
                    style: {
                      marginRight: "8px"
                    }
                  }),
                  h("span", data.title)
                ]),
                h(
                  "span",
                  {
                    style: {
                      display: "inline-block",
                      float: "right",
                      marginRight: "32px"
                    }
                  },
                  [
                    h("Button", {
                      props: Object.assign({}, this.buttonProps, {
                        icon: "ios-add",
                        type: "primary"
                      }),
                      style: {
                        width: "64px"
                      },
                      on: {
                        click: () => {
                          this.showAppendDialog(data,"add");
                        }
                      }
                    })
                  ]
                )
              ]
            );
          },
          // 放置所有的一级分类
          children: []
        }
      ],
      buttonProps: {
        type: "default",
        size: "small"
      },
      // 默认：是否显示指定类别的状态位
      isTypeShow: "是",
      // 默认：类别名称
      typeName: "",
      // 默认：类别排序序号
      typeSort: 1
    };
  },
  methods: {
    /**
     * 树形节点每一行的样式和内容
     */
    renderContent(h, { root, node, data }) {
      return h(
        "span",
        {
          style: {
            display: "inline-block",
            width: "100%"
          }
        },
        [
          h("span", [
            h("Icon", {
              style: {
                marginRight: "8px"
              }
            }),
            h("span", data.title)
          ]),
          h(
            "span",
            {
              style: {
                display: "inline-block",
                float: "right",
                marginRight: "32px"
              }
            },
            [
              h("Button", {
                props: Object.assign({}, this.buttonProps, {
                  icon: "ios-add"
                }),
                style: {
                  marginRight: "8px"
                },
                on: {
                  click: () => {
                    this.showAppendDialog(data,"add");
                  }
                }
              }),
              h("Button", {
                props: Object.assign({}, this.buttonProps, {
                  icon: "ios-remove"
                }),
                style: {
                  marginRight: "8px"
                },
                on: {
                  click: () => {
                    this.remove(root, node, data);
                  }
                }
              }),
              h(
                "Button",
                {
                  props: Object.assign({}, this.buttonProps),
                  on: {
                    click: () => {
                      this.editor(root, node, data);
                    }
                  }
                },
                "编辑"
              )
            ]
          )
        ]
      );
    },

    /**
     * 异步加载子分类
     */
    loadTypeData: function(item, callback) {
      let parentTypeId
      if(item.nodeKey === 0) {
        parentTypeId = item.nodeKey
      } else {
        parentTypeId = item.typeInfo.id
      }
      // this.request("/mapi/itemcat/query.do","post",{parentId:parentTypeId},function(res){
      this.request("getGoodsType","post",{parentId:parentTypeId},function(res){
          console.log(res)
          let result = res.data
          // if (result && result.code === 200) {
              let data = [] 
              result.forEach(function(item,index){
                data.push({
                  title: item.name,
                  expand: false,
                  typeInfo: item,
                  loading:false,
                  children:[]
                })
              })
              callback(data)
          // }
      })
    },  

    /**
     * 添加分类弹框
     */
    showAppendDialog: function(data,flag) {
      let that = this;
      this.$Modal.confirm({
        onOk: () => {
          this.append(data);
        },
        render: h => {
          return h("div", [
            h(
              "div",
              {
                style: {
                  display: "flex",
                  alignItems: "center"
                }
              },
              [
                h("label", "类别名称："),
                h("Input", {
                  props: {
                    placeholder: "请输入类别名称",
                    value: flag === "edit" ? data.title : ""
                  },
                  style: {
                    width: "200px",
                    marginLeft: "20px"
                  },
                  on: {
                    input: function(data) {
                      that.typeName = data;
                    }
                  }
                })
              ]
            ),
            h(
              "div",
              {
                style: {
                  display: "flex",
                  alignItems: "center",
                  marginTop: "10px"
                }
              },
              [
                h("label", "分类排序："),
                h("InputNumber", {
                  props: {
                    max: 9999,
                    min: 1,
                    value: flag === "edit" ? parseInt(data.typeInfo.sort): 1
                  },
                  style: {
                    marginLeft: "20px"
                  },
                  on: {
                    "on-change": function(number) {
                      that.typeSort = number;
                    }
                  }
                })
              ]
            ),
            h(
              "div",
              {
                style: {
                  display: "flex",
                  alignItems: "center",
                  marginTop: "10px"
                }
              },
              [
                h("label", "是否显示："),
                h(
                  "RadioGroup",
                  {
                    props: {
                      value: flag === "edit" ? (data.typeInfo.showStatus === "1" ? "是":"否") : "是"
                    },
                    style: {
                      marginLeft: "20px"
                    },
                    on: {
                      "on-change": function(data) {
                        that.isTypeShow = data;
                      }
                    }
                  },
                  [
                    h("Radio", {
                      props: {
                        label: "是"
                      }
                    }),
                    h("Radio", {
                      props: {
                        label: "否"
                      },
                      style: {
                        marginLeft: "10px"
                      }
                    })
                  ]
                )
              ]
            )
          ]);
        }
      });
    },

    /**
     * 添加节点（分类）
     */
    append(data) {
      // console.log(this.typeName)
      // console.log(this.typeSort)
      // console.log(this.isTypeShow)
      // console.log(data)
      // 调用接口添加分类
      const children = data.children || [];
      children.push({
        title: this.typeName,
        expand: true
      });
      this.$set(data, "children", children);
    },

    /**
     * 移除节点（分类）
     */
    remove(root, node, data) {
      console.log("要删除的类型名称" + data.typeInfo.id)
      // const parentKey = root.find(el => el === node).parent;
      // const parent = root.find(el => el.nodeKey === parentKey).node;
      // const index = parent.children.indexOf(data);
      // parent.children.splice(index, 1);
    },

    /**
     * 编辑节点
     */
    editor: function(root, node, data) {
      this.showAppendDialog(data,"edit");
    }
  }
};
</script>

<style>
.type_table {
  margin-top: 20px;
}

.type_page {
  margin-top: 20px;
}
</style>
