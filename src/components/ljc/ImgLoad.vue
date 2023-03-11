<template>
  <div class="ImgLoad" :style="{height: ani1.height+'rem', width: ani1.width+'rem'}">
    <transition name="ani1">
      <div  v-if="!src" class="icon_add_box noSelect" @click="chooseFile">
        <div class="icon_add"></div>
        <div class="text noSelect">点击或将图片拖拽至此处上传</div>
        <VividClick />
      </div>
    </transition>
    <transition name="ani1">
      <div class="imgBox" v-if="src" @click="chooseFile">
        <img class="noSelect" draggable="false" @mouseenter="mouseenter" @mouseleave="mouseleave" ref="img" :src="src" alt="" :style="{opacity: ani1.alph1}">
        <div class="loading noSelect" @click.stop v-if="loadOX">
          <div class="cir" :style="{border: `solid ${ani1.r}px rgba(0,0,0,.3)`}"></div>
          <div class="text" :style="{opacity: ani1.alph}">
            上 传 中
          </div>
        </div>
        <transition name="ani1">
          <div class="tip noSelect" v-if="tipOX">
            点击或拖拽更换图片
          </div>
        </transition>
      </div>
    </transition>
  </div>
</template>
<!-- 父元素要有relative -->
<script>
import getAssetsFile from "@/utils/pub-use";
import {uploadFile} from "@/api/file.ts"
export default {
  name: 'ImgLoad',
  props:{
    src_from:{
      required: false,
      type: String,
      default: '',
    },
  },
  data(){
    return{
      src: (process.env.NODE_ENV === 'development' && this.src_from)? 'http://101.42.225.75:1234'+this.src_from:this.src_from,
      loadOX: false,
      tipOX: false,
      ani1:{
        r: 400,
        alph: .64,
        alph1: .4,
        width: 32,
        height: 20,
      }
    }
  },
  methods: {
    passFile(file){
      let blob = window.URL.createObjectURL(file)
      console.log(blob)
      this.src = blob
      // 模拟上传
      this.loadOX = true
      this.tipOX = false
      this.ani1.r = 400
      this.ani1.alph = .64
      this.ani1.alph1 = .4
      this.ani1.width = 32
      this.ani1.height = 20
      
      let formData = new FormData();
      let newFile = new window.File([file], file.name.slice(0,9), {type: file.type})
      formData.append('file', newFile)
      // console.log(formData, newFile)
      uploadFile(formData).then(v=>{
        console.log(v)
        if(v.code==0){
          this.$emit('passVar_src', '/d/'+v.data)
          let image = new Image()
          if(process.env.NODE_ENV === 'development'){
            image.src = 'http://101.42.225.75:1234'+'/d/'+v.data
          }else{
            image.src = '/d/'+v.data
          }
          image.onload = ()=>{
            if(process.env.NODE_ENV === 'development'){
              this.src = 'http://101.42.225.75:1234'+'/d/'+v.data
            }else{
              this.src = '/d/'+v.data
            }
          }
          this.ani1.r = 0
          this.ani1.alph = 0
          this.ani1.alph1 = 1

          let per = (this.$refs.img.naturalWidth/this.$refs.img.naturalHeight)
          this.ani1.height = 23
          this.ani1.width = this.ani1.height*per
          setTimeout(() => {
            this.loadOX = false
          }, 400);
        }
      })
    },
    mouseenter(){
      this.tipOX = true
    },
    mouseleave(){
      this.tipOX = false
    },
    chooseFile(){
      let input = document.createElement('input')
      input.setAttribute('type','file')
      input.setAttribute('accept',"image/jpg,image/png,image/gif,image/jpeg,")
      input.click()
      input.onchange = (e)=>{
        console.log('e.target:  ',e.target)
        let file = e.target.files[0]
        let blob = window.URL.createObjectURL(file)
        console.log(blob)
        this.src = blob
        // 模拟上传
        this.loadOX = true
        this.tipOX = false
        this.ani1.r = 400
        this.ani1.alph = .64
        this.ani1.alph1 = .4
        this.ani1.width = 32
        this.ani1.height = 20

        let formData = new FormData();
        formData.append('file', file)
        // console.log(formData, file)
        uploadFile(formData).then(v=>{
          console.log(v)
          if(v.code==0){
            this.$emit('passVar_src', '/d/'+v.data)
            let image = new Image()
            if(process.env.NODE_ENV === 'development'){
              image.src = 'http://101.42.225.75:1234'+'/d/'+v.data
            }else{
              image.src = '/d/'+v.data
            }
            image.onload = ()=>{
              if(process.env.NODE_ENV === 'development'){
                this.src = 'http://101.42.225.75:1234'+'/d/'+v.data
              }else{
                this.src = '/d/'+v.data
              }
            }
            this.ani1.r = 0
            this.ani1.alph = 0
            this.ani1.alph1 = 1

            let per = (this.$refs.img.naturalWidth/this.$refs.img.naturalHeight)
            this.ani1.height = 23
            this.ani1.width = this.ani1.height*per
            setTimeout(() => {
              this.loadOX = false
            }, 400);
          }
        })
      }
    }
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

.ImgLoad{
  position: relative;
  width: 400px;
  height: 240px;
  cursor: pointer;
  border-radius: 10px;
  /* background-color: rgba(200,200,200,.2); */
  background-color: rgba(255,255,255,1);
  border: dotted 1px rgba(0,0,0,0.3);
  box-shadow: 0px 0px 3px rgba(0,0,0,0.09);
  transition: .4s;
  overflow: hidden;
}
.ImgLoad:hover{
  background-color: rgba(0, 0, 0, .05);
}
.icon_add_box{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.icon_add{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: .6;
  background: url('@/assets/homepage/add.svg') center center / 10% no-repeat;
}
.icon_add_box>.text{
  position: absolute;
  bottom: 6px;
  right: 6px;
  opacity: .4;
}
.imgBox{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
}

.imgBox>img{
  height: 100%;
  width: 100%;
  object-fit: cover;
  
  /* opacity: 0.4; */
  transition: 1s;
}
.loading{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.cir{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  height: 800px;
  width: 800px;
  border-radius: 50%;
  /* border: solid 400px rgba(0, 0, 0, 0.3); */
  transition: .8s;
  /* background-color: rgba(0, 0, 0, .3); */
}
.loading>.text{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  color: white;
  font-size: 22px;
  /* opacity: .64; */
  user-select: none;
  transition: .4s;
}
.imgBox>.tip{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0,0,0,.7);
  font-size: 20px;
  color: white;
  pointer-events: none;
  white-space: nowrap;
}

</style>