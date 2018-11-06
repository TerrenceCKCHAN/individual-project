<!-- <template lang="html">
  <div class="add-element">
    <menuBox>
      <div class="function-area">
        <div class="save menu" @click="clickSave = true">
          save
        </div>
        <div class="back menu">
          back
        </div>
      </div>
    </menuBox>
    <div class="content">
      <elements></elements>
      <workingArea ref="working"></workingArea>
    </div>
    <saveAsTemplate></saveAsTemplate>
  </div>
</template>

<script>
import workingArea from './widgets/workingArea.vue';
import menuBox from './widgets/menu.vue';
import alertBox from './widgets/alertBox.vue';
import elements from './widgets/elements.vue';
import saveAsTemplate from './widgets/saveAsTemplate.vue';

export default {
  components: {
    workingArea,
    menuBox,
    alertBox,
    elements,
    saveAsTemplate
  },
  data() {
    return {
      clickSave: false,
      save: false,
      name: '',
      picture: ''
    }
  },
  methods: {
    submit: function() {
      if (!!this.name) {
        this.$refs.working.saveAsTemplate(this.name, this.picture).then(res => {
          this.save = false;
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

    }
  }
}
</script>

<style lang="less">
.add-element {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  .function-area {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 120px;
    .menu {
      display: inline-block;
      padding: 5px;
    }
  }
  .content {
    flex: 1;
    display: flex;
    flex-direction: row;
    .elements {
      flex: 1;
    }
    .working-area {
      flex: 2;
    }
  }
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
</style> -->
