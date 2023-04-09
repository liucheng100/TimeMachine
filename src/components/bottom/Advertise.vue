<template>
    <div class="advertise">
        <div class="left">
            <img src="../../assets/bookmark.svg" class="icon"/>
            <p class="info">第十四届方寸·流年摄影大赛「复苏」</p>
        </div>
        <div class="right">
            <img src="../../assets/clock.svg" class="icon"/>
            <p class="info">还有24天截稿</p>
            <div class="to-pull">
                <img src="../../assets/plus-circle.svg" class="icon"/>
                <p class="to-pull-text">去投稿</p>
            </div>
        </div>
    </div>
</template>
<script setup>

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