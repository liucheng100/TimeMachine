<template>
    <div class="myWork">
        <div class="top">
            <div class="title-main">我的投稿</div>
            <div class="flex">
                <div class="auth">{{ auth }}</div>
                <div class="avatar" :style="{backgroundImage: `url('${avatar}')`}"></div>
            </div>
        </div>
        <div class="cards">
            <div class="card-work" v-for="(item,i) in works">
                <div class="cover" :style="{ backgroundImage: `url('${item.cover}')` }"></div>
                <div class="bot">
                    <div class="title">
                        {{ item.title }}
                    </div>
                    <div class="bar">
                        <div class="time">{{time(i)}}</div>
                        <div class="flex">
                            <div class="eye"></div>
                            <div class="info">{{ item.view }}</div>
                        </div>
                    </div>
                    <div class="bar" v-if="!item.prizeId">
                        <div class="status">{{pass(i)}}</div>
                        <div class="flex">
                            <div class="del"></div>
                            <div class="info">删除</div>
                        </div>
                    </div>
                    <div class="bar" v-if="item.prizeId">
                        <div class="status_prized">{{prize(i)}}</div>
                        <div class="ques">填写收货信息</div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { getPrize, } from '@/api/prize'
    export default {
        props: {
        },
        data() {
            return {
                name: "myWork",
                avatar: "",
                works: [
                    { title: "我的作品", isPass: 0, prizeId: 0, Pic: "../../assets/admin/testpic.jpg", Time: "2023-08-24T14:15:22", view: 2123 },
                    { title: "我的作品", isPass: 1, prizeId: 0, Pic: "../../assets/admin/testpic.jpg", Time: "2023-05-24T14:15:22", view: 2123 },
                    { title: "我的作品", isPass: 2, prizeId: 0, Pic: "../../assets/admin/testpic.jpg", Time: "2021-08-24T14:15:22", view: 2123 },
                    { title: "我的作品", isPass: 2, prizeId: 1, Pic: "../../assets/admin/testpic.jpg", Time: "2019-08-24T14:15:22", view: 2123 },
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
            time(i) {
                let time = this.works[i].Time
                let t = new Date(time)

                return t.getFullYear() + "/" + (t.getMonth() + 1) + "/" + t.getDate()
            },
            pass(i) {
                if (this.works[i].isPass == 0) { return "未审核" }
                else if (this.works[i].isPass == 1) { return "已通过" }
                else if (this.works[i].isPass == 2) { return "未通过" }
            },
            prize(i) {
                if (this.works[i].prizeId == 0) { return "未获奖" }
                else {
                    getPrize(this.works[i].prizeId).then(w => {
                        return w.data.prizeName
                    })
                }
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

    .title-main {
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
        color: #999CA0;
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

    .cards {
        width: 100%;
        min-height: 300px;
        padding: 10px 20px;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        background-color: #fff;
        margin-bottom: 100px;

    }

    .card-work {
        width: calc(50vw - 30px);
        max-width: 43vw;
        min-width: 40vw;
        margin-bottom: 20px;
        height: 252px;
        display: flex;
        flex-direction: column;
        border-radius: 6px;
        overflow: hidden;
        background-color: #fff;
        box-shadow: 0px 2px 30px rgba(0, 0, 0, 0.1);
    }

    .cover {
        height: 166px;
        background: center center / cover no-repeat;
        background-color: #53517742;
    }

    .bot {
        height: 64px;
        padding: 10px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .time {
        height: 17px;
        font-size: 12px;
        color: #999CA0;
    }

    .title {
        font-size: 16px;
        color: rgba(31, 31, 31, 1);
    }

    .bar {
        margin-top: 5px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .eye {
        height: 13px;
        width: 13px;
        background: url('../assets/eye.svg') center center / 100% no-repeat;
        margin-right: 5px;
    }

    .del {
        height: 13px;
        width: 13px;
        background: url('../assets/del.svg') center center / 100% no-repeat;
        margin-right: 5px;
    }

    .info {
        font-size: 12px;
        font-weight: 300;
        color: #999CA0;
        transform: translateY(-.6px);
    }

    .status {
        font-size: 12px;
        font-weight: 300;
        color: #999CA0;
    }

    .status_prized {
        font-size: 12px;
        font-weight: 300;
        color: #4E46B4;
    }


    .ques {
        font-size: 12px;
        font-weight: 300;
        color: #4E46B4;
        transform: translateY(-.6px);
    }
</style>