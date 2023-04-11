<script setup>
import { ref, reactive, nextTick, onMounted} from "vue"

let FloatPanel = ref();

let top_change = reactive({
    marginTop:0
})

let background_button = reactive([false,false,false])

const card_info = [
    {
        WorkName: "城市画作",
        PublishTime: "2023/02/20",
        Status: 0,
        is_multiply:ref(false),
        is_choose: ref(false),
        ViewVolume:100
    },
    {
        WorkName: "城市画作",
        PublishTime: "2023/02/20",
        Status: 0,
        is_multiply:ref(false),
        is_choose: ref(false),
        ViewVolume:100
    },
    {
        WorkName: "城市画作",
        PublishTime: "2023/02/20",
        Status: 0,
        is_multiply:ref(false),
        is_choose: ref(false),
        ViewVolume:100
    },
    {
        WorkName: "城市画作",
        PublishTime: "2023/02/20",
        Status: 0,
        is_multiply:ref(false),
        is_choose: ref(false),
        ViewVolume:100
    },
    {
        WorkName: "城市画作",
        PublishTime: "2023/02/20",
        Status: 0,
        is_multiply:ref(false),
        is_choose: ref(false),
        ViewVolume:100
    },
    {
        WorkName: "城市画作",
        PublishTime: "2023/02/20",
        Status: 0,
        is_multiply:ref(false),
        is_choose: ref(false),
        ViewVolume:100
    },
    {
        WorkName: "城市画作",
        PublishTime: "2023/02/20",
        Status: 0,
        is_multiply:ref(false),
        is_choose: ref(false),
        ViewVolume:100
    },
    {
        WorkName: "城市画作",
        PublishTime: "2023/02/20",
        Status: 0,
        is_multiply:ref(false),
        is_choose: ref(false),
        ViewVolume:100
    },
]

onMounted(() => {
    top_change.marginTop = FloatPanel.value.offsetHeight + "px";
})

function multiply(){
    card_info.forEach(item => {
        item.is_multiply.value = !item.is_multiply.value;
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
}

function deleteWorks(){
    
}
</script>

<template>
    <div class="review-submissions">
        <div class="float-panel" ref="FloatPanel">
            <p class="page-title">审核投稿</p>
            <img src="@/assets/trash.svg" class="icon-title" @click="deleteWorks()"/>
            <img src="@/assets/checkSquare_.svg" class="icon-title" v-show="!card_info[0].is_multiply.value" @click="multiply()"/>
            <img src="@/assets/check.svg"  class="icon-title" v-show="card_info[0].is_multiply.value" @click="send()"/>
            <div class="multi-panel" v-show="card_info[0].is_multiply.value">
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
            :WorkName="item.WorkName"
            :PublishTime="item.PublishTime"
            :Status="item.Status"
            :is_choose="item.is_choose.value"
            :ViewVolume="item.ViewVolume"
            :is_multiply="item.is_multiply.value"
            @multi="card_info[index].is_choose.value = !item.is_choose.value"
            />
        </div>
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
</style>