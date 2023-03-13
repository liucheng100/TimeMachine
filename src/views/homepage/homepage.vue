<template>
    <div class="homepage">
        <div class="banner">
            <img class="banner-img" src="../../assets/warnCircle.svg" alt="">
            <div class="banner-tip">还有24天截稿</div>
        </div>
        <div class="info">
            <div class="info-left">
                <div class="info-title">觅·新</div>
                <div class="info-tip">第十三届方寸·流年摄影大赛</div>
            </div>
            <SeasonBtn
                :state="seasonState"
            ></SeasonBtn>
        </div>
        <TabMagic 
            :title_list="['赛事介绍','全部作品','获奖作品']"
            @tab0Click="seasonState=0"
            @tab1Click="seasonState=1"
            @tab2Click="seasonState=2"
        >
            <template v-slot:tab0>
                <div class="tab-0">
                    <Page1></Page1>
                </div>
            </template>
            <template v-slot:tab1>
                <div class="tab-1">
                    tab1
                </div>
            </template>
            <template v-slot:tab2>
                <div class="tab-2">
                    tab2
                </div>
            </template>
        </TabMagic>
        <Pop
            :ON="ON"
            :model="0"
            title="确认要删除吗?"
            tip="此操作无法被撤销。"
            :options="{black:'删除',grey:0,blue:'取消'}"
            @blackClick="click1"
            @greyClick="click1"
            @blueClick="click1"
        >
        </Pop>
    </div>
</template>

<script>
import Page1 from '@/components/homepage/Page1.vue'
export default {
    components:[
        Page1
    ],
    data(){
        return{
            testList:[],
            ON:false,
            seasonState:0
        }
    },
    methods:{
        click1(){
            this.ON = !this.ON
        },
        click2(){
            console.log(9)
        }
    },
    mounted(){
        
        
    },

}
</script>


<style scoped>
.homepage{}

.banner{
    position: relative;
    width: 100%;
    height: 221px;
    overflow: hidden;
    margin-bottom: 20px;
}
.banner-img{
    height: 100%;
    width: 100%;
    object-fit: cover;
}
.banner-tip{
    font-size: 14px;
    color: white;
    text-shadow: 0 0 1px black;
    position: absolute;
    bottom: 10px;
    right: 19px;
}
.info{
    width: 100%;
    height: 56px;
    padding: 0 20px;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.info-left{
    height: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    margin-right: 15px;

    overflow: hidden;
}
.info-title{
    width: 100%;
    font-size: 24px;
    color: rgba(31, 31, 31, 1);
    font-weight: 500;

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.info-tip{
    width: 100%;
    font-size: 12px;
    color: rgba(127, 127, 127, 1);

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.tab-0{
    /* background-color: red; */
}
.tab-1{
    height: 1000px;
    background-color: green;
}
.tab-2{
    height: 10000px;
    background-color: blue;
}
</style>