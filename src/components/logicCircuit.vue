<template lang="html">
  <div class="logic-circuit">
    <menuHeader @username="username = $event">
      <div class="function-area">
        <button class="start menu" @click="run">
          {{ start ? 'stop' : 'start' }}
        </button>
        <button class="clear-test menu" v-show="start" @click="resetBoard">
          reset
        </button>
        <button class="clear-working menu" @click="clearWorkingArea" v-show="!start">
          clear
        </button>
        <button class="save menu" v-show="!start" @click="save" v-if="!!username">
          save
        </button>
        <button class="load menu" v-show="!start" @click="load" v-if="!!username">
          load
        </button>
        <button class="share menu" v-show="!start" @click="share">
          share
        </button>
        <button class="export-file menu" v-show="!start" @click="exportFile">
          export file
        </button>
        <button class="import-file menu" v-show="!start" @click="importFile">
          import file
        </button>
        <!-- <button class="save menu" @click="saveTemplate = true" v-if="!!username">
          save as element
        </button> -->
        <div class="auto-test menu" v-if="false">
          auto test
          <button class="switch" @click="switchAutoTest">
            {{ autoTest }}
          </button>
        </div>
        <div class="mini-map menu" v-if="false">
          mini map
          <button class="switch" @click="switchMiniMap">
            {{ miniMap }}
          </button>
        </div>
        <button class="delete menu" @click="deleteElement" v-show="!this.deleteEle">delete</button>
      </div>
    </menuHeader>
    <div class="content">
      <div class="element-area" v-show="!start">
        <elements @select="select($event)" :selected="selected" :username="username"></elements>
        <elementSetting v-show="!this.deleteEle" @direction="rotate = $event" @size="size = $event" :is-text = "isText" @text="text = $event"></elementSetting>
      </div>
      <!-- <simulation v-show="start" :has-clock="hasClock" :graph="graph"></simulation> -->
      <workingArea :mini-map="miniMap" :reset="reset" @reset="reset = $event" :saved-board="savedBoard" @saved-board="savedBoard = $event" :save-name="saveName" :save-tag="saveTag"
       :username="username" :save="saveBoard" @save="saveBoard = $event;clickSave = $event"
       :selected="selected" @selected="selected = $event" :delete-ele="deleteEle" @delete-ele="deleteEle = $event"
       :clear-working="clearWorking" @clear-working="clearWorking = $event" :start="start" @has-clock="hasClock = $event"
       @graph="graph = $event" :rotate="rotate" :size="size" @rotate="rotate = $event" @size="size = $event" @is-text = "isText = $event" :text="text"
      :share-board="shareBoard" @share-board="shareBoard = $event" @url="shareUrl = $event" ref="working"></workingArea>
    </div>
    <alertBox v-show="!!shareUrl" :title="'Share'" @close="shareUrl = ''">
      <div class="instruction">
        Please copy the url below and send it to your friends:
      </div>
      <div class="url">
        {{ shareUrl }}
      </div>
    </alertBox>
    <alertBox v-show="clickSave" :title="'Save'" @close="clickSave = $event; saveName = ''; saveTag = ''">
      <saveBox @save="saveBoard = $event" @save-name="saveName = $event" @save-tag="saveTag = $event"></saveBox>
    </alertBox>
    <alertBox v-show="exportBoard" :title="'Export Board'" @close="exportBoard = false; exportFileName = ''">
      <input type="text" name="" value="" v-model="exportFileName"> .txt
      <button class="alert-button" type="button" name="button" @click="submitExport">export</button>
    </alertBox>
    <alertBox class="import-board" v-show="importBoard" :title="'Import Board'" @close="importBoard = false">
      <input type="file" id="files" name="files" single />
      <div id="drop_zone">Drop file here</div>
      <output id="list"></output>
      <button v-show="!!importedFile" @click="confirmImport" type="button" name="button">import</button>
    </alertBox>
    <alertBox v-show="clear" :title="'Clear Board'" @close="clear = false">
      <div class="clear-text">
        Are you sure to clear the board?
      </div>
      <button class="confirm-button button" type="button" name="button" @click="clearWorking = true; clear = false;">confirm</button>
      <button class="cancel-button button" type="button" name="button" @click="clear = false">cancel</button>
    </alertBox>
    <saveAsTemplate :click-save="saveTemplate" @click-save="saveTemplate = $event" :save-as-template="saveAsTemplate"></saveAsTemplate>
  </div>
</template>
<script>
import elements from './widgets/elements.vue';
import workingArea from './widgets/workingArea.vue';
import simulation from './widgets/simulation.vue';
import elementSetting from './widgets/elementSetting.vue';
import menuHeader from './widgets/menu.vue';
import alertBox from './widgets/alertBox.vue';
import saveBox from './widgets/saveBox.vue';
import saveAsTemplate from './widgets/saveAsTemplate.vue';
import service from '../service.js';
import { saveAs } from 'file-saver/FileSaver';

