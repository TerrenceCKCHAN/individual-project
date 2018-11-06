<template lang="html">
  <div class="element-setting">
    <div class="title">
      rotate
    </div>
    <div class="directions">
      <div class="left direction" @click="chooseDirection('left')">
      </div>
      <div class="right direction" @click="chooseDirection('right')">
      </div>
    </div>
    <div class="text-setting" v-show="isText">
      <div class="title">
        text
      </div>
      <input type="text" name="" value="" v-model="text">
    </div>
    <!-- <div class="size">
      <div class="name">
        size
      </div>
      <div class="choices">
        <div class="smaller choice" @click="chooseSize('up')">
          +
        </div>
        <div class="bigger choice" @click="chooseSize('down')">
          -
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
export default {
  props: {
    isText: Boolean
  },
  data() {
    return {
      text: ''
    }
  },
  methods: {
    chooseDirection: function(direction) {
      this.$emit('direction', direction);
    },
    chooseSize: function(size) {
      this.$emit('size', size)
    }
  },
  watch: {
    text: function(value) {
      this.$emit('text', value);
    }
  }
}
</script>

<style lang="less">
  .element-setting {
    flex: 0.3;
    border-top: 1px solid;
    background: #DCDCDC;
    .title {
      padding: 10px;
    }
    .directions {
      padding: 10px;
      .direction {
        display: inline-block;
        height: 50px;
        width: 50px;
        border: 1px solid;
        &:active {
          border-color: red;
        }
        &.left {
          background: url('../../images/rotate-left.png') center no-repeat;
          background-size: contain;
        }
        &.right {
          background: url('../../images/rotate-right.png') center no-repeat;
          background-size: contain;
        }
      }
    }
    .size {
      .name {
        padding: 10px;
      }
      .choices {
        padding: 10px;
        .choice {
          display: inline-block;
          height: 50px;
          width: 50px;
          font-size: 30px;
          text-align: center;
          border: 1px solid;
        }
      }
    }
    input {
      border: solid 1px;
      margin: 10px 10px 20px 10px;
    }
  }
</style>
