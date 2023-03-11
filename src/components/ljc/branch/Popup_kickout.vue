<template>
  <teleport to="body">
    <div class="popup" @click="destroy($event)" :style="{backgroundColor: `rgba(0,0,0,${aniL.alph})`}">
      <div class="boat" :style="{transform: `translateY(${aniL.y})`, opacity: aniL.alph1}" @click.stop>
        <div class="box">
          <div class="item-title">
            将目标踢出{{branchId}}党支部
          </div>
          <div class="item-select warning">
            将对以下选中目标进行统一操作:
          </div>
          <div class="item-select wrapflex">
            <div v-for="i in number" class="snoItem">
              {{ i.name }} {{ i.sno }}
            </div>
          </div>
        </div>
        <div @click="destroy($event)" class="icon_down_box pointer noSelect">
          <div class="icon_down"></div>
          <VividClick></VividClick>
        </div>
        <div @click="submit" class="submitBox pointer noSelect">
          <div>
            踢出
          <VividClick></VividClick>
          </div>
        </div>
      </div>
      <transition name="ani1">
        <div @click.stop="mask_1OX=false" class="mask_1" v-if="mask_1OX">
          <div @click.stop="destroy_1();mask_1OX=false" class="sure pointer" :style="{top: mask_1.y+'px', left: mask_1.x+'px' }">
            <div class="icon_x"></div>
          </div>
        </div>
      </transition>
    </div>
  </teleport>
</template>

<script>
import VividClick from "@/components/ljc/VividClick.vue";
import ImgLoad from "@/components/ljc/ImgLoad.vue";
import { getUserInfo } from "@/api/user.ts"
import { getBranchlist, getCollegeList, pushArray } from "@/api/branch.ts"
export default{
  name: 'Popup_infoChange',
  emits:['submit','destroy'],
  props:{
    number:{
      required: true,
      type: Array,
    },
    branchId:{
      required: true,
      type: String,
    }
  },
  components: {
    VividClick,
    ImgLoad,
  },
  data(){
    return{
      multiSno: false,
      selectValue:{
        v_department: '',
        v_branch: '',
        v_sno: '',
      },
      n_name: '',
      n_depart: '',
      n_branch: '',
      selectOption:{
        op_department : [
          {
            value: '0',
            label: '环境学院',
          },
          {
            value: '1',
            label: '智算学院',
          },
          {
            value: '2',
            label: '说唱学院',
          },
        ],
        op_branch: [],
      },
      aniL:{
        alph : 0,
        y: '200px',
        alph1: 0,
      },
      mask_1OX: false,
      mask_1:{
        x: 0,
        y: 0,
      },
    }
  },
  methods:{
    catchNum(){
      getUserInfo(this.selectValue.v_sno).then(v=>{
        if(v.code==0){
          console.log(v)
          this.selectValue.n_name = v.data.uname
          this.n_depart = v.data.collegeName
          this.n_branch = v.data.partyBranchName
          
        }else{
          ElMessage(v.msg)
        }
      })
    },
    submit(){
      // console.log(this.selectValue.v_branch)
      pushArray({
        nameSnoList: this.number,
        targetBranchId: 0
      }).then(v=>{
        console.log(v)
        if(!v.code){
          ElMessage({message:'踢出成功',type:'success'})
          this.$emit('submit')
          this.destroy_1()
        }else{
          ElMessage({message: v.data+v.msg,type:'error'})
        }
      })
    },
    trigger(ref){
      // console.log(this.$refs.trigger1[0])
      // this.$refs[ref].select()
      if(ref==='trigger4'){
        this.$refs[ref].select()
      }else{
        document.getElementById(ref).click()
      }
      

    },
    destroy(e){
      if(!this.selectValue.v_department && !this.selectValue.v_grade && !this.selectValue.v_type && !this.selectValue.v_childName){
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
      this.aniL.y = '200px'
      setTimeout(() => {
        this.$emit('destroy')
      }, 600);
    },
    getBranch(){
      getBranchlist({
        collegeId: this.selectValue.v_department
      }).then(v=>{
        console.log(v)
        this.selectOption.op_branch = v.data[0].list.map(y=>{
          return {
            value: y.partybranchId,
            label: y.partybranchName,
          }
        })
      })
    }

  },
  mounted(){
    console.log(this.number.length)
    if(this.number.length==1){
      this.selectValue.v_sno = this.number[0].sno
      this.catchNum()
    }else if(this.number.length==0){

    }else{
      this.multiSno = true
    }
    setTimeout(() => {
      this.aniL.alph = 0.4
      this.aniL.alph1 = 1
      this.aniL.y = 0
    }, 0);

    getCollegeList().then(v=>{
      console.log(v)
      this.selectOption.op_department = v.data.map(y=>{
        return {
          value: y.code,
          label: y.shortName,
        }
      })
    })
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
  transition: .3s;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.boat{
  position: absolute;
  height: 82%;
  width: 58%;
  max-height: 900px;
  border-radius: 20px;
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
  font-size: 18px;
}
.item-title{
  padding-left: 22px;
  font-size: 24px;
  color: rgba(0, 0, 0, .3);
  margin-bottom: 30px;
}
.item-select{
  display: flex;
  align-items: center;
  margin-bottom: 18px;
  transition: .12s;
  padding: 8px 18px;
}
.item-select:hover{
  background-color: rgba(0, 0, 0, .02);
}
.item-select>span{
  color: rgba(0, 0, 0, .76);
  margin-right: 30px;
  width: 80px;
  display: flex;
  flex-direction: row-reverse;
  white-space: nowrap;
}
.item-select>.elinput{
  width: 224px;
  width: 500px;
}
.mainName{
  height: 40px;
  display: flex;
  align-items: center;
  padding-left: 10px;
  overflow: hidden;
}
.itemName{
  /* margin-right: 2px; */
  transition: .2s;
  border-radius: 6px;
  white-space: nowrap;
  /* text-overflow: ellipsis; */
  /* overflow: hidden; */
}
.itemName:hover{
  padding: 10px 0;
  color: rgba(199,36,48, 1);
  background-color: rgba(255, 255, 255, .7);
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

.submitBox{
  position: absolute;
  overflow: hidden;
  left: 50%;
  /* top: 0; */
  bottom: 48px;
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
.warning{
  color: rgba(228,72,80,.9);
}
.snoItem{
  color: rgb(228,72,80);
  padding: 4px 10px;
  text-decoration: underline;
  border-radius: 6px;
}
.snoItem:hover{
  background-color: rgba(0,0,0,.05);
}
.wrapflex{
  flex-wrap: wrap;
}
</style>