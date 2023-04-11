<template>
    <div class="management">
        <div class="top">
            <div class="title">管理赛事</div>
            <img src="../../assets/admin/box.svg">
            <button @click="newCompetition">
                <p>开启新赛事</p>
            </button>
        </div>
        <div class="comps">
            <div class="compCard" v-for="item in comps">
                <img :src="NewURL(item.bannerPic)">
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
                    { title: "光·迹", subtitle: "第十三届方寸·流年摄影大赛", status: "", bannerPic: "../../assets/alertCircle.svg", stopTime: "2019-08-24T14:15:22" },
                    { title: "光·迹", subtitle: "第十三届方寸·流年摄影大赛", status: "", bannerPic: "../../assets/alertCircle.svg", stopTime: "2019-08-24T14:15:22" },
                    { title: "光·迹", subtitle: "第十三届方寸·流年摄影大赛", status: "", bannerPic: "../../assets/alertCircle.svg", stopTime: "2019-08-24T14:15:22" },
                    { title: "光·迹", subtitle: "第十三届方寸·流年摄影大赛", status: "", bannerPic: "../../assets/alertCircle.svg", stopTime: "2019-08-24T14:15:22" },
                ]
            }
        },
        methods: {
            NewURL(url) {
                return new URL(`../assets/${url}`, import.meta.url).href
            },
            newCompetition() {

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
</style>