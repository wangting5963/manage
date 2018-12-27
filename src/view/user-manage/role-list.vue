<template>
    <div>
        <Table border :columns="columns" :data="tableData"></Table>
    </div>
</template>
<script>
export default {
    name:"role-list",
    data() {
        return {
            // 表格列
            columns:[
                {title:"角色Id",width:75,align:"center",key:"roleId"},
                {title:"账号",align:"center",key:"roleName"},
                {title:"操作",align:"center",render:(h,params)=>{
                    if(params.row.roleName && params.row.roleName === "管理员"){
                        return h("div","默认角色 拥有最高权限 不可修改")
                    } else {
                        return h("div",[
                            h("Button",{
                                props:{
                                    type:"info",
                                    size:"small"
                                },
                                on:{
                                    click: () => {
                                        // 跳转到编辑/新增角色信息页面
                                        this.$router.push({
                                            name: "add_role"
                                        })
                                    }
                                }
                            },"编辑"),
                            h("Button",{
                                props:{
                                    type:"error",
                                    size:"small"
                                },
                                style:{
                                    marginLeft:"20px"
                                },
                                on:{
                                    click: () => {
                                        this.$Modal.confirm({
                                            title: "删除角色",
                                            content: "是否删除该角色",
                                            onOk:() => {
                                                this.delUser(params) 
                                            }
                                        })
                                    }
                                }
                            },"删除"),
                        ])
                    }
                }}
            ],
            // 表格数据
            tableData:[
                {"roleId":"1","roleName":"管理员"},
                {"roleId":"2","roleName":"JAVA工程师"},
                {"roleId":"3","roleName":"WEB工程师"},
                {"roleId":"4","roleName":"运维工程师"}
            ]
        }
    }
}
</script>
<style>

</style>


