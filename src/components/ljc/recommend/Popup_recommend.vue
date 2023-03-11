<template>
  <div class="popup" @click="destroy($event)" :style="{backgroundColor: `rgba(0,0,0,${aniL.alph})`}">
    <div class="boat" :style="{transform: `translateY(${aniL.y})`, opacity: aniL.alph1}" @dragover.stop.prevent="dragover" @dragenter.prevent.stop="dragenter" @dragleave.prevent.stop="dragleave" @drop.stop.prevent="drop($event)" @click.stop>
      <div class="box">
        <div class="fillAdd">
          <div class="box2">
            <div class="titleset" v-if="false">
              <transition name="ani2">
                <div class="state1 pointer noSelect" v-if="!titleOX" @click="enterTitle">
                  <div class="biaoti">标题:</div>
                  <div class="content">
                    <div v-if="!title" class="placeholder">点击以输入标题</div>
                    <FullView v-else :content="title"></FullView>
                  </div>
                  <VividClick></VividClick>
                </div>
                <div class="state2" v-else>
                  <input ref="inputtype" @blur="titleOX=false" class="inputtype" v-model="title" type="text">
                </div>
              </transition>
            </div>
            <div class="titleset noMargin">
              <transition name="ani2">
                <div class="state1 pointer noSelect" v-if="!hrefOX" @click="enterHref">
                  <div class="biaoti">目标文章:</div>
                  <div class="content">
                    <div v-if="!chosenFile.libraryFileId" class="placeholder">点击搜索并选择文章</div>
                    <div v-else class="book_card">
                      <div class="book_icon_"></div>
                      <div class="booktitle">
                        {{chosenFile.title}}
                      </div>
                    </div>
                  </div>
                  <VividClick></VividClick>
                </div>
                <div class="state2" v-else>
                  <input ref="inputhref" @input="inputChange" v-model="tip" @blur="!onArea?hrefOX=false:0" class="inputtype" type="text">
                </div>
              </transition>
            </div>
            <transition name="ani6">
              <div class="extendWin" @mousedown="onArea=true;" @mouseleave="onArea=false;leavefocus()" v-show="hrefOX">
                <div v-if="chosenFile.libraryFileId" class="search-item opacity1">
                  <div class="item-box">
                    <div class="title" style="margin-left:8px">当前选中文件:</div>
                    <div class="book_card">
                      <div class="book_icon_"></div>
                      <div class="booktitle">
                        {{chosenFile.title}}
                      </div>
                    </div>
                  </div>
                  <div class="btn3" @click="chosenFile.libraryFileId=null">
                    删除
                  </div>
                </div>
                <div @click="hrefOX=false;chosenFile=Object.assign({},o);" v-show="o.libraryFileId!=chosenFile.libraryFileId" class="search-item pointer noSelect" v-for="(o,i) in assets" :key="o.libraryFileId">
                  <div class="item-box">
                    <div class="book_icon darkFilter"></div>
                    <div class="title">文件名称:</div>
                    <div class="value">{{o.title}}</div>
                  </div>
                  <div class="updateTime">
                    更新于: {{o.updatedTime.split(' ')[0]}}
                  </div>
                  <VividClick></VividClick>
                </div>
                <transition name="ani1">
                  <div class="loadingBox" v-if="request_n">
                    <div class="loading_icon"></div>
                  </div>
                </transition>
              </div>
            </transition>
            <div class="box3" v-if="false">
              <div class="extendInfo noSelect">
                转跳前
                <div class="radioBox noSelect pointer">
                  <div @click="radio1=true" :class="{'item-active':radio1, item:true, }">
                    验证登录
                    <VividClick></VividClick>
                  </div>
                  <div @click="radio1=false" :class="{'item-active':!radio1, item:true, }">
                    不验证登录
                    <VividClick></VividClick>
                  </div>
                </div>
              </div>
              <div class="hrefFind pointer noSelect" @click="openSlide">
                不知道链接?点我用文章搜索
                <VividClick></VividClick>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div @click="destroy($event)" class="icon_down_box pointer noSelect">
        <div class="icon_down"></div>
        <VividClick></VividClick>
      </div>
      <div @click="submit" class="submitBox pointer noSelect">
        <!-- <div class="bg pointer"><VividClick></VividClick></div>
        <div class="text">
          <div class="icon_submit"></div>
          <div>submit</div>
        </div> -->
        <div>
          提交
          <VividClick></VividClick>
        </div>
      </div>
      <transition name="ani3">
          <div @click="slideOX=false" class="slideBox" v-show="slideOX">
            <div @click.stop class="infoBox">
              <div class="inputBox">
                <div class="elinput"><el-input @change="inputChange" @input="inputChange" ref="trigger" v-model="tip" size="large" placeholder="搜索文章" /></div>
              </div>
              <div class="search-item pointer noSelect" @click="slideOX=false;href=o.path" v-for="(o,i) in assets">
                <div class="item-box">
                  <div class="title">文件名称:</div>
                  <div class="value">{{o.title}}</div>
                </div>
                <div class="item-box">
                  <div class="title">链接:</div>
                  <div class="value">{{o.path}}</div>
                </div>
                <div class="updateTime">
                  更新于: {{o.updatedTime.split(' ')[0]}}
                </div>
                <VividClick></VividClick>
              </div>
            </div>
          </div>
        </transition>
    </div>
    <teleport to="body">
      <transition name="ani1">
        <div @click.stop="mask_1OX=false" class="mask_1" v-if="mask_1OX">
          <div @click.stop="destroy_1();mask_1OX=false" class="sure pointer" :style="{top: mask_1.y+'px', left: mask_1.x+'px' }">
            <div class="icon_x"></div>
          </div>
        </div>
      </transition>
    </teleport>
  </div>
