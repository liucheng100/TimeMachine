<template>
  <div class="article">
    <div class="head-bar">
      <el-select
        v-model="selectValue"
        class="m-2"
        placeholder="Select"
        size="large"
        
        @change="reload"
      >
        <el-option
          v-for="item in selectOption"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <div class="head-righter">
        <div class="BTN" @click="addExFn" @mouseenter="mouseOn=true" @mouseleave="mouseOn=false">
          添加试题
        </div>
        <div @click="chosenArr.length?makesureOX=1:0" :class="{
          'BTN':1,
          'BTN-red':1,
          'margin-left':1,
          'unable': !chosenArr.length}">
          删除 {{ chosenArr.length?chosenArr.length:'' }}
        </div>
      </div>
    </div>
    <div class="body-box">
      <div class="table-box">
        <div
        :ref="'item'+idx"
        @click.stop="i.chosen=!i.chosen"
        @mouseenter="mouseenterFn(idx)"
        @mouseleave="HoverOX=false"
        class="table-item" v-for="(i,idx) in exerciseList" :key="i.exerciseId">
          <div class="flex-min"></div>
          <div class="flex-1 flex-center item-hidden">
            <div class="multipleBtn" @click.stop="i.chosen=!i.chosen">
              <div v-show="i.chosen">✔</div>
            </div>
          </div>
          <div class="flex-8 item-hidden">
            <div class="itemb-1">
              <div class="idxBox">{{ idx }}</div>
              <div class="itemBox">
                <div class="title-q">
                  {{ i.question }}
                </div>
                <div style="display:flex;font-size: 12px;align-items:center">
                  <div class="title-t">
                    {{ i.exerciseType? '多选' : '单选' }}
                  </div>
                  <div style="margin-left: 6px">
                    --{{ i.value }}分
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="flex-2 flex-center item-hidden">
            <div class="BTN-1" @click.stop="editFn(idx)">
              编辑
            </div>
          </div>
        </div>
      </div>
    </div>
    <popupAny :ox="editArticle">
      <div class="newArticleBox">
        <div class="title-1">
          试题变更
        </div>
        <div class="lineBar">
          <div class="title-2">
            课程序号:
          </div>
          <input type="text" :value="selectValue" readonly="true" class="unable">
        </div>
        <div class="lineBar">
          <div class="title-2">
            题目内容:
          </div>
          <input type="text" v-model="exerciseList[editIndex].question_ed">
        </div>
        <div class="lineBar">
          <div class="title-2">
            题目分值:
          </div>
          <input type="text" v-model="exerciseList[editIndex].value_ed">
        </div>
        <div class="lineBar">
          <div class="title-2">
            题目类型:
          </div>
          <div>
            <div class="single-choose">
              <div tabindex="0" @click="exerciseList[editIndex].exerciseType_ed = 0" :class="{'single-item':1, 'single-act':exerciseList[editIndex].exerciseType_ed==0}">
                <div>单选</div>
                <div class="single-dot">
                  <div class="act-dot" v-show="exerciseList[editIndex].exerciseType_ed==0"></div>
                </div>
              </div>
              <div style="margin-left:20px" tabindex="0" @click="exerciseList[editIndex].exerciseType_ed = 1" :class="{'single-item':1, 'single-act':exerciseList[editIndex].exerciseType_ed==1}">
                <div>多选</div>
                <div class="single-dot">
                  <div class="act-dot" v-show="exerciseList[editIndex].exerciseType_ed==1"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="lineBar-1">
          <div class="optBox">
            <div class="opt-item" v-for="(i,index) in exerciseList[editIndex].options_ed" :key="index">
              <input class="rinput" v-model="i.option" type="text" :placeholder="'选项'+(index+1)">
              <div class="tipinfo">
                标记为答案
              </div>
              <div class="multipleBtn" @click.stop="i.isAns=!i.isAns">
                <div v-show="i.isAns">✔</div>
              </div>
              <div @click="removeOpt_(index)" style="margin-left: 30px" class="BTN-r">
                -
              </div>
              <div @click="addOpt_(index)" class="BTN-r">
                +
              </div>
            </div>

          </div>
        </div>
        <div class="btnbar">
          <div @click="editArticle = false" class="BTN BTN-grey">
            取消
          </div>
          <div @click="saveEx" class="BTN BTN-red">
            保存更改
          </div>
        </div>
      </div>
    </popupAny>
    <popupAny :ox="newArticle">
      <div class="newArticleBox">
        <div class="title-1">
          添加试题
        </div>
        <div class="lineBar">
          <div class="title-2">
            课程序号:
          </div>
          <input type="text" :value="selectValue" readonly="true" class="unable">
        </div>
        <div class="lineBar">
          <div class="title-2">
            题目内容:
          </div>
          <input type="text" v-model="newArticle.question">
        </div>
        <div class="lineBar">
          <div class="title-2">
            题目分值:
          </div>
          <input type="text" v-model="newArticle.value">
        </div>
        <div class="lineBar">
          <div class="title-2">
            题目类型:
          </div>
          <div>
            <div class="single-choose">
              <div tabindex="0" @click="Q1.ox = 0" :class="{'single-item':1, 'single-act':Q1.ox==0}">
                <div>单选</div>
                <div class="single-dot">
                  <div class="act-dot" v-show="Q1.ox==0"></div>
                </div>
              </div>
              <div style="margin-left:20px" tabindex="0" @click="Q1.ox = 1" :class="{'single-item':1, 'single-act':Q1.ox==1}">
                <div>多选</div>
                <div class="single-dot">
                  <div class="act-dot" v-show="Q1.ox==1"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="lineBar-1">
          <div class="optBox">
            <div class="opt-item" v-for="(i,index) in newArticle.opt" :key="index">
              <input class="rinput" v-model="i.option" type="text" :placeholder="'选项'+(index+1)">
              <div class="tipinfo">
                标记为答案
              </div>
              <div class="multipleBtn" @click.stop="i.isAns=!i.isAns">
                <div v-show="i.isAns">✔</div>
              </div>
              <div @click="removeOpt(index)" style="margin-left: 30px" class="BTN-r">
                -
              </div>
              <div @click="addOpt(index)" class="BTN-r">
                +
              </div>
            </div>

          </div>
        </div>
        <div class="btnbar">
          <div @click="newArticle = false" class="BTN BTN-grey">
            取消
          </div>
          <div @click="addEx" class="BTN BTN-red">
            添加试题
          </div>
        </div>
      </div>
    </popupAny>
    <popupAny :ox="makesureOX">
      <div class="makesureBox">
        <div class="title">是否删除共{{chosenArr.length}}项?</div>
        <div class="btnbar">
          <div @click="makesureOX = false" class="BTN BTN-grey">
            取消
          </div>
          <div @click="removeEx" class="BTN BTN-red">
            删除
          </div>
        </div>
      </div>
    </popupAny>
    <HoverPop @mouseenter.native="HoverOX=true" @mouseleave.native="HoverOX=false" :ox="HoverOX" :pos="HoverPos">
      <div class="HoverBox">
        <div class="title-3">选项概览</div>
        <div>
          <div class="select-item" v-for="i in exerciseList[HoverIndex].options">
            <div class="decor"></div>
            <div>
              {{ i.option }}
            </div>
            <div class="true" v-show="i.isAns">
              ✔
            </div>
          </div>
        </div>
      </div>
    </HoverPop>
  </div>
