<template>
  <Modal
    v-model="loadFlag"
    :mask-closable="false"
    :closable="false"
    :footer-hide="true"
    width="101">
    <Spin>
      <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
      <div>Waiting</div>
    </Spin>
  </Modal>
</template>

<script>
  export default {
    name: "loading",
    data() {
      return {
        loadFlag: false
      }
    },
    created() {
      let that = this;
      this.load.$on('loading', function (data) {
        that.loadFlag = !!data;
      })
    }

  }
</script>

<style scoped>

  .demo-spin-icon-load {
    animation: ani-demo-spin 1s linear infinite;
  }

  @keyframes ani-demo-spin {
    from {
      transform: rotate(0deg);
    }
    50% {
      transform: rotate(180deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
