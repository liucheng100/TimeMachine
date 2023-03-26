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
            backColor="transparent"
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
            backColor="transparent"
            :title_list="['单反组','随手拍组','短视频组']"
            @tab0Click="state_part=0"
            @tab1Click="state_part=1"
            @tab2Click="state_part=2"
            >
                <template v-slot:tab0>
                    <div class="prize-box">
                        <PartPrize v-for="(item,index) in prizes[0]" 
                        :key="item.prize_name"
                        :prize_name="item.prize_name"
                        :medal_name="item.medal_name"
                        :medal_member="item.medal_member"
                        @click="prizeSettingOpen(index, 0)"></PartPrize>
                    </div>
                </template>
                <template v-slot:tab1>
                    <div class="prize-box">
                        <PartPrize v-for="item in prizes[1]" 
                        :key="item.prize_name"
                        :prize_name="item.prize_name"
                        :medal_name="item.medal_name"
                        :medal_member="item.medal_member"></PartPrize>
                    </div>
                </template>
                <template v-slot:tab2>
                    <div class="prize-box">
                        <PartPrize v-for="item in prizes[2]" 
                        :key="item.prize_name"
                        :prize_name="item.prize_name"
                        :medal_name="item.medal_name"
                        :medal_member="item.medal_member"></PartPrize>
                    </div>
                </template>
            </TabMagic>
        </div>
        <div class="submit-main-picture">
            <img src="@/assets/folderPlus.svg" class="submit-picture"/>
            <p class="title">上传长图</p>
            <p class="detail">请在奖项设置前切图</p>
        </div>
        <div class="text-input">
            <p class="title">更新赛事信息</p>
            <input type="text" placeholder="请输入密码" class="input-content"/>
        </div>
        <button class="submit">提交</button>

        <transition name="fade"><div class="mask" v-show="if_mask_layer" @click="if_mask_layer=!if_mask_layer"></div></transition>
        <transition name="pop">
            <div class="medal" v-show="if_mask_layer">
                <div class="text-input">
                <p class="title pop-title">奖项名称</p>
                <input type="text" placeholder="如一等奖" class="input-content" v-model="medal_setting.medal_name"/>
                </div>
                <div class="text-input">
                    <p class="title pop-title">奖项人数</p>
                    <input type="number" placeholder="只填阿拉伯数字" class="input-content" v-model="medal_setting.medal_member"/>
                </div>
                <div class="text-input">
                    <p class="title pop-title">奖品名称</p>
                    <input type="text" placeholder="如DJI Pocket" class="input-content" v-model="medal_setting.prize_name"/>
                </div>
                <div class="text-input">
                    <p class="title pop-title">奖品链接</p>
                    <input type="text" placeholder="京东自营链接（选填）" class="input-content"/>
                </div>
                <div class="text-input">
                    <p class="title pop-title">奖品图片</p>
                    <div class="submit-sub-picture">
                        <img src="@/assets/folderPlus.svg" class="submit-picture"/>
                        <p class="title">上传图片</p>
                    </div>
                </div>
                <button class="submit" @click="ON = !ON">提交</button>
            </div>
        </transition>

        <Pop
            :ON="ON"
            :model="0"
            title="确认要提交奖品吗?"
            tip="请确认信息无误"
            :options="{black:'',grey:'取消',blue:'提交'}"
            @blackClick="0"
            @greyClick="ON=false"
            @blueClick="prizeSetting()"
        >
        </Pop>

        <Pop
            :ON="ON_2"
            :model="1"
            title="奖品已提交"
            tip="请刷新此网页"
            :options="{black:'',grey:'',blue:'完成'}"
            @blackClick="0"
            @greyClick="0"
            @blueClick="this.ON_2 = !this.ON_2"
        >
        </Pop>
    </div>
</template>
<script>
export default {
    name:"new-competition",
    data(){
        return{
            ON:false,
            ON_2:false,
            main_picture:undefined,
            heading:"",
            subtitle:"",
            submit_time:"",
            state_id:0,
            competition_introduction:undefined,
            state_part:0,
            medal_setting:{
                medal_name:"",
                medal_member:1,
                prize_name:"",
                prize_link:"",
                id:0,
                group:0
            }
            ,
            password:"",
            if_mask_layer:false,
            prizes:[
                [
                    {prize_name:"奖品名称",medal_name:"奖项名称",medal_member:10},
                    {prize_name:"奖品名称",medal_name:"奖项名称",medal_member:10},
                    {prize_name:"奖品名称",medal_name:"奖项名称",medal_member:10},
                    {prize_name:"奖品名称",medal_name:"奖项名称",medal_member:10},
                ],
                [
                    {prize_name:"奖品名称",medal_name:"奖项名称",medal_member:10},
                    {prize_name:"奖品名称",medal_name:"奖项名称",medal_member:10},
                    {prize_name:"奖品名称",medal_name:"奖项名称",medal_member:10},
                    {prize_name:"奖品名称",medal_name:"奖项名称",medal_member:10},
                ],
                [
                    {prize_name:"奖品名称",medal_name:"奖项名称",medal_member:10},
                    {prize_name:"奖品名称",medal_name:"奖项名称",medal_member:10},
                    {prize_name:"奖品名称",medal_name:"奖项名称",medal_member:10},
                    {prize_name:"奖品名称",medal_name:"奖项名称",medal_member:10},
                ]
            ]
        }
    },
    methods:{
        prizeSettingOpen(i, group){
            this.if_mask_layer = !this.if_mask_layer;
            this.medal_setting.id = i;
            this.medal_setting.group = group;
        },
        prizeSetting(){
            this.prizes[this.medal_setting.group][this.medal_setting.id].prize_name = this.medal_setting.prize_name;
            this.prizes[this.medal_setting.group][this.medal_setting.id].medal_name = this.medal_setting.medal_name;
            this.prizes[this.medal_setting.group][this.medal_setting.id].medal_member = this.medal_setting.medal_member;
            this.if_mask_layer = !this.if_mask_layer;
            this.ON = !this.ON;
            this.ON_2 = !this.ON_2;
        }
    }
}
</script>
<style scoped>
.new-competition{
    background:#E5E5E540;
    width:100%;
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
.submit-sub-picture{
    display:flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height:15vh;
    width:15vh;
    margin-top:2vh;
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
.submit{
    margin:5%;
    height:6vh;
    width:90%;
    border-radius: .8vh;
    background:#4E46B4;
    color:white;
    font-size:2.5vh;
    border:0;
    margin-top:0;
}

.mask{
    width:100%;
    height:100vh;
    position: fixed;
    top:0;
    left:0;
    z-index: 30;
    background:rgba(0, 0, 0, 0.2);
}
.medal{
    height:90%;
    width:90%;
    background:white;
    position:fixed;
    top:5%;;
    left:5%;
    z-index:99999999;
    border-radius:.8vh;
}
.pop-title{
    color:#000000;
}
.prize-box{
    display:flex;
    justify-content: space-around;
}
</style>