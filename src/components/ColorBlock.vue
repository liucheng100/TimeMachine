<template>
  <div @mouseenter="mouseenterFn" @mouseleave="mouseleaveFn" class="colorblock noSelect" :style="{background: 'url('+BgImg[type]+') center center / 104% no-repeat',}">
    <div> 
      <div class="text1">{{theme}}</div>
      <div v-if="!proBar" class="text3">
        <span>{{proBar_}}</span>
        <div>
          points
          <i class="i_arr"></i>
        </div>
      </div>
      <div v-if="proBar">
        <div class="proBar">
          <div :style="{width: proBar_+'%'}"></div>
        </div>
        <div class="text3">
          <span>{{proBar_}}</span>
          <div style="font-weight: 400;">
            %
          </div>
        </div>
      </div>
    </div>
    <div class="text2">{{tip}}<i class="i_arr"></i></div>
  </div>
</template>

<script>
import getAssetsFile from "@/utils/pub-use";
export default {
  name: 'ColorBlock',
  props: {
    type: {
      type: Number,
      default: 0,
    },
    proBar: {
      type: Number,
      default: 0,
    },
    theme: {
      type: String,
      require: true,
    },
    tip: {
      type: String,
      require: true,
    },
  },
  watch: {
    proBar(to){
      this.proBar_ = to
    }
  },
  data(){
    return{
      BgImg: [
        getAssetsFile('study_card/1.png'),
        getAssetsFile('study_card/2.png'),
        getAssetsFile('study_card/3.png'),
        getAssetsFile('study_card/4.png'),
        getAssetsFile('study_card/5.png'),
      ],
      proBar_: this.proBar,
      interval: null,
    }
  },
  methods: {
    mouseenterFn(){
      this.proBar_ = 0
      this.interval = setInterval(() => {
        this.proBar_++;
        if(this.proBar_>=this.proBar){
          clearInterval(this.interval)
          this.proBar_ = this.proBar
        }
      }, 500/this.proBar);
    },
    mouseleaveFn(){
      this.proBar_ = this.proBar
    }
  },
  mounted(){
    
  }
};
</script>

<style scoped>
.colorblock{
  width: 360px;
  height: 382px;
  padding: 54px 36px;
  border-radius: 16px;
  cursor: pointer;
  transition: .4s;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.colorblock:hover{
  filter: brightness(0.84);
  padding: 46px 30px;
}
.colorblock:active{
  background-size: 112% !important;
  background-position: 100% 100% !important;
}
.text1{
  color: white;
  font-size: 28px;
  font-weight: bold;
  letter-spacing:1.4px;
}
.text2{
  color: white;
  font-size: 20px;
  font-weight: 400;
  display: flex;
  align-items: center;
  letter-spacing:1px;
}
.text3{
  color: white;
  font-size: 20px;
  font-weight: bold;
  display: flex;
  align-items: flex-end;
  letter-spacing:1.4px;
}
.text3>div{
  display: flex;
  align-items: center;
  
}
.text3>span{
  font-size: 30px;
  transform: translateY(4px);
}
.i_arr{
  display: inline-block;
  background: url('@/assets/avatar.png') center center / 100% no-repeat;
  height: 20px;
  width: 20px;
  margin-left: 4px;
}
.proBar{
  background-color: rgba(0, 0, 0, .2);
  width: 100%;
  height: 5.5px;
  border-radius: 2.75px;
  margin: 25px 0 11px 0;
}
.proBar>div{
  background-color: white;
  height: 100%;
  width: 0%;
  border-radius: 2.75px;
  /* transition: width .6s; */
}
</style>