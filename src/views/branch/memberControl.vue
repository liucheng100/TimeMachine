<template>
  <div ref="branch" class="branch">
    <div class="box">
      <div class="title">
        <div class="title-1 btn1" @click="$router.push({
          path: '/branch/memberView',
          query: {branchId: $route.query.branchId}
        })">
          {{branchInfo.partybranchName}}
          <!-- <VividClick></VividClick> -->
        </div>
        <div class="title-2 noSelect">></div>
        <div class="title-3">成员列表</div>
      </div>
      <div class="toolBar">
        <div class="leftFlex">
          <div class="elinput">
            <el-input
              ref="trigger4"
              v-model="selectValue.v_childName"
              size="large"
              placeholder="搜索并筛选"

              @input="filter"
            />
          </div>
          <div class="selectCom">
            <span>人员类型</span>
            <el-select
              v-model="selectValue.v_department"
              class="m-2"
              placeholder="Select"
              size="large"
              
              @change="filter"
            >
              <el-option
                v-for="item in selectOption.op_department"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
        </div>
        <div class="rightFlex">
          <div class="btn2 margin-right" @click="popupOX_addPerson=true">
            <div>成员添加</div>
            <VividClick></VividClick>
          </div>
          <div class="btn2" @click="popupOX_Filepost=true">
            <div>导入成员名单</div>
            <VividClick></VividClick>
          </div>
        </div>
      </div>
      <div class="controlBar">
        <div @click="openPopup" class="btn3 noSelect pointer margin-right">
          学生信息变更
          <VividClick></VividClick>
        </div>
        <div @click="kickout" class="btn4 noSelect pointer">
          将选中成员踢出该支部
          <VividClick></VividClick>
        </div>
      </div>
      <div class="mainBox">
        <div class="list list-title list-first">
          <div class="item flex-1 item-first">
            <el-checkbox
             v-model="checkAll"
             size="large"
             :indeterminate="isIndeterminate"
             @change="handleCheckAllChange"
             ></el-checkbox>
          </div>
          <div class="item flex-2">姓名</div>
          <div class="item flex-2">学号</div>
          <div class="item flex-3">专业</div>
          <div class="item flex-2">年级</div>
        </div>
        <div v-for="(o, i) in assets" v-show="!o.filter" :key="o.id">
          <div
            :class="{
              list: true,
              'list-item': true,
              'list-item-selected': o.OX,
            }"
            @click="chooseItem(o)"
          >
            <div class="item flex-1 item-first">
              <el-checkbox @change="handleCheckedCitiesChange" @click.stop v-model="o.OX" :key="o.id" size="large"></el-checkbox>
            </div>
            <div class="item flex-2">{{o.username}}</div>
            <div class="item flex-2">{{o.usernumb}}</div>
            <div class="item flex-3">{{o.majorname || '-'}}</div>
            <div class="item flex-2">{{o.grade || '-'}}</div>
          </div>
        </div>
      </div>
    </div>
    <Popup_kickout :branchId="$route.query.branchId" :number="number" @submit="reload" @destroy="popupOX_kick = false" v-if="popupOX_kick" />
    <Popup_infoChange :number="number" @submit="reload" @destroy="popupOX = false" v-if="popupOX" />
    <Popup_addPerson :branchId="$route.query.branchId" @submit="reload" @destroy="popupOX_addPerson = false" v-if="popupOX_addPerson" />
    <File_post :branchId="$route.query.branchId" @submit="reload" @destroy="popupOX_Filepost = false" v-if="popupOX_Filepost" />
    <!-- mask -->
  </div>
</template>

