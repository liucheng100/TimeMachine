<template>
    <div class="new-competition">
        <div class="submit-main-picture">
            <img src="@/assets/folderPlus.svg" class="submit-picture"/>
            <p class="title">上传主图</p>
            <p class="detail">16:9比例，建议为1920*1080</p>
        </div>
        <div class="text-input">
            <p class="title">标题</p>
            <input type="text" placeholder="主题名称" class="input-content"/>
        </div>
        <div class="text-input">
            <p class="title">副标题</p>
            <input type="text" placeholder="届数与其他信息" class="input-content"/>
        </div>
        <div class="text-input">
            <p class="title">赛事投稿时间</p>
            <input type="text" placeholder="格式为YYYY/MM/DD-YYYY/MM/DD，中间无空格" class="input-content"/>
        </div>
        <div class="competition-state">
            <div class="state-title">
                <p class="title">赛事状态</p>
                <p class="detail">*在赛事投稿时间结束后会默认进入评审中</p>
            </div>
            <TabMagic 
            :id="2"
            :title_list="['评审中','已结束','其他状态']"
            @tab0Click="state_id=0"
            @tab1Click="state_id=1"
            @tab2Click="state_id=2"
            />
        </div>
        <p class="title intro">赛事介绍</p>
        <div class="submit-main-picture">
            <img src="@/assets/folderPlus.svg" class="submit-picture"/>
            <p class="title">上传长图</p>
            <p class="detail">请在奖项设置前切图</p>
        </div>
        <div class="medal-setting">
            <TabMagic 
            :id="3"
            :title_list="['单反组','随手拍组','短视频组']"
            @tab0Click="state_part=0"
            @tab1Click="state_part=1"
            @tab2Click="state_part=2"
            >
                <template v-slot:tab0>
                    <Part1 :part="'单反组'"></Part1>
                </template>
                <template v-slot:tab1>
                    <Part1 :part="'随手拍组'"></Part1>               
                </template>
                <template v-slot:tab2>
                    <Part1 :part="'短视频组'"></Part1>  
                </template>
            </TabMagic>
        </div>
        <div class="refresh-competition"></div>
        <button class="submit">提交</button>
    </div>
</template>
<script>
export default {
    name:"new-competition",
    data(){
        return{
            main_picture:undefined,
            heading:"",
            subtitle:"",
            submit_time:"",
            state_id:0,
            competition_introduction:undefined,
            state_part:0,
            medal_setting:[
                {
                    medal_name:"",
                    medal_people:1,
                    prize_name:"",
                    prize_link:""
                }
            ],
            password:""
        }
    }
}
</script>
<style scoped>
.new-competition{
    background:#E5E5E540;
}
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
.text-input{
    margin:2vh;
}
.input-content{
    border:0;
    height:6vh;
    width:100%;
    padding:2vh;
    box-shadow: 0 0 1vh 1vh rgba(0, 0, 0, 0.05);
    border-radius: .8vh;
    margin-top:1vh;
    color:#999CA0;
    font-size:.6vh;
}
.competition-state{
    margin:2vh;
}
.state-title{
    display:flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom:1vh;
}
.intro{
    margin:2vh;
}
</style>