<template lang="html">
  <div class="save-as-template">
    <alertBox v-show="clickSave" :title="'save element'" @close="close">
      <div class="save-box">
        <div class="info-box">
          <div class="name info">
            name:
          </div>
          <input class="name-input" type="text" name="" value="" v-model="name"></input>
        </div>
        <div class="info-box">
          <div class="picture info">
            picture:
          </div>
          <input class="file-input" type="file" name="img" @change="uploadPic"></input>
        </div>
        <div class="preview-box">
        </div>
        <button class="save-button" type="button" name="button" @click="submit">save</button>
      </div>
    </alertBox>
  </div>
</template>

<script>
import alertBox from './alertBox.vue';

export default {
  components: {
    alertBox
  },
  props: {
    saveAsTemplate: Function,
    clickSave: Boolean
  },
  data() {
    return {
      name: '',
      picture: ''
    }
  },
  methods: {
    submit: function() {
      if (!!this.name) {
        this.saveAsTemplate(this.name, this.picture).then(res => {
          this.$emit('clickSave', false);
        }).catch(err => {
          console.log('err', err);
        });
      }
    },
    uploadPic: function(event) {
      console.log('test', event.target.files[0]);
      var file = event.target.files[0]; //获取图片资源

      // 只选择图片文件
      if (!file.type.match('image.*')) {
        return false;
      }

      var reader = new FileReader();

      reader.readAsDataURL(file); // 读取文件

      // 渲染文件
      reader.onload = function(arg) {
        this.picture = arg.target.result;
        var img = '<img class="preview" src="' + this.picture + '" alt="preview"/>';
        $(".preview-box").empty().append(img);
      }

    },
    close: function() {
      this.$emit('click-save', false);
    }
  }
}
</script>

<style lang="less">
.save-as-template {
  .file-input {
    width: 50px;
  }
  .preview-box {
    text-align: center;
    img {
      width: 50px;
      height: 50px
    }
  }
}
</style>
