<template>
  <div ref="branch" class="branch">
    <div @scroll="scrollFn" ref="box" class="box">
      <div ref="mainBox" class="mainBox">
        <div class="list list-title list-first">
          <div class="item flex-2 item-first">序号</div>
          <div class="item flex-4">课程名</div>
          <div class="item flex-2 noSelect">文章</div>
          <div class="item flex-2 noSelect">试题</div>
          <div class="item flex-3 noSelect">操作</div>
        </div>
        <div class="" v-if="!assets.length">
          <div @click="singleO.extendBar=2" class="btn2 addCourseBtn">添加课程</div>
          <transition name="heightAni">
            <div class="extendBar" :style="{height:singleO.extendBar==2?'210px':''}" v-show="singleO.extendBar">
              <div :class="{extendBox:true,center:singleO.extendBar==1}">
                <div class="header">
                  <div class="title">第1课</div>
                  <div class="info" v-show="singleO.extendBar==1">
                    点击"<span>添加</span>"以编辑新增课程信息
                  </div>
                </div>
                <div v-show="singleO.extendBar==2" class="Box__content">
                  <div class="itemD">
                    <div class="itemD_title">课程名:</div>
                    <div class="inputBox">
                      <input class="input" v-model="singleO.addCourseName" type="text">
                    </div>
                  </div>
                  <div class="itemD">
                    <div class="itemD_title">文章:</div>
                    <div class="tips">
                      创建课程后可操作
                    </div>
                  </div>
                  <div class="itemD">
                    <div class="itemD_title">试题:</div>
                    <div class="tips">
                      创建课程后可操作
                    </div>
                  </div>
                </div>
                <div v-if="singleO.extendBar==2" class="Box__bottom">
                  <div @click="addCourse(singleO)" class="btn3">
                    创建课程
                  </div>
                  <div @click="singleO.extendBar=0" class="btn0 marginR">
                    取消
                  </div>
                </div>
              </div>
            </div>
          </transition>
        </div>
        <div class="itemBox" v-for="(o, i) in assets" :ref="`focusView` + i" :key="o.courseId">
          <div class="list list-item">
            <div class="item flex-2 item-first">第{{i+1}}课</div>
            <div class="item flex-4">
              <div class="triggerBox">
                <transition name="ani11">
                  <div v-if="!o.OX" @click="editTitle(i)" class="lessonName">
                    <div class="text">{{o.courseName}}</div>
                    <div class="editBtn">
                      <el-icon size="large"><Edit /></el-icon>
                    </div>
                  </div>
                  <div class="statebox2" @mousedown="o.onArea=true" @mouseleave="o.onArea=false;leavefocus(i)" v-else>
                    <input @keypress.enter="saveTitle(i)" :ref="`input`+ i" @blur="o.onArea?0:o.OX=false" v-model="o.courseName_change" type="text">
                    <div class="btn1" @click="saveTitle(i)">
                      保存
                      <VividClick></VividClick>
                    </div>
                  </div>
                </transition>
              </div>
            </div>
            <div class="item flex-2">
              <div class="btn1" @click="$router.push({
                path:'/lesson20/article20',
                query: {index: o.courseId}
              })" @mouseenter="hoverPopFn1($event,o)" @mouseleave="HoverPop1=false">
                查看
                <VividClick></VividClick>
              </div>
            </div>
            <div class="item flex-2">
              <div @click="$router.push({
                path:'/lesson20/question20',
                query: {index: o.courseId}
              })" class="btn1">
                查看
                <VividClick></VividClick>
              </div>
            </div>
            <div class="item flex-3">
              <div class="btn1" @click="o.extendBar=2" @mouseleave="o.extendBar==1?o.extendBar=0:0" @mouseenter="o.extendBar!=2?o.extendBar=1:0">
                添加
                <VividClick></VividClick>
              </div>
              <div class="btn1" @click="o.makesureOX=true">
                删除
                <VividClick></VividClick>
              </div>
            </div>
          </div>
          <div class="makesurePop" @mouseenter="o.makesureOX=true" @mouseleave="o.makesureOX=false" v-if="o.makesureOX">
            <div class="wText">是否删除该课程?</div>
            <div class="btnBar">
              <div class="btn4" @click="o.makesureOX=false">取消</div>
              <div class="btn1" @click="removeCourse(o)">删除</div>
            </div>
          </div>
          <transition name="heightAni">
            <div class="extendBar" :style="{height:o.extendBar==2?'210px':''}" v-show="o.extendBar">
              <div :class="{extendBox:true,center:o.extendBar==1}">
                <div class="header">
                  <div class="title">第{{i+2}}课</div>
                  <div class="info" v-show="o.extendBar==1">
                    点击"<span>添加</span>"以编辑新增课程信息
                  </div>
                </div>
                <div v-show="o.extendBar==2" class="Box__content">
                  <div class="itemD">
                    <div class="itemD_title">课程名:</div>
                    <div class="inputBox">
                      <input class="input" v-model="o.addCourseName" type="text">
                    </div>
                  </div>
                  <div class="itemD">
                    <div class="itemD_title">文章:</div>
                    <div class="tips">
                      创建课程后可操作
                    </div>
                  </div>
                  <div class="itemD">
                    <div class="itemD_title">试题:</div>
                    <div class="tips">
                      创建课程后可操作
                    </div>
                  </div>
                </div>
                <div v-if="o.extendBar==2" class="Box__bottom">
                  <div @click="addCourse(o)" class="btn3">
                    创建课程
                  </div>
                  <div @click="o.extendBar=0" class="btn0 marginR">
                    取消
                  </div>
                </div>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
    <HoverPop :ox="false" :pos="pos1" @mouseenter.native="HoverPop1=true" @mouseleave.native="HoverPop1=false">
      adsf
    </HoverPop>
    <!-- mask -->
  </div>
