<template lang="html">
  <div class="working-area">
    <div class="paper" id="paper">

    </div>
    <div class="full-screen" @click="fullScreen" v-show="!!start">
    </div>
    <div class="scale-box">
      <div class="scale" @click="scale('small')">
        -
      </div>
      <div class="scale" @click="scale('large')">
        +
      </div>
      <select class="scale" name="" v-model="selectScale">
        <option :value="scale" :selected="scale == 1" v-for="scale in scaleValue">
          {{ scale }}
        </option>
      </select>
    </div>
    <!-- <minimap v-show="miniMap"></minimap> -->
    <!-- <div class="minimap" id="minimap">

    </div> -->
  </div>
</template>

<script>
import graphTool from '../../utils/graph.js';
import {defineAllEle} from '../../utils/logic-gates.js';
import service from '../../service.js';
import minimap from './minimap.vue';
import FileSaver from 'file-saver/FileSaver';

export default {
  props: {
    selected: String,
    deleteEle: Boolean,
    clearWorking: Boolean,
    start: Boolean,
    rotate: String,
    size: String,
    save: Boolean,
    username: String,
    saveName: String,
    saveTag: String,
    savedBoard: String,
    miniMap: Boolean,
    text: String,
    shareBoard: Boolean
  },
  components: {
    minimap
  },
  data() {
    return {
      selectedEle: null,
      paper: null,
      graph: null,
      board: '',
      reset: false,
      tick: false,
      clockStart: false,
      scaleValue: [0.5, 0.6, 0.7, 0.8, 0.9, 1, 1.1, 1.2, 1.3, 1.4, 1.5],
      scaleIndex: 5,
      selectScale: 1,
      minimapPaper: null,
      miniGraph: null
    }
  },
  mounted() {
    var self = this;
    defineAllEle();
    this.graph = new joint.dia.Graph;
    this.paper = new joint.dia.Paper({
      el: $('#paper'),
      model: this.graph,
      width: '100%',
      height: '100%',
      gridSize: 10,
      drawGrid: true,
      snapLinks: true,
      linkPinning: true,
      defaultLink: new joint.shapes.logic.Wire,
      validateConnection: function(vs, ms, vt, mt, e, vl) {
        if (e === 'target') {
          // target requires an input port to connect
          if (!mt || !mt.getAttribute('class') || mt.getAttribute('class').indexOf('input') < 0) return false;
          // check whether the port is being already used
          var portUsed = _.find(this.model.getLinks(), function(link) {

            return (link.id !== vl.model.id &&
                  link.get('target').id === vt.model.id &&
                  link.get('target').port === mt.getAttribute('port'));
          });
          return !portUsed;
        } else { // e === 'source'
          // source requires an output port to connect
          return ms && ms.getAttribute('class') && ms.getAttribute('class').indexOf('output') >= 0;
        }
      }
    });

    // this.minimapPaper = new joint.dia.Paper({
    //   el: $('#minimap'),
    //   model: this.miniGraph,
    //   width: '100%',
    //   height: '100%',
    //   gridSize: 10,
    //   drawGrid: false,
    //   snapLinks: true,
    //   linkPinning: true,
    //   defaultLink: new joint.shapes.logic.Wire,
    //   // validateConnection: function(vs, ms, vt, mt, e, vl) {
    //   //   if (e === 'target') {
    //   //     // target requires an input port to connect
    //   //     if (!mt || !mt.getAttribute('class') || mt.getAttribute('class').indexOf('input') < 0) return false;
    //   //     // check whether the port is being already used
    //   //     var portUsed = _.find(this.model.getLinks(), function(link) {
    //   //
    //   //       return (link.id !== vl.model.id &&
    //   //             link.get('target').id === vt.model.id &&
    //   //             link.get('target').port === mt.getAttribute('port'));
    //   //     });
    //   //     return !portUsed;
    //   //   } else { // e === 'source'
    //   //     // source requires an output port to connect
    //   //     return ms && ms.getAttribute('class') && ms.getAttribute('class').indexOf('output') >= 0;
    //   //   }
    //   // }
    // });

    this.paper.on('blank:pointerclick', (evt, x, y) => {
      if (!self.start) {
        if (!!self.selectedEle && !self.selected) {
          self.selectedEle = null;
          self.$emit('delete-ele', true);
        }
        if (!!self.selected) {
          var cell = graphTool.drawElement(self.graph, x, y, self.selected);
          self.selectedEle = self.paper.findViewByModel(cell);
          self.$emit('delete-ele', false);
          if (!!cell.attributes.attrs && cell.attributes.attrs.name == 'text') {
            this.$emit('is-text', true);
          } else {
            this.$emit('is-text', false);
          }
        }
        if (self.selected == 'clock') {
          self.$emit('has-clock', true);
        }
        self.$emit('selected', null);
      }
    });

    // this.graph.on('add', cell => {
    //   console.log('cell', cell);
    //   if (!cell.getBBox) {
    //     cell = this.paper.findViewByModel(cell);
    //   }
    //   var bbox = cell.getBBox();
    //   var left, top;
    //   console.log('test=======', bbox);
    //   bbox.x *= 0.2;
    //   bbox.y *= 0.2;
    //   bbox.width *= 0.3;
    //   bbox.height *= 0.3;
    //   left = bbox.x >= 0 ? bbox.x : '0';
    //   left = left <= $('#minimap').width() - bbox.width ? left : $('#minimap').width() - bbox.width;
    //   top = bbox.y >= 0 ? bbox.y : '0';
    //   top = top <= $('#minimap').height() - bbox.height ? top : $('#minimap').height() - bbox.height;
    //   console.log(bbox.x, bbox.y);
    //   var div = document.createElement('div');
    //   div.style.position = 'absolute';
    //   div.style.background = 'red';
    //   div.style.left = left + 'px';
    //   div.style.top = top + 'px';
    //   div.style.width = bbox.width + 'px';
    //   div.style.height = bbox.height + 'px';
    //   $(div).addClass('map-box-' + cell.cid);
    //   self.minimapPaper.el.appendChild(div);
    // })

    // this.graph.on('change:position', function(element, position) {
    //   console.log('Element ' + element.id + 'moved to ' + position.x + ',' + position.y);
    //   if (!element.getBBox) {
    //     element = this.paper.findViewByModel(element);
    //   }
    //   var bbox = element.getBBox();
    //   var left, top;
    //   console.log('test=======', bbox, element.cid);
    //   // var minibox = this.minimapPaper.localToPaperRect(bbox);
    //   bbox.x *= 0.2;
    //   bbox.y *= 0.2;
    //   bbox.width *= 0.3;
    //   bbox.height *= 0.3;
    //   left = bbox.x >= 0 ? bbox.x : '0';
    //   left = left <= $('#minimap').width() - bbox.width ? left : $('#minimap').width() - bbox.width;
    //   top = bbox.y >= 0 ? bbox.y : '0';
    //   top = top <= $('#minimap').height() - bbox.height ? top : $('#minimap').height() - bbox.height;
    //   $('.map-box-' + element.cid).css({
    //     'position': 'absolute',
    //     'left': left + 'px',
    //     'top': top + 'px',
    //     'width': bbox.width + 'px',
    //     'height': bbox.height + 'px'
    //   });
    // });

    var originX = 0;
    var originY = 0;
    var startX = 0;
    var startY = 0;

    this.paper.on('blank:pointerdown', (evt, x, y) => {
      startX = x;
      startY = y;
    })

    this.paper.on('blank:pointermove', (evt, x, y) => {
      var diffX = (x - startX) / 2;
      var diffY = (y - startY) / 2;
      originX = originX + diffX;
      originY = originY + diffY;
      this.paper.setOrigin(originX, originY);
      $('#paper').addClass('move');
    })

    this.paper.on('blank:pointerup', (evt, x, y) => {
      $('#paper').removeClass('move');
    })

    this.paper.on('blank:mousewheel', (evt, x, y, delta) => {
      if (delta < 0) {
        this.scale('small');
      } else {
        this.scale('large');
      }
    })

    this.paper.on('cell:pointerclick', (cellView, evt, x, y) => {
      if (!this.start) {
        this.selectedEle = cellView;
        this.$emit('delete-ele', false);
        if (!!cellView.model.attributes.attrs && cellView.model.attributes.attrs.name == 'text') {
          this.$emit('is-text', true);
        } else {
          this.$emit('is-text', false);
        }
        // this.$emit('size', '3');
      }
    })

    this.paper.on('element:clickSwitch', (eventView, evt) => {
      if (this.start) {
        let text = eventView.model.attributes.attrs.text.text
        evt.stopPropagation();
        eventView.model.attr({ text: {event: 'element:clickSwitch', text: Number(!text)} })
        self.broadcastSignal(eventView.model, !text);
      }
    })

    this.paper.on('element:clickButton', (eventView, evt) => {
      if (this.start) {
        self.broadcastSignal(eventView.model, 1);
        $(eventView.$el[0]).on('mouseup', handleMouseup);
        function handleMouseup() {
          self.broadcastSignal(eventView.model, 0);
          setTimeout(() => {
            $(eventView.$el[0]).off('mouseup', handleMouseup);
          }, 0)
        }
      }
    })

    joint.shapes.logic.Gate.prototype.onSignal = function(signal, handler) {
      handler.call(this, signal);
    }

    function toggleLive(model, signal) {
      // add 'live' class to the element if there is a positive signal
      V(self.paper.findViewByModel(model).el).toggleClass('live', signal > 0);
    }

    this.graph.on('change:signal', function(wire, signal) {
      if (self.start && !self.reset) {

        toggleLive(wire, signal);

        var magnitude = Math.abs(signal);

        // if a new signal has been generated stop transmitting the old one
        // if (magnitude !== current) return;

        var gate = self.graph.getCell(wire.get('target').id);

        toggleLive(gate, signal);

        if (gate) {

          gate.onSignal(signal, function() {


            // get an array of signals on all input ports
            var inputs = _.chain(self.graph.getConnectedLinks(gate, { inbound: true }))
              .sortBy(function(wire) {
                  return wire.get('target').port;
              })
              .groupBy(function(wire) {
                  return wire.get('target').port;
              })
              .map(function(wires) {
                  return Math.max.apply(this, _.invoke(wires, 'get', 'signal')) > 0;
              })
              .value();
            // calculate the output signal
            // var output = magnitude * (gate.operation.apply(gate, inputs) ? 1 : -1);
            var output = gate.operation.apply(gate, inputs);

            output != undefined && self.broadcastSignal(gate, output);
          });
        }
      }
    });

    // graph.on('remove', (cell) => {
    //
    // });

    this.initializeSignal();

    defineClock();

    this.$emit('graph', this.graph);

    function defineClock() {
      joint.shapes.logic.Gate.define('logic.GateClock', {
        attrs: {
          '.input': { ref: '.body', 'ref-x': 38.5, 'ref-dy': .08, magnet: 'passive', port: 'in' },
          '.output': { ref: '.body', 'ref-dx': .08, 'ref-y': 0.49, magnet: true, port: 'out' },
          name: 'clock'
        }
      }, {
        markup: '<g class="rotatable"><g class="scalable"><image class="body"/></g><circle class="input input1"/><circle  class="input input2"/><circle class="output"/></g>',
      });
      joint.shapes.logic.GateClock.define('logic.Clock', {
        attrs: { image: { 'xlink:href': 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzYiIGhlaWdodD0iNzIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiA8IS0tIENyZWF0ZWQgd2l0aCBNZXRob2QgRHJhdyAtIGh0dHA6Ly9naXRodWIuY29tL2R1b3BpeGVsL01ldGhvZC1EcmF3LyAtLT4KCiA8Zz4KICA8dGl0bGU+YmFja2dyb3VuZDwvdGl0bGU+CiAgPHJlY3QgZmlsbD0iI2ZmZmZmZiIgaWQ9ImNhbnZhc19iYWNrZ3JvdW5kIiBoZWlnaHQ9Ijc0IiB3aWR0aD0iNzgiIHk9Ii0xIiB4PSItMSIvPgogIDxnIGRpc3BsYXk9Im5vbmUiIG92ZXJmbG93PSJ2aXNpYmxlIiB5PSIwIiB4PSIwIiBoZWlnaHQ9IjEwMCUiIHdpZHRoPSIxMDAlIiBpZD0iY2FudmFzR3JpZCI+CiAgIDxyZWN0IGZpbGw9InVybCgjZ3JpZHBhdHRlcm4pIiBzdHJva2Utd2lkdGg9IjAiIHk9IjAiIHg9IjAiIGhlaWdodD0iMTAwJSIgd2lkdGg9IjEwMCUiLz4KICA8L2c+CiA8L2c+CiA8Zz4KICA8dGl0bGU+TGF5ZXIgMTwvdGl0bGU+CiAgPHJlY3QgaWQ9InN2Z18yIiBoZWlnaHQ9IjU3IiB3aWR0aD0iNTkiIHk9IjQuNSIgeD0iNS41IiBmaWxsLW9wYWNpdHk9IjAiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2U9IiMwMDAiIGZpbGw9Im5vbmUiLz4KICA8dGV4dCBzdHJva2U9IiMwMDAiIHRyYW5zZm9ybT0ibWF0cml4KDAuNTkzMDM4Nzk3Mzc4NTQsMCwwLDAuNjAwMDAwMDIzODQxODU3OSwxMS41OTgzOTQyNzQ3MTE2MDksMTEuMzk5OTk5MzIwNTA3MDUpICIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgdGV4dC1hbmNob3I9InN0YXJ0IiBmb250LWZhbWlseT0iSGVsdmV0aWNhLCBBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIyNCIgaWQ9InN2Z18zIiB5PSI0NS41IiB4PSIxNS4wMTAxNTciIHN0cm9rZS13aWR0aD0iMCIgZmlsbD0iIzAwMDAwMCI+Q0xLPC90ZXh0PgogIDx0ZXh0IHN0cm9rZT0iIzAwMCIgdHJhbnNmb3JtPSJtYXRyaXgoMC40MTU5MDYxMzEyNjc1NDc2LDAsMCwwLjM4MTQ2Njc0NjMzMDI2MTIzLDQxLjc2MjcxMTYxNDM3MDM0NiwxMi43Mzc5MTkxOTI3NjExODMpICIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgdGV4dC1hbmNob3I9InN0YXJ0IiBmb250LWZhbWlseT0iSGVsdmV0aWNhLCBBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIyNCIgaWQ9InN2Z180IiB5PSI2My40NzE2ODQiIHg9IjM1LjQzNDE3IiBzdHJva2Utb3BhY2l0eT0ibnVsbCIgc3Ryb2tlLXdpZHRoPSIwIiBmaWxsPSIjMDAwMDAwIj5jPC90ZXh0PgogIDx0ZXh0IHN0cm9rZT0iIzAwMCIgdHJhbnNmb3JtPSJtYXRyaXgoMC40MzI3ODAzNjgxMjE0MzExNywwLDAsMC4zNzM4NTI1OTQ5OTE4NjEsMzMuMTMwMzc0OTgyNTQ4Mzk2LDQxLjEwOTgwNjgwOTk3Nzg0KSAiIHhtbDpzcGFjZT0icHJlc2VydmUiIHRleHQtYW5jaG9yPSJzdGFydCIgZm9udC1mYW1pbHk9IkhlbHZldGljYSwgQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjQiIGlkPSJzdmdfNSIgeT0iNDQuNzc5OTg3IiB4PSIwLjM4MDkyOCIgZmlsbC1vcGFjaXR5PSJudWxsIiBzdHJva2Utb3BhY2l0eT0ibnVsbCIgc3Ryb2tlLXdpZHRoPSIwIiBmaWxsPSIjMDAwMDAwIj5pbjwvdGV4dD4KICA8bGluZSBzdHJva2U9IiMwMDAiIHN0cm9rZS1saW5lY2FwPSJudWxsIiBzdHJva2UtbGluZWpvaW49Im51bGwiIGlkPSJzdmdfNiIgeTI9IjcwLjUiIHgyPSIzNi41IiB5MT0iNjAuNSIgeDE9IjM2LjUiIGZpbGwtb3BhY2l0eT0ibnVsbCIgc3Ryb2tlLW9wYWNpdHk9Im51bGwiIGZpbGw9Im5vbmUiLz4KICA8bGluZSBzdHJva2U9IiMwMDAiIHN0cm9rZS1saW5lY2FwPSJudWxsIiBzdHJva2UtbGluZWpvaW49Im51bGwiIGlkPSJzdmdfNyIgeTI9IjM0LjUiIHgyPSI3NC41IiB5MT0iMzQuNSIgeDE9IjY1LjUiIGZpbGwtb3BhY2l0eT0ibnVsbCIgc3Ryb2tlLW9wYWNpdHk9Im51bGwiIGZpbGw9Im5vbmUiLz4KIDwvZz4KPC9zdmc+' } }

      }, {
        stop: false,
        timer: null,
        flag: 0,
        operation: function(input) {
          if (!!input) {
            this.timer = setInterval(() => {
              this.flag = !this.flag;
              self.broadcastSignal(this, this.flag);
            }, 100);
          } else {
            clearInterval(this.timer);
            // self.broadcastSignal(this, 0);
            return 0;
          }
        }
      });
    }


  },
  methods: {
    initializeSignal: function() {
      var signal = 0;
      // > 0 wire with a positive signal is alive
      // < 0 wire with a negative signal means, there is no signal
      // 0 none of the above - reset value

      // cancel all signals stores in wires
      _.invoke(this.graph.getLinks(), 'set', 'signal', 0);

      // remove all 'live' classes
      $('.live').each(function() {
        V(this).removeClass('live');
      });

      _.each(this.graph.getElements(), function(element) {
        // broadcast a new signal from every input in the graph
        (element instanceof joint.shapes.logic.Input) && this.broadcastSignal(element, signal);
      });
      setTimeout(() => {
        this.reset = false;
      }, 0)
      return signal;
    },
    deleteElement: function() {
      if (!!this.selectedEle) {
        this.selectedEle.remove();
        if (!!this.selectedEle.model.attributes.attrs.name && this.selectedEle.model.attributes.attrs.name == 'clock') {
          this.$emit('has-clock', false);
        }
      }
    },
    clearWorkingArea: function() {
      this.graph.clear();
      this.$emit('saved-board', '');
    },
    broadcastSignal: function(gate, signal) {
      // broadcast signal to all output ports
      // _.chain(self.graph.getConnectedLinks(gate, { inbound: true }))
      //   .sortBy(function(wire) {
      //     console.log('port: ', wire.get('target').port);
      //       return wire.get('target').port;
      //   })
      //   .groupBy(function(wire) {
      //     console.log('port: ', wire.get('target').port);
      //       return wire.get('target').port;
      //   })
      //   .map(function(wires) {
      //       return Math.max.apply(this, _.invoke(wires, 'get', 'signal')) > 0;
      //   })
      //   .value()
      // var ports = this.graph.getConnectedLinks(gate, { outbound: true })
      var ports = _.chain(this.graph.getConnectedLinks(gate, { outbound: true }))
      .sortBy(function(wire) {
          return wire.get('source').port;
      }).map(function(wires) {
          return wires;
      })
      .value()
      var newPort = []
      for (let i = 0; i < ports.length; i++) {
        var found = false;
        var foundIndex = -1;
        for (let j = 0; j < newPort.length; j++) {
          if (newPort[j].get('source').port == ports[i].get('source').port) {
            found = true;
            foundIndex = j;
          }
        }
        if (!found) {
          newPort.push(ports[i]);
        }
        if (foundIndex < 0) {
          foundIndex = newPort.length - 1;
        }
        var new_signal = signal;
        if (signal instanceof Array) {
          new_signal = signal[foundIndex]
        }
        // console.log('signal: ', new_signal);
        _.defer(_.invoke, [ports[i]], 'set', 'signal', new_signal);
      }
       // _.defer(_.invoke, graph.getConnectedLinks(gate, { outbound: true }), 'set', 'signal', signal);
    },
    resetBoard: function() {
      var allCells = this.graph.getCells();
      allCells.forEach(cell => {
        if (!!cell.attributes.attrs && cell.attributes.attrs.name == 'switch') {
          cell.attr({ text: {event: 'element:clickSwitch', text: 0} })
        }
      })
      this.reset = true;
      this.initializeSignal();
    },
    saveAsTemplate: function(saveName, savePicture) {
      if (!!this.username) {
        var cells = this.graph.getCells()
        var board = '';
        if (cells.length > 0) {
          cells.forEach((cell) => {
            board += JSON.stringify(cell) + '#';
          })
          board = board.substring(0, board.length-1);
        }
        return service.saveTemplate(board, this.username, saveName, savePicture);
      }
    },
    fullScreen: function() {
      joint.util.toggleFullScreen(this.paper.el);
    },
    scale: function(value) {
      if (value == 'small') {
        --this.scaleIndex >= 0 || this.scaleIndex++;
      } else if (value == 'large') {
        ++this.scaleIndex < this.scaleValue.length || this.scaleIndex--;

      }
    },
    submitExport: function(filename) {
      var cells = this.graph.getCells()
      var board = '';
      if (cells.length > 0) {
        cells.forEach((cell) => {
          board += JSON.stringify(cell) + '#';
        })
        board = board.substring(0, board.length-1);
      }
      var blob = new Blob([board], {type: "text/plain;charset=utf-8"});
      FileSaver.saveAs(blob, filename + ".txt");
    },
  },
  watch: {
    deleteEle: function(value) {
      !!value && this.deleteElement();
    },
    clearWorking: function(value) {
      if (!!value) {
        this.clearWorkingArea();
        this.$emit('clear-working', false);
      }
    },
    start: function(value) {
      this.paper.setInteractivity(!value);
      if (value) {
        this.initializeSignal();
      }
      if (value &&!!this.selectedEle) {
        this.selectedEle = null;
        this.$emit('delete-ele', true);
      }
      if (!value) {
        var allCells = this.graph.getCells();
        allCells.forEach(cell => {
          if (!!cell.attributes.attrs && cell.attributes.attrs.name == 'switch') {
            cell.attr({ text: {event: 'element:clickSwitch', text: 0} })
          }
        })
        this.initializeSignal();
      }
    },
    rotate: function(value) {
      if (!!this.selectedEle && value == 'left') {
        this.selectedEle.model.rotate(-90, false);
      } else if (!!this.selectedEle && value == 'right') {
        this.selectedEle.model.rotate(90, false);
      }
      this.$emit('rotate', '');
    },
    size: function(value) {
      if (value == 'up') {
        this.selectedEle.model.scale(1.1, 1.1);
      } else if (value == 'down') {
        this.selectedEle.model.scale(.9, .9);
      }
      this.$emit('size', '')
    },
    save: function(value) {
      if (!!value && this.username != '') {
        var cells = this.graph.getCells()
        var board = '';
        if (cells.length > 0) {
          cells.forEach((cell) => {
            board += JSON.stringify(cell) + '#';
          })
          board = board.substring(0, board.length-1);
        }
        service.saveBoard(board, this.username, this.saveName, this.saveTag).then((res) => {
          if (res.code == 200) {
            this.$emit('save', false);
          }
        }).catch((err) => {
          console.log('err: ', err);
        });
      }
    },
    savedBoard: function(value) {
      if (!!value) {
        value.split('#').forEach((ele) => {
          this.graph.addCell(JSON.parse(ele))
        })
      }
    },
    scaleIndex: function(value) {
      this.selectScale = this.scaleValue[value]
    },
    selectScale: function(value) {
      this.paper.scale(value);
      this.scaleValue.forEach((ele, index) => {
        if (ele == value) {
          this.scaleIndex = index;
        }
      })
    },
    text: function(value) {
      var text = joint.util.breakText(value, { width: 100 })
      var height = text.trim().split('\n').length * 30;
      this.selectedEle.model.resize(100, height);
      this.selectedEle.model.attr('label/text', text);
    },
    shareBoard: function(value) {
      if (!!value) {
        var cells = this.graph.getCells()
        var board = '';
        if (cells.length > 0) {
          cells.forEach((cell) => {
            board += JSON.stringify(cell) + '#';
          })
          board = board.substring(0, board.length-1);
        }
        service.getBoardByBoard(board).then(res => {
          if (res.code == 200) {
            this.$emit('share-board', false);
            this.$emit('url', window.location.href.split('?')[0] + '?boardId=' + res.data[0].id);
          } else {
            service.saveBoard(board, '', '', '').then(res => {
              service.getBoardByBoard(board).then(res => {
                if (res.code == 200) {
                  this.$emit('share-board', false);
                  this.$emit('url', window.location.href.split('?')[0] + '?boardId=' + res.data[0].id);
                }
              })
            });
          }
        })
      }
    }
  }
}
</script>

<style lang="less">
  .working-area {
    position: relative;
    flex: 1;
    border: solid 1px;
    #paper {
      height: 100%;
      width: 100%;
      &.move {
        cursor: grab;
      }
    }

    .full-screen {
      position: absolute;
      bottom: 0;
      left: 10px;
      height: 30px;
      width: 30px;
      margin: 5px;
      background: url('../../images/fullScreen.jpg') center no-repeat;
      background-size: contain;
    }

    .scale-box {
      position: absolute;
      bottom: 0;
      left: 70px;
      .scale {
        display: inline-block;
        padding: 10px;
      }
    }

    .joint-link.live .connection {
      stroke: red;
    }

    .joint-type-logic-led.live .rotatable .scalable .body {
      fill: yellow;
    }

    .joint-type-standard-textblock {
      rect {
        stroke-width: 1;
      }
    }

    .minimap {
      position: absolute;
      bottom: 0;
      right: 0;
      height: 40%;
      width: 30%;
      border: 1px solid;
      opacity: .3;
    }
  }
</style>
