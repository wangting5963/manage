<template>
    <div>
         <Layout>
            <Header>
                <MenuItem name="1">
                    <Icon type="ios-paper" />
                    基本信息
                </MenuItem>
                <MenuItem name="2">
                    <Icon type="ios-people" />
                    商品规格
                </MenuItem>
                <MenuItem name="1">
                    <Icon type="ios-paper" />
                    商品详情
                </MenuItem>
                <MenuItem name="2">
                    <Icon type="ios-people" />
                    分享描述
                </MenuItem>
                <MenuItem name="2">
                    <Icon type="ios-people" />
                    分享描述
                </MenuItem>
            </Header>
            <Content>Content</Content>
            <Footer>Footer</Footer>
        </Layout>
    </div>
</template>

<script>
export default {
  name: "goods_detail",
  data() {
    return {
      operateFlag: "",
      goodsId: ""
    };
  },
  created: function() {
    this.operateFlag = this.$route.params.flag;
    this.goodsId = this.$route.params.goodsId;
    console.log(this.operateFlag + "------" + this.goodsId);
  },
  methods: {}
};
</script>

<style>
</style>