<script>
import VividClick from "@/components/ljc/VividClick.vue";
import FullView from "@/components/ljc/FullView.vue";
import Popup_infoChange from "@/components/ljc/branch/Popup_infoChange.vue";
import Popup_kickout from "@/components/ljc/branch/Popup_kickout.vue";
import Popup_addPerson from "@/components/ljc/branch/Popup_addPerson.vue";
import File_post from "@/components/ljc/branch/File_post.vue";
import request from "@/utils/pub-use.ts";
import { getBranchMember, getBranchInfo } from "@/api/branch.ts"
export default {
  components: {
    VividClick,
    FullView,
    Popup_infoChange,
    Popup_addPerson,
    File_post,
  },
  data() {
    return {
      isIndeterminate: false,
      checkAll: false,
      popupOX: false,
      popupOX_kick: false,
      popupOX_addPerson: false,
      popupOX_Filepost:false,
      number: '',
      selectValue: {
        v_department: "all",
        v_childName: ""
      },
      selectOption: {
        op_department: [
          {
            value: "all",
            label: "全部",
          },
          {
            value: "0",
            label: "申请人和非申请人",
          },
          {
            value: "1",
            label: "积极分子",
          },
          {
            value: "2",
            label: "团支部推优",
          },
          {
            value: "23",
            label: "积极分子+团支部推优",
          },
          {
            value: "3",
            label: "发展对象",
          },
          {
            value: "10",
            label: "预备党员",
          },
          {
            value: "15",
            label: "正式党员",
          },
        ],
      },
      assets: [
        { OX: false, filter: false },
        { OX: false },
        { OX: false },
        { OX: false },
        { OX: false },
      ],
      branchInfo: {},
    };
  },
  methods: {
    handleCheckedCitiesChange(v){
      let sum = 0;
      this.assets.forEach(o=>{
        if(o.OX) sum++;
      })
      if(sum == this.assets.length){
        this.isIndeterminate = false
        this.checkAll = true
      }else if(sum == 0){
        this.isIndeterminate = false
        this.checkAll = false
      }else{
        this.isIndeterminate = true
        this.checkAll = false
      }
    },
    handleCheckAllChange(val){
      this.isIndeterminate = false
      if(val){
        this.assets.forEach(o=>{
          o.OX = true
        })
      }else{
        this.assets.forEach(o=>{
          o.OX = false
        })
      }
    },
    filter(){
      setTimeout(() => {
        // seleter
        this.assets.forEach(o => {
          if(this.selectValue.v_department=='all'){
            o.filter = false
          }else if(o.state==this.selectValue.v_department){
            o.filter = false
          }else{
            o.filter = true
          }
        });
        // input
        let model_string = ['username','usernumb','majorname','grade',]
        this.assets.forEach(m => {
          let target_list = this.selectValue.v_childName.split(' ')
          let ox = true
          target_list.forEach(t=>{
            let oxx = false
            // model_string各项判断
            for(let i=0;i<model_string.length;i++){
              if(m[model_string[i]] === null){
                m[model_string[i]] = ''
              }
              // let pinyinOX = pinyin(m[model_string[i]].toString(), { toneType: 'none' }).replace(/ /g,'').match(t)
              if(m[model_string[i]].toString().match(t) || false){
                oxx = true
                break
              }
            }
            if(!oxx){
              ox = false
            }
          })
          if(!ox){
            m.filter = true
          }
        });
      }, 0);
    },
    chooseItem(o) {
      o.OX = !o.OX;
      this.handleCheckedCitiesChange()
    },
    kickout(){
      let numlist = []
      this.assets.forEach(o=>{
        if(o.OX){
          numlist.push({
            sno: o.usernumb,
            name: o.username
          })
        }
      })
      if(!numlist.length) return;
      console.log(numlist)
      this.number = numlist
      this.popupOX_kick = true;
    },
    openPopup() {
      let numlist = []
      this.assets.forEach(o=>{
        if(o.OX){
          numlist.push({
            sno: o.usernumb,
            name: o.username
          })
        }
      })
      console.log(numlist)
      this.number = numlist
      // this.number = this.assets[i].usernumb
      this.popupOX = true;
      this.$refs.branch.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    },
    reload(){
      getBranchMember(parseInt(this.$route.query.branchId)).then(v=>{
        console.log(v)
        this.assets = v.data
      })
    }
  },
  mounted(){
    getBranchMember(parseInt(this.$route.query.branchId)).then(v=>{
      console.log(v)
      this.assets = v.data
    })
    getBranchInfo(parseInt(this.$route.query.branchId)).then(v=>{
      console.log(v)
      this.branchInfo = v.data || {}
    })

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
  height: 100%;
  position: relative;
}
.box {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  /* padding: 30px 0; */
  display: flex;
  flex-direction: column;
  overflow: overlay;
}
.title {
  padding: 30px 0;
  font-size: 20px;
  color: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
}
.title > .title-1 {
  color: rgba(0, 0, 0, 0.4);
  text-decoration: none;
  padding: 6px 10px;
  user-select: unset;
  cursor: unset;
}
.title-2 {
  margin-right: 8px;
}
.toolBar {
  height: 50px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.leftFlex,
.rightFlex {
  display: flex;
}
.elinput {
  width: 300px;
  margin-right: 40px;
}
.selectCom {
  margin-right: 50px;
}
.selectCom > span {
  margin-right: 20px;
  color: rgba(0, 0, 0, 0.5);
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
.flex-5 {
  flex: 5;
}
.mainBox {
  --borderColor: rgba(0, 0, 0, 0.2);
}
.list {
  display: flex;
  background-color: #fff;
  border: solid 1px var(--borderColor);
  border-top: 0;
}
.list-first {
  border-top: solid 1px var(--borderColor);
}
.list-item {
  background-color: rgba(0, 0, 0, 0.01);
  transition: 0.2s;
}
.item {
  display: flex;
  justify-content: center;
  align-items: center;
  border-left: solid 1px var(--borderColor);
  padding: 10px 0;
}
.list-item:hover {
  filter: brightness(1.2);
  background-color: rgba(50, 0, 50, 0.04);
}
.list-item-selected {
  background-color: rgba(180, 0, 0, 0.04);
}
.item-first {
  border-left: 0;
}
.chosenCard {
  user-select: none;
  cursor: pointer;
  height: 40px;
  width: 50px;
  /* color: white; */
  transition: 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  color: rgba(199, 36, 48, 0.7);
  background-color: rgba(228, 72, 80, 0.06);
  white-space: nowrap;
}
.chosenCard-selected {
  width: 80px;
  color: white;
  background-color: rgba(228, 72, 80, 0.6);
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
  margin-right: 40px;
}
.controlBar {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}
.btn3 {
  background-color: #3b9dff;
  color: white;
  border-radius: 8px;
  padding: 6px 18px;
  transition: 0.4s;
  position: relative;
}
.btn3:hover {
  background-color: #3b89ff;
}
.btn4 {
  background-color: rgb(222, 0, 0);
  border-radius: 8px;
  color: white;
  padding: 6px 18px;
  transition: 0.4s;
  position: relative;
}
.btn4:hover {
  background-color: rgb(222, 0, 0);
}
</style>