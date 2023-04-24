<template>
    <div id="homepage" ref="homepage" class="homepage" @scroll="scroll">
        <div class="banner">
            <img class="banner-img" :src="contest.bannerPic" alt="">
            <div class="banner-tip">还有{{ restday }}天截稿</div>
        </div>
        <div class="info">
            <div class="info-left">
                <div class="info-title">{{ contest.title }}</div>
                <div class="info-tip">{{ contest.subtitle }}</div>
            </div>
            <SeasonBtn @click.native="contest.status == 2 ? ON = true : 0" :state="contest.status - 1 || 0"></SeasonBtn>
        </div>
        <TabMagic :id="11451" sticky="0" :title_list="['赛事介绍', '全部作品', '获奖作品']" @tab0Click="seasonState = 0"
            @tab1Click="seasonState = 1" @tab2Click="seasonState = 2">
            <template v-slot:tab0>
                <div class="tab-0">
                    <Page1 :contest="contest"></Page1>
                </div>
            </template>
            <template v-slot:tab1>
                <div class="tab-1">
                    <Page2 :loadMore="byEnd"></Page2>
                </div>
            </template>
            <template v-slot:tab2>
                <div class="tab-2">
                    <Page3 v-if="(contest.status == 4)"></Page3>
                    <img v-else class="default-img" src="../../assets/Frame112.svg" alt="">
                </div>
            </template>
        </TabMagic>
        <Pop :ON="ON" :model="0" title="我们更推荐在PC端投稿作品" tip="以避免在手机上找不到文件。"
            :options="{ black: '', grey: '坚持投稿', blue: '好的' }" @blackClick="0" @greyClick="$router.push({
                path: '/submit',
                query: { contestId: globalData.contestId }
            }); ON = false" @blueClick="ON = false">
        </Pop>
        <div :class="isSafari ? 'footer' : ''"></div>
    </div>
</template>

<script>
import Page1 from '@/components/homepage/Page1.vue'
import Page2 from '@/components/homepage/Page2.vue'
import Page3 from '@/components/homepage/Page3.vue'
import { getSrc, uploadFile, } from '@/api/file'
import { contesting, getContest, } from '@/api/contest'
import { isSafari } from '@/utils/common'
import pubuse from '@/utils/pub-use'
export default {
    name: 'homepage',
    components: [
        Page1, Page2, Page3
    ],
    inject: ['globalData'],
    data() {
        return {
            testList: [],
            ON: false,
            seasonState: 0,
            byEnd: false,
            catchTop: 0,
            catchId: -1,
            isSafari: true,
            contest: {},
        }
    },
    computed: {
        restday() {
            // stopTime: "1997-05-09T15:56:05"
            let stopTime = this.contest.stopTime
            let stopDate = new Date(stopTime);
            let now = new Date();
            let delta = stopDate - now; // 剩余毫秒数
            let secondsPerDay = 1000 * 60 * 60 * 24; // 每天有多少毫秒
            let daysLeft = Math.ceil(delta / secondsPerDay); // 向上取整，保证不误差
            //console.log(daysLeft); // 输出距离截止时间还有多少天


            return daysLeft
        }
    },
    methods: {
        click1() {
            this.ON = !this.ON
        },
        click2() {
            console.log(9)
        },
        scroll(e) {
            // console.log(e)
            let a = e.target.scrollTop
            this.catchTop = a
            let b = e.target.offsetHeight
            let c = e.target.scrollHeight
            let d = c - b - a
            // console.log(d)
            if (d < 140) {
                this.byEnd = true
            } else {
                this.byEnd = false
            }
        },

        replaceBlob(tarObject, attrList) {
            attrList.forEach(attr => {
                getSrc(tarObject[attr]).then(v => {
                    // console.log(v)
                    tarObject[attr] = v
                }).catch(err => {
                    ElMessage.error('图片加载失败')
                })
                tarObject[attr] = pubuse('loading.gif')
            });
        }
    },
    mounted() {
        this.isSafari = isSafari()
        if (this.$route.query.contestId) {
            // 跳出mounted默认当前进行赛事处理逻辑
            return
        }
        contesting().then(v => {
            // console.log(118, v)
            if (!v.code) {
                this.contest = v.data
                // console.log(this.contest)
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
                this.globalData.contestId = this.contest.contestId
                this.globalData.prizes = this.contest.prizes
            } else {
                ElMessage.error(v.msg)
            }
        }).catch(err=>{
            // alert('阻断contestId的变化，page23请求不到')
        })

    },
    activated() {
        // 对路由变化做出响应...
        // alert(this.catchTop)
        // 从其他路由切换回本路由触发
        this.$refs.homepage.scrollTop = this.catchTop

            
        if (this.$route.query.contestId) {
            if (this.catchId == this.$route.query.contestId) {

            } else {
                this.globalData.contestId = this.contest.contestId
                getContest(this.$route.query.contestId).then(v => {
                    // console.log(118, v)
                    if (!v.code) {
                        this.contest = v.data
                        // console.log(this.contest)
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
                        this.globalData.contestId = this.contest.contestId
                        this.globalData.prizes = this.contest.prizes
                    } else {
                        ElMessage.error(v.description)
                    }
                })
            }
            this.catchId = this.$route.query.contestId

        } else {
            if (this.catchId != -1) {
                this.catchId = -1
                // alert(98)
                contesting().then(v => {
                    // console.log(118, v)
                    if (!v.code) {
                        this.contest = v.data
                        // console.log(this.contest)
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
                        this.globalData.contestId = this.contest.contestId
                        this.globalData.prizes = this.contest.prizes
                    } else {
                        ElMessage.error(v.msg)
                    }
                })
            }
        }

    },
    beforeRouteUpdate(to, from, next) {
        // 对路由变化做出响应...
        // 从本路由切换回本路由其他参数query触发
        // 当前为往届赛事，点击回到主页（当前赛事）时触发
        this.catchId = -1
        contesting().then(v => {
            // console.log(118, v)
            if (!v.code) {
                this.contest = v.data
                // console.log(this.contest)
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
                this.globalData.contestId = this.contest.contestId
                this.globalData.prizes = this.contest.prizes
            } else {
                ElMessage.error(v.msg)
            }
        })
        next()
    },

}
</script>


<style scoped>
.homepage {}

.banner {
    position: relative;
    width: 100%;
    height: 221px;
    overflow: hidden;
    margin-bottom: 20px;
}

.banner-img {
    height: 100%;
    width: 100%;
    object-fit: cover;
}


.banner-tip {
    font-size: 14px;
    color: white;
    text-shadow: 0 0 2px black;
    position: absolute;
    bottom: 10px;
    right: 19px;
}

.info {
    width: 100%;
    height: 56px;
    padding: 0 20px;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.info-left {
    height: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    margin-right: 15px;

    overflow: hidden;
}

.info-title {
    width: 100%;
    font-size: 24px;
    color: rgba(31, 31, 31, 1);
    font-weight: 500;

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.info-tip {
    width: 100%;
    font-size: 12px;
    color: rgba(127, 127, 127, 1);

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}


.footer {
    height: 100px;
}

.tab-0 {
    /* background-color: red; */
}

.tab-1 {
    /* height: 1000px; */
    /* background-color: green; */
}

.tab-2 {
    /* height: 10000px;  */
    /* background-color: blue; */
}

.default-img {
    width: 100%;
}
</style>