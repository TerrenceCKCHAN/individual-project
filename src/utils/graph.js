export default {
  drawElement: function(graph, x, y, selected) {
    switch (selected) {
      case 'and':
        return this.drawAnd(graph, x, y);
        break;
      case 'or':
        return this.drawOr(graph, x, y);
        break;
      case 'not':
        return this.drawNot(graph, x, y);
        break;
      case 'nor':
        return this.drawNor(graph, x, y);
        break;
      case 'xor':
        return this.drawXor(graph, x, y);
        break;
      case 'buffer':
        return this.drawBuffer(graph, x, y);
        break;
      case 'switch':
        return this.drawSwitch(graph, x, y);
        break;
      case 'button':
        return this.drawButton(graph, x, y);
        break;
      case 'led':
        return this.drawLed(graph, x, y);
        break;
      case 'clock':
        return this.drawClock(graph, x, y);
        break;
      case 'half-adder':
        return this.drawHalfAdder(graph, x, y);
        break;
      case 'full-adder':
        return this.drawFullAdder(graph, x, y);
        break;
      case 'd-latch':
        return this.drawDLatch(graph, x, y);
        break;
      case 'rs-flip-flop':
        return this.drawRsFlipFlop(graph, x, y);
        break;
      case 'jk-flip-flop':
        return this.drawJkFlipFlop(graph, x, y);
        break;
      case 'shifting-register':
        return this.drawShiftingRegister(graph, x, y);
        break;
      case 'segment-display':
        return this.drawSegmentDisplay(graph, x, y);
        break;
      case 'decoder':
        return this.drawDecoder(graph, x, y);
        break;
      case 'multiplexer':
        return this.drawMultiplexer(graph, x, y);
        break;
      case 'demultiplexer':
        return this.drawDemultiplexer(graph, x, y);
        break;
      case 'text':
        return this.drawTextblock(graph, x, y);
        break;
      default:
        break;
    }
  },
  drawAnd: function(graph, x, y) {
    var shape = new joint.shapes.logic.And();
    return this.drawCommonGate(shape, graph, x, y);
  },
  drawOr: function(graph, x, y) {
    var shape = new joint.shapes.logic.Or();
    return this.drawCommonGate(shape, graph, x, y);
  },
  drawNot: function(graph, x, y) {
    var shape = new joint.shapes.logic.Not();
    return this.drawCommonGate(shape, graph, x, y);
  },
  drawNor: function(graph, x, y) {
    var shape = new joint.shapes.logic.Nor();
    return this.drawCommonGate(shape, graph, x, y);
  },
  drawXor: function(graph, x, y) {
    var shape = new joint.shapes.logic.Xor();
    shape.operation = function(input1, input2) {
      return (input1 && !input2) || (!input1 && input2);
    }
    return this.drawCommonGate(shape, graph, x, y);
  },
  drawBuffer: function(graph, x, y) {
    var shape = new joint.shapes.logic.Buffer();
    shape.resize(90, 40);
    return this.drawCommonGate(shape, graph, x, y);
  },
  drawSwitch: function(graph, x, y) {
    var shape = new joint.shapes.logic.Switch();
    shape.resize(20, 20);
    return this.drawCommonGate(shape, graph, x, y);
  },
  drawButton: function(graph, x, y) {
    var shape = new joint.shapes.logic.Button();
    shape.resize(20, 20);
    return this.drawCommonGate(shape, graph, x, y);
  },
  drawLed: function(graph, x, y) {
    var shape = new joint.shapes.logic.Led();
    shape.resize(20, 20);
    return this.drawCommonGate(shape, graph, x, y);
  },
  drawClock: function(graph, x, y) {
    var shape = new joint.shapes.logic.Clock();
    shape.resize(80, 80);
    return this.drawCommonGate(shape, graph, x, y);
  },
  drawHalfAdder: function(graph, x, y) {
    var shape = new joint.shapes.logic.HalfAdder();
    shape.resize(90, 65);
    return this.drawCommonGate(shape, graph, x, y);
  },
  drawFullAdder: function(graph, x, y) {
    var shape = new joint.shapes.logic.FullAdder();
    shape.resize(90, 65);
    return this.drawCommonGate(shape, graph, x, y);
  },
  drawDLatch: function(graph, x, y) {
    var shape = new joint.shapes.logic.DLatch();
    shape.resize(90, 65);
    return this.drawCommonGate(shape, graph, x, y);
  },
  drawRsFlipFlop: function(graph, x, y) {
    var shape = new joint.shapes.logic.RS();
    shape.resize(90, 65);
    return this.drawCommonGate(shape, graph, x, y);
  },
  drawJkFlipFlop: function(graph, x, y) {
    var shape = new joint.shapes.logic.JK();
    shape.resize(100, 90);
    return this.drawCommonGate(shape, graph, x, y);
  },
  drawShiftingRegister: function(graph, x, y) {
    var shape = new joint.shapes.logic.SHR();
    shape.resize(150, 70);
    return this.drawCommonGate(shape, graph, x, y);
  },
  drawSegmentDisplay: function(graph, x, y) {
    var shape = new joint.shapes.logic.SD();
    shape.resize(80, 70);
    return this.drawCommonGate(shape, graph, x, y);
  },
  drawDecoder: function(graph, x, y) {
    var shape = new joint.shapes.logic.Decoder();
    shape.resize(80, 150);
    return this.drawCommonGate(shape, graph, x, y);
  },
  drawMultiplexer: function(graph, x, y) {
    var shape = new joint.shapes.logic.Mul();
    shape.resize(100, 100);
    return this.drawCommonGate(shape, graph, x, y);
  },
  drawDemultiplexer: function(graph, x, y) {
    var shape = new joint.shapes.logic.DeMul();
    shape.resize(100, 100);
    return this.drawCommonGate(shape, graph, x, y);
  },
  drawCommonGate: function(shape, graph, x, y) {
    shape.position(x, y);
    shape.addTo(graph);
    return shape;
  },
  drawTextblock: function(graph, x, y) {
    var textBlock = new joint.shapes.standard.TextBlock();
    textBlock.resize(100, 30);
    textBlock.position(x, y);
    textBlock.attr('root/title', 'joint.shapes.standard.TextBlock');
    textBlock.attr('name', 'text');
    textBlock.addTo(graph);
    return textBlock;
  }
}
