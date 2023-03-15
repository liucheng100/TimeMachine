<template>
    <div class="prize-setting">
        <div class="prize-showing">
            <div v-for="item in members" :key="members.prize_name">
                <div class="out-square">
                    
                </div>
            </div>
        </div>
        <div class="submit-main-picture">
            <img src="@/assets/folderPlus.svg" class="submit-picture"/>
            <p class="title">上传长图</p>
            <p class="detail">请在奖项设置前切图</p>
        </div>
    </div>

</template>
<script>
export default{
    name:"prize-setting",
    data(){
        return{
            members:[
                {
                    prize_name:"DJI Pocket 2",
                    medal_name:"一等奖",
                    medal_member:1,
                    prize_link:"hsbdakhsbdka",
                    image:undefined
                },
                {
                    prize_name:"DJI Pocket 2",
                    medal_name:"一等奖",
                    medal_member:1,
                    prize_link:"hsbdakhsbdka",
                    image:undefined
                },
                {
                    prize_name:"DJI Pocket 2",
                    medal_name:"一等奖",
                    medal_member:1,
                    prize_link:"hsbdakhsbdka",
                    image:undefined
                },
                {
                    prize_name:"DJI Pocket 2",
                    medal_name:"一等奖",
                    medal_member:1,
                    prize_link:"hsbdakhsbdka",
                    image:undefined
                }
            ]
        }
    }
}
</script>
<style scoped>
.submit-main-picture{
    display:flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height:25vh;
    margin:2vh;
    background:#FFFFFF;
    box-shadow: 0 0 1vh 1vh rgba(0, 0, 0, 0.05);
    border-radius: .8vh;
}
.title{
    color:#4E46B4;
    font-size:2.8vh;
    margin:.6vh;
    margin-top:.8vh;
}
.detail{
    color:#999CA0;
    font-size:.6vh;
}
</style>