</template>

<script>
import VividClick from "@/components/ljc/VividClick.vue";
import HoverPop from "@/components/ljc/HoverPop.vue";
import FullView from "@/components/ljc/FullView.vue";
import Popup_addBranch from "@/components/ljc/branch/Popup_addBranch.vue";
import {
  getCourselist, 
  courseAlter, 
  addCourse, 
  removeCourse,
} from "@/api/lesson20.ts"

export default {
  components: {
    VividClick,
    FullView,
    Popup_addBranch,
  },
  data() {
    return {
      singleO: {extendBar:0},
      popupOX: false,
      HoverPop1: false,
      pos1:{},
      HoverPop2: false,

      loadOX: false,
      selectValue: {
        v_department: "",
        v_grade: "",
        v_type: "",
      },
      selectOption: {
        op_department: [
          {
            value: "",
            label: "全部",
          },
          {
            value: 201,
            label: "机械工程学院",
          },
        ],
        op_grade: [
          {
            value: "",
            label: "全部",
          },
          {
            value: "2021",
            label: "2021",
          },
        ],
        op_type: [
          {
            value: "",
            label: "全部",
          },
          {
            value: 1,
            label: "本科",
          },
          {
            value: 2,
            label: "硕士",
          },
          {
            value: 3,
            label: "博士",
          },
          {
            value: 4,
            label: "其他",
          },
        ],
      },
      assets: [
        {
          OX: false,
          onArea: false,
          courseName: '沪房地阿三',
          courseName_change: '',
        },
      ],
    };
  },
  methods: {
    hoverPopFn1(e,o){
      this.HoverPop1 = true
      let rect = e.target.getBoundingClientRect()
      this.pos1.x = rect.left
      this.pos1.y = rect.top+rect.height/2
      // console.log(e.target.getBoundingClientRect() ,e.target.offsetLeft,e.target.offsetTop,e)
    },
    removeCourse(o){
      removeCourse(o.courseId).then(v=>{
        console.log(v)
        if(!v.code){
          ElMessage({
            message:'删除成功',
            type:'success'
          })
          this.reload()
          o.makesureOX = false
        }else{
          ElMessage({
            message:v.msg,
            type:'error'
          })
        }
      })
    },
    scrollFn(e){
      let v1 = this.$refs.box.scrollTop+this.$refs.box.offsetHeight
      let v2 = this.$refs.mainBox.offsetHeight
      console.log(this.$refs.box.scrollTop,this.$refs.box.offsetHeight,this.$refs.mainBox.offsetHeight)
      // this.$refs.box.scrollTop--
      if(v2-v1<2) this.$refs.box.scrollTop--;
    },
    reload(){
      getCourselist().then(v=>{
        console.log(v)
        if(!v.code){
          this.assets = v.data
        }
      })
    },
    addCourse(o){
      addCourse({
        courseName: o.addCourseName,
        courseDetail: '',
        text: '',
        position: o.position,
      }).then(v=>{
        console.log(v)
        if(!v.code){
          ElMessage({
            message:'添加成功',
            type: 'success'
          })
          this.reload()
          o.extendBar=0
        }else{
          ElMessage({
            message: v.msg,
            type: 'error'
          })
        }
      })
    },
    leavefocus(i){
      if(this.$refs['input'+i][0]){
        this.$refs['input'+i][0].focus()
      }
    },
    saveTitle(index){
      courseAlter({
        courseId: this.assets[index].courseId,
        newCourseName: this.assets[index].courseName_change,
        newCourseDetail: this.assets[index].courseDetail,
        newText: this.assets[index].text,
        newPath: this.assets[index].path,
      }).then(v=>{
        console.log(v)
        if(!v.code){
          ElMessage({
            message:'标题修改成功',
            type: 'success'
          })
          this.reload()
          this.assets[index].OX = false
        }
      })

    },
    editTitle(index){
      this.assets[index].OX = true
      this.assets[index].courseName_change = this.assets[index].courseName
      this.$nextTick(()=>{
        this.$refs['input'+index][0].focus()
      })
    },
    select(){
      this.loadOX = true
      getBranchlist({
        collegeId: this.selectValue.v_department,
        grade: this.selectValue.v_grade,
        type: this.selectValue.v_type,
      }).then(v=>{
        this.loadOX = false
        this.assets = ''
        this.assets = v.data
        console.log(this.assets)
      })
    },
    openPopup() {
      this.popupOX = true;
      this.$refs.branch.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    },
  },
  mounted(){
    this.assets = []
    this.reload()
  }
};
</script>
    

