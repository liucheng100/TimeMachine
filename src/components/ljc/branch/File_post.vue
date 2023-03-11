<template>
  <teleport to="body">
    <div class="main" @dragenter="dragenter=true" @dragleave.stop="dragleaveFn" @dragover.prevent.stop @drop.prevent="dropFn">
      <div class="Popbox">
        <div @click="$emit('destroy')" class="closeBtn">
          <el-icon><Close /></el-icon>
        </div>
        <div class="title">
          批量导入成员
        </div>
        <div class="Top-progress-bar">
          <div class="Top-progress-box">
            <div :class="{'progress-title':true, 'progress-title-active':progressStep==0 }">
              ①上传文件
            </div>
            <div class="progress-line"></div>
            <div :class="{'progress-title':true, 'progress-title-active':progressStep==1 }">
              ②编辑数据
            </div>
            <div class="progress-line"></div>
            <div :class="{'progress-title':true, 'progress-title-active':progressStep==2 }">
              ③上传成功
            </div>
          </div>
        </div>
        <div class="Mid-main-box">
          <div v-if="progressStep==0" class="step1-box">
            <div @click="chooseFile" :class="{'upload-btn':true, 'upload-btn-drag': dragenter}">
              <div class="icon_upload">
                <el-icon><Upload /></el-icon>
              </div>
              <div class="FileLoad">
                <div v-if="!dragenter">上传文件</div>
                <div v-else>释放上传文件</div>
                <div class="tip">
                  请拖拽或点击此处上传execel文件
                </div>
              </div>
            </div>
            <a @click="toExport" href="javascript:void(0);" class="modelDownload">下载模板</a>
          </div>
          <div v-if="progressStep==1" class="step2-box">
            <div class="tableBox">
              <el-table :data="file_data" border empty-text="暂无数据" ref="multipleTableRef"
                  @selection-change="handleSelectionChange" style="width: 100%; margin-top: 40px;">
                  <el-table-column :resizable="false" min-width="30px" type="selection" align="center" />
                  <el-table-column prop="name" label="姓名" sortable />
                  <el-table-column prop="sno" label="学号" />
              </el-table>
            </div>
            <transition name="aniScroll">
              <div v-if="errorText" class="errorText">
                <div>
                  <div>{{errorText}}</div>
                  <div @click="errorText=''" class="closelit">
                    <el-icon><CloseBold /></el-icon>
                  </div>
                </div>
              </div>
            </transition>
          </div>
          <div v-if="progressStep==2" class="step3-box">
            <div class="info">
              成功添加以下成员进入该党支部
            </div>
            <div class="tableBox">
              <el-table :data="multipleSelection" border empty-text="暂无数据"
                  style="width: 100%; margin-top: 40px;">
                  <el-table-column prop="name" label="姓名" sortable />
                  <el-table-column prop="sno" label="学号" />
              </el-table>
            </div>
          </div>
        </div>
        <div class="Bot-btn-bar">
          <div v-if="progressStep==1" @click="progressStep=0" :class="{'back-btn':true, 'next-btn-forbid':false}" tabindex="0">上一步</div>
          <div v-if="progressStep==0" @click="progressStep=!!file_data.length?1:0" :class="{'next-btn':true, 'next-btn-forbid':!file_data.length}" tabindex="0">下一步</div>
          <div v-if="progressStep==1" @click="upload" :class="{'next-btn':true, 'next-btn-forbid':false}" tabindex="0">下一步</div>
          <div @click="$emit('destroy')" v-if="progressStep==2" :class="{'next-btn':true, 'next-btn-forbid':false}" tabindex="0">完成</div>
        </div>
        
      </div>
    </div>
  </teleport>
</template>
<!-- 父元素要有relative -->
<script>
import getAssetsFile from "@/utils/pub-use";
import {loadFile, pushArray} from "@/api/branch.ts"
import {downloadFile} from "@/api/file.ts"
export default {
  name: 'File_post',
  emits: ['destroy','submit'],
  props:{
    branchId:{
      required: true,
      type: String,
    },
  },
  data(){
    return{
      progressStep: 0,
      file_data: [],
      multipleSelection: [],
      errorText: '',
      loadOX: false,
      tipOX: false,
      dragenter: false,
      
    }
  },
  methods: {
    toExport() {
      downloadFile({
        type: 'DOCUMENT',
        name: '1670063701342%E6%A8%A1%E7%89%88.xlsx'
      }).then((res) => {
        let result = res;
        let blob = new Blob([result], { type: "application/vnd.ms-excel" });
        let url = window.URL.createObjectURL(blob);
        let link = document.createElement("a");
        link.download = "批量导入成员模板.xlsx";
        link.href = url;
        link.click();
      });
    },
    upload(){
      pushArray({
          nameSnoList: this.multipleSelection,
          targetBranchId: this.branchId,
      }).then(v=>{
        console.log(v)
        if(!v.code){
          this.progressStep = 2
          this.$emit('submit')
        }else{
          this.errorText = v.msg +': '+ v.data
        }
      })
    },
    handleSelectionChange(val) {
        this.multipleSelection = val
        console.log(this.multipleSelection)
    },
    dragleaveFn(e){
      // console.log(e.target.className)
      if(e.target.className=='main' && !e.relatedTarget){
        this.dragenter=false
        // console.log(e)
      }
    },
    dropFn(e){
      this.dragenter = false
      if(this.progressStep!=0) return;
      let formData = new FormData();
      formData.append('file', e.dataTransfer.files[0])
      // console.log(formData, newFile)
      this.errorText = ''
      loadFile(formData).then(v=>{
        console.log(v)
        if(v.data){
          this.file_data = v.data
          this.progressStep = 1
          this.$nextTick(()=>{
            this.$refs.multipleTableRef.toggleAllSelection()
          })
        }else{
          ElMessage(v.msg)
        }
        
      })
    },
    chooseFile(){
      let input = document.createElement('input')
      input.setAttribute('type','file')
      input.setAttribute('accept',".xlsx,")
      input.click()
      input.onchange = (e)=>{
        console.log('e.target:  ',e.target)
        let file = e.target.files[0]
        let formData = new FormData();
        // let newFile = new window.File([file], file.name.slice(0,9), {type: file.type})
        formData.append('file', file)
        // console.log(formData, newFile)
        this.errorText = ''
        loadFile(formData).then(v=>{
          console.log(v)
          if(v.data){
            this.file_data = v.data
            this.progressStep = 1
            this.$nextTick(()=>{
              this.$refs.multipleTableRef.toggleAllSelection()
            })
          }else{
            ElMessage(v.msg)
          }
          
        })
      }
    },
  },
  mounted(){
    if(this.src_from){
      this.ani1 = {
        r: 0,
        alph: 0,
        alph1: 1,
      }
      let per = (this.$refs.img.naturalWidth/this.$refs.img.naturalHeight)
      this.ani1.height = 23
      this.ani1.width = this.ani1.height*per
    }
  }
};
</script>