</template>

<script>
import VividClick from "@/components/ljc/VividClick.vue";
import ImgLoad from "@/components/ljc/ImgLoad.vue";
import {addCarousel} from '@/api/swiper.ts';
import {searchFile} from '@/api/library.ts';
import { addRecommend } from "@/api/recommendList.ts";
export default{
  name: 'Popup',
  props:{
    total:{
      required: false,
      type: Number,
    }
  },
  components: {
    VividClick,
    ImgLoad,
  },
  data(){
    return{
      aniL:{
        alph : 0,
        y: '100%',
        alph1: 0,
      },
      dragenterOX: false,
      titleOX: false,
      ImgSrc: '',
      title: '',
      href: '',
      tip: '',
      hrefOX: false,
      mask_1OX: false,
      mask_1:{
        x: 0,
        y: 0,
      },
      radio1: false,
      slideOX:false,
      assets:[],
      onArea: false,
      request_n: 0,
      chosenFile: {
        libraryFileId : null,
        path : '',
        title: '',
      }
    }
  },
  methods:{
    leavefocus(){
      if(this.$refs.inputhref){
        this.$refs.inputhref.focus()
      }
    },
    inputChange(){
      this.request_n++;
      searchFile(this.tip).then(v=>{
        console.log(v)
        this.request_n--;
        if(v.code==0){
          this.assets = v.data
        }else{
          this.assets = []
        }
        
      })
    },
    openSlide(){
      this.slideOX=true
      this.$nextTick(()=>{
        this.$refs.trigger.select()
      })
    },
    submit(){
      addRecommend(this.chosenFile.libraryFileId).then(v=>{
        console.log(v)
        this.$emit('submit')
        this.destroy_1()
      })
    },
    enterHref(){
      this.hrefOX=true
      this.$nextTick(()=>{
        this.$refs.inputhref.focus()
      })
    },
    enterTitle(){
      this.titleOX=true
      this.$nextTick(()=>{
        this.$refs.inputtype.focus()
      })
    },
    destroy(e){
      if(!this.ImgSrc && !this.title && !this.chosenFile.libraryFileId){
        this.destroy_1()
      }else{
        this.mask_1.x = e.clientX
        this.mask_1.y = e.clientY
        this.mask_1OX = true
      }
      // console.log(e.srcElement,e.srcElement.offsetHeight,e.offsetY,e.srcElement.clientHeight)
      
    },
    destroy_1(){
      document.getElementById('app').scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
      this.aniL.alph = 0
      this.aniL.alph1 = 0
      this.aniL.y = '100%'
      setTimeout(() => {
        this.$emit('destroy')
      }, 600);
    },
    passVar_src(src){
      this.ImgSrc = src
    },
    drop(e){
      this.dragenterOX = false
      console.log(this.$refs)
      // console.log(e,e.dataTransfer.files)
      this.$refs.imgload.passFile(e.dataTransfer.files[0])
    },
    dragover(){
      this.dragenterOX = true
      // console.log('dragover')
    },
    dragenter(){
      this.dragenterOX = true
      // console.log(111)
    },
    dragleave(){
      this.dragenterOX = false
      // console.log(222)
    }

  },
  mounted(){
    setTimeout(() => {
      this.aniL.alph = 0.4
      this.aniL.alph1 = 1
      this.aniL.y = 0
    }, 0);
  }
}
</script>

