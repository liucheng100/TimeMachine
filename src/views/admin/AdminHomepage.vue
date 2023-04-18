<template>
    <div id="homepage" ref="homepage" class="homepage" @scroll="scroll">
        <div class="info">
            <div class="info-left">
                <div class="info-title">{{ contest.title }}</div>
                <div class="info-tip">{{ contest.subtitle }}</div>
            </div>
            <SeasonBtn_admin @click.native="contest.status==2 ? 1 : 0" :state="contest.status-1 || 0">
            </SeasonBtn_admin>
        </div>
        <TabMagic :id="114514" sticky="0" :title_list="['赛事介绍', '全部作品', '获奖作品']" @tab0Click="seasonState = 0" :tabId="1"
            @tab1Click="seasonState = 1" @tab2Click="seasonState = 2">
            <template v-slot:tab0>
                <div class="tab-0">
                    <Page1_admin :contest="contest"></Page1_admin>
                </div>
            </template>
            <template v-slot:tab1>
                <div class="tab-1">
                    <Page2_admin :loadMore="byEnd"></Page2_admin>
                </div>
            </template>
            <template v-slot:tab2>
                <div class="tab-2">
                    <Page3_admin></Page3_admin>
                </div>
            </template>
        </TabMagic>
        <div :class="isSafari ? 'footer' : ''"></div>
    </div>
</template>

<script>
    import Page1_admin from '@/components/homepage_admin/Page1_admin.vue'
    import Page2_admin from '@/components/homepage_admin/Page2_admin.vue'
    import Page3_admin from '@/components/homepage_admin/Page3_admin.vue'
    import SeasonBtn_admin from '@/components/homepage_admin/SeasonBtn_admin.vue'
    import { getSrc, uploadFile, } from '@/api/file'
    import { contesting, } from '@/api/contest'
    import { isSafari } from '@/utils/common'
    import pubuse from '@/utils/pub-use'
    export default {
        name: 'homepage',
        components: [
            Page1_admin, Page2_admin, Page3_admin, SeasonBtn_admin
        ],
        inject: ['globalData'],
        data() {
            return {
                testList: [],
                seasonState: 0,
                byEnd: false,
                catchTop: 0,
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
            contesting().then(v => {
                console.log(118, v)
                if (!v.code) {
                    this.contest = v.data
                    console.log(this.contest)
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

        },
        activated() {
            // 对路由变化做出响应...
            // alert(this.catchTop)
            this.$refs.homepage.scrollTop = this.catchTop
        },

    }
</script>


<style scoped>
    .info {
        width: 100%;
        height: 56px;
        padding: 0 20px;
        margin-top: 20px;
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
</style>