<style scoped>
.ani4-enter-active,
.ani4-leave-active {
  transition: all 0.5s;
}
.ani4-enter-from,
.ani4-leave-to {
  opacity: 0;
  height: 0 !important;
  padding-top: 0 !important;
  padding-bottom: 0 !important;
  min-height: unset !important;
}
.ani4-enter-to,
.ani4-leave-from {
  padding-top: 26px !important;
  padding-bottom: 26px !important;
  min-height: unset !important;
}
.branch {
  width: 100%;
  position: relative;
  height: 100%;
}
.box {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  padding: 0px 10px;
  display: flex;
  flex-direction: column;
  overflow: overlay;
}
.toolBar {
  height: 50px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.leftFlex {
  display: flex;
  align-items: center;
}
.selectCom {
  margin-right: 50px;
  display: flex;
  align-items: center;
}
.selectCom > span {
  margin-right: 20px;
}
.flex-1 {
  flex: 1;
}
.flex-2 {
  flex: 2;
}
.flex-3 {
  flex: 3;
}
.flex-4 {
  flex: 4.2;
  overflow: hidden;
}
.flex-5 {
  flex: 6;
}
.mainBox {
  --borderColor: rgba(0, 0, 0, 0.08);
  padding-bottom: 60px;
}
.list {
  display: flex;
  background-color: rgb(254,248,248);
  /* border: solid 1px var(--borderColor); */
  /* border-top: 0; */
  border-bottom: solid 1.2px var(--borderColor);
}
.list-first {
  /* border-top: solid 1px var(--borderColor); */
}
.list-item {
  background-color: white;
}
.item {
  display: flex;
  justify-content: center;
  align-items: center;
  /* border-left: solid 1px var(--borderColor); */
  padding: 10px;
}
.item-first {
  border-left: 0;
}
.btn1 {
  border-radius: 6px;
  color: rgba(199, 36, 48, 1);
  text-decoration: underline;
  user-select: none;
  cursor: pointer;
  position: relative;
  padding: 9px 26px;
  /* color: white; */
  /* background-color: rgba(199,36,48,1); */
}
.btn1:hover {
  background-color: rgba(0, 0, 0, 0.05);
}
.levelBox {
  border-bottom: solid 1px var(--borderColor);
  min-height: 100px;
  padding: 26px 30px;
}
.popBox {
  height: 100%;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
}
.btn2 {
  border-radius: 6px;
  user-select: none;
  cursor: pointer;
  position: relative;
  padding: 10px 30px;
  flex-shrink:0;
  transition: 0.4s;
  color: white;
  background-color: rgb(228, 72, 80);
  overflow: hidden;
}
.btn2:hover {
  background-color: rgba(228, 72, 80, 0.84);
}

.ani-loading-box {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  cursor: not-allowed;
}
@keyframes loading {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(100%);
  }
}
.ani-loading-box > div {
  animation: loading 2s infinite;
  height: 100%;
  width: 100%;
  background-image: linear-gradient(
    -90deg,
    rgba(255, 255, 255, 0.7) 0,
    rgba(255, 255, 255, 0.8) 5%,
    rgba(255, 255, 255, 0.6) 20%,
    rgba(255, 255, 255, 0)
  );
}
.margin-right {
  margin-right: 50px;
}
.m-2{
  width: 220px;
}
.i-1{
  width: 140px;
}

