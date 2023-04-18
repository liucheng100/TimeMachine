<script setup>
import { ref, reactive, nextTick, onMounted, computed} from "vue"
import { useRouter } from "vue-router"
import { contesting } from "@/api/contest"
import { getUnExamined } from "@/api/examine"
let is_bottom = ref(false);
const isElementVisible = (el) => {
  const rect = el.getBoundingClientRect()
  const vWidth = window.innerWidth || document.documentElement.clientWidth
  const vHeight = window.innerHeight || document.documentElement.clientHeight

  
  if (
    rect.right < 0 ||
    rect.bottom < 0 ||
    rect.left > vWidth ||
    rect.top > vHeight
  ) {
    return false
  }
  
  return true
}

function setHeight(){
    if(isElementVisible(Bottom.value)){
        getUnExaminedNow();
        page++;
    }
}

function sayBottom(){
    if(!is_bottom.value){
        alert("到底啦!");
        is_bottom.value = true;
    }
}

async function getUnExaminedNow(){
    const contestInfo = await contesting();
    const contestId = contestInfo.data.contestId;
    getUnExamined({
        contestId:contestId,
        pageNum:page,
        pageSize:8
    })
    .then(res => {
        if(res.data.length == 0){
            sayBottom();
        }
        res.data.forEach(item => {
            item.ref = "0";
            item.is_multiply = false;
            item.is_choose = false;
            card_info.push(ref(item));
        });
    })
}

getUnExaminedNow();
let page = 0;
const router = useRouter();
const FloatPanel = ref();
const Bottom = ref();
const top_change = reactive({marginTop:0})
const background_button = reactive([false,false,false])
const card_info = reactive([]);
const multiplyInfo = ref(false);

onMounted(() => {
    top_change.marginTop = FloatPanel.value.offsetHeight + "px";
})

function multiply(){
    multiplyInfo.value = true;
    card_info.forEach(item => {
        item.value.is_multiply = !item.value.is_multiply;
    });

    nextTick(() => {
        top_change.marginTop = FloatPanel.value.offsetHeight + "px";
    })
}

function chooseMulti(index){
    for(let a = 0; a < background_button.length; a++){
        background_button[a] = false;
    }
    background_button[index] = true;
}

function send(){
    multiply();
    multiplyInfo.value = false;
}

function toRecycle(){
    router.push("/admin/RecycleBin");
}
</script>

<template>
    <div class="review-submissions" @scroll="setHeight($event)">
        <div class="float-panel" ref="FloatPanel">
            <p class="page-title">审核投稿</p>
            <img src="@/assets/trash.svg" class="icon-title" @click="toRecycle()"/>
            <img src="@/assets/checkSquare_.svg" class="icon-title" v-show="!multiplyInfo" @click="multiply()"/>
            <img src="@/assets/check.svg"  class="icon-title" v-show="multiplyInfo" @click="send()"/>
            <div class="multi-panel" v-show="multiplyInfo">
                <button class="multi-button" 
                :style="{background:(background_button[0]?'#4E46B4':'#444444')}" @click="chooseMulti(0)">通过</button>
                <button class="multi-button" 
                :style="{background:(background_button[1]?'#4E46B4':'#444444')}" @click="chooseMulti(1)">不通过</button>
                <button class="multi-button" 
                :style="{background:(background_button[2]?'#4E46B4':'#444444')}" @click="chooseMulti(2)">下载</button>
            </div>
        </div>

        <div class="all-works" :style="top_change">
            <WorkCard
            v-for="(item, index) in card_info"
            :ref="item.value.ref"
            :key="item.value.workId"
            :WorkName="item.value.workTitle"
            :contestGroup="item.value.contestGroup"
            :Status="item.value.isPass"
            :is_choose="item.value.is_choose"
            :ViewVolume="item.value.views"
            :is_multiply="item.value.is_multiply"
            :info="item.value"
            @multi="card_info[index].value.is_choose = !item.value.is_choose"
            />
        </div>
        <div class="bottom" ref="Bottom"></div>
    </div>

</template>

<style scoped>
.review-submissions{
    padding-left:20px;
    padding-right:20px;
}
.float-panel{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding-top:20px;
    align-items: center;
    background: #FFFFFF;
    padding-bottom:20px;
    position: fixed;
    top:0;
    left:0;
    z-index:100;
    width:100%;
    padding-left:20px;
    padding-right:20px;
}
.multi-panel{
    width:100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
.multi-button{
    width:28%;
    height:40px;
    margin-top:10px;
    font-size:18px;
    color:#FFFFFF;
    border-radius: 5px;
    border: 0;
}
.page-title{
    font-size:30px;
    font-weight: bold;
    width:75%;
}
.icon-title{
    height:28px;
}
.all-works{
    width:100%;
    display: flex;
    flex-wrap: wrap;
    align-items: space-around;
    justify-content: space-between;
    margin-top: 25%;
}
.bottom{
    height:5px;
}
</style>