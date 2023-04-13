<template>
    <div class="myWork">
        <div class="top">
            <div class="title">我的投稿</div>
            <div class="flex">
                <div class="auth">{{ auth }}</div>
                <div class="avatar" :style="{backgroundImage: `url('${avatar}')`}"></div>
            </div>
        </div>
        <div class="card-mini">
            <div class="cover" :style="{ backgroundImage: `url('${cover}')` }"></div>
            <div class="bot">
                <div class="title">
                    {{ title }}
                </div>
                <div class="bar">
                    <div class="flex">
                        <div class="avatar" :style="{ backgroundImage: `url('${avatar}')` }"></div>
                        <div class="info">{{ auth }}</div>
                    </div>
                    <div class="flex">
                        <div class="eye"></div>
                        <div class="info">{{ hot }}</div>
                    </div>
                </div>
            </div>
        </div>
        <!-- <div class="comps">
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
        </div> -->
    </div>
</template>

<script>
    export default {
        name: "myWork",
        props: {
        },
        data() {
            return {
                comps: [
                    { title: "我的作品", status: 1, Pic: "../../assets/admin/testpic.jpg", Time: "2023-08-24T14:15:22" },
                    { title: "我的作品", status: 2, Pic: "../../assets/admin/testpic.jpg", Time: "2023-05-24T14:15:22" },
                    { title: "我的作品", status: 3, Pic: "../../assets/admin/testpic.jpg", Time: "2021-08-24T14:15:22" },
                    { title: "我的作品", status: 4, Pic: "../../assets/admin/testpic.jpg", Time: "2019-08-24T14:15:22" },
                ],
                auth: "aaasajsh"
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
    .myWork {
        width: 100vw;
    }

    .top {
        height: 85px;
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding-right: 20px;
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

    .auth {
        font-size: 14px;
        height: 20px;
        color: rgba(153, 156, 160, 1);
        transform: translateY(-.6px);
    }

    .flex {
        display: flex;
        align-items: center;
    }

    .avatar {
        margin-left: 10px;
        height: 30px;
        width: 30px;
        border-radius: 50%;
        border: solid 1px white;
        box-shadow: 0px 2px 15px rgba(0, 0, 0, 0.1);
        background: center center / 100% no-repeat;
        background-color: rgba(217, 217, 217, 1);
    }
</style>