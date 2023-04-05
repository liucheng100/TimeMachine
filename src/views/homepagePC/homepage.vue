<template>
    <div class="homepage-pc">
        <img v-for="item in img_data" :src="NewURL(item.src)" class="big-img"/>
        <div class="other-box">
            <p class="box-title">奖项设置</p>
            <div v-for="item in medal_setting">
                <div class="medal-title">
                    <img src="../../assets/text-left.svg" class="text-icon"/>
                    <p>{{ item.title }}</p>
                    <img src="../../assets/text-right.svg" class="text-icon"/>
                </div>
                <div class="medal-content">
                    <div class="medal-single" v-for="child in item.medal">
                        <div class="square"></div>
                        <p class="prize-name">{{ child.prize_name }}</p>
                        <p class="prize-member">{{ child.medal_name }} / {{ child.member }} 名</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import pubuse from '@/utils/pub-use'

const img_data = [
    {
        src:"https://img1.imgtp.com/2023/04/05/R59i1bhz.jpg"
    },
    {
        src:"https://img1.imgtp.com/2023/04/05/cRlnczeS.jpeg"
    }
]

const medal_setting = [
    {
        title:"单反组",
        medal:[
            {prize_name:"DJI POCKET 2", member:0, medal_name:"一等奖", img_url:""},
            {prize_name:"DJI POCKET 2", member:0, medal_name:"一等奖", img_url:""},
            {prize_name:"DJI POCKET 2", member:0, medal_name:"一等奖", img_url:""},
            {prize_name:"DJI POCKET 2", member:0, medal_name:"一等奖", img_url:""}
        ]
    },
    {
        title:"单反组",
        medal:[
            {prize_name:"DJI POCKET 2", member:0, medal_name:"一等奖", img_url:""},
            {prize_name:"DJI POCKET 2", member:0, medal_name:"一等奖", img_url:""},
            {prize_name:"DJI POCKET 2", member:0, medal_name:"一等奖", img_url:""},
            {prize_name:"DJI POCKET 2", member:0, medal_name:"一等奖", img_url:""}
        ]
    },
    {
        title:"单反组",
        medal:[
            {prize_name:"DJI POCKET 2", member:0, medal_name:"一等奖", img_url:""},
            {prize_name:"DJI POCKET 2", member:0, medal_name:"一等奖", img_url:""},
            {prize_name:"DJI POCKET 2", member:0, medal_name:"一等奖", img_url:""},
            {prize_name:"DJI POCKET 2", member:0, medal_name:"一等奖", img_url:""}
        ]
    },
    {
        title:"单反组",
        medal:[
            {prize_name:"DJI POCKET 2", member:0, medal_name:"一等奖", img_url:""},
            {prize_name:"DJI POCKET 2", member:0, medal_name:"一等奖", img_url:""},
            {prize_name:"DJI POCKET 2", member:0, medal_name:"一等奖", img_url:""},
            {prize_name:"DJI POCKET 2", member:0, medal_name:"一等奖", img_url:""}
        ]
    }
]
function NewURL(url){
    return new URL(url);
}
</script>
<style scoped>
.homepage-pc{
    display:flex;
    align-items: center;
    flex-direction: column;
}
.big-img{
    width:200px;
    height:150px;
    margin:5px;
}
</style>