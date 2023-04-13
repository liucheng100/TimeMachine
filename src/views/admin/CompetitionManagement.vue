<template>
    <div class="management">
        <div class="top">
            <div class="title">管理赛事</div>
            <img src="../../assets/admin/box.svg" @click="setQues">
            <button @click="newCompetition">
                <p>开启新赛事</p>
            </button>
        </div>
        <div class="comps">
            <div class="compCard" v-for="(item,index) in comps">
                <div class="compPic" :style="{backgroundImage:'url('+NewURL(item.bannerPic)+')'}"></div>
                <div class="compBottom">
                    <div class="campTitles">
                        <div class="campTitle">{{item.title}}</div>
                        <div class="titleBottom">
                            <div class="campSubTitle">{{item.subtitle}}</div>
                            <div class="campStatus">{{status(index)}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "CompetitionManagement",
        props: {
        },
        data() {
            return {
                comps: [
                    { title: "光·迹", subtitle: "第十三届方寸·流年摄影大赛", status: 1, bannerPic: "../../assets/admin/testpic.jpg", stopTime: "2023-08-24T14:15:22", startTime: "2023-07-24T14:15:22" },
                    { title: "光·迹", subtitle: "第十三届方寸·流年摄影大赛", status: 2, bannerPic: "../../assets/admin/testpic.jpg", stopTime: "2023-05-24T14:15:22", startTime: "2023-03-24T14:15:22" },
                    { title: "光·迹", subtitle: "第十三届方寸·流年摄影大赛", status: 3, bannerPic: "../../assets/admin/testpic.jpg", stopTime: "2021-08-24T14:15:22", startTime: "2021-07-24T14:15:22" },
                    { title: "光·迹", subtitle: "第十三届方寸·流年摄影大赛", status: 4, bannerPic: "../../assets/admin/testpic.jpg", stopTime: "2019-08-24T14:15:22", startTime: "2019-07-24T14:15:22" },

                ]
            }
        },
        methods: {
            NewURL(url) {
                return new URL(`../assets/${url}`, import.meta.url).href
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
        },
    }
</script>


<style scoped>
    .management {
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
        width: 40px;
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
        width: 150px;
        height: 17px;
        line-height: 17px;
        color: #999ca0;
    }

    .campStatus {
        font-size: 12px;
        color: #999ca0;
        line-height: 17px;
        margin-right: 10px;
    }
</style>