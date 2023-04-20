<template>
    <div class="advertise">
        <div class="left">
            <img src="../../assets/bookmark.svg" class="icon"/>
            <p class="info">{{ contestData.title }}</p>
        </div>
        <div class="right" v-show="if_token">
            <img src="../../assets/clock.svg" class="icon"/>
            <p class="info">还有{{ contestData.time }}天截稿</p>
            <div class="to-pull" @click="toSubmit()">
                <img src="../../assets/plus-circle.svg" class="icon"/>
                <p class="to-pull-text">去投稿</p>
            </div>
        </div>
    </div>
</template>
<script setup>
import { getToken } from "@/utils/auth"
import { contesting } from "@/api/contest"
import { reactive } from "vue"
import  formatDate  from "@/utils/time/time"
import { useRouter } from "vue-router"
const router = useRouter();
const if_token = getToken();
const contestData = reactive({
    title:"",
    time:""
});

if(getToken()){
    contesting()
    .then(res => {
        let info = res.data;
        contestData.title = info.title;
        contestData.time = parseInt((new Date(formatDate(info.stopTime)) - new Date()) / 86400000)
    });
}

function toSubmit(){
    router.push("/PC/submit");
}
</script>
<style scoped>
.advertise{
    display:flex;
    height:12.5px;
    align-items: center;
    justify-content: space-between;
    position: fixed;
    bottom:0;
    background:#000000;
    width:100%;
}
.left, .right{
    display:flex;
    align-items: center;
    margin-left:5px;
    margin-right:5px;
}
.to-pull{
    display:flex;
    align-items: center;
    background: #4E46B4;
    height:8px;
    justify-content: space-around;
    width:25px;
    border-radius: 2px;
    padding:2px;
    cursor:pointer;
}
.to-pull-text{
    margin: 0;
    color:#FFFFFF;
    font-size:3.8px;
}
.icon{
    height:6px;
}
.info{
    color:#FFFFFF;
    font-size:4px;
    margin:4px;
}
</style>