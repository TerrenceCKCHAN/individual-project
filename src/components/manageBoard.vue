<template lang="html">
  <div class="manage-board">
    <menuHeader @username="username = $event"></menuHeader>
    <div class="title">
      manage saved boards
    </div>
    <div class="board-container content">
      <div class="board-filter-box">
        sort by:
        <select class="board-filter" name="" v-model="boardFilter">
          <option value="tag" selected>tag</option>
          <option value="name">name</option>
        </select>
      </div>
      <div class="board-box outter-box" v-for="board in sortedBoards">
        <div class="info-box" @click="selectBoard(board)">
          <div class="name info">
            name: {{ board.name }}
          </div>
          <div class="tag info">
            tag: {{ board.tag }}
          </div>
        </div>
        <div class="delete" @click="deleteBoard(board)">
          <span class="text">delete</span>
        </div>
      </div>
      <div class="no-board" v-if="!this.boards || this.boards.length == 0">
        no saved board
      </div>
    </div>
    <div class="title" v-if="false">
      manage saved elements
    </div>
    <!-- <div class="element-container content" v-if="false">
      <div class="element-box outter-box" v-for="element in elements">
        <div class="info-box" @click="selectElement(element)">
          <div class="name info">
            name: {{ element.name }}
          </div>
          <div class="picture info">
            image: {{ element.picture }}
          </div>
        </div>
        <div class="delete" @click="deleteElement(element)">
          <span class="text">delete</span>
        </div>
      </div>
      <div class="no-board" v-if="!this.boards || this.boards.length == 0">
        no saved elements
      </div>
    </div> -->
  </div>
</template>

<script>
import service from '../service.js';
import menuHeader from './widgets/menu.vue';

export default {
  components: {
    menuHeader
  },
  computed: {
    sortedBoards: function() {
      var _this = this;
      !!this.boards && this.boards.sort(compare);
      console.log('test==========', this.boards);
      return this.boards;
      function compare(value1, value2) {
        return value1[_this.boardFilter] > value2[_this.boardFilter];
      }
    }
  },
  data() {
    return {
      boards: null,
      elements: null,
      username: '',
      boardFilter: 'tag'
    }
  },
  methods: {
    selectBoard: function(board) {
      this.$router.push({path: '/logicCircuit', query: {board: board}})
    },
    deleteBoard: function(board) {
      service.deleteBoard(board.id).then((res) => {
        window.location.reload()
      }).catch((err) => {
        console.log('err:', err);
      });
    },
    selectElement: function(element) {
      this.$router.push({path: '/logicCircuit', query: {board: element}})
    },
    deleteElement: function(element) {

    }
  },
  watch: {
    username: function(value) {
      if (!!value) {
        service.getBoard(this.username).then(res => {
          if (res.code == 200) {
            this.boards = res.data;
          }
        });
        service.getTemplates(this.username).then(res => {
          if (res.code == 200) {
            this.elements = res.data;
          }
        })
      }
    }
  }
}
</script>

<style lang="less">
.manage-board {
  height: 100%;
  padding: 10px;
  .title {
    font-size: 18px;
    margin: 10px 0;
  }
  .content {
    .outter-box {
      display: flex;
      border: solid 1px;
      margin: 10px 0;
      .info-box {
        flex: 3;
      }
      .delete {
        flex: 1;
        position: relative;
        border-left: solid 1px;
        .text {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }
    }
    .board-box:not(:last-child) {
      margin-bottom: 5px;
    }
    .no-board {
      margin-left: 10px;
    }
  }
}
</style>
