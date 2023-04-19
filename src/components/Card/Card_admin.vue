<template>
    <div class="card">
        <div class="cover" :style="{backgroundImage: `url('${cover}')`}"></div>
        <div class="bot">
            <div class="bar">
                <div class="title">
                    {{ title }}
                </div>
                <div class="info">均分 {{ score }}</div>
            </div>
            <div class="bar">
                <div class="flex">
                    <div class="avatar" :style="{backgroundImage: `url('${avatar}')`}"></div>
                    <div class="info">{{ auth }}</div>
                </div>
                <div class="flex">
                    <div class="eye"></div>
                    <div class="info">{{ hot }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Card_admin",
        props: {
            title: {
                type: String,
            },
            auth: {
                type: String,
            },
            avatar: {
                type: String,
            },
            cover: {
                type: String,
            },
            hot: {
                type: [String, Number],
            },
            score: {
                type: Number,
            },
        },
        data() {
            return {

            }
        },
        methods: {

        },
        mounted() {


        },

    }
</script>


<style scoped>
    .card {
        width: calc(100vw - 40px);
        margin-bottom: 20px;
        margin-top: 20px;
        height: 230px;
        margin-left: 20px;
        display: flex;
        flex-direction: column;
        border-radius: 6px;
        overflow: hidden;
        background-color: #fff;
        box-shadow: 0px 2px 30px rgba(0, 0, 0, 0.1);

    }

    .cover {
        height: 166px;
        background: center center / 100% no-repeat;
        background-color: #53517742;
    }

    .bot {
        height: 64px;
        padding: 10px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .title {
        font-size: 16px;
        color: rgba(31, 31, 31, 1);
    }

    .bar {
        display: flex;
        justify-content: space-between;
        align-items: center;
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
</style>