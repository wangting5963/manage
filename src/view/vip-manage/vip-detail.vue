<template>
    <div>
        <Form :v-model="vipFrom" label-position="left" :label-width="100" class="my_form">
            <FormItem label="会员账号">
                <Input disabled class="input" v-model="vipFrom.vipAccount"/>
            </FormItem>
            <FormItem label="会员昵称">
                <Input disabled class="input" v-model="vipFrom.vipNickname"/>
            </FormItem>
            <FormItem label="手机号">
                <Input disabled class="input" v-model="vipFrom.vipPhone"/>
            </FormItem>
            <FormItem label="积分">
                <Input disabled class="input special_input" v-model="vipFrom.vipScore"/>
                <Button type="info" style="margin-left:5px;">积分调整</Button>
            </FormItem>
            <FormItem label="注册时间">
                <Input disabled class="input" v-model="vipFrom.vipRegisterTime"/>
            </FormItem>
            <FormItem label="备注">
                <Input class="input" type="textarea" v-model="vipFrom.vipRemark"/>
            </FormItem>
            <FormItem label="会员推荐人">
                <Input class="input" disabled v-model="vipFrom.vipReferrer"/>
            </FormItem>
            <FormItem label="是否禁用">
                <RadioGroup v-model="isDisabled">
                    <Radio label="是"></Radio>
                    <Radio label="否" style="margin-left:5px;"></Radio>
                </RadioGroup>
            </FormItem>
            <FormItem label="会员标签">
                <CheckboxGroup v-model="vipLabel">
                    <Checkbox label="普通会员"></Checkbox>
                    <Checkbox label="忠实会员"></Checkbox>
                    <Checkbox label="内部会员"></Checkbox>
                </CheckboxGroup>
            </FormItem>
            <Button type="info" style="width:80px;">提交</Button>
        </Form>
    </div>
</template>
<script>
export default {
  name: "vip-detail",
  data() {
    return {
       vipFrom: {
           vipAccount: "SVIP201834534654565",
           vipNickname: "王先生",
           vipPhone: "15136245589",
           vipScore: "6666",
           vipRegisterTime: "2018-12-21",
           vipRemark: "备注信息",
           vipReferrer: "推荐人名称/45465798798"
       },
       // 是否禁用会员
       isDisabled: "",
       // 选中的vip标签
       vipLabel: []
    };
  },
  methods: {}
};
</script>
<style>
.input {
  width: 350px;
}
.special_input{
    width: 265px;
}
</style>

