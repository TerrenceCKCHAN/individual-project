<template lang="html">
  <div class="simulation">
    <div class="title">
      Simulation
    </div>
    <div class="content">
        <label for="scales">Sync Frame/Ticks</label>
        <input type="checkbox" id="scales" name="feature" value="sync" checked />
    </div>
    <div class="title">
      Clock
    </div>
    <div class="content">
      <div class="no-clock" v-if="!this.hasClock">
        No clock placed
      </div>
      <div class="has-clock" v-if="this.hasClock">
        <div class="option">
          <div class="name">
            Generate
          </div>
          <div class="choices">
            <div class="choice" @click="generateClock(1)">
              1
            </div>
            <div class="choice" @click="generateClock(4)">
              n
            </div>
            <div class="choice" @click="generateClock()">
              ~~
            </div>
          </div>
        </div>
        <div class="option">
          <div class="name">
            Stop
          </div>
          <div class="choices">
            <div class="choice">
              S
            </div>
          </div>
        </div>
        <div class="option">
          <label for="tick" class="tick">
            Ticks(n)
          </label>
          <input id="tick" class="choice" type="number" name="tick" value="4" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    hasClock: Boolean,
    graph: Object
  },
  data() {
    return {
      generating: false
    }
  },
  methods: {
    generateClock: function(ticks) {
      if (!this.generating) {
        this.generating = true;
        var allCells = this.graph.getCells();
        allCells.forEach(cell => {
          if (!!cell.attributes.attrs.name && cell.attributes.attrs.name == 'clock') {
            cell.operation(0, ticks);
          }
        })
      }
      this.generating = false;
    }
  }
}
</script>

<style lang="less">
.simulation {
  border: solid 1px;
  flex: 0.5;
  overflow-y: auto;
  .title {
    padding: 10px;
    font-weight: bold;
  }
  .content {
    padding: 0 10px;
    font-size: 14px;
    label {
      padding-right: 10px;
    }
    .option {
      display: flex;
      padding: 5px 0;
      .name, .choices {
        display: inline-block;
        flex: 1;
      }
      .choices {
        flex: 1;
        text-align: right;
        .choice {
          display: inline-block;
          height: 25px;
          width: 25px;
          border: 1px solid;
          text-align: center;
        }
      }
      #tick {
        text-align: right;
      }
    }
  }
}
</style>
