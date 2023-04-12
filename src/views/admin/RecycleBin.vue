<script setup>
import { ref, reactive, nextTick, onMounted} from "vue"
import { useRouter } from "vue-router"
const router = useRouter();
const FloatPanel = ref();
const top_change = reactive({
    marginTop:0
})
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
function send(){
    multiply();
}
function back(){
    router.push("/admin/ReviewSubmissions")
}
</script>

<template>
    <div class="review-submissions">
        <div class="float-panel" ref="FloatPanel">
            <p class="back-page" @click="back()">&lt;  返回</p>
            <p class="page-title">回收站</p>
            <img src="@/assets/rotate-ccw.svg"  class="icon-title" v-show="card_info[0].is_multiply.value" @click="send()"/>
            <img src="@/assets/checkSquare_.svg" class="icon-title" v-show="!card_info[0].is_multiply.value" @click="multiply()"/>
            <img src="@/assets/check.svg"  class="icon-title" v-show="card_info[0].is_multiply.value" @click="send()"/>
        </div>

        <div class="all-works" :style="top_change">
            <WorkCard 
            v-for="(item, index) in card_info"
            :key="item.WorkName"
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
.back-page{
    width:100%;
    font-size:16px;
    margin-bottom:10px;
    color:#4E46B4;
    font-weight: bold;
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