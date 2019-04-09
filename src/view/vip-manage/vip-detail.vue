<template>
    <div>
        <Form :v-model="vipForm" label-position="left" :label-width="100" class="my_form">
            <FormItem label="账号">
                <Input disabled class="input" v-model="vipForm.vipAccount"/>
            </FormItem>
            <FormItem label="昵称">
                <Input disabled class="input" v-model="vipForm.vipNickname"/>
            </FormItem>
            <FormItem label="手机号">
                <Input disabled class="input" v-model="vipForm.vipPhone"/>
            </FormItem>
            <FormItem label="积分">
                <Input disabled class="input special_input" v-model="vipForm.vipScore"/>
                <Button type="info" style="margin-left:5px;" @click="adjustScore">积分调整</Button>
            </FormItem>
            <FormItem label="注册时间">
                <Input disabled class="input" v-model="vipForm.vipRegisterTime"/>
            </FormItem>
            <FormItem label="标签">
                <CheckboxGroup v-model="vipForm.vipLabel">
                    <Checkbox label="普通会员"></Checkbox>
                    <Checkbox label="忠实会员"></Checkbox>
                    <Checkbox label="内部会员"></Checkbox>
                </CheckboxGroup>
            </FormItem>
            <FormItem label="邀请人ID">
                <Input class="input special_input" disabled v-model="vipForm.vipReferrer"/>
                <Button type="info" style="margin-left:5px;" @click="adjustReferrer">修改</Button>
            </FormItem>
            <Button type="info" style="width:80px;" @click="submitForm">提交</Button>
            <Button type="error" style="width:80px;margin-left: 20px;" @click="blockedAccount">冻结账户</Button>
        </Form>
    </div>
</template>
<script>
export default {
  name: "vip-detail",
  data() {
    return {
      vipForm: {
        vipAccount: "SVIP201834534654565",
        vipNickname: "王先生",
        vipPhone: "15136245589",
        vipScore: 6666,
        scoreRemark: "积分获取方式",
        vipRegisterTime: "2018-12-21",
        vipRemark: "积分获取方式",
        vipReferrer: "315646789",
        isDisabled: "",
        vipLabel: [],
        incomeStatus: "收入状况",
        expendStatus: "支出状况"
      },
      // 调整后的积分值
      modifyScore: 0,
      // 积分备注
      modifyRemark: "",
      // 新推荐人手机号
      referrerPhone: ""
    };
  },
  methods: {
    /**
     * 弹出积分调整弹框
     */
    adjustScore: function() {
      let that = this;
      this.$Modal.confirm({
        onOk: that.submitModifyScore,
        render: function(h, params) {
          return h("div", [
            h("InputNumber", {
              props: {
                placeholder: "积分值",
                value: parseInt(that.vipForm.vipScore)
              },
              style: {
                width: "90px"
              },
              on: {
                "on-change": number => {
                  // 更改积分
                  that.modifyScore = number;
                }
              }
            }),
            h("Input", {
              props: {
                placeholder: "输入99即为增加99，输入-99即为减少99",
                disabled: true
              },
              style: {
                width: "260px",
                marginLeft: "25px"
              }
            }),
            h("Input", {
              props: {
                type: "textarea",
                placeholder: "备注",
                value: that.vipForm.scoreRemark
              },
              style: {
                marginTop: "20px"
              },
              on: {
                input: info => {
                  // 添加积分备注
                  that.modifyRemark = info;
                }
              }
            })
          ]);
        }
      });
    },

    /**
     * 提交修改的积分值
     */
    submitModifyScore: function() {
      this.vipForm.vipScore = this.modifyScore;
      this.vipForm.scoreRemark = this.modifyRemark;
    },

    /**
     * 修改推荐人信息
     */
    adjustReferrer: function() {
      this.$Modal.confirm({
        onOk: this.submitModifyReferrer,
        render: (h, params) => {
          return h("div", [
            h("Input", {
              props: {
                placeholder: "输入新推荐ID"
              },
              on: {
                input: newphone => {
                  this.referrerPhone = newphone;
                }
              }
            })
          ]);
        }
      });
    },

    /**
     * 提交修改的推荐人
     */
    submitModifyReferrer: function() {
      // 修改推荐人信息
      this.vipForm.vipReferrer = this.referrerPhone;
    },

    /**
     * 提交表单
     */
    submitForm: function() {
      console.log(this.vipForm);
    },

    /**
     * 冻结用户
     */
    blockedAccount: function() {
      console.log("冻结账户")
    }
  }
};
</script>
<style>
.input {
  width: 350px;
}
.special_input {
  width: 265px;
}
</style>
