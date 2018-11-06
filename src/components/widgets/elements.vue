<template lang="html">
  <div class="elements">
    <div class="gates section">
      <div class="title">
        gates
      </div>
      <div class="and select" :class="{'selected': this.selected == 'and'}" @click="select('and')" title="and"></div>
      <div class="or select" :class="{'selected': this.selected == 'or'}" @click="select('or')" title="or"></div>
      <div class="nor select" :class="{'selected': this.selected == 'nor'}" @click="select('nor')" title="nor"></div>
      <div class="xor select" :class="{'selected': this.selected == 'xor'}" @click="select('xor')" title="xor"></div>
      <div class="not select" :class="{'selected': this.selected == 'not'}" @click="select('not')" title="not"></div>
      <div class="buffer select" :class="{'selected': this.selected == 'buffer'}" @click="select('buffer')" title="buffer"></div>
    </div>
    <div class="basic section">
      <div class="title">
        basic
      </div>
      <div class="switch select" :class="{'selected': this.selected == 'switch'}" @click="select('switch')" title="switch"></div>
      <div class="button select" :class="{'selected': this.selected == 'button'}" @click="select('button')" title="button"></div>
      <div class="led select" :class="{'selected': this.selected == 'led'}" @click="select('led')" title="led"></div>
      <div class="clock select" :class="{'selected': this.selected == 'clock'}" @click="select('clock')" title="clock"></div>
    </div>
    <div class="adder section">
      <div class="title">
        adder
      </div>
      <div class="half-adder select" :class="{'selected': this.selected == 'half-adder'}" @click="select('half-adder')" title="half adder"></div>
      <div class="full-adder select" :class="{'selected': this.selected == 'full-adder'}" @click="select('full-adder')" title="full adder"></div>
    </div>
    <div class="memory section">
      <div class="title">
        memory
      </div>
      <div class="d-latch select" :class="{'selected': this.selected == 'd-latch'}" @click="select('d-latch')" title="D latch"></div>
      <div class="rs-flip-flop select" :class="{'selected': this.selected == 'rs-flip-flop'}" @click="select('rs-flip-flop')" title="RS flip flop"></div>
      <div class="jk-flip-flop select" :class="{'selected': this.selected == 'jk-flip-flop'}" @click="select('jk-flip-flop')" title="JK flip flop"></div>
      <div class="shifting-register select" :class="{'selected': this.selected == 'shifting-register'}" @click="select('shifting-register')" title="shifting register"></div>
    </div>
    <div class="code-converter section">
      <div class="title">
        code converter
      </div>
      <div class="decoder select" :class="{'selected': this.selected == 'decoder'}" @click="select('decoder')" title="decoder"></div>
      <div class="multiplexer select" :class="{'selected': this.selected == 'multiplexer'}" @click="select('multiplexer')" title="multiplexer"></div>
      <div class="demultiplexer select" :class="{'selected': this.selected == 'demultiplexer'}" @click="select('demultiplexer')" title="demultiplexer"></div>
    </div>
    <div class="advanced-output section">
      <div class="title">
        advanced output
      </div>
      <div class="segment-display select" :class="{'selected': this.selected == 'segment-display'}" @click="select('segment-display')" title="segment display"></div>
    </div>
    <div class="tool section">
      <div class="title">
        tool
      </div>
      <div class="text select" :class="{'selected': this.selected == 'text'}" @click="select('text')" title="text"></div>
    </div>
    <!-- <div class="add-element" @click="addElement" v-if="!!username">
      +
    </div> -->
  </div>
</template>

<script>
export default {
  props: {
    selected: String,
    username: String
  },
  methods: {
    select: function(element) {
      this.$emit('select', element);
    },
    addElement: function() {
      this.$router.push('addElement');
    }
  }
}
</script>

<style lang="less">
  .elements {
    flex: 1.5;
    overflow-y: auto;
    padding: 10px;
    background: #F5F5F5;
    .add-element {
      display: inline-block;
      border: solid 1px;
      height: 60px;
      width: 60px;
      line-height: 54px;
      text-align: center;
      font-size: 32px;
    }
    .section {
      .title {
        padding-bottom: 5px;
      }
      .select {
        display: inline-block;
        border: solid 1px;
        height: 60px;
        width: 60px;
        &.selected {
          border: solid 1px red;
        }
        &.and {
          background: url('../../images/and.png') no-repeat center;
          background-size: 100%;
        }
        &.or {
          background: url('../../images/or.png') no-repeat center;
          background-size: 100%;
        }
        &.not {
          background: url('../../images/not.png') no-repeat center;
          background-size: 100%;
        }
        &.nor {
          background: url('../../images/nor.png') no-repeat center;
          background-size: 100%;
        }
        &.xor {
          background: url('../../images/xor.png') no-repeat center;
          background-size: 100%;
        }
        &.buffer {
          background: url('../../images/buffer.png') no-repeat center;
          background-size: 100%;
        }
        &.switch {
          background: url('../../images/switch.png') no-repeat center;
          background-size: 100%;
        }
        &.button {
          background: url('../../images/button.png') no-repeat center;
          background-size: 100%;
        }
        &.led {
          background: url('../../images/led.png') no-repeat center;
          background-size: 100%;
        }
        &.clock {
          background: url('../../images/clock.png') no-repeat center;
          background-size: 100%;
        }
        &.half-adder {
          background: url('../../images/half-adder.png') no-repeat center;
          background-size: 100%;
        }
        &.full-adder {
          background: url('../../images/full-adder.png') no-repeat center;
          background-size: 100%;
        }
        &.d-latch {
          background: url('../../images/d-latch.png') no-repeat center;
          background-size: 100%;
        }
        &.rs-flip-flop {
          background: url('../../images/rs-latch.png') no-repeat center;
          background-size: 100%;
        }
        &.jk-flip-flop {
          background: url('../../images/jk-latch.png') no-repeat center;
          background-size: 100%;
        }
        &.shifting-register {
          background: url('../../images/shifting-register.png') no-repeat center;
          background-size: 100%;
        }
        &.decoder {
          background: url('../../images/decoder.png') no-repeat center;
          background-size: 100%;
        }
        &.multiplexer {
          background: url('../../images/multiplexer.png') no-repeat center;
          background-size: 100%;
        }
        &.demultiplexer {
          background: url('../../images/demultiplexer.png') no-repeat center;
          background-size: 100%;
        }
        &.segment-display {
          background: url('../../images/segment-display.png') no-repeat center;
          background-size: 100%;
        }
        &.text {
          background: url('../../images/text.png') no-repeat center;
          background-size: 100%;
        }
      }
    }
  }
</style>
