<template lang="html">
  <div class="save-box">
    <div class="info-box">
      <div class="name info">
        name<span>*</span>:
      </div>
      <input class="name-input" type="text" name="" value="" v-model="name"></input>
    </div>
    <div class="info-box">
      <div class="tag info">
        tag:
      </div>
      <input class="tag-input" type="text" name="" value="" v-model="tag"></input>
    </div>
    <button class="save-button" type="button" name="button" @click="save">save</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      tag: ''
    }
  },
  methods: {
    save: function() {
      this.$emit('save', true);
      this.$emit('save-name', this.name);
      this.$emit('save-tag', this.tag);
    }
  }
}
</script>

<style lang="less">
.save-box {
  z-index: 2;
  .info-box {
    display: flex;
    margin-bottom: 10px;
    .info {
      display: inline-block;
      padding: 10px;
      flex: 1;
      span {
        color: red;
      }
    }
    input {
      flex: 2;
      border: solid 1px;
    }
  }
  .save-button {
    margin-top: 5%;
    padding: 3% 10%;
    text-align: center;
    display: block;
    border: solid 1px;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