</template>

<script>
import popupAny from "@/components/ljc/lesson20/popupAny.vue";
import HoverPop from "@/components/ljc/HoverPop.vue";
import {
  getCourselist, 
  getExercise,
  addExercise,
  removeExercise,
  editExercise
} from "@/api/lesson20.ts"
export default {
  components: {
    popupAny,
    HoverPop,
  },
  computed:{
    chosenAll(){
      let j = true
      this.exerciseList.forEach(element => {
        if(!element.chosen) {
          j = false;
          return
        }
      });
      return j;
    },
    chosenArr(){
      let arr = []
      this.exerciseList.forEach(element => {
        if(element.chosen) {
          arr.push(element)
        }
      });
      return arr;
    }
  },
  data() {
    return {
      selectValue: 1,
      selectOption: [
        { 
          value: 1,
          label: "全部",
        },
      ],
      makesureOX: false,
      mouseOn: false,
      newArticle:false,
      editArticle:false,
      editIndex: 0,
      HoverOX: false,
      HoverPos: {},
      HoverIndex: -1,

      Q1: {ox:0},
      exerciseList:[
        {},
        {},
        {},
        {},
        
      ]
    };
  },
  methods: {
    editFn(idx){
      this.editArticle = true;
      this.editIndex = idx;
      this.exerciseList[idx].question_ed = this.exerciseList[idx].question
      this.exerciseList[idx].value_ed = this.exerciseList[idx].value
      this.exerciseList[idx].exerciseType_ed = this.exerciseList[idx].exerciseType
      this.exerciseList[idx].options_ed = [...this.exerciseList[idx].options]
    },
    removeEx(){
      removeExercise(this.chosenArr.map(v=>{
        return v.exerciseId
      })).then(v=>{
        if(!v.code){
          console.log(v)
          ElMessage.success('删除成功')
          this.makesureOX = false
          this.reload()
        }
      })
    },
    addEx(){
      if(this.newArticle){
        addExercise({
          exerciseId: 0,
          courseId: this.selectValue,
          question: this.newArticle.question,
          exerciseType: this.Q1.ox,
          value: this.newArticle.value,
          options: this.newArticle.opt.map(v=>{
            return {
              option: v.option,
              isAns: v.isAns? 1 : 0
            }
          })
        }).then(v=>{
          console.log(v)
          if(!v.code){
            ElMessage.success('添加成功')
            this.newArticle = false
            this.reload()
          }
        })
      }
    },
    saveEx(){
      if(this.exerciseList[this.editIndex].options_ed){
        editExercise({
          exerciseId: this.exerciseList[this.editIndex].exerciseId,
          courseId: this.selectValue,
          question: this.exerciseList[this.editIndex].question_ed,
          exerciseType: this.exerciseList[this.editIndex].exerciseType_ed,
          value: this.exerciseList[this.editIndex].value_ed,
          options: this.exerciseList[this.editIndex].options_ed.map(v=>{
            return {
              option: v.option,
              isAns: v.isAns? 1 : 0
            }
          })
        }).then(v=>{
          console.log(v)
          if(!v.code){
            ElMessage.success('修改成功')
            this.editArticle = false
            this.reload()
          }
        })
      }
    },
    addOpt_(index){
      if(this.exerciseList[this.editIndex].options_ed.length >=5){
        ElMessage.info('选项不能多于5个')
      }else{
        this.exerciseList[this.editIndex].options_ed.splice(index+1,0,{})
        // console.log(index+1, this.newArticle.opt)
      }
    },
    removeOpt_(index){
      if(this.exerciseList[this.editIndex].options_ed.length <=2){
        ElMessage.info('选项不能少于两个')
      }else{
        // console.log(index, this.newArticle.opt)
        this.exerciseList[this.editIndex].options_ed.splice(index,1)
      }
    },
    addOpt(index){
      if(this.newArticle.opt.length >=5){
        ElMessage.info('选项不能多于5个')
      }else{
        this.newArticle.opt.splice(index+1,0,{})
        console.log(index+1, this.newArticle.opt)
      }
    },
    removeOpt(index){
      if(this.newArticle.opt.length <=2){
        ElMessage.info('选项不能少于两个')
      }else{
        console.log(index, this.newArticle.opt)
        this.newArticle.opt.splice(index,1)
      }
    },
    addExFn(){
      this.newArticle = {}
      this.newArticle.opt=[{},{}]
      this.newArticle.question=''
      this.newArticle.value= 1
    },
    mouseenterFn(idx){
      this.HoverOX = true
      this.HoverIndex = idx
      let rect = this.$refs['item'+idx][0].getBoundingClientRect()
      let offset = 10
      this.HoverPos.x = rect.left + rect.width*.5 - offset
      this.HoverPos.y = rect.top+rect.height/2
    },
    chooseAll(){
      if(this.chosenAll){
        this.exerciseList.forEach(ele=>{
          ele.chosen = false
        })
      }else{
        this.exerciseList.forEach(ele=>{
          ele.chosen = true
        })
      }
    },
    reload(){
      getCourselist().then(v=>{
        if(!v.code){
          console.log(v)
          // this.assets = v.data
          this.selectOption = v.data.map((ele,idx)=>{
            return {
              value: ele.courseId,
              label: `第${idx+1}课 - ${ele.courseName}`
            }
          })
          if(!this.selectValue){
            this.selectValue=this.selectOption[0].value
          }
          getExercise(this.selectValue).then(v=>{
            console.log(v)
            if(!v.code){
              this.exerciseList = v.data
            }
          })
        }
      })
    },
  },
  mounted(){
    console.log(this.$route.query.index)
    this.selectValue = parseInt(this.$route.query.index)
    this.reload()
  }
};
</script>
    

