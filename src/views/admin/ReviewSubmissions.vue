<script setup>
import { ref, reactive, nextTick, onMounted } from "vue"
import { useRouter } from "vue-router"
import { contesting } from "@/api/contest"
import { concatSrc, getFile } from "@/api/file"
import { getUnExamined, pass, unPass } from "@/api/examine"
import JSZip from "JSZip"
import { saveAs } from "file-saver"

let page = ref(1);
let if_send  = false;
const router = useRouter();
const FloatPanel = ref();
const Bottom = ref();
const top_change = reactive({marginTop:0})
const background_button = reactive([false,false,false])
const card_info = reactive([]);
const multiplyInfo = ref(false);
const ON = ref(false);
const work_id = ref(0);

const isElementVisible = (el) => {
  const rect = el.getBoundingClientRect()
  const vWidth = window.innerWidth || document.documentElement.clientWidth
  const vHeight = window.innerHeight || document.documentElement.clientHeight
  if (
    rect.right < 0 ||
    rect.bottom < 0 ||
    rect.left > vWidth ||
    rect.top > vHeight
  ) {return false}
  return true
}

function setHeight(){
    if(isElementVisible(Bottom.value) && !if_send){
        if_send = true;
        getUnExaminedNow();
    }
}

async function getUnExaminedNow(){
    const contestInfo = await contesting();
    const contestId = contestInfo.data.contestId;
    getUnExamined({
        contestId:contestId,
        pageNum:page.value,
        pageSize:8
    })
    .then(res => {
        if(res.data.length == 0)return;

        page.value++;
        if_send = false;
        
        res.data.forEach(item => {

            if(multiplyInfo.value)item.is_multiply = true;
            else item.is_multiply = false;

            item.ref = "0";
            item.is_choose = false;

            card_info.push(ref(item));
        });
    })
}
onMounted(() => {
    top_change.marginTop = FloatPanel.value.offsetHeight + "px";
    getUnExaminedNow()
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
    if(background_button.indexOf(true) != -1){
        let x = [];
        switch(background_button.indexOf(true)){
            case 0:{
                card_info.forEach((item) => {
                    if(item.value.is_choose)x.push(item.value.workId)
                })
                pass(x)
                .then(res => console.log(res))
                .then(location.reload());
                break;
            }
            case 1:{
                card_info.forEach((item) => {
                    if(item.value.is_choose)x.push(item.value.workId)
                })
                unPass(x)
                .then(res => console.log(res))
                .then(location.reload());
                break;
            }
            case 2:{
                downloadMulti();
                break;
            }
            default:
        }
    }
    multiply();
    multiplyInfo.value = false;
}

function unPassSingleWork(){
    unPass([work_id.value])
    .then(res => location.reload())
}

function toRecycle(){
    router.push("/admin/RecycleBin");
}

function downloadMulti(){   
	const zip = new JSZip();
    const img = zip.folder("images");
    const promiseAll = [];
    const nameAll = [];
    card_info.forEach((item) => {
        if(item.value.is_choose){
            promiseAll.push(getFile(item.value.coverFile));
            nameAll.push(item.value.workTitle)
        }
    })
    Promise.all(promiseAll)
    .then(res => {
        res.forEach((item, index) => {
        img.file(`${nameAll[index]}.jpeg`, item, {base64: true});
        })
    zip.generateAsync({type:"blob"})
    .then((res) => saveAs(res, "作品集.zip"))
    })
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
            :src="item.value.coverFile"
            @multi="card_info[index].value.is_choose = !item.value.is_choose"
            @cut="ON = true, work_id = item.value.workId"
            />
        </div>
        <div class="bottom" ref="Bottom"></div>

        <Pop :ON="ON" :model="0" title="确认要删除作品吗?" tip="请确认信息无误" :options="{ black: '', grey: '取消', blue: '删除' }"
            @blackClick="0" @greyClick="ON = false" @blueClick="unPassSingleWork()">
        </Pop>
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