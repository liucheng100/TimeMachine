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
        <div class="BTN" @click="newArticle=true" @mouseenter="mouseOn=true" @mouseleave="mouseOn=false">
          添加文章
        </div>
        <div @click="chosenArr.length?makesureOX=1:0" :class="{
          'BTN':1,
          'BTN-red':1,
          'margin-left':1,
          'unable': !chosenArr.length}">
          删除 {{ chosenArr.length ||'' }}
        </div>
      </div>
    </div>
    <div class="body-box">
      <div class="table-head">
        <div class="flex-2 flex-center item-hidden">
          <div @click="chooseAll" class="multipleBtn">
            <div v-show="chosenAll">✔</div>
          </div>
        </div>
        <div class="flex-4 item-hidden">
          文章名称
        </div>
        <div class="flex-3 item-hidden">
          上传时间
        </div>
        <div class="flex-2 flex-center item-hidden">
          操作
        </div>
      </div>
      <div class="table-box">
        <div class="table-item" v-for="i in articleList" :key="i.passageId">
          <div class="flex-2 flex-center item-hidden">
            <div class="multipleBtn" @click="i.chosen=!i.chosen">
              <div v-show="i.chosen">✔</div>
            </div>
          </div>
          <div class="flex-4 item-hidden">
            {{ i.title }}
          </div>
          <div class="flex-3 item-hidden">
            {{ i.updateTime || i.createdTime }}
          </div>
          <div class="flex-2 flex-center item-hidden">
            <div class="BTN-1" @click="editArtiFn(i)">
              编辑
            </div>
          </div>
        </div>
      </div>
      <div class="virtual-item table-head" v-show="mouseOn || newArticle">
        <div class="flex-2 flex-center item-hidden">
          <div @click="chooseAll" class="multipleBtn">
          </div>
        </div>
        <div class="flex-4 item-hidden">
          <div class="fillBg"></div>
        </div>
        <div class="flex-3 item-hidden">
          <div class="fillBg"></div>
        </div>
        <div class="flex-2 flex-center item-hidden">
          编辑
        </div>
      </div>
    </div>
    <popupAny :ox="editArticle">
      <div class="newArticleBox">
        <div class="title-1">
          编辑文章
        </div>
        <div class="lineBar">
          <div class="title-2">
            文章标题:
          </div>
          <input type="text" v-model="editArticle.title_ed">
        </div>
        <div class="lineBar">
          <div class="title-2">
            课程序号:
          </div>
          <input type="text" :value="editArticle.courseId" readonly="true" class="unable">
        </div>
        <div class="lineBar-1">
          <div class="title-2">
            文章正文:
          </div>
          <textarea name="" v-model="editArticle.text_ed" id="" cols="30" rows="10"></textarea>
        </div>
        <div class="btnbar">
          <div @click="editArticle = false" class="BTN BTN-grey">
            取消
          </div>
          <div @click="saveEdit" class="BTN BTN-red">
            保存更改
          </div>
        </div>
      </div>
    </popupAny>
    <popupAny :ox="newArticle">
      <div class="newArticleBox">
        <div class="title-1">
          添加文章
        </div>
        <div class="lineBar">
          <div class="title-2">
            文章标题:
          </div>
          <input v-model="newArt_model.title" type="text">
        </div>
        <div class="lineBar">
          <div class="title-2">
            课程序号:
          </div>
          <input type="text" :value="selectValue" readonly="true" class="unable">
        </div>
        <div class="lineBar-1">
          <div class="title-2">
            文章正文:
          </div>
          <textarea v-model="newArt_model.article" name="" id="" cols="30" rows="10"></textarea>
        </div>
        <div class="btnbar">
          <div @click="newArticle = false" class="BTN BTN-grey">
            取消
          </div>
          <div @click="addArtiFn" class="BTN BTN-red">
            添加文章
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
          <div @click="removeArti" class="BTN BTN-red">
            删除
          </div>
        </div>
      </div>
    </popupAny>
  </div>
</template>

<script>
import popupAny from "@/components/ljc/lesson20/popupAny.vue";
import {
  getCourselist, 
  courseAlter, 
  addCourse, 
  removeCourse,
  getArticle,
  addArticle,
  removeArticle,
  alterArtTitle,
  alterArtText,
} from "@/api/lesson20.ts"
export default {
  components: {
    popupAny,

  },
  computed:{
    chosenAll(){
      let j = true
      this.articleList.forEach(element => {
        if(!element.chosen) {
          j = false;
          return
        }
      });
      return j;
    },
    chosenArr(){
      let arr = []
      this.articleList.forEach(element => {
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
      articleList:[
        {},
        {},
        {},
        {},
      ],
      newArt_model:{
        title: '',
        article: ''
      }
    };
  },
  methods: {
    saveEdit(){
      if(this.editArticle.title_ed != this.editArticle.title){
        alterArtTitle({
          passageId: this.editArticle.passageId,
          newTitle: this.editArticle.title_ed
        }).then(v=>{
           if(!v.code){
            console.log(v)
            ElMessage.success('标题修改成功')
           }
        })
      }
      if(this.editArticle.text_ed != this.editArticle.text){
        alterArtText({
          passageId: this.editArticle.passageId,
          newText: this.editArticle.text_ed
        }).then(v=>{
           if(!v.code){
            console.log(v)
            ElMessage.success('文章修改成功')
           }
        })
      }
      if(
        this.editArticle.title_ed == this.editArticle.title &&
        this.editArticle.text_ed == this.editArticle.text
      ){
        ElMessage.info('未发生改动')
      }else{
        setTimeout(() => {
          this.editArticle = false
          this.reload()
        }, 600);
      }
    },
    editArtiFn(i){
      i.text_ed = i.text
      i.title_ed = i.title
      this.editArticle=i
      console.log(i)
    },
    removeArti(){
      let arr = this.articleList.filter(v=>{
        return v.chosen
      }).map(v=>{
        return v.passageId
      })
      removeArticle(arr).then(v=>{
        console.log(v)
        if(!v.code){
          ElMessage.success('删除成功')
          this.reload()
          this.makesureOX = false
        }else{
          ElMessage.error(v.msg)
        }
      })
    },
    addArtiFn(){
      addArticle({
        courseId: this.selectValue,
        title: this.newArt_model.title,
        text: this.newArt_model.article,
      }).then(v=>{
        console.log(v)
        if(!v.code){
          this.reload()
          this.newArticle = false
          this.newArt_model.title = ''
          this.newArt_model.article = ''
        }else{
          ElMessage.error(v.msg)
        }
      })
    },
    chooseAll(){
      if(this.chosenAll){
        this.articleList.forEach(ele=>{
          ele.chosen = false
        })
      }else{
        this.articleList.forEach(ele=>{
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
          getArticle(this.selectValue).then(v=>{
            console.log(v)
            if(!v.code){
              this.articleList = v.data
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
  color: rgb(210,80,89);
}
.table-item{
  display: flex;
  width: 100%;
  height: 55px;
  align-items: center;
  padding: 0 0px;
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
  overflow: hidden;
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
.flex-4{
    flex: 4;
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
</style>