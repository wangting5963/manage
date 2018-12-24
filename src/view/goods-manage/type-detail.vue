<template>
    <div>
        <Form :model="formData" label-position="left" :label-width="100">
            <FormItem label="上级菜单">
                <Select v-model="formData.upMenu"  style="width:200px">
                    <Option v-for="typeData in parentType" :key="typeData.id" :value="typeData.name">{{ typeData.name }}</Option>
                </Select>
            </FormItem>
            <FormItem label="分类名称">
                <Input class="type_input" placeholder="新类别名称（6个中文以内）" v-model="formData.typeName"/>
            </FormItem>
            <FormItem label="分类排序">
                <Input class="type_input" placeholder="分类排序规则" v-model="formData.typeSort"/>
            </FormItem>
            <FormItem label="是否显示">
                <RadioGroup v-model="formData.isDisabled">
                    <Radio label="是"></Radio>
                    <Radio label="否" style="margin-left:5px;"></Radio>
                </RadioGroup>
            </FormItem>
            <Button type="info" @click="submitForm">提交</Button>
        </Form>
    </div>
</template>
<script>
export default {
    name:"type-detail",
    data() {
        return {
            // 父级分类
            parentType:[
                {"id":"1","name":"家电"},
                {"id":"2","name":"服饰"},
                {"id":"3","name":"美食"},
                {"id":"4","name":"移动设备"},
                {"id":"5","name":"药品"}
            ],
            // 表单数据
            formData:{
                upMenu:"",
                isDisabled: true,
                typeName:"",
                typeSort:""
            }
        }
    },
    methods: {
        submitForm: function() {
            console.log(this.formData)
        }
    }
}
</script>
<style>
    .type_input{
        width: 350px;
    }
</style>


