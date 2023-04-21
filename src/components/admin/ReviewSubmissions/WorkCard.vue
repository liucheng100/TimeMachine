<script setup>
import { onMounted, computed, ref, reactive } from "vue"
import { useRouter, useRoute } from "vue-router"
import { getSrc, getFile, concatSrc } from "@/api/file"


const coverSrc = computed(() => {
    return concatSrc(props.src);
})
const router = useRouter();
const route = useRoute();
const WorkCard = ref();


const props = defineProps({
    WorkName: String,
    contestGroup: Number,
    Status: Number,
    is_choose: Boolean,
    is_multiply:Boolean,
    ViewVolume: Number,
    info:Object,
    src:String
})

const contestGroupName = computed(() => {
    switch(props.contestGroup){
        case 1: return "单反组";
        case 2: return "随手拍组";
        case 3: return "短视频组";
        case 4: return "AI组";
    }
})


const status_text = computed(() => {
    switch(props.Status){
        case 0: return "评审中";
        case 1: return "通过";
        case 2: return "未通过"; 
    }
})
const image_style = reactive({
    height:0,
    width:0
})

onMounted(() => {
    image_style.height = WorkCard.value.offsetWidth + "px";
    image_style.width = WorkCard.value.offsetWidth + "px";
}
)

function checkDetail(){
    if(!props.is_multiply){
        router.push({
            query:{
                workId:props.info.workId,
                from:route.fullPath
            },
            path:"/admin/WorkDetail"
        })
    }
}

</script>

<template>
    <div class="work-card" ref="WorkCard" @click="checkDetail()">
        <img :src="coverSrc" :style="image_style" class="image"/>
        <p class="work-name">{{ WorkName }}</p>
        <p class="small-text text-out">{{ contestGroupName }}</p>
        <div class="small-box">
            <img src="@/assets/eye.svg" class="icon"/>
            <p class="small-text-inside">{{ ViewVolume }}</p>
        </div>
        <p class="small-text text-out">{{ status_text }}</p>
        <div class="small-box" v-if="route.path == '/admin/ReviewSubmissions'" @click.stop="$emit('cut')">
            <img src="@/assets/trash-2.svg" class="icon"/>
            <p class="small-text-inside">删除</p>
        </div>
        <div class="small-box" v-if="route.path == '/admin/RecycleBin'" @click.stop="$emit('back')">
            <img src="@/assets/rotate-ccw.svg" class="icon"/>
            <p class="small-text-inside">撤回</p>
        </div>
        <div class="circle" v-show="is_multiply" @click="$emit('multi')">
            <img src="@/assets/check-circle.svg" class="check-circle" v-show="is_choose"/>
        </div>
    </div>
</template>
<style scoped>
.work-card{
    height:240px;
    width:47%;;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
    margin-bottom:6.5%;
    border-radius: 10px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    position: relative;
}

.image{
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
}
.work-name{
    width:96%;
    margin-left:5%;
    margin-right:5%;
    color:#000000;
}
.small-box{
    display: flex;
    flex-direction: row;
    margin-left:5%;
    margin-right:5%;
    font-size: 11px;
    
    transform: scale(.95, .95);
    align-items: center;
    width:40%;
}
.small-text{
    font-size: 11px;
    margin-left:5%;
    margin-right:5%;
    transform: scale(.95, .95);
    display: flex;
    
    align-items: center;
}
.icon{
    height:20px;
}
.circle{
    position: absolute;
    right:10px;
    top:10px;
    height:30px;
    width:30px;
    border-radius: 50%;
    z-index: 10;
    background: #FFFFFF;
    display: flex;
    justify-content: center;
    align-items: center;
}
.check-circle{
    height: 110%;
}
.text-out{
    width:40%;
}
.small-text-inside{
    margin-left:5px;
}
</style>