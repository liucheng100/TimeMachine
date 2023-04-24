<template>
    <div class="preCamps" @scroll="scroll">
        <div class="comps">
            <div @click="clickFn(item)" class="compCard" v-for="(item, index) in comps">
                <div class="compPic" :style="{ backgroundImage: `url('${item.bannerPic}')` }"></div>
                <div class="compBottom">
                    <div class="campTitles">
                        <div class="campTitle">{{ item.title }}</div>
                        <div class="titleBottom">
                            <div class="campSubTitle">{{ item.subtitle }}</div>
                            <div class="campStatus">{{ status(index) }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { getSrc, } from '@/api/file'
    import { contestList, contesting } from '@/api/contest'
    import pubuse from '@/utils/pub-use'

    export default {
        name: "preCamps",
        props: {
        },
        inject: ['globalData'],
        data() {
            return {
                comps: [

                ],
                pageNum: 1,
                pageSize: 6,
                byEnd: false,
                loading: false,
            }
        },
        watch: {
            byEnd(to) {
                if (to) {
                    if (!this.loading) {
                        this.loading = true
                        // loadmore here
                        contestList({
                            pageNum: this.pageNum,
                            pageSize: this.pageSize,
                        }).then(v => {
                            // console.log(v)
                            if (!v.code) {
                                this.comps = this.comps.concat(v.data)
                                v.data.forEach(ele => {
                                    this.replaceBlob(ele, ['bannerPic'])
                                });
                                this.pageNum++;
                            }
                            this.loading = false
                        })
                    }
                }
            }
        },
        methods: {
            clickFn(item) {
                let j = (item.contestId == this.globalData.contestId)
                if (j) {
                    // 转跳当前正在进行的投稿页面
                    this.$router.push('/submit')
                } else {
                    this.$router.push({
                        path: '/homepage',
                        query: { contestId: item.contestId }
                    })
                }
            },
            replaceBlob(tarObject, attrList) {
                // console.log(attrList)
                attrList.forEach(attr => {
                    getSrc(tarObject[attr]).then(v => {
                        // console.log(v)
                        tarObject[attr] = v
                        this.$forceUpdate()
                    })
                    // .catch(err => {
                    //     ElMessage.error('图片加载失败')
                    // })
                    tarObject[attr] = pubuse('loading.gif')
                    // console.log(this.dataList)
                });
            },
            scroll(e) {
                // console.log(e)
                let a = e.target.scrollTop
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
            newCompetition() {
                this.$router.push("/admin/new-competition")
            },
            setQues() {
                this.$router.push("/admin/questionnaire")
            },
            status(i) {
                if (this.comps[i].status === 1) {
                    let time = this.comps[i].startTime
                    let t = new Date(time)
                    let today = new Date();
                    let day = parseInt((t - today) / 86400000)
                    return "还有" + day + "天开始 · 未开始"
                }
                else if (this.comps[i].status === 2) {
                    let time = this.comps[i].stopTime
                    let t = new Date(time)
                    let today = new Date();
                    let day = parseInt((t - today) / 86400000)
                    return "还有" + day + "天截止 · 征稿中"
                }
                else if (this.comps[i].status === 3) { return "评审中" }
                else if (this.comps[i].status === 4) { return "已结束" }
            }
        },
        mounted() {
            this.loading = true
            contestList({
                pageNum: this.pageNum,
                pageSize: this.pageSize,
            }).then(v => {
                // console.log(v)
                if (!v.code) {
                    this.comps = v.data
                    v.data.forEach(ele => {
                        this.replaceBlob(ele, ['bannerPic'])
                    });
                    this.pageNum++;
                }
                this.loading = false
            })
            contesting().then(v => {
                // console.log(v)
                if (!v.code) {
                    // this.contest = v.data
                    // console.log(this.contest)
                    this.globalData.contestId = v.data.contestId
                    // this.globalData.prizes = v.data.prizes
                } else {
                    ElMessage.error(v.msg)
                }
            })
        },
    }
</script>


<style scoped>
    .preCamps {
        padding-top: 20px;
        width: 100vw;
    }

    .top {
        height: 85px;
        width: 100%;
        display: flex;
        flex-direction: row;
    }

    .title {
        margin-left: 20px;
        margin-top: 20px;
        font-size: 32px;
        color: #000;
        font-weight: 500;
        height: 45px;
        width: 128px;
    }

    .top img {
        height: 24px;
        width: 24px;
        margin-top: 31px;
        margin-left: 63px;
    }

    .top button {
        margin-top: 19px;
        margin-left: 20px;
        width: 118px;
        height: 48px;
        background-color: #4E46B4;
        border-radius: 6px;
        transition: .2s;
        border: none;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .top button p {
        font-size: 16px;
        color: #fff;
    }

    .comps {}

    .compCard {
        margin-left: 20px;
        margin-right: 20px;
        height: 264px;
        margin-bottom: 20px;
        box-shadow: 0px 2px 15px rgba(0, 0, 0, 0.1);
        border-radius: 6px;
    }

    .compPic {
        width: 100%;
        height: 200px;
        overflow: hidden;
        background-position: center center;
        background-repeat: no-repeat;
        background-size: cover;
        border-radius: 6px 6px 0px 0px;

    }

    .compBottom {
        width: 100%;
        height: 64px;
        border-radius: 0px 0px 6px 6px;
    }

    .campTitles {
        margin-left: 10px;
        padding-top: 10px;
    }

    .campTitle {
        font-size: 16px;
        /* width: 40px; */
        height: 22px;
        color: #000;
        font-weight: 500;
    }

    .titleBottom {
        margin-top: 5px;
        width: 100%;
        height: 17px;
        line-height: 17px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .campSubTitle {
        font-size: 12px;
        /* width: 150px; */
        height: 17px;
        line-height: 17px;
        color: #999ca0;
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-right: 4px;
    }

    .campStatus {
        font-size: 12px;
        color: #999ca0;
        line-height: 17px;
        margin-right: 10px;
        flex-shrink: 0;
    }
</style>