<style scoped>
.main{
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  height: 100%;
  width: 100%;
  background-color: rgba(0,0,0,0.2);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  overflow: overlay;
}
.Popbox{
  border-radius: 8px;
  margin-top: 60px;
  margin-bottom: 60px;
  min-height: 80%;
  width: 74%;
  background-color: white;
  position: relative;
  padding: 20px;
}
.closeBtn{
  padding: 6px;
  top: 26px;
  right: 30px;
  position: absolute;
  z-index: 9;
  font-size: 36px;
  cursor: pointer;
  color: rgba(0, 0, 0, .4);
}
.title{
  font-size: 20px;
  margin: 20px 0 0 20px;
}
.Top-progress-bar{
  height: 80px;
  width: 100%;
  display: flex;
  justify-content: center;
}
.Top-progress-box{
  display: flex;
  align-items: center;
}
.progress-title{
  font-size: 20px;
  font-weight: bold;
  color: rgba(0,0,0,0.42);
}
.progress-title-active{
  color: rgba(242,64,76);
}
.progress-line{
  margin: 0 20px;
  width: 40px;
  height: 1px;
  background-color: rgba(0, 0, 0, .14);
}
.Mid-main-box{
}
.Bot-btn-bar{
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.next-btn,.back-btn{
  padding: 10px 30px;
  color: white;
  cursor: pointer;
  border-radius: 6px;
  background-color: rgb(242,64,76);
  user-select: none;
}
.back-btn{
  margin-right: 140px;
}
.next-btn:hover{
  background-color: rgba(242,64,76,0.92);
}
.next-btn:active{
  background-color: rgba(242,64,76,0.8);
}
.next-btn-forbid{
  padding: 10px 30px;
  color: white;
  cursor: not-allowed;
  border-radius: 6px;
  background-color: rgb(242,64,76);
  opacity: .55;
  user-select: none;
}
.step1-box{
  height: 560px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
}
.upload-btn{
  display: flex;
  align-items: center;
  border: dashed 3px rgb(248,150,157);
  cursor: pointer;
  padding: 13px 54px;
  user-select: none;
  transition: color .14s, transform .3s;
}
.upload-btn:hover{
  color: rgb(229,78,86);
  background-color: #fffcfc;
  border: solid 3px rgb(255, 127, 140, .2);
}

.upload-btn-drag{
  color: rgb(229,78,86);
  background-color: #fffcfc;
  border: solid 3px rgb(255, 127, 140, .2);
}
.modelDownload{
  position: absolute;
  bottom: 60px;
  right: 70px;
  color: rgb(242,64,76);
  font-size: 20px;
  /* cursor: pointer; */
  /* user-select: none; */
}
.icon_upload{
  font-size: 56px;
  opacity: .35;
  margin-right: 12px;
  transform: translateY(7px);
}
.FileLoad{
  position: relative;
  font-size: 22px;
  /* transition: .4s; */
  overflow: hidden;
}
.tip{
  font-size: 17px;
  opacity: .55;
}
.step2-box{
  min-height: 560px;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  position: relative;
}
.tableBox{
  padding: 0 32px;
  width: 100%;
  max-height: 550px;
  overflow: overlay;
}
.errorText{
  margin-top: 20px;
  overflow: hidden;
}
.errorText>div{
  display: flex;
  align-items: center;
  padding: 10px 20px;
  border-radius: 6px;
  color: white;
  background-color: rgb(234, 29, 43);
}
.closelit{
  transform: translateY(2px);
  margin-left: 12px;
  cursor: pointer;
}
.aniScroll-enter-active,
.aniScroll-leave-active {
    transition: all .4s;
}

.aniScroll-enter-from,
.aniScroll-leave-to {
    opacity: 0;
    height: 0;
    margin-top: 0px;
    /* transform: rotate3d(0,0,1,60deg); */
}

.aniScroll-enter-to,
.aniScroll-leave-from {
    opacity: 1;
    height: 44px;
    margin-top: 20px;
    /* transform: rotate3d(0,0,0,0deg); */
}
.step3-box{
  height: 560px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.info{
  margin-top: 30px;
  margin-bottom: 10px;
  color: rgba(100,206,100, 1);
  font-size: 20px;
}
</style>