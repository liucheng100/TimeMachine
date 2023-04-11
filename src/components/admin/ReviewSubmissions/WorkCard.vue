<script setup>
import { onMounted, computed, ref, reactive} from "vue"
let touchEvent = "";

const WorkCard = ref();

const emit = defineEmits(["multi"]);

const props = defineProps({
    WorkName: String,
    PublishTime: String,
    Status: Number,
    is_choose: Boolean,
    is_multiply:Boolean,
    ViewVolume: Number
})

const status_text = computed(() => {
    switch(props.Status){
        case 0: return "评审中";
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

function clearTouch(){
    clearTimeout(touchEvent);
}

function multi(){
    emit("multi");
}
</script>

<template>
    <div class="work-card" ref="WorkCard">
        <img src="https://i.328888.xyz/2023/04/11/ipdpXU.jpeg" :style="image_style" class="image"/>
        <p class="work-name">{{ WorkName }}</p>
        <p class="small-text">{{ PublishTime }}</p>
        <div class="small-box">
            <img src="@/assets/eye.svg" class="icon"/>
            <p class="small-text-inside">{{ ViewVolume }}</p>
        </div>
        <p class="small-text">{{ status_text }}</p>
        <div class="small-box" >
            <img src="@/assets/trash-2.svg" class="icon"/>
            <p class="small-text-inside">删除</p>
        </div>
        <div class="circle" v-show="is_multiply" @click="multi()">
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
    justify-content: flex-end;
    transform: scale(.95, .95);
    align-items: center;
}
.small-text{
    font-size: 11px;
    margin-left:5%;
    margin-right:5%;
    transform: scale(.95, .95);
    display: flex;
    justify-content: center;
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
</style>