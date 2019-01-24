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
                          this.showAppendDialog(data, "add");
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
                    this.showAppendDialog(data, "add");
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
                      this.showAppendDialog(data, "edit");
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
      let parentTypeId;
      if (item.nodeKey === 0) {
        parentTypeId = item.nodeKey;
      } else {
        parentTypeId = item.typeInfo.id;
      }
      this.request(
        "/mapi/itemcat/query.do",
        "post",
        { superType: parentTypeId },
        function(res) {
          let result = res.data;
          if (result && result.code === 200) {
            let data = [];
            if (result.data && result.data.length) {
              result.data.forEach(function(item, index) {
                data.push({
                  title: item.typename,
                  expand: false,
                  typeInfo: item,
                  loading: false,
                  children: []
                });
              });
              callback(data);
            } else {
              callback([]);
            }
          } else {
            callback([]);
          }
        }
      );
    },

    /**
     * 分类弹框
     */
    showAppendDialog: function(data, flag) {
      let that = this;
      this.$Modal.confirm({
        onOk: () => {
          if (flag === "edit") {
            this.editor(data);
          } else if (flag === "add") {
            this.append(data);
          }
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
                    input: function(name) {
                      that.typeName = name;
                      if (flag === "edit") {
                        that.$set(data.typeInfo, "typename", name);
                      }
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
                    value:
                      flag === "edit" ? parseInt(data.typeInfo.typesort) : 1
                  },
                  style: {
                    marginLeft: "20px"
                  },
                  on: {
                    "on-change": function(number) {
                      that.typeSort = number;
                      if (flag === "edit") {
                        that.$set(data.typeInfo, "typesort", number);
                      }
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
                      value:
                        flag === "edit"
                          ? data.typeInfo.showstatus === 1 ? "是" : "否"
                          : "是"
                    },
                    style: {
                      marginLeft: "20px"
                    },
                    on: {
                      "on-change": function(isShow) {
                        that.isTypeShow = isShow;
                        if (flag === "edit") {
                          that.$set(data.typeInfo, "showstatus", isShow);
                        }
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
      let that = this
      // 验证标签名称不能为空
      if (that.typeName !== "") {
        let parentTypeId;
        if (data.nodeKey === 0) {
          parentTypeId = data.nodeKey;
        } else {
          parentTypeId = data.typeInfo.id;
        }
        this.request(
          "/mapi/itemcat/insert.do",
          "post",
          {
            typename: this.typeName,
            supertype: parentTypeId,
            typesort: this.typeSort,
            showstatus: this.isTypeShow === "是" ? 1 : 0
          },
          function(res) {
            if (res.data && res.data.code === 200 && res.data.msg === "成功") {
              const children = data.children || [];
              children.push({
                title: that.typeName,
                expand: false,
                loading: false,
                typeInfo: res.data.data,
                children: []
              });
              that.$set(data, "children", children);
            }
          }
        );
      } else {
        this.$Notice.warning({
          title: "警告",
          desc: "请输入类别名称"
        })
      }
    },

    /**
     * 移除节点（分类）
     */
    remove(root, node, data) {
      let that = this
      that.$Modal.confirm({
          title: '警告',
          content: '您将执行删除操作，如果包含子类别也将一并删除！',
          onOk: () => {
              that.request(
                "/mapi/itemcat/delete.do",
                "post",
                { id: data.typeInfo.id },
                function(res) {
                  if (res.data && res.data.code === 200 && res.data.msg === "成功") {
                    const parentKey = root.find(el => el === node).parent;
                    const parent = root.find(el => el.nodeKey === parentKey).node;
                    const index = parent.children.indexOf(data);
                    parent.children.splice(index, 1);
                  }
                }
              )
          }
      });
    },

    /**
     * 编辑节点
     */
    editor: function(data) {
      let that = this;
      let typeName = data.typeInfo.typename;
      let showStatus = data.typeInfo.showstatus;
      let typeSort = data.typeInfo.typesort;
      this.request(
        "/mapi/itemcat/updateSelective.do",
        "post",
        {
          id: data.typeInfo.id,
          typename: data.typeInfo.typename,
          supertype: data.typeInfo.supertype,
          typesort: data.typeInfo.typeSort,
          showstatus: data.typeInfo.showstatus === "是" ? 1 : 0
        },
        function(res) {
          if (res.data && res.data.code === 200 && res.data.msg === "成功") {
            that.$set(data, "title", typeName);
            that.$set(data.typeInfo, "showstatus", showStatus === "是" ? 1 : 0);
            that.$set(data.typeInfo, "typesort", typeSort);
            that.$set(data.typeInfo, "typename", typeName);
          }
        }
      );
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
