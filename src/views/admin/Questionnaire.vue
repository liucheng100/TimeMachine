<template>
    <div class="questionnaire">
        <div class="top">
            <div class="back" @click="back">
                <img src="../../assets/backArray.svg">
                <div class="backFont">返回</div>
            </div>
        </div>
        <div class="title">问卷收集</div>
        <div class="hint">你正在收集的是{{campTitle}}的奖品</div>
        <div class="hintURL">收集链接</div>
        <input class="inputURL" type="text" v-model="questionnaireURL" placeholder="问卷星/腾讯问卷">
        <button class="bigButton" @click="submit">
            <p>提交</p>
        </button>
        <Pop :ON="popConfirm" :model="0" title="确认要开始收集吗" tip="此操作无法被撤销。" :options="{black:'',grey:'取消',blue:'开始收集'}"
            @blackClick="0" @greyClick="popConfirm = false" @blueClick="confirmSubmit">
        </Pop>
        <Pop :ON="popError" :model="0" title="无法开始收集" tip="请先配置获奖作品。" :options="{black:'',grey:'',blue:'返回'}"
            @blackClick="0" @greyClick="" @blueClick="popError = false">
        </Pop>
    </div>
</template>

<script>
    export default {
        name: "Questionnaire",
        props: {
        },
        data() {
            return {
                campTitle: "第23届方寸·流年摄影大赛",
                questionnaireURL: "",
                setPrize: false,
                popConfirm: false,
                popError: false,
            }
        },
        methods: {
            back() {
                this.$router.push("/admin/management")
            },
            submit() {
                if (this.setPrize) { this.popConfirm = true }
                else { this.popError = true }

            },
            confirmSubmit() {
                this.popConfirm = false
            }
        },
        mounted() {
        },
    }
</script>


<style scoped>
    /* .questionnaire {} */

    .top {
        height: 64px;
        width: 100%;
        padding-top: 21px;
        padding-left: 14px;
    }

    .back {
        display: flex;
        align-items: center;
    }

    .back img {
        height: 24px;
        width: 24px;
    }

    .backFont {
        color: #4E46B4;
        height: 22px;
        font-size: 16px;
        /* width: 32px; */
    }

    .title {
        margin-left: 20px;
        font-size: 32px;
        color: #000;
        font-weight: 500;
        height: 45px;
        /* width: 128px; */
    }

    .hint {
        color: #4E46B4;
        font-size: 20px;
        margin-top: 20px;
        margin-left: 20px;
        margin-right: 20px;
    }

    .hintURL {
        color: #4E46B4;
        font-size: 20px;
        margin-top: 20px;
        margin-left: 20px;
    }

    .inputURL {
        margin-top: 10px;
        margin-left: 20px;
        width: calc(100% - 40px);
        box-shadow: 0px 2px 15px rgba(0, 0, 0, 0.1);
        border: none;
        height: 48px;
        border-radius: 6px;
        outline: none;
        padding: 10px;
    }

    .bigButton {
        margin-top: 20px;
        margin-left: 20px;
        width: calc(100% - 40px);
        height: 48px;
        outline: none;
        border: none;
        border-radius: 6px;
        background-color: #4E46B4;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .bigButton p {
        font-size: 20px;
        color: #fff;
    }
</style>