<style scoped>
.popup{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  transition: .4s;
  white-space: nowrap;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
}

.boat{
  position: absolute;
  height: 70%;
  width: 58%;
  max-height: 900px;
  border-radius: 20px;
  /* border-radius: 120px 120px 0 0/80px 80px 0 0; */
  box-shadow: 0px -3px 9px rgba(0,0,0,0.1);
  /* background-color: rgba(255,255,255,.9); */
  /* background-image: linear-gradient(180deg , rgba(255,255,255,0.88) 0, rgba(250,250,250,1) 100%); */
  background-color: rgb(250,250,250);
  transition: transform .34s, opacity .4s;

  overflow: hidden;
}
.boat::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 0px;
    height: 0px;
}
.box{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 100px 100px;
  overflow: overlay;
}
.fillAdd{
  border-radius: 10px;
  position: relative;
  /* overflow: hidden; */
  display: flex;
  /* margin-left: 16px; */
}
.mask{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, .7);
  display: flex;
  justify-content: center;
  align-items: center;
  /* pointer-events: none; */
  color: white;
  font-size: 26px;
  z-index: 999;
}
.box2{
  flex: 1;
  /* margin-left: 70px; */
  /* margin-top: 20px; */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  /* justify-content: space-around; */
}
.titleset{
  width: 100%;
  height: 58px;
  /* border-radius: 8px/20px; */
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  /* box-shadow: 0px 1.4px rgba(0, 0, 0, 0.18); */
  background-color: white;
  margin-bottom: 34px;
  
}
.titleset>.state1{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  /* justify-content: center; */
  align-items: center;
  padding: 0 20px;
  /* background-color: rgba(0, 0, 0, .06); */
  /* background-color: #fff3; */
  display: flex;
  transition: .2s;
}
.titleset>.state1:hover{
  background-color: rgba(0, 0, 0, 0.04);
}
.state1>.biaoti{
  color: rgba(0, 0, 0, .5);
  margin-right: 10px;
  font-size: 18px;
}
.state1>.content{
  flex: 1;
  overflow: hidden;
  color: rgba(0, 0, 0, .74);
  font-size: 19px;
  display: flex;
  align-items: center;
}
.placeholder{
  color: rgba(0, 0, 0, .5);
  font-size: 18px;
}
.titleset>.state2{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  /* justify-content: center; */
  align-items: center;
  padding: 0 20px;
  font-size: 20px;
  background-color: rgba(0, 0, 0, .04);
  /* background-color: #fff3; */
}
.inputtype{
  width: 100%;
  outline: none;
  background-color: unset;
  border: 0;
  color: rgba(0, 0, 0, .74);
  height: 100%;
}
.hrefFind{
  color: rgba(199,36,48, 0.9);
  font-weight: 700;
  padding: 13px 20px;
  border-radius: 10px;
  transition: .4s;
  position: relative;
  overflow: hidden;
  text-decoration:underline;
}
.hrefFind:hover{
  background-color: rgba(0, 0, 0, .03);
}
.icon_down_box{
  position: absolute;
  left: 0;
  right: 0;
  height: 70px;
  width: 100%;
  transition: .4s;
}
.icon_down{
  position: absolute;
  left: 0;
  right: 0;
  height: 70px;
  width: 100%;
  opacity: .23;
  background: url('@/assets/homepage/down.svg') center center / 2.1% no-repeat;
}
.icon_down_box:hover{
  background-color: rgba(0, 0, 0, .04);
}
.mask_1{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  background-color: rgba(0, 0, 0, .6);
}
.sure{
  width: 110px;
  height: 110px;
  position: fixed;
  color: white;
  /* background-color: rgb(255, 0, 0); */
  background-image:radial-gradient( rgba(255,0,0,1),rgba(255,0,0,.8) 30%,rgba(255,0,0,0));
  border-radius: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
}
.icon_x{
  opacity: .7;
  height: 100%;
  width: 100%;
  background: url('@/assets/homepage/x.svg') center center / 36% no-repeat;
}