<style scoped>
.article{
  background-color: #fff;
  padding: 70px;
  padding-top: 50px;
  border-radius: 16px;
  min-height: 100%;
}
.head-bar{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0px;
  margin-bottom: 30px;
}
.head-righter{
  display: flex;
  align-items: center;
}

.BTN{
  height: 44px;
  width: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  border-radius: 20px / 22px;
  background-color: rgb(199,36,47);
  user-select: none;
  cursor: pointer;
  transition: .24s;
}
.BTN:hover{
  opacity: .8;
}
.BTN-red{
  color: rgb(199,36,47);
  background-color: rgb(255, 236, 237);
}
.BTN-grey{
  color: rgb(114, 119, 132);
  background-color: rgb(231, 233, 237,.7);
}
.margin-left{
  margin-left: 30px;
}
.table-head{
  display: flex;
  width: 100%;
  height: 55px;
  align-items: center;
  /* background-color: rgba(254,248,248); */
  padding: 0 0px;
  margin-top: 30px;
  font-size: 18px;
  /* color: rgb(255, 11, 11); */
  color: rgba(70, 78, 85,.6);
}
.table-item{
  display: flex;
  width: 100%;
  min-height: 55px;
  align-items: center;
  padding: 10px 0px;
  font-size: 18px;
  color: #4f6175d6;
  transition: .24s;
}
.table-item:hover{
  background-color: rgba(0,10,20,0.02);
}
.BTN-1{
  color: rgba(129, 149, 167,.8);
  cursor: pointer;
  user-select: none;
  padding: 5px 20px;
  transition: .24s;
}
.BTN-1:hover{
  color: rgb(113, 131, 148);
}
.multipleBtn{
  width: 20px;
  height: 20px;
  color: rgb(199,36,47);
  border: solid 1px #4f6175d6;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  user-select: none;
  cursor: pointer;
  border-radius: 4px;
  background-color: rgba(0,0,0,0.02);
}
.makesureBox{
  width: 400px;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.title{
  font-size: 20px;
  color: #4f6175d6;
  text-align: center;
}
.btnbar{
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.virtual-item{
  height: 55px;
  display: flex;
  border: dashed 2px rgb(244, 221, 222);
  margin-top: 0;
  opacity: .9;
  color: rgb(244, 221, 222);
  border-radius: 12px;
}
.fillBg{
  background-color: rgba(255,240,241);
  width: 50%;
  height: 30px;
  border-radius: 9px;
}
.newArticleBox{
  height: 80vh;
  width: 50vw;
  background-color: #fff;
  padding: 12px 30px;
  display: flex;
  flex-direction: column;
}
.title-1{
  font-size: 20px;
  margin-bottom: 20px;
  color: rgb(192, 29, 40);
}
.lineBar{
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}
.lineBar-1{
  display: flex;
  align-items: flex-start;
  flex: 1;
  margin-bottom: 30px;
  overflow: overlay;
}
.title-2{
  font-size: 20px;
  color: #4f6175d6;
  margin-right: 20px;
}
input{
  border: none;
  outline: none;
  padding: 5px 6px;
  border: solid 1px rgba(0,10,20,0);
  transition: .24s;
  width: 400px;
  background-color: rgba(243, 246, 248,.6);
}
input:hover{
  border: solid 1px #8fabc8d6;
}
textarea{
  max-height: 100%;
  height: 100%;
  flex: 1;
  transition: border .24s;
  outline: none;
  background-color: rgba(243, 246, 248,.6);
  border: solid 1px rgba(0,10,20,0);
}
textarea:hover{
  border: solid 1px #8fabc8d6;
}
.itemb-1{
  display: flex;
  align-items: center;
}
.idxBox{
  margin-right: 24px;
  font-size: 22px;
  color: rgba(28, 48, 69, 0.3);
  font-style: italic;
}
.itemBox{
  width: 100%;
  height: 60px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
}
.title-q{
  font-size: 19px;
  color: rgba(28, 48, 69, .8);

}
.title-t{
  font-size: 16px;
  color: rgb(222, 120, 127);
}
.HoverBox{
  width: 300px;
  /* min-height: 100px; */
  max-height: 200px;
  overflow: overlay;
  padding-right: 8px;
}
.title-3{
  font-size: 16px;
  color: rgba(0,10,20,0.5);
}
.select-item{
  padding: 4px 6px;
  transition: .24s;
  display: flex;
  align-items: center;
}
.select-item:hover{
  background-color: rgba(0,0,0,0.024);
}
.true{
  color: rgb(91,223,179);
  margin-left: 10px;
}
.decor{
  width: 8px;
  height: 8px;
  border: solid 1px rgba(198,36,47,.7);
  border-radius: 50%;
  margin-right: 8px;
  flex-shrink: 0;
}

.flex-min{
    flex: .4;
}
.flex-1{
    flex: 1;
    margin-right: 20px;
}
.flex-2{
    flex: 2;
    margin-right: 20px;
}
.flex-3{
    flex: 3;
    margin-right: 20px;
}
.flex-8{
    flex: 8;
    margin-right: 20px;
}
.item-hidden{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.flex-center{
    display: flex;
    justify-content: center;
    position: relative;
    right: 10px;
}
.item-fade-color{
    color: rgba(129, 151, 172, 0.7);
    font-size: 17px;
}
.self-strech{
    align-self: stretch;
}
.align-center{
    display: flex;
    align-items: center;
}
.unable{
  filter: grayscale(1) opacity(.5);
  cursor: not-allowed;
}

.single-choose{
  margin-left: 20px;
  display: flex;
  color: rgba(47, 52, 56, 0.7);
  font-size: 17px;
}
.single-item{
  width: 70px;
  height: 34px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  user-select: none;
  transition: .24s;
}
.single-act{
  /* color: rgb(0,161,233); */
}
.single-dot{
  margin-left: 12px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: rgb(244,246,249);
  border: solid 1px rgb(228, 132, 138);
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translateY(1.4px);
  /* background-color: rgb(75,192,246); */
}
.act-dot{
  background-color: rgb(225, 88, 97);
  height: 66%;
  width: 66%;
  border-radius: 50%;
}
.optBox{
  width: 100%;
  padding-left: 40px;
  /* background-color: red; */
}
.opt-item{
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
.rinput{
  border-radius: 30px;
  padding: 8px 14px;
}
.tipinfo{
  font-size: 12px;
  color: rgba(0,0,0,0.34);
  margin-right: 16px;
  margin-left: 26px;
}
.BTN-r{
  transition: .3s;
  user-select: none;
  cursor: pointer;
  height: 30px;
  width: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  border-radius: 50%;
  margin-left: 20px;
  color: rgb(0,0,0,0.4);
  background-color: rgba(0,0,0,0.03);
}
.BTN-r:hover{
  color: rgb(0,0,0,0.6);
  background-color: rgba(0,0,0,0.06);
}
</style>