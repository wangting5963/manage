<template>
    <div>
        <Form :model="formData" label-position="left" :label-width="100">
            <FormItem label="上级菜单">
                <Select v-model="formData.upMenu"  style="width:240px" :disabled="disabledSelect" :placeholder="selectPlaceholder">
                    <Option v-for="typeData in parentType" :key="typeData.id" :value="typeData.name">{{ typeData.name }}</Option>
                </Select>
            </FormItem>
            <FormItem label="分类名称">
                <Input class="type_input" placeholder="新类别名称（6个中文以内）" v-model="formData.typeName"/>
            </FormItem>
            <FormItem label="分类排序">
                <Input class="type_input" placeholder="数字越小越靠前" v-model="formData.typeSort"/>
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
  name: "type-detail",
  data() {
    return {
      // 父级分类
      parentType: [
        { id: "1", name: "家电" },
        { id: "2", name: "服饰" },
        { id: "3", name: "美食" },
        { id: "4", name: "移动设备" },
        { id: "5", name: "药品" },
        { id: "6", name: "日常用品" }
      ],
      // 表单数据
      formData: {
        upMenu: "",
        isDisabled: "",
        typeName: "",
        typeSort: ""
      },
      // 操作标志位：【新增/修改】
      operateFlag: "",
      // 要修改的类型主键
      typeId: "",
      // 是否禁用上级菜单选择框【当前编辑项是"一级菜单的时候"设置禁用】
      disabledSelect: false,
      // 选择框的占位文本
      selectPlaceholder: "请选择一级菜单"
    };
  },
  created: function() {
    // 获取请求参数
    let reqParams = this.$route.params;
    if (reqParams) {
      this.operateFlag = reqParams.flag;
      if (reqParams.flag && reqParams.flag === "new") {
        // console.log("新建分类")
      } else if (reqParams.flag && reqParams.flag === "modify") {
        // 获取当前操作项的主键
        this.typeId = reqParams.row.typeId;
        let typeName = reqParams.row.typeName;
        if (typeName) {
          if (typeName.indexOf("-") !== -1) {
            // 二级菜单：二级菜单才会有一级菜单
            this.formData.upMenu = reqParams.row.parentType;
          } else {
            // 一级菜单
            this.disabledSelect = true;
            this.selectPlaceholder = "当前分类为一级分类没有上级菜单";
          }
          this.formData.typeName = typeName;
          this.formData.isDisabled = reqParams.row.typeStatus;
          this.formData.typeSort = reqParams.row.typeSort;
        }
      }
    } else {
      this.operateFlag = "new";
    }
  },
  methods: {
    submitForm: function() {
      if (this.operateFlag === "new") {
        if (this.verifyInfo()) {
            console.log("请求新建分类接口");
        }
      } else if (this.operateFlag === "modify") {
        if(this.verifyInfo()) {
            console.log("请求修改分类接口");
        }
      }
      console.log(this.formData);
    },
    /**
     * 校验表单数据
     */
    verifyInfo: function() {
      if (this.formData.upMenu === "") {
        this.$Message.error({
          content: "请选择上级菜单",
          duration: 2
        });
        return false;
      }
      if (this.formData.typeName === "") {
        this.$Message.error({
          content: "请填写类别名称",
          duration: 2
        });
        return false;
      }
      if (this.formData.typeName.length>6) {
        this.$Message.error({
          content: "类别名称不能超过6个中文汉字",
          duration: 2
        });
        return false;
      }
      if (this.formData.typeSort === "") {
        this.$Message.error({
          content: "请填写分类排序",
          duration: 2
        });
        return false;
      }
      if (isNaN(this.formData.typeSort)) {
        this.$Message.error({
          content: "分类排序必须为数字",
          duration: 2
        });
        return false;
      }
      if (this.formData.isDisabled === "") {
        this.$Message.error({
          content: "请选择是否显示",
          duration: 2
        });
        return false;
      }
      return true;
    }
  }
};
</script>
<style>
.type_input {
  width: 350px;
}
</style>