.icon_x::after{
  content: '退出内容不会保存';
  white-space: nowrap;
  font-size: 16px;
  position: absolute;
  bottom: -40px;
  left: 50%;
  transform: translateX(-50%);
}
.extendInfo{
  display: flex;
  align-items: center;
  /* margin-top: 50px; */
  color: rgba(0, 0, 0, .8);
  background-color: white;
  padding: 10px 20px;
  border-radius: 8px/20px;
}
.radioBox{
  margin-left: 26px;
  display: flex;
  align-items: center;
  color: rgba(0, 0, 0, .3);
}
.radioBox>.item{
  margin-right: 10px;
  border-radius: 8px;
  padding: 10px 0px;
  transition: .4s;
  position: relative;
  overflow: hidden;
}
.radioBox>.item:hover{
  color: rgba(0,0,0,0.6);
}
.item-active{
  margin-right: 10px;
  border-radius: 10px;
  padding: 10px 20px !important;
  background-color: rgba(0,0,0,0.04);
  color: rgba(193, 63, 71, 0.92);
  font-weight: 700;
}
.submitBox{
  position: absolute;
  overflow: hidden;
  left: 50%;
  /* top: 0; */
  bottom: 60px;
  transform: translateX(-50%);
  /* height: 300px; */
  /* width: 400px; */
  /* background-color: aquamarine; */
}
.submitBox>div{
  width: 160px;
  height: 52px;
  /* position: absolute; */
  /* left: 0; */
  /* bottom: 50%; */
  border-radius: 26px;
  /* box-shadow: 3px 3px 5px rgba(0, 0, 0, .3); */
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(235,55,64,.9);
  color: white;
  /* display: none; */
}
.submitBox>.bg{
  position: absolute;
  top: 20px;
  left: 0;
  width: 200%;
  height: 200%;
  border-radius: 52%/50%;
  background-color: rgba(200,0,0,.04);
  overflow: hidden;
}
.submitBox>.text{
  position: absolute;
  top: 46%;
  left: 39%;
  font-size: 30px;
  color:rgb(238, 224, 151);
  text-shadow: 2px 2px rgba(0, 0, 0, .6);
  pointer-events: none;
}
.icon_submit{
  transform: translate(90px, -20px);
  height: 60px;
  width: 60px;
  background: url('@/assets/homepage/submit.svg') center center / 100% no-repeat;
}
.slideBox{
  position: absolute;
  top: 70px;
  bottom: 0;
  right: 0;
  width: 100%;
}
.infoBox{
  position: absolute;
  height: 100%;
  width: 50%;
  right: 0;
  overflow: overlay;
  border-top-left-radius: 22px;
  box-shadow: -5px 0 4px rgba(0, 0, 0, .06);
  background-image: linear-gradient(135deg, rgba(255, 255, 255, 1), rgba(250,250,250, 1) 50%);
  /* background-color: white; */
}
.infoBox::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 0px;
    height: 0px;
}
.inputBox{
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  padding: 80px;
}
.elinput{
  width: 100%;
}
.box3{
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}
.search-item{
  height: 60px;
  width: 100%;
  padding: 18px 10px;
  box-sizing: border-box;
  transition: .3s;
  border-bottom: solid 1px rgba(0, 0, 0, .13);
  display: flex;
  justify-content: space-between;
  opacity: .8;
  position: relative;
  align-items: center;
}
.opacity1{
  opacity: .9;
  position: sticky;
  top: 0;
  z-index: 99;
  background-color: rgb(245,245,245);
}
.search-item:hover{
  opacity: 1;
  background-color: rgba(237,237,237);
}
.search-item>.item-box{
  display: flex;
  align-items: center;
}
.item-box>.title{
  color: rgba(0, 0, 0, .7);
  margin-right: 10px;
}
.item-box>.value{
  font-size: 19px;
  width: 60%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: rgba(0, 0, 0, .76);
}
.updateTime{
  /* position: absolute; */
  color: rgba(0, 0, 0, .5);
  display: flex;
  align-items: center;
}
.btn3{
  cursor: pointer;
  background-color: #fff7;
  color: rgb(242,64,76);
  padding: 6px 13px;
  border-radius: 8px;
  border: solid 1px rgba(0, 0, 0, .2);
  transition: .16s;
  user-select: none;
}
.btn3:hover{
  color: rgb(242,242,242);
  background-color: rgb(242,64,76);
}
.book_card{
  display: flex;
  align-items: center;
  max-width: 200px;
  height: 40px;
  border-radius: 8px;
  background-color: rgba(255, 100, 100, .8);
  /* border: solid 1px rgba(0, 0, 0, .12); */
  padding-right: 14px;
  color: white;
}
.book_icon_{
  background: url('@/assets/homepage/book_.svg') center center / 44% no-repeat;
  height: 48px;
  width: 48px;
  flex-shrink: 0;
}
.book_icon{
  background: url('@/assets/homepage/book.svg') center center / 50% no-repeat;
  height: 40px;
  width: 40px;
  flex-shrink: 0;
}
.booktitle{
  overflow: hidden;
  text-overflow: ellipsis;
  word-spacing: nowrap;
  font-size: 17px;
}
.noMargin{
  margin: 0;
}
.extendWin{
  width: 100%;
  height: 242px;
  border-radius: 10px;
  border-top: solid 1px white;
  background-color: rgba(0, 0, 0, .02);
  overflow: overlay;
  padding: 0;
  position: relative;
  box-shadow:  0 3px 2px rgba(0, 0, 0, .2);
}
.ani6-enter-active, .ani6-leave-active {
    transition: all .3s;
    
}
.ani6-enter-from, .ani6-leave-to {
    opacity: 0;
    height: 0 !important;
}
.ani6-enter-to, .ani6-leave-from {
    opacity: 1;
    height: 242px !important;
}
.darkFilter{
  filter: brightness(0.7) opacity(.5);
}
.loadingBox{
  position: absolute;
  top: 0;
  left:0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, .07);
  z-index: 997;
  display: flex;
  justify-content: center;
  align-items: center;
}
@keyframes rotate {
  0%{
    transform: rotate(0);
  }
  38%{
    transform: rotate(360deg);
  }
  100%{
    transform: rotate(720deg);
  }
}
.loading_icon{
  opacity: .8;
  background: url('@/assets/homepage/loading.svg') center center / 100% no-repeat;
  height: 50px;
  width: 50px;
  animation: rotate 1.4s infinite linear;
}
</style>