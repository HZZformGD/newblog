<template lang="html">
  <div class="m-header">
    <figure class="m-bg"></figure>
    <canvas class="canvas" ref="canvas">你看不到我</canvas>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  computed: {
  },
  mounted () {
    this.createCanvas()
  },
  methods: {
    createCanvas () {
      let unit = 100
      let vm = this
      let canvas, context, height, width, xAxis, yAxis
      function init () {
        canvas = vm.$refs.canvas
        canvas.width = document.documentElement.clientWidth
        canvas.height = 300
        context = canvas.getContext('2d')
        height = canvas.height
        width = canvas.width
        xAxis = Math.floor(height / 2)
        yAxis = 0
        draw()
      }
      function draw () {
        context.clearRect(0, 0, width, height)
        drawWave('#fff', 1, 3, 0)
        draw.seconds = draw.seconds + 0.009
        draw.t = draw.seconds * Math.PI
        setTimeout(draw, 35)
      }
      draw.seconds = 0
      draw.t = 0

      function drawWave (fillcolor, alpha, zoom, delay) {
        context.fillStyle = fillcolor
        context.globalAlpha = alpha

        context.beginPath()
        drawSine(draw.t / 0.5, zoom, delay)
        context.lineTo(width + 10, height)
        context.lineTo(0, height)
        context.closePath()
        context.fill()
      }

      function drawSine (t, zoom, delay) {
        let x = t
        let y = Math.sin(x) / zoom
        context.moveTo(yAxis, unit * y + xAxis)
        for (let i = yAxis; i <= width + 10; i += 10) {
          x = t + (-yAxis + i) / unit / zoom
          y = Math.sin(x - delay) / 3
          context.lineTo(i, unit * y + xAxis)
        }
      }
      init()
    }
  }
}
</script>

<style lang="css" scoped>
  .m-header {
    width: 100%;
    height: 500px;
    overflow: hidden;
    position: relative;
  }
  figure {
    width:100%;
    height: 100%;
    background:url('/static/bg2.jpg') left -44px;
    background-size:cover;
  }
  .canvas{
    width:100%;
    height:100px;
    position: absolute;
    bottom:0;
    left: 0;
    right: 0;
  }
</style>
