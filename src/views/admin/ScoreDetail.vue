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
                    <div class="status"></div>
                </div>
            </div>
        </div>
        <div class="score">
            <img v-for="(item,index) in stars" :key="item" @mouseover="changeColorHover(index)"
                @click="changeColorClick();" @mouseleave="changeColorLeave()" src="@/assets/star.svg" class="star" />
            <img v-for="(item,index) in stars_none" :key="item" @mouseover="changeColorHover(index + stars.length)"
                src="@/assets/star-none.svg" class="star" />
        </div>
        <div class="button-box">
            <button class="button" :style="{ background:'#FF4E6450' }" @click="delWork">
                <img src="@/assets/trash-2.svg" />
            </button>
            <button class="button" :style="{ background:'#F5F5F5' }" @click="$router.push({
                path: '/admin/score',
            })">
                <img src="@/assets/arrow-left.svg" />
            </button>
            <button class="button" :style="{ background:'#F5F5F5' }">
                <img src="@/assets/download.svg" />
            </button>
            <button class="button" :style="{ background:'#FFD33750' }">
                <img src="@/assets/award.svg" @click="ON_choose = true" />
            </button>
        </div>
        <Transition name="fade">
            <div class="pop-choose-medal" v-show="ON_choose">
                <p class="group-medal">设为获奖作品-{{"单反组"}}</p>
                <button v-for="item in awards" :key="item.name" class="medal-setting-num"
                    :style="item.remaining ? award_yes : award_no">
                    {{ item.name }}/余{{ item.remaining }}
                </button>
                <button class="medal-setting-num no-award">无奖项</button>
                <button class="button-confirm grey-btn" @click="ON_choose = false">取消</button>
                <button class="button-confirm blue-btn" @click="ON_choose = false, ON_setting = true">提交</button>
            </div>
        </Transition>

        <Pop :ON="ON_setting" :model="0" :title="`确定要设置为${awards[0].name}吗?`"
            :tip="`设置后剩余${awards[0].remaining - 1}个名额`" :options="{black:'',grey:'取消',blue:'设置'}" @blackClick="0"
            @greyClick="ON_setting=false" @blueClick="ON_setting = false, ON_refresh = true" />
        <Pop :ON="ON_refresh" :model="1" title="奖项已提交" tip="请刷新此网页" :options="{black:'',grey:'',blue:'完成'}"
            @blackClick="0" @greyClick="0" @blueClick="ON_refresh=false" />
        <Pop :ON="ON_error" :model="0" title="无法设置奖项" tip="该奖项没有获奖名额" :options="{black:'',grey:'',blue:'返回'}"
            @blackClick="0" @greyClick="0" @blueClick="ON_error=false" />
        <Transition name="fade">
            <div class="mask" v-show="ON_choose"></div>
        </Transition>
    </div>
</template>

