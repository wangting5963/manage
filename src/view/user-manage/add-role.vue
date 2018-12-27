<template>
    <div>
        <Form :v-model="formData" label-position="left" :label-width="100">
            <FormItem label="角色名称">
                <Input clearable v-model="formData.roleName" style="width:260px;" placeholder="输入角色名称"/>
            </FormItem>
            <FormItem label="角色描述">
                <Input type="textarea" v-model="formData.roleDes" style="width:260px;" placeholder="输入角色描述信息"/>
            </FormItem>
             <FormItem label="权限分配">
                <Checkbox label="全选">全选</Checkbox>
                <Form label-position="right" :label-width="60">
                    <FormItem label="全局配置">
                       <Checkbox>全选</Checkbox>
                    </FormItem>
                     <FormItem label="会员管理">
                       <Checkbox>全选</Checkbox>
                    </FormItem>
                    <FormItem label="积分管理">
                       <Checkbox>全选</Checkbox>
                    </FormItem>
                    <FormItem label="商品管理">
                       <Checkbox label="全选">全选</Checkbox>
                       <CheckboxGroup class="my_check_group">
                          <Checkbox label="商品分类"></Checkbox>
                          <Checkbox label="商品标签"></Checkbox>
                          <Checkbox label="商品列表"></Checkbox>
                       </CheckboxGroup>
                    </FormItem>
                    <FormItem label="订单管理">
                       <Checkbox>全选</Checkbox>
                    </FormItem>
                     <FormItem label="用户管理">
                       <Checkbox label="全选">全选</Checkbox>
                       <CheckboxGroup class="my_check_group">
                          <Checkbox label="用户列表"></Checkbox>
                          <Checkbox label="角色列表"></Checkbox>
                          <Checkbox label="添加角色"></Checkbox>
                          <Checkbox label="添加用户"></Checkbox>
                       </CheckboxGroup>
                    </FormItem>
                    <FormItem label="内容管理">
                       <Checkbox>全选</Checkbox>
                    </FormItem>
                    <FormItem label="福利管理">
                       <Checkbox>全选</Checkbox>
                    </FormItem>
                    <FormItem label="支付对账">
                       <Checkbox>全选</Checkbox>
                    </FormItem>
                    <FormItem label="数据监控">
                       <Checkbox>全选</Checkbox>
                    </FormItem>
                </Form>
            </FormItem>
            <FormItem>
                <Button type="info" @click="resetForm">重置</Button>
                <Button type="info" @click="submitForm" style="margin-left:20px;">提交</Button>
            </FormItem>
        </Form>
    </div>
</template>
<script>
export default {
    name:"add-role",
    data() {
        return {
            // 表单数据
            formData:{
                roleName: "管理员",
                roleDes: "角色描述信息"
            }
        }
    },
    methods:{
        /**
         * 重置表单
         */
        resetForm:function() {
            console.log("重置表单")
        },

        /**
         * 提交表单
         */
        submitForm:function() {
            console.log("提交表单")
        }
    }
}
</script>
<style>
    .my_check_group{
        margin-left: 60px;
    }
</style>


