<template>
  <div ref="branch" class="branch">
    <div class="box">
      <div class="mainBox">
        <div class="list list-title list-first">
          <div class="item flex-1 item-first">支部编号</div>
          <div class="item flex-3">支部名称</div>
          <div class="item flex-2">所属学院</div>
          <div class="item flex-1">支部类型</div>
          <div class="item flex-1">所属年级</div>
          <div class="item flex-2">创建时间</div>
        </div>
        <div class="list list-item">
          <div class="item flex-1 item-first">{{assets.partybranchId}}</div>
          <div class="item flex-3">{{assets.partybranchName}}</div>
          <div class="item flex-2">{{assets.collegeName}}</div>
          <div class="item flex-1">{{assets.partybranchType}}</div>
          <div class="item flex-1">{{parseInt(assets.partybranchSchoolyear) || '-'}}</div>
          <div class="item flex-2">{{timer(assets.partybranchEstablishtime)}}</div>
        </div>
        <div class="sheetBox">
          <div class="list list-first">
            <div class="item list-title flex-1 item-first">支部总人数</div>
            <div class="item list-item flex-1">{{assets.totalCount}}人</div>
          </div>
          <div class="list">
            <div class="item list-title flex-1 item-first">正式党员</div>
            <div class="item list-item flex-1">{{assets.regularCount}}人</div>
            <div class="item list-title flex-1">预备党员</div>
            <div class="item list-item flex-1">{{assets.prepareCount}}人</div>
          </div>
          <div class="list">
            <div class="item list-title flex-1 item-first">发展对象</div>
            <div class="item list-item flex-1">{{assets.developCount}}人</div>
            <div class="item list-title flex-1">积极分子+团推优</div>
            <div class="item list-item flex-1">{{assets.greatActiveCount}}人</div>
          </div>
          <div class="list">
            <div class="item list-title flex-1 item-first">积极分子</div>
            <div class="item list-item flex-1">{{assets.activeCount}}人</div>
            <div class="item list-title flex-1">团推优</div>
            <div class="item list-item flex-1">{{assets.greatCount}}人</div>
          </div>
          <div class="list">
            <div class="item list-title flex-1 item-first">
              申请人 + 非申请人
            </div>
            <div class="item list-item flex-1">{{assets.applicantCount}}人</div>
            <div class="item list-title flex-1"></div>
            <div class="item list-item flex-1"></div>
          </div>
          <div class="list">
            <div class="item list-title flex-1 item-first">支部书记</div>
            <div class="item list-item flex-1">{{assets.partybranchSecretary?assets.partybranchSecretary.username+` (${assets.partybranchSecretary.sno})`:'无'}}</div>
            <div class="item list-title flex-1">组织委员</div>
            <div class="item list-item flex-1">{{assets.partybranchOrganizer?assets.partybranchOrganizer.username+` (${assets.partybranchOrganizer.sno})`:'无'}}</div>
            <div class="item list-title flex-1">宣传委员</div>
            <div class="item list-item flex-1">{{assets.partybranchPropagator?assets.partybranchPropagator.username+` (${assets.partybranchPropagator.sno})`:'无'}}</div>
          </div>
          <div class="list">
            <div class="item list-title flex-1 item-first">支部干部操作</div>
            <div class="item list-item flex-3">
              <div class="btn1" @click="agentAdd(0)">
                {{assets.partybranchSecretary?'支部书记卸任':'支部书记添加'}}
                <VividClick></VividClick>
              </div>
              <div class="btn1" @click="agentAdd(1)">
                {{assets.partybranchOrganizer?'支部组委卸任':'支部组委添加'}}
                <VividClick></VividClick>
              </div>
              <div class="btn1" @click="agentAdd(2)">
                {{assets.partybranchPropagator?'支部宣传卸任':'支部宣传添加'}}
                <VividClick></VividClick>
              </div>
            </div>
          </div>
          <div class="list">
            <div class="item list-title flex-1 item-first">支部成员操作</div>
            <div class="item list-item flex-3">
              <div
                class="btn1"
                @click="
                  $router.push({
                    path: '/branch/memberControl',
                    query: {branchId: assets.partybranchId},
                  })
                "
              >
                成员管理
                <VividClick></VividClick>
              </div>
            </div>
          </div>
          <div class="list">
            <div class="item list-title flex-1 item-first">支部操作</div>
            <div class="item list-item flex-3">
              <div class="btn1" @click="delBranch">
                删除党支部
                <VividClick></VividClick>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <teleport to="body">
      <Popup_updatePerson :branchId="assets.partybranchId" :index="ident.index" @submit="submit" @destroy="popupOX = false" v-if="popupOX" />
    </teleport>
    <!-- mask -->
  </div>
