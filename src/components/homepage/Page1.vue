<template>
    <div class="page1">
        <ImgZoom
        src="https://avatars.githubusercontent.com/u/6"
        v-model:ON="zoomOn"
        @update:ON="zoomOn=false"
        ></ImgZoom>
        <div class="cover" @click="zoomOn=true">
            <img class="inst" src="../../assets/alertCircle.svg" alt="">
        </div>
        <div class="title-1">
            <div class="title-1-left">奖项设置</div>
            <div class="title-1-right">*点击图片可查看奖品详情</div>
        </div>
        <TabMagic 
            :title_list="['单反组','随手拍拍','短视频组']"
            @tab0Click="1"
            @tab1Click="1"
            @tab2Click="1"
        >
            <template v-slot:tab0>
                <div>
                    <div class="box-1">
                        <div class="box-1-item" v-for="i in 4">
                            <div class="box-1-avatar">
                                
                            </div>
                            <div class="box-1-name">
                                DJI Pocket 2
                            </div>
                            <div class="box-1-tip">
                                一等奖/1名
                            </div>
                        </div>
                    </div>
                    <div class="cover" @click="zoomOn=true">
                        <img class="inst" src="../../assets/alertCircle.svg" alt="">
                    </div>
                </div>
            </template>
            <template v-slot:tab1>
                <div>
                    随手拍拍
                </div>
            </template>
            <template v-slot:tab2>
                <div>
                    短视频组
                </div>
            </template>
        </TabMagic>
    </div>
</template>

<script>
export default {
    data(){
        return{
            zoomOn:false
        }
    },
    methods:{
        
    },
    mounted(){
        
        
    },

}
</script>


<style scoped>
.page1{
    padding-top: 10px;
}
.cover{
    width: 100%;
    height: 221px;
    overflow: hidden;
    margin-bottom: 20px;
}
.inst{
    height: 100%;
    width: 100%;
    object-fit: cover;
}
.title-1{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    margin-bottom: 10px;
}
.title-1-left{
    color: rgba(31, 31, 31, 1);
    font-size: 20px;
}
.title-1-right{
    color: rgba(153, 156, 160, 1);
    font-size: 12px;
}
.box-1{
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    height: 115px;
    margin-top: 20px;
    margin-bottom: 20px;
}
.box-1-item{
    width: 23%;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.box-1-avatar{
    flex-shrink: 0;
    height: 66px;
    width: 66px;
    border-radius: 50%;
    border: solid 3px white;
    background: #D9D9D9;
    box-shadow: 0px 2px 30px rgba(0, 0, 0, 0.1);
    margin-bottom: 10px;
}
.box-1-name{
    font-size: 14px;
    color: rgba(31, 31, 31, 1);
    font-weight: 500;
    white-space: nowrap;
}
.box-1-tip{
    color: rgba(153, 156, 160, 1);
    font-size: 12px;
    white-space: nowrap;
}
</style>