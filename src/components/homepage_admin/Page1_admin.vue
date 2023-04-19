<template>
    <div class="page1">
        <ImgZoom :src="zoomOn" v-model:ON="zoomOn" @update:ON="zoomOn = false"></ImgZoom>
        <div class="cover" @click="zoomOn = contest.introductionPic">
            <img class="inst" :src="contest.introductionPic" alt="">
        </div>
        <div class="title-1">
            <div class="title-1-left">奖项设置</div>
            <div class="title-1-right">*点击图片可查看奖品详情</div>
        </div>
        <TabMagic :title_list="['单反组', '随手拍组', '短视频组', 'AI组']" @tab0Click="1" @tab1Click="1" @tab2Click="1"
            @tab3Click="1">
            <template v-slot:tab0>
                <div>
                    <div class="box-1">
                        <a :href="i.goodLink" class="box-1-item" v-for="i in prizes['1']">
                            <div class="box-1-avatar">
                                <img class="img-avatar" :src="i.goodPic" alt="">
                            </div>
                            <div class="box-1-name">
                                {{i.goodName}}
                            </div>
                            <div class="box-1-tip">
                                {{i.prizeName}}/{{i.totalNum}}名
                            </div>
                        </a>
                    </div>
                </div>
            </template>
            <template v-slot:tab1>
                <div>
                    <div class="box-1">
                        <a :href="i.goodLink" class="box-1-item" v-for="i in prizes['2']">
                            <div class="box-1-avatar">
                                <img class="img-avatar" :src="i.goodPic" alt="">
                            </div>
                            <div class="box-1-name">
                                {{i.goodName}}
                            </div>
                            <div class="box-1-tip">
                                {{i.prizeName}}/{{i.totalNum}}名
                            </div>
                        </a>
                    </div>
                </div>
            </template>
            <template v-slot:tab2>
                <div>
                    <div class="box-1">
                        <a :href="i.goodLink" class="box-1-item" v-for="i in prizes['3']">
                            <div class="box-1-avatar">
                                <img class="img-avatar" :src="i.goodPic" alt="">
                            </div>
                            <div class="box-1-name">
                                {{i.goodName}}
                            </div>
                            <div class="box-1-tip">
                                {{i.prizeName}}/{{i.totalNum}}名
                            </div>
                        </a>
                    </div>
                </div>
            </template>
            <template v-slot:tab3>
                <div>
                    <div class="box-1">
                        <a :href="i.goodLink" class="box-1-item" v-for="i in prizes['4']">
                            <div class="box-1-avatar">
                                <img class="img-avatar" :src="i.goodPic" alt="">
                            </div>
                            <div class="box-1-name">
                                {{i.goodName}}
                            </div>
                            <div class="box-1-tip">
                                {{i.prizeName}}/{{i.totalNum}}名
                            </div>
                        </a>
                    </div>
                </div>
            </template>

        </TabMagic>
        <div class="cover" @click="zoomOn = contest.tailPic">
            <img class="inst" :src="contest.tailPic" alt="">
        </div>
    </div>
</template>

<script>
    export default {
        name: 'page1_admin',
        props: {
            contest: {
                type: Object,
                required: true,
            },
        },
        inject: ['globalData'],
        data() {
            return {
                zoomOn: false
            }
        },
        computed: {
            prizes() {
                return this.globalData.prizes
            }
        },
        methods: {

        },
        mounted() {
            setTimeout(() => {
                console.log(this.prizes)
            }, 1000);

        },

    }
</script>


<style scoped>
    .page1 {
        padding-top: 10px;
    }

    .cover {
        width: 100%;
        /* height: 221px; */
        /* overflow: hidden; */
        margin-bottom: 20px;
    }

    .inst {
        /* height: 100%; */
        width: 100%;
        /* object-fit: cover; */
    }

    .title-1 {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 20px;
        margin-bottom: 10px;
    }

    .title-1-left {
        color: rgba(31, 31, 31, 1);
        font-size: 20px;
    }

    .title-1-right {
        color: rgba(153, 156, 160, 1);
        font-size: 12px;
    }

    .box-1 {
        padding: 0 20px;
        display: flex;
        justify-content: space-between;
        justify-content: space-around;
        height: 115px;
        margin-top: 20px;
        margin-bottom: 20px;
    }

    .box-1-item {
        width: 23%;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-decoration: none;
        overflow: hidden;
    }

    .box-1-avatar {
        flex-shrink: 0;
        height: 66px;
        width: 66px;
        border-radius: 50%;
        border: solid 3px white;
        background: #D9D9D9;
        box-shadow: 0px 2px 30px rgba(0, 0, 0, 0.1);
        margin-bottom: 10px;
        overflow: hidden;
    }

    .img-avatar {
        height: 100%;
        width: 100%;
        object-fit: cover;
    }

    .box-1-name {
        width: 100%;
        font-size: 14px;
        color: rgba(31, 31, 31, 1);
        font-weight: 500;
        white-space: nowrap;
        overflow: hidden;
        text-align: center;
        text-overflow: ellipsis;
    }

    .box-1-tip {
        color: rgba(153, 156, 160, 1);
        font-size: 12px;
        white-space: nowrap;
        text-align: center;
        overflow: hidden;
    }
</style>