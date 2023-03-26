<template>
    <div class="prize-setting">
        <div class="prize-showing">
            <div v-for="item in members" :key="members.prize_name" class="prize-child">
                <div class="out-square">
                </div>
                <p class="prize-name">{{item.prize_name}}</p>
                <p class="prize-member">{{item.medal_name}}/{{ item.medal_member }}名</p>
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
.prize-showing{
    display: flex;
    justify-content: space-around;
}
.out-square{
    height:7vh;
    width:7vh;
    background:#D9D9D9;
    border:white .5vh solid;
    border-radius: 50%;
}
.prize-child{
    display:flex;
    flex-direction: column;
    align-items: center;
}
.prize-name{
    color:black;
    font-size:1.7vh;
}
.prize-member{
    font-size:1.3vh;
}
</style>