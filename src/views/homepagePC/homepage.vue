<template>
    <div class="homepage-pc">
        <img :src="contest.bannerPic" class="big-img" />
        <div class="other-box">
            <p class="box-title">奖项设置</p>
            <div v-for="(item,idx) in contest.prizes" class="medal-setting">
                <div class="medal-title">
                    <img src="../../assets/text-left.svg" class="text-icon" />
                    <p v-if="idx == 1">单反组</p>
                    <p v-if="idx == 2">随手拍组</p>
                    <p v-if="idx == 3">短视频组</p>
                    <p v-if="idx == 4">AI组</p>
                    <img src="../../assets/text-right.svg" class="text-icon" />
                </div>
                <div class="medal-content">
                    <div class="medal-single" v-for="child in item">
                        <div class="square" :style="{ backgroundImage:`url('${child.goodPic}')` }"></div>
                        <p class="prize-name">{{ child.prizeName }}</p>
                        <p class="prize-member">{{ child.goodName }} / {{ child.totalNum }} 名</p>
                    </div>
                </div>
            </div>
        </div>
        <img :src="contest.introductionPic" class="big-img" />
        <img :src="contest.tailPic" class="big-img" />
    </div>
</template>
<script>
    import { getSrc, uploadFile, } from '@/api/file'
    import { contesting, getContest, } from '@/api/contest'
    import pubuse from '@/utils/pub-use'

    export default {
        name: 'homepagePC',
        props: {
            contest: {
                type: Object,
                required: true,
            },
        },
        inject: ['globalData'],
        data() {
            return {
                prizes: [],
                contest: {},
            }
        },
        computed: {
            prizes() {
                return this.globalData.prizes
            },
        },
        methods: {
            replaceBlob(tarObject, attrList) {
                console.log(attrList)
                attrList.forEach(attr => {
                    getSrc(tarObject[attr]).then(v => {
                        // console.log(v)
                        tarObject[attr] = v
                    }).catch(err => {
                        ElMessage.error('图片加载失败')
                    })
                    tarObject[attr] = pubuse('loading.gif')
                });
            },
            NewURL(url) {
                return new URL(url);
            }

        },

        mounted() {
            if (this.$route.query.contestId) {
                // 跳出mounted默认当前进行赛事处理逻辑
                return
            }

            contesting().then(v => {
                if (!v.code) {
                    this.contest = v.data
                    this.replaceBlob(this.contest, [
                        'bannerPic',
                        'introductionPic',
                        'tailPic',
                    ])
                    // prizes
                    this.contest.prizes['1'].forEach(ele => {
                        this.replaceBlob(ele, ['goodPic',])
                    });
                    this.contest.prizes['2'].forEach(ele => {
                        this.replaceBlob(ele, ['goodPic',])
                    });
                    this.contest.prizes['3'].forEach(ele => {
                        this.replaceBlob(ele, ['goodPic',])
                    });
                    this.contest.prizes['4'].forEach(ele => {
                        this.replaceBlob(ele, ['goodPic',])
                    });
                    console.log(this.contest.prizes)
                    this.globalData.contestId = this.contest.contestId
                    this.globalData.prizes = this.contest.prizes
                } else {
                    ElMessage.error(v.msg)
                }
            })

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
        font-size: 1px;
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
        height: 200px;
        margin: 5px;
    }
</style>