</template>

<script>
import VividClick from "@/components/ljc/VividClick.vue";
import FullView from "@/components/ljc/FullView.vue";
import Popup_addBranch from "@/components/ljc/branch/Popup_addBranch.vue";
import Popup_updatePerson from "@/components/ljc/branch/Popup_updatePerson.vue";
import request from "@/utils/pub-use.ts";
import timer from "@/utils/time/time.ts";
import { getBranchInfo, update3Person, delBranch } from "@/api/branch.ts"
export default {
  components: {
    VividClick,
    FullView,
    Popup_addBranch,
    Popup_updatePerson,
  },
  data() {
    return {
      popupOX: false,
      ident:{
        index: '',
      },
      selectValue: {
        v_department: "1",
        v_grade: "1",
        v_type: "1",
      },
      selectOption: {
        op_department: [
          {
            value: "1",
            label: "全部",
          },
          {
            value: "2",
            label: "智算学院",
          },
          {
            value: "3",
            label: "说唱学院",
          },
        ],
        op_grade: [
          {
            value: "1",
            label: "全部",
          },
        ],
        op_type: [
          {
            value: "1",
            label: "全部",
          },
        ],
      },
      assets: '',
    };
  },
  methods: {
    delBranch(){
      delBranch(this.$route.query.branchId).then(v=>{
        console.log(v)
        if(v.data){
          ElMessage({
            message: '党支部删除成功',
            type: 'success',
          })
        }else{
          ElMessage({
            message: v.msg,
            type: 'error',
          })
        }
      })
    },
    submit(){
      getBranchInfo(parseInt(this.$route.query.branchId)).then(v=>{
        console.log(v)
        this.assets = v.data
      })
    },
    agentAdd(i){
      if(i === 0){
        if(this.assets.partybranchSecretary){
          update3Person({
            branchId: this.assets.partybranchId,
            index: i,
            newId: '', //为空为卸任
          }).then(v=>{
            if(!v.code){
              getBranchInfo(parseInt(this.$route.query.branchId)).then(v=>{
                console.log(v)
                this.assets = v.data
              })
            }
          })
        }else{
          this.ident.index = i
          this.popupOX = true
        }
      }else if(i === 1){
        if(this.assets.partybranchOrganizer){
          update3Person({
            branchId: this.assets.partybranchId,
            index: i,
            newId: '',
          }).then(v=>{
            if(!v.code){
              getBranchInfo(parseInt(this.$route.query.branchId)).then(v=>{
                console.log(v)
                this.assets = v.data
              })
            }
          })
        }else{
          this.ident.index = i
          this.popupOX = true
        }
      }else if(i === 2){
        if(this.assets.partybranchPropagator){
          update3Person({
            branchId: this.assets.partybranchId,
            index: i,
            newId: '',
          }).then(v=>{
            if(!v.code){
              getBranchInfo(parseInt(this.$route.query.branchId)).then(v=>{
                console.log(v)
                this.assets = v.data
              })
            }
          })
        }else{
          this.ident.index = i
          this.popupOX = true
        }
      }
    },
    timer(o){
      return timer(o)
    },
    openPopup() {
      this.popupOX = true;
      this.$refs.branch.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    },
    extendPop(o, i) {
      let dom = this.$refs["levelBox" + i][0];
      let popHeight = parseInt(getComputedStyle(dom).height);
      if (!!popHeight && !o.popHeight) {
        o.popHeight = popHeight;
      }
      o.OX = !o.OX;

      setTimeout(() => {
        dom.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 240);
    },
  },
  mounted(){
    getBranchInfo(parseInt(this.$route.query.branchId)).then(v=>{
      console.log(v)
      this.assets = v.data
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

  padding: 30px 0;
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
}
.selectCom {
  margin-right: 50px;
}
.selectCom > span {
  margin-right: 20px;
}
.flex-1 {
  flex: 1.1;
}
.flex-2 {
  flex: 2;
}
.flex-3 {
  flex: 2.8;
}
.flex-5 {
  flex: 5;
}
.mainBox {
  --borderColor: rgba(0, 0, 0, 0.2);
}
.sheetBox {
  margin-top: 40px;
}
.sheetBox .item {
  padding: 20px 0;
}
.list {
  display: flex;
  border: solid 1px var(--borderColor);
  border-top: 0;
}
.list-title {
  background-color: #fff;
}
.list-first {
  border-top: solid 1px var(--borderColor);
}
.list-item {
  background-color: rgba(0, 0, 0, 0.01);
}
.item {
  display: flex;
  justify-content: center;
  align-items: center;
  border-left: solid 1px var(--borderColor);
  padding: 10px 0;
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
</style>