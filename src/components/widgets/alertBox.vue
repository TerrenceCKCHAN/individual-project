<template lang="html">
  <div class="alert-box">
    <div class="alert">
      <div class="title">
        {{ title }}
        <div class="close" @click="close">
          X
        </div>
      </div>
      <div class="content-container">
        <div class="content-area">
          <slot></slot>
        </div>
      </div>
    </div>
    <div class="mask" @click="close">

    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String
  },
  methods: {
    close: function(e) {
      e.stopPropagation();
      this.$emit('close', false);
    }
  }
}
</script>

<style lang="less">
.alert-box {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  .mask {
    height: 100%;
    width: 100%;
    background: rgba(220,220,220,0.5);
    z-index: 1;
  }
  .alert {
    display: flex;
    flex-direction: column;
    z-index: 2;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 60%;
    width: 60%;
    background: #fff;
    border: solid 1px;
    .title {
      padding: 3%;
      width: 100%;
      text-align: center;
      border-bottom: solid 1px;
      .close {
        display: inline-block;
        position: absolute;
        right: 3%;
        user-select: none;
      }
    }
    .content-container {
      position: relative;
      flex: 1;
      .content-area {
        padding: 10px;
      }
    }
  }
}
</style>