export default {
  components: {
    elements,
    workingArea,
    simulation,
    elementSetting,
    menuHeader,
    alertBox,
    saveBox,
    saveAsTemplate
  },
  data() {
    return {
      autoTest: false,
      miniMap: false,
      selected: "",
      deleteEle: true,
      clearWorking: false,
      start: false,
      hasClock: false,
      graph: null,
      rotate: '',
      size: '',
      saveBoard: false,
      username: '',
      clickSave: false,
      saveName: '',
      saveTag: '',
      savedBoard: '',
      reset: false,
      saveTemplate: false,
      isText: false,
      text: '',
      shareBoard: false,
      shareUrl: '',
      exportBoard: false,
      importBoard: false,
      exportFileName: '',
      clear: false,
      importedFile: ''
    }
  },
  mounted() {
    var self = this;
    var query = this.$route.query;
    var board = query.board && query.board.board
    var boardId = query.boardId
    if (!!boardId) {
      service.getBoardById(boardId).then(res => {
        if (res.code == 200) {
          this.savedBoard = res.data[0].board;
        }
      })
    } else {
      this.savedBoard = board;
    }
    function handleFileSelect(evt) {
      console.log('test');
      evt.stopPropagation();
      evt.preventDefault();

      var files = !!evt.dataTransfer ? evt.dataTransfer.files : evt.target.files; // FileList object.

      // files is a FileList of File objects. List some properties.
      var output = [];
      var f = files[0];
      if(f)
      {
        if (!f.type.match('text/plain')) {
          return;
        }
        var reader = new FileReader();
        reader.readAsText(f);
        output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
                  f.size, ' bytes, last modified: ',
                  f.lastModifiedDate.toLocaleDateString(), '</li>');
        reader.onload = loaded;
      }
     document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';
      function loaded(evt) {
          var fileString = evt.target.result;
          self.importedFile = fileString;
          // self.savedBoard = fileString;
          // self.importBoard = false;
          // !!evt.target && (evt.target.value = '');
      }
    }

    function handleDragOver(evt) {
      evt.stopPropagation();
      evt.preventDefault();
      evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
    }

    // Setup the dnd listeners.
    var dropZone = document.getElementById('drop_zone');
    dropZone.addEventListener('dragover', handleDragOver, false);
    dropZone.addEventListener('drop', handleFileSelect, false);
    document.getElementById('files').addEventListener('change', handleFileSelect, false);
  },
  methods: {
    confirmImport: function() {
      this.savedBoard = this.importedFile;
      // this.importedFile = '';
      this.importBoard = false;
    },
    switchAutoTest: function() {
      this.autoTest = !this.autoTest;
    },
    switchMiniMap: function() {
      this.miniMap = !this.miniMap;
    },
    deleteElement: function() {
      this.deleteEle = true;
    },
    clearWorkingArea: function() {
      // this.clearWorking = true;
      this.clear = true;
    },
    run: function() {
      this.start = !this.start;
    },
    select: function(value) {
      this.selected = value;
      value == 'clock' && (this.selectedClock = true);
    },
    save: function() {
      this.clickSave = true;
    },
    load: function() {
      this.$router.push('manageBoard')
    },
    resetBoard: function() {
      this.$refs.working.resetBoard();
    },
    saveAsTemplate: function(name, picture) {
      return this.$refs.working.saveAsTemplate(name, picture);
    },
    share: function() {
      this.shareBoard = true;
    },
    submitExport: function() {
      this.$refs.working.submitExport(this.exportFileName);
    },
    exportFile: function() {
      this.exportBoard = true;
    },
    importFile: function() {
      this.importBoard = true;
    }
  }
}
</script>

<style lang="less">
  .logic-circuit {
    display: flex;
    height: 100%;
    width: 100%;
    flex-direction: column;
    input {
      border: solid 1px;
    }
    .function-area {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: 120px;
    }
    .menu, .switch {
      display: inline-block;
      padding: 5px;
    }
    .logo {
      padding-right: 20px;
      padding-left: 10px;
    }
    .content {
      display: flex;
      flex-direction: row;
      flex: 1;
      .element-area {
        border: solid 1px;
        flex: 0.5;
        display: flex;
        flex-direction: column;
      }
    }

    .url {
      padding: 10px;
      background: #cccccc;
      user-select: text;
    }
    .content-area {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      // transform: translateX(-50%);
    }
    .alert-button {
      display: block;
      border: solid 1px;
      padding: 10px;
      margin-top: 50px;
      position: relative;
      left: 50%;
      transform: translateX(-50%);
    }
    .confirm-button, .cancel-button {
      border: solid 1px;
      padding: 10px;
    }
    .clear-text {
      margin-bottom: 50px;
    }
    .cancel-button {
      margin-left: 100px;
    }
    .import-board {

      #files {
        position: relative;
        left: 50%;
        transform: translateX(-50%);
        margin-bottom: 20px;
        border: 0;
      }
      #drop_zone {
        position: relative;
        left: 50%;
        transform: translateX(-50%);
        height: 200px;
        width: 300px;
        text-align: center;
        padding: 92px 0;
        line-height: 16px;
        border: 1px dashed;
      }
      #list {

      }
      button {
        position: relative;
        left: 50%;
        transform: translateX(-50%);
        border: 1px solid;
        padding: 10px;
      }
    }
  }
</style>
