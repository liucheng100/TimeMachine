<template>
  <div class="vivid" ref="vivid" @mousedown="mousedown($event)" @mouseup="mouseup($event)" @mouseover="mouseover" @mouseout="mouseout">
    <div :class="{cirBg:true}" :style="{
      width: initR+'px',
      height: initR+'px',
      top: layerY+'px',
      left: layerX+'px',
      transform: `scale(${Radius}) translate(-50%,-50%)`,
      transition: transitionOX ?`transform ${transitiondur}s, background-color .2s`:null,
      backgroundColor: `rgba(0,0,0,${alph})`,
    }"></div>
  </div>
</template>
<!-- 父元素要有relative -->
<script>
import getAssetsFile from "@/utils/pub-use";
export default {
  name: 'VividClick',
  watch: {
    
  },
  data(){
    return{
      ishold: false,
      boxW: null,
      boxH: null,
      initR: 0,
      layerY: 0,
      layerX: 0,
      Radius: 0,
      transitionOX: false,
      transitiondur: 0,
      dur: .5,
      alph: 0.03,
      timeStamp: 0,
    }
  },
  methods: {
    mousedown(e){
      this.ishold = true

      this.transitionOX = false
      this.alph = 0
      this.Radius = 0
      // console.log(e)
      // console.log(e.layerX,e.layerY)
      //tips: offsetX会更好，不会影响使用transform的元素
      this.$nextTick(() => {
        this.timeStamp = e.timeStamp
        this.alph = 0.03
        this.layerX = e.offsetX
        this.layerY = e.offsetY
        this.Radius = this.initR
        this.transitiondur = 1/(0.5+Math.abs(this.layerX/this.boxW-0.5))*this.dur*(this.boxW/(this.boxW+this.boxH)) + 1/(0.5+Math.abs(this.layerY/this.boxH-0.5))*this.dur*(this.boxH/(this.boxW+this.boxH))
        this.transitionOX = true
        this.Radius = 4
      });
    },
    mouseup(e){
      this.ishold = false
      if(e.timeStamp-this.timeStamp>300){
        this.alph = 0
        this.transitionOX = false
        this.Radius = 0
      }
      
    },
    mouseover(){
      // console.log(9)
    },
    mouseout(){
      this.alph = 0
    },
  },
  mounted(){
    this.$nextTick(()=>{
      if(!this.$refs.vivid) return;
      this.boxH = parseInt(getComputedStyle(this.$refs.vivid).height)
      this.boxW = parseInt(getComputedStyle(this.$refs.vivid).width)
      this.initR = (this.boxH+this.boxW)/2
      // console.log(this.boxH)
    })
  }
};
</script>

<style scoped>
.vivid{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
}
.cirBg{
  position: absolute;
  background-color: rgba(0,0,0,0.03);
  border-radius: 50%;
  pointer-events: none;
  transform-origin: 0 0;
}

</style>