<script>
    import { getUnExamined, pass, unPass } from "@/api/examine"
    import { uploadScore, getScoreWorks } from "@/api/score"
    import { contesting } from "@/api/contest"
    import { workDetail } from "@/api/work"
    import { getSrc, uploadFile, } from '@/api/file'
    import pubuse from '@/utils/pub-use'

    export default {
        name: "ScoreDetail",
        props: {
        },
        data() {
            return {
                workId: -1,
                lastWorkId: -1,
                nextWorkId: -1,
                contestId: -1,
                score: -1,
                work: { workTitle: '作品', auth: '城市作画', avatar: '', views: '1071', cover: '', description: '作品简介作品简介', contestGroup: 1 },
                awards:
                    [
                        { name: "一等奖", remaining: 1 },
                        { name: "一等奖", remaining: 1 },
                        { name: "一等奖", remaining: 0 },
                        { name: "一等奖", remaining: 1 },
                    ],
                ON_choose: false,
                ON_setting: false,
                ON_refresh: false,
                ON_error: false,
                //stars.length 就是星星数量
                stars: [],
                stars_none: [{}, {}, {}, {}, {}],
                stars_none_old: [],
                stars_old: [],
                click: false,
                award_yes: {
                    background: "#FFFFFF",
                    color: "#4E46B4"
                },
                award_no: {
                    background: "#999CA0",
                    color: "#FFFFFF"
                }
            }
        },
        methods: {
            delWork() {
                let x = []
                x.push(this.workId)
                unPass(x)
                this.$router.push({
                    path: '/admin/score',
                })
            },
            changeColorHover: function (index) {
                let length = index + 1;
                this.score = index + 1
                this.stars_old = this.stars;
                this.stars_none_old = this.stars_none;
                this.stars.length = 0;
                this.stars_none.length = 0;
                for (let a = 0; a < length; a++)this.stars.push({});
                for (let a = 0; a < 5 - length; a++)this.stars_none.push({});
                let p = { score: this.score, workId: this.workId }
                uploadScore(p)
                    .then(res => {
                        if (this.nextWorkId != -1) {
                            console.log(11)
                            // this.$router.push({
                            //     path: '/admin/scoreDetail',
                            //     query: { workId: this.nextWorkId, lastWorkId: this.workId }
                            // })
                            this.lastWorkId = this.workId
                            this.workId = this.nextWorkId
                            this.stars_none = [{}, {}, {}, {}, {}]
                            this.stars_none_old = [],
                                this.refresh()
                        } else {
                            this.$router.push({
                                path: '/admin/score',
                            })
                        }
                    })
            },
            changeColorLeave: function () {
                if (!this.click) {
                    this.stars = this.stars_old;
                    this.stars_none = this.stars_none_old;
                }
                this.click = false;
            },
            changeColorClick: function () {
                this.changeColorHover();
                this.click = true;
            },
            replaceBlob(tarObject, attrList) {
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
            refresh() {
                contesting().then(v => {
                    if (!v.code) {
                        this.contestId = v.data.contestId
                        getScoreWorks({
                            contestId: this.contestId,
                            pageNum: 1,
                            pageSize: 10,
                        }).then(v => {
                            console.log(v)
                            if (v.data[1]) {
                                this.nextWorkId = v.data[1].workId
                            } else {
                                this.nextWorkId = -1
                            }
                        })
                    }
                })
                workDetail(this.workId).then(v => {
                    if (!v.code) {
                        console.log(v.data)
                        this.work.workTitle = v.data.workTitle
                        this.work.description = v.data.description
                        this.work.avatar = v.data.makerAvatar
                        this.work.views = v.data.views
                        this.work.cover = v.data.coverFile
                        this.contestGroup = v.data.contestGroup
                        this.replaceBlob(this.work, ['cover',])
                    }
                })
            }
        },
        mounted() {
            this.workId = this.$route.query.workId
            if (this.$route.query.lastWorkId) {
                this.lastWorkId = this.$route.query.lastWorkId
            }
            this.refresh()

        },
    }
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

    .score {
        margin-top: 20px;
        margin-left: 20px;
        display: flex;
        flex-direction: row;

        width: calc(100vw - 40px);
        height: 55px;
        border-radius: 6px;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
        align-items: center;
    }

    .star {
        margin: 5px;
        height: 25px;
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

    .pop-choose-medal {
        position: fixed;
        top: 15%;
        width: 90%;
        height: 55%;
        left: 5%;
        background: #FFFFFF;
        box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
        padding: 10px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;
        border-radius: 5px;
        z-index: 100;
    }

    .group-medal {
        width: 100%;
        font-size: 25px;
        font-weight: bold;
        color: #000000;
        display: flex;
        align-items: center;
        height: 15%;

    }

    .medal-setting-num {
        width: 45%;
        height: 15%;
        border: 0;
        border-radius: 5px;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
        font-size: 20px;
        font-weight: bold;
    }

    .no-award {
        width: 100%;
        background: #FFFFFF;
        color: #4E46B4;
    }

    .button-confirm {
        height: 48px;
        width: 147px;
        border-radius: 6px;
        color: white;
        font-weight: 400;
        font-size: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 0;
    }

    .grey-btn {
        background-color: #999CA0;
        margin-right: 20px;
    }

    .blue-btn {
        background-color: #4E46B4;
        flex: 1;
    }

    .mask {
        height: 100%;
        width: 100%;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 10;
        background: rgba(31, 31, 31, .5)
    }
</style>