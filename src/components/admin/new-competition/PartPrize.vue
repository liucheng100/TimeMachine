<template>
    <div class="prize-setting">
        <div class="prize-showing">
            <div class="prize-child">
                <div class="out-square">
                </div>
                <p class="prize-name">{{prize_name}}</p>
                <p class="prize-member">{{medal_name}}/{{ medal_member }}名</p>
            </div>
        </div>
        
    </div>

</template>
<script>
export default{
    name:"prize-setting",
    props:{
        prize_name:{
            type:String,
            default:"None"
        },
        medal_name:{
            type:String,
            default:"None"
        },
        medal_member:{
            type:Number,
            default:0
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