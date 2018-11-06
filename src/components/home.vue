<template lang="html">
  <div class="home">
    <div class="logic select-box" @click="gotoLogicCircuit">
      logic circuit
    </div>
    <div class="deep select-box" @click="gotoDeepLearning">
      deep learning
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    gotoLogicCircuit: function() {
      this.$router.push('logicCircuit');
    },
    gotoDeepLearning: function() {
      this.$router.push('deepLearning');
    }
  }
}
</script>

<style lang="less">
  .home {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .select-box {
      display: inline-block;
      border: solid 1px;
      padding: 30px 10px;
    }
    .logic {
      margin-right: 40px;
    }
    .deep {
      margin-left: 40px;
    }
  }
</style>
