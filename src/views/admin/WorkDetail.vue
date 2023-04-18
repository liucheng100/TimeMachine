<template>
    <div class="datail">
        <div class="top">
            <div class="mainTitle">作品详情</div>
        </div>
        <div class="card">
            <div class="cover" :style="{backgroundImage: `url('${work.cover}')`}"></div>
            <div class="bot">
                <div class="title">
                    <div>{{ work.workTitle }}</div>
                    <div class="flex">
                        <div class="eye"></div>
                        <div class="info">{{ work.views }}</div>
                    </div>
                </div>
                <div class="introduction">
                    {{work.description}}
                </div>
                <div class="bar">
                    <div class="flex">
                        <div class="avatar" :style="{backgroundImage: `url('${work.avatar}')`}"></div>
                        <div class="info">{{ work.auth }}</div>
                    </div>
                    <div class="status">{{ work.groupName }}-{{ work.status }}</div>
                </div>
            </div>
        </div>
        <div class="button-box">
            <button class="button" :style="{ background:'#FF4E6450' }">
                <img src="@/assets/x.svg" />
            </button>
            <button class="button" :style="{ background:'#F5F5F5' }">
                <img src="@/assets/arrow-left.svg" />
            </button>
            <button class="button" :style="{ background:'#F5F5F5' }">
                <img src="@/assets/download.svg" />
            </button>
            <button class="button" :style="{ background:'#4AD15F50' }">
                <img src="@/assets/check.svg" />
            </button>
        </div>
    </div>
</template>

<script setup>
    import { reactive } from "vue"

    const work = reactive({
        workTitle: "作品",
        auth: "城市作画",
        avatar: "",
        cover: '',
        description: '作品简介作品简介',
        contestGroup: 1,
        groupName: "单反组",
        status: "已退回"
    })

</script>


<style scoped>
    .detail {
        width: 100vw;
    }

    .top {
        height: 85px;
        width: 100%;
        display: flex;
        flex-direction: row;
    }

    .mainTitle {
        margin-left: 20px;
        margin-top: 20px;
        font-size: 32px;
        color: #000;
        font-weight: 500;
        height: 45px;
        /* width: 128px; */
    }

    .card {
        width: calc(100vw - 40px);
        margin-bottom: 20px;
        height: auto;
        margin-left: 20px;
        display: flex;
        flex-direction: column;
        border-radius: 6px;
        overflow: hidden;
        background-color: #fff;
        box-shadow: 0px 2px 30px rgba(0, 0, 0, 0.1);

    }

    .cover {
        height: 235px;
        background: center center / 100% no-repeat;
        background-color: #53517742;
    }

    .bot {
        padding: 10px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .title {
        font-size: 16px;
        color: rgba(31, 31, 31, 1);
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .introduction {
        margin-top: 4px;
        height: auto;
        font-size: 12px;
        color: rgba(153, 156, 160, 1);
    }

    .bar {
        margin-top: 6px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .status {
        font-size: 12px;
        color: rgba(153, 156, 160, 1);
    }

    .eye {
        height: 13px;
        width: 13px;
        background: url('../../assets/eye.svg') center center / 100% no-repeat;
        margin-right: 5px;
    }

    .info {
        font-size: 12px;
        font-weight: 300;
        color: rgba(153, 156, 160, 1);
        transform: translateY(-.6px);
    }

    .flex {
        display: flex;
        align-items: center;
    }

    .avatar {
        height: 17px;
        width: 17px;
        border-radius: 50%;
        border: solid 1px white;
        box-shadow: 0px 2px 15px rgba(0, 0, 0, 0.1);
        margin-right: 5px;
        background: center center / 100% no-repeat;
        background-color: rgba(217, 217, 217, 1);
    }

    .button-box {
        margin-top: 20px;
        margin-left: 20px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: calc(100vw - 40px);
        height: 60px;
        border-radius: 6px;

    }

    .button {
        height: 60px;
        width: 60px;
        border-radius: 50%;
        border: 3px solid #FFFFFF;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    }
</style>