.lessonName{
  height: 90%;
  display: flex;
  justify-content: center;
  flex: 1;
  border-radius: 10px;
  align-items: center;
  cursor: pointer;
  overflow: hidden;
  padding: 0 12px;
}
.text{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  /* flex: 1; */
}
.lessonName:hover{
  background-color: rgba(0, 0, 0, 0.05);

}
.editBtn{
  flex-shrink: 0;
  margin-left: 30px;
  display: flex;
}
.triggerBox{
  position: relative;
  flex: 1;
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;

  overflow: hidden;
}
.statebox2{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: absolute; 
}
.statebox2>input{
  border-radius: 12px;
  padding: 0 16px;
  height: 100%;
  outline: unset;
  border: 0;
  background-color: unset;
  background-color: rgba(0, 0, 0, 0.04);
  width: 70%;
}
.extendBar{
  transition: all .26s;
  height: 80px;
  overflow: hidden;
  padding-top: 10px;
  position: relative;
  display: flex;
  padding-bottom: 10px;
  /* justify-content: center; */
}
.extendBar::before{
  content: "";
  position: absolute;
  top: 3px;
  right: 14%;
  height: 14px;
  width: 14px;
  transform: rotate(45deg);
  background-color: rgb(254, 254,254);
  box-shadow: 4px 0 2px 3px rgba(0, 0, 0, 0.04);
}
.extendBox{
  position: relative;
  /* min-height: 10px; */
  padding: 22px;
  padding-left: 22px;
  left: 4.5%;
  height: 100%;
  width: 86%;
  border-radius: 10px;
  background-color: rgb(254, 254, 254);
  font-size: 17px;
  display: flex;
  color: rgba(199,36,47, 0.99);
  flex-direction: column;
  border: solid 1px rgba(0, 0, 0, 0.04);
  border-top: solid 1px rgba(0, 0, 0, 0.0);
  box-shadow: 4px 4px 1px 0px rgba(0, 0, 0, 0.04);
}
.center{
  justify-content: center;
}
.header{
  display: flex;
  align-items: center;
}
.title{
  transition: .3s;
}
.info{
  margin-left: 20px;
  color: rgba(199,36,47, 0.99);
  /* font-weight: bold; */
}
.info span{
  color: rgb(199,36,47);
  text-decoration: underline;
}
.Box__content{
  color: black;
  width: 100%;
  height: 120px;
  flex: 1;
  margin: 10px 0;
  padding: 0 14px;
}
.Box__bottom{
  width: 100%;
  flex-shrink: 0;
  height: 30px;
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
}
.itemD{
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}
.itemD_title{
  color: rgb(0,0,0,.8);
  width: 70px;
  display: flex;
  flex-direction: row-reverse;
  margin-right: 16px;
  font-size: 16px;
}
.inputBox{
  width: 30%;
}
.input{
  width: 100%;
  border-radius: 6px;
  padding: 4px 6px;
  outline: none;
  background-color: rgb(244,244, 244);
  font-size: 17px;
  border: solid 1px transparent;
  transition: border .24s;
}
.input:hover{  
  border: solid 1px rgba(0, 0, 50, 0.4);
}
.tips{
  color: rgba(10,10,36, 0.4);
  cursor: not-allowed;
  font-size: 17px;
  user-select: none;
}
.btn3{
  width: 120px;
  height: 42px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 21px;
  color: white;
  background-color: rgb(242,64,76);
  user-select: none;
  cursor: pointer;
}
.btn0{
  width: 120px;
  height: 42px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 21px;
  color: rgb(0,0,0,.6);
  background-color: rgb(0,0,0,.08);
  user-select: none;
  cursor: pointer;
}
.marginR{
  margin-right: 30px;
}
.itemBox{
  position: relative;
}
.makesurePop{
  position: absolute;
  right: 0%;
  top: 50px;
  width: 200px;
  height: 100px;
  background-color: #fff;
  border-radius: 8px;
  border: solid 1px rgba(0, 0, 0, 0.1);
  box-shadow: 3px 3px 2px 2px rgba(0, 0, 0, 0.1);
  z-index: 99;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
.wText{
  color: rgb(223, 32, 45);
}
.btnBar{
  display: flex;
}
.btn4{
  border-radius: 6px;
  color: rgb(130, 130, 130);
  text-decoration: underline;
  user-select: none;
  cursor: pointer;
  position: relative;
  padding: 9px 26px;
}
.btn4:hover {
  background-color: rgba(0, 0, 0, 0.05);
}
.addCourseBtn{
  /* padding: 10px 20px; */
  /* background-color: red; */
  display: inline-block;
  margin: 20px 40px;
}
.ani11-enter-active,
.ani11-leave-active {
    transition: all .26s;
}

.ani11-enter-from,
.ani11-leave-to {
    opacity: 0;
    width: 70%;
    transform: translateX(-10px);
    /* transform: rotate3d(0,0,1,60deg); */
}

.ani11-enter-to,
.ani11-leave-from {
    width: 100%;
    opacity: 1;
    transform: translateX(0);
    /* transform: rotate3d(0,0,0,0deg); */
}


.heightAni-enter-from,
.heightAni-leave-to {
  height: 0;
  padding: 0;
}

.heightAni-enter-to,
.heightAni-leave-from {
    height: 80px;
    /* transform: rotate3d(0,0,0,0deg); */
}
</style>