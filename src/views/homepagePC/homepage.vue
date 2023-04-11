<template>
    <div class="homepage-pc">
        <img v-for="item in img_data_front" :src="NewURL(item.src)" class="big-img" />
        <div class="other-box">
            <p class="box-title">奖项设置</p>
            <div v-for="item in medal_setting" class="medal-setting">
                <div class="medal-title">
                    <img src="../../assets/text-left.svg" class="text-icon" />
                    <p>{{ item.title }}</p>
                    <img src="../../assets/text-right.svg" class="text-icon" />
                </div>
                <div class="medal-content">
                    <div class="medal-single" v-for="child in item.medal">
                        <div class="square"></div>
                        <p class="prize-name">{{ child.prize_name }}</p>
                        <p class="prize-member">{{ child.medal_name }} / {{ child.member }} 名</p>
                    </div>
                </div>
            </div>
        </div>
        <img v-for="item in img_data_behind" :src="NewURL(item.src)" class="big-img" />
    </div>
</template>
<script setup>
    import pubuse from '@/utils/pub-use'

    const img_data_front = [
        {
            src: "https://img1.imgtp.com/2023/04/05/R59i1bhz.jpg"
        },
        {
            src: "https://img1.imgtp.com/2023/04/05/cRlnczeS.jpeg"
        }
    ]

    const img_data_behind = [
        {
            src: "https://img1.imgtp.com/2023/04/05/R59i1bhz.jpg"
        },
        {
            src: "https://img1.imgtp.com/2023/04/05/cRlnczeS.jpeg"
        }
    ]

    const medal_setting = [
        {
            title: "单反组",
            medal: [
                { prize_name: "DJI POCKET 2", member: 0, medal_name: "一等奖", img_url: "" },
                { prize_name: "DJI POCKET 2", member: 0, medal_name: "一等奖", img_url: "" },
                { prize_name: "DJI POCKET 2", member: 0, medal_name: "一等奖", img_url: "" },
                { prize_name: "DJI POCKET 2", member: 0, medal_name: "一等奖", img_url: "" }
            ]
        },
        {
            title: "单反组",
            medal: [
                { prize_name: "DJI POCKET 2", member: 0, medal_name: "一等奖", img_url: "" },
                { prize_name: "DJI POCKET 2", member: 0, medal_name: "一等奖", img_url: "" },
                { prize_name: "DJI POCKET 2", member: 0, medal_name: "一等奖", img_url: "" },
                { prize_name: "DJI POCKET 2", member: 0, medal_name: "一等奖", img_url: "" }
            ]
        },
        {
            title: "单反组",
            medal: [
                { prize_name: "DJI POCKET 2", member: 0, medal_name: "一等奖", img_url: "" },
                { prize_name: "DJI POCKET 2", member: 0, medal_name: "一等奖", img_url: "" },
                { prize_name: "DJI POCKET 2", member: 0, medal_name: "一等奖", img_url: "" },
                { prize_name: "DJI POCKET 2", member: 0, medal_name: "一等奖", img_url: "" }
            ]
        },
        {
            title: "单反组",
            medal: [
                { prize_name: "DJI POCKET 2", member: 0, medal_name: "一等奖", img_url: "" },
                { prize_name: "DJI POCKET 2", member: 0, medal_name: "一等奖", img_url: "" },
                { prize_name: "DJI POCKET 2", member: 0, medal_name: "一等奖", img_url: "" },
                { prize_name: "DJI POCKET 2", member: 0, medal_name: "一等奖", img_url: "" }
            ]
        }
    ]
    function NewURL(url) {
        return new URL(url);
    }
</script>
<style scoped>
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