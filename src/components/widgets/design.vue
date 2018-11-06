<template lang="html">
  <div class="design">
    <div class="element-area" v-show="!start">
      <elements @select="select($event)" :selected="selected" :username="username"></elements>
      <elementSetting v-show="!this.deleteEle" @direction="rotate = $event" @size="size = $event"></elementSetting>
    </div>
    <simulation v-show="start" :has-clock="hasClock" :graph="graph"></simulation>
    <workingArea :mini-map="miniMap" :reset="reset" @reset="reset = $event" :saved-board="savedBoard" :save-name="saveName" :save-tag="saveTag"
     :username="username" :save="saveBoard" @save="saveBoard = $event;clickSave = $event"
     :selected="selected" @selected="selected = $event" :delete-ele="deleteEle" @delete-ele="deleteEle = $event"
     :clear-working="clearWorking" @clear-working="clearWorking = $event" :start="start" @has-clock="hasClock = $event"
     @graph="graph = $event" :rotate="rotate" :size="size" @rotate="rotate = $event" @size="size = $event" ref="working"></workingArea>
  </div>
</template>

<script>
import elements from './elements.vue';
import elementSetting from './elementSetting.vue';
import simulation from './simulation.vue';
import workingArea from './workingArea.vue';

export default {
  components: {
    elements,
    elementSetting,
    simulation,
    workingArea
  },

}
</script>

<style lang="less">
.design {
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
</style>
