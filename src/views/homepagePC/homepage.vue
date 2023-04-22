<template>
    <div class="homepage-pc" v-show="if_token">
        <img :src="contest.bannerPic" class="big-img"/>
        <div class="other-box">
            <p class="box-title">奖项设置</p>
            <div v-for="(item,idx) in contest.prizes" class="medal-setting">
                <div class="medal-title">
                    <img src="../../assets/text-left.svg" class="text-icon" />
                    <p v-if="idx == 0">单反组</p>
                    <p v-if="idx == 1">随手拍组</p>
                    <p v-if="idx == 2">短视频组</p>
                    <p v-if="idx == 3">AI组</p>
                    <img src="../../assets/text-right.svg" class="text-icon" />
                </div>
                <div class="medal-content">
                    <div class="medal-single" v-for="child in item" ref="MedalSingle">
                        <img class="square" :src="child.goodPic"/>
                        <p class="prize-name">{{ child.prizeName }}</p>
                        <p class="prize-member" ref="PrizeMember" :style="{transform:`scale(${textSize},${textSize})`}">{{ child.goodName }} / {{ child.totalNum }} 名</p>
                    </div>
                </div>
            </div>
        </div>
        <img :src="contest.introductionPic" class="big-img" />
        <img :src="contest.tailPic" class="big-img" />
    </div>
</template>
<script>
    import { getSrc, uploadFile, concatSrc } from '@/api/file'
    import { contesting, getContest, } from '@/api/contest'
    import { getToken } from "@/utils/auth";
    import pubuse from '@/utils/pub-use'

    export default {
        name: 'homepagePC',
        
        data() {
            return {
                contest: {},
                if_token: getToken(),
                textSize:0
            }
        },
        methods: {
            NewURL(url) {
                return new URL(url);
            },
            async getData(){
                await contesting().then(v => {
                if (!v.code) {
                        this.contest = v.data;
                        this.contest.bannerPic = concatSrc(this.contest.bannerPic);
                        this.contest.introductionPic = concatSrc(this.contest.introductionPic);
                        this.contest.tailPic = concatSrc(this.contest.tailPic)
                        let x = [];
                        x.push(this.contest.prizes["1"])
                        x.push(this.contest.prizes["2"])
                        x.push(this.contest.prizes["3"])
                        x.push(this.contest.prizes["4"])
                        this.contest.prizes = x;
                        this.contest.prizes.forEach((item) => {
                            item.forEach((item) => {
                                item.goodPic = concatSrc(item.goodPic);
                            })
                        })
                    } 
                    else {
                    ElMessage.error(v.msg)
                    }
                })
                let textLength = [];
                this.$refs.PrizeMember.forEach((item) => {
                    textLength.push(item.offsetWidth);
                })
                this.textSize = this.$refs.MedalSingle[0].offsetWidth / Math.max(...textLength);
            }

        },

        mounted() {
            if (this.$route.query.contestId) {
                // 跳出mounted默认当前进行赛事处理逻辑
                return
            }
            //没有token就不请求主页数据啦~
            if (!getToken())return;

            this.getData();
        },
    }

</script>
<style scoped>
    .mask {
        position: fixed;
        top: 0;
        left: 0;
        display: flex;
        background: #00000020;
        width: 100%;
        height: 100%;
        z-index: 50;
    }

    .login-box {
        position: fixed;
        top: 20%;
        left: 35%;
        width: 30%;
        height: 50%;
        background: #FFFFFF;
        border-radius: 5px;
    }

    .prize-name {
        font-size: 2px;
        color: #000000;
        margin-top: 10%;
    }

    .prize-member {
        font-size: .5px;
        margin-top: 5%;
        
    }

    .square {
        height: 18px;
        width: 18px;
        background: #D9D9D9;
        border: #FFFFFF 1px solid;
        box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
        border-radius: 50%;
    }

    .medal-single {
        display: flex;
        flex-direction: column;
        align-items: center;
        width:25%;
    }

    .medal-content {
        display: flex;
        flex-direction: row;
        width: 100%;
        justify-content: space-around;
    }

    .box-title {
        width: 100%;
        font-size: 12px;
        font-weight: bold;
        color: #000000;
        margin: 1%;
    }

    .medal-title {
        display: flex;
        height: 30%;
        margin: 2%;
        width: 40%;
        justify-content: space-between;
        align-items: center;
        font-size: 7px;
        color: #000000;
    }

    .other-box {
        display: flex;
        flex-direction: row;
        font-size: 5px;
        flex-wrap: wrap;
        width: 61.5%;
        height: 300px;
    }

    .medal-setting {
        display: flex;
        width: 48%;
        height: 70px;
        flex-direction: column;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
        margin: 1%;
        border-radius: 5px;
        align-items: center;
    }

    .homepage-pc {
        display: flex;
        align-items: center;
        flex-direction: column;
    }

    .big-img {
        width: 60%;
        margin: 5px;
    }

    
</style>