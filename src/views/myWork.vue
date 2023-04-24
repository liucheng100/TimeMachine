<template>
    <div class="myWork">
        <div class="top">
            <div class="title-main">我的投稿</div>
            <div @click="pop4 = true" class="flex">
                <div class="auth">{{ info.nickname || '点击可设置昵称' }}</div>
                <div class="avatar" :style="{ backgroundImage: `url('${info.avatar}')` }"></div>
            </div>
        </div>
        <div class="cards">
            <div @click="$router.push({
                path: '/workDetail',
                query:{workId:item.workId}
            })" class="card-work" v-for="(item, i) in works">
                <div class="cover" :style="{ backgroundImage: `url('${item.coverFile}')` }"></div>
                <div class="bot">
                    <div class="title">
                        {{ item.workTitle }}
                    </div>
                    <div class="bar">
                        <div class="time">{{ groupType(item.contestGroup) }}</div>
                        <div class="flex">
                            <div class="eye"></div>
                            <div class="info">{{ item.views }}</div>
                        </div>
                    </div>
                    <div class="bar" v-if="!item.prizeId">
                        <div class="status">{{ pass(item.isPass) }}</div>
                        <div class="flex">
                            <div class="del"></div>
                            <div @click.stop="deleteWork(item.workId)" class="info">删除</div>
                        </div>
                    </div>
                    <div class="bar" v-if="item.prizeId">
                        <div class="status_prized">{{ item.prizeName }}</div>
                        <div class="ques" @click.stop="beReward">填写收货信息</div>
                    </div>
                </div>
            </div>
        </div>
        <Pop :ON="pop1" :model="0" title="确认要删除吗" tip="此操作无法被撤销。" :options="{ black: '', grey: '删除', blue: '取消' }"
            @blackClick="0" @blueClick="pop1 = false" @greyClick="removeWork">
        </Pop>
        <Pop :ON="pop2" :model="1" title="稿件已删除" tip="请刷新网页" :options="{ black: '', grey: '', blue: '完成' }"
            @blackClick="0" @blueClick="pop2 = false; $router.go(0)" @greyClick="0">
        </Pop>
        <Pop :ON="pop3" :model="2" title="删除不成功" tip="请检查网络或联系管理员" :options="{ black: '', grey: '', blue: '返回' }"
            @blackClick="0" @blueClick="pop3 = false" @greyClick="0">
        </Pop>
        <teleport to="body">
            <transition name="fade">
                <div class="pop" v-show="pop4">
                    <transition name="pop">
                        <div v-if="pop4" class="box">
                            <div class="icon" :style="{ backgroundImage: `url('${popIcon}')` }"></div>
                            <div class="title-pop">
                                修改昵称
                            </div>
                            <div class="tip">
                                请遵守相关法律法规。
                            </div>
                            <div class="input-bar">
                                <el-input v-model="newNickname" placeholder="输入昵称..." class="art-name-input">
                                </el-input>
                            </div>
                            <div class="btn-bar">
                                <div @click="changeName" class="btn black-btn">
                                    修改
                                </div>
                                <div @click="pop4 = false" class="btn blue-btn">
                                    返回
                                </div>
                            </div>
                        </div>
                    </transition>
                </div>
            </transition>
        </teleport>
    </div>
</template>

<script>
    import { getPrize, } from '@/api/prize'
    import { getUserInfo, updateInfo, } from '@/api/login'
    import { getUserId, } from '@/utils/auth'
    import { workList, removeWork, } from '@/api/work'
    import pubuse from '@/utils/pub-use'
    import { contesting, } from '@/api/contest'
    import { getSrc, uploadFile, } from '@/api/file'
    export default {
        name: "myWork",
        props: {
        },
        data() {
            return {
                works: [
                    // { title: "我的作品", isPass: 0, prizeId: 0, Pic: "../../assets/admin/testpic.jpg", Time: "2023-08-24T14:15:22", view: 2123 },
                    // { title: "我的作品", isPass: 1, prizeId: 0, Pic: "../../assets/admin/testpic.jpg", Time: "2023-05-24T14:15:22", view: 2123 },
                    // { title: "我的作品", isPass: 2, prizeId: 0, Pic: "../../assets/admin/testpic.jpg", Time: "2021-08-24T14:15:22", view: 2123 },
                    // { title: "我的作品", isPass: 2, prizeId: 1, Pic: "../../assets/admin/testpic.jpg", Time: "2019-08-24T14:15:22", view: 2123 },
                ],
                contest: {},
                info: {},
                waitingForRemove: -1,
                pop1: false,
                pop2: false,
                pop3: false,
                pop4: false,
                newNickname: '',
            }
        },
        computed: {
            popIcon() {
                return pubuse('warnCircle.svg')
            }
        },
        methods: {
            changeName() {
                if (!this.newNickname) {
                    ElMessage.info('不能为空')
                    return
                }
                updateInfo({
                    userId: this.info.userId,
                    avatar: this.info.avatar,
                    nickname: this.newNickname
                }).then(v => {
                    // console.log(v)
                    if (!v.code) {
                        ElMessage.success('修改成功')
                        this.pop4 = false
                        getUserInfo(getUserId()).then(v => {
                            // console.log(v)
                            if (!v.code) {
                                this.info = v.data
                            }
                        }).catch(err => { ElMessage.error('出错了') })
                    }
                })
            },
            deleteWork(workId) {
                this.waitingForRemove = workId
                this.pop1 = true
            },
            removeWork() {
                removeWork(this.waitingForRemove).then(v => {
                    // console.log(v)
                    if (!v.code) {
                        ElMessage.success('删除成功')
                        this.pop2 = true
                    } else {
                        ElMessage.success('删除失败')
                        this.pop3 = true
                    }
                }).catch(err => {
                    ElMessage.success('删除失败')
                    this.pop3 = true
                })
                this.pop1 = false
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
            groupType(i) {
                if (i == 1) return '单反组'
                else if (i == 2) return '随手拍'
                else if (i == 3) return "短视频"
                else return "AI组"
            },
            pass(i) {
                if (i == 0) { return "未审核" }
                else if (i == 1) { return "已通过" }
                else if (i == 2) { return "未通过" }
            },
            prize(i) {
                // if (this.works[i].prizeId == 0) { return "未获奖" }
                // else {
                //     getPrize(this.works[i].prizeId).then(w => {
                //         return w.data.prizeName
                //     })
                // }
            },
            replaceBlob(tarObject, attrList) {
                attrList.forEach(attr => {
                    getSrc(tarObject[attr]).then(v => {
                        // console.log(v)
                        tarObject[attr] = v
                        this.$forceUpdate()
                    }).catch(err => {
                        ElMessage.error('图片加载失败')
                    })
                    tarObject[attr] = pubuse('loading.gif')
                });
            },
            beReward() {
                let questionnaire = this.contest.questionnaire
                // console.log(questionnaire)
                window.open(questionnaire, '_blank');
            }
        },
        mounted() {
            contesting().then(v => {
                // console.log(101, v)
                if (!v.code) {
                    this.contest = v.data
                    // console.log(this.contest)
                } else {
                    ElMessage.error(v.msg)
                }
            })
            workList(getUserId()).then(v => {
                if (!v.code) {
                    this.works = v.data
                    this.works.forEach(ele => {
                        this.replaceBlob(ele, [
                            'coverFile',
                        ])
                    });
                    // console.log(1123, this.works)
                }
            }).catch(err => {
                ElMessage.error('请刷新')
            })
            getUserInfo(getUserId()).then(v => {
                // console.log(v)
                if (!v.code) {
                    this.info = v.data
                }
            }).catch(err => { ElMessage.error('出错了') })

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
        /* width: 128px; */
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
        /* height: 252px; */
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
        flex: 1;
        flex-direction: column;
        justify-content: space-between;
    }

    .time {
        /* height: 17px; */
        font-size: 12px;
        color: #999CA0;
        /* display: flex; */
        /* align-items: center; */
    }

    .title {
        font-size: 16px;
        color: rgba(31, 31, 31, 1);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        flex-shrink: 0;
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

    .pop {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 99;
        height: 100vh;
        width: 100vw;
        /* padding-top: var(--nav-height); */
        display: flex;
        justify-content: center;
        align-items: center;
        background: rgba(31, 31, 31, .5);
        transition: .2s;
        user-select: none;
    }

    .box {
        padding: 20px;
        background-color: #fff;
        width: 353px;
        /* height: 233px; */
        filter: drop-shadow(0px 2px 30px rgba(0, 0, 0, 0.1));
        max-width: 95vw;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        border-radius: 6px;
        transition: .3s;
    }

    .icon {
        height: 48px;
        width: 48px;
        margin-bottom: 20px;
        background: center center / 100% no-repeat;
    }

    .title-pop {
        margin-bottom: 10px;
        height: 34px;
        font-size: 24px;
        font-weight: 500;
        color: #1F1F1F;
    }

    .tip {
        margin-bottom: 20px;
        height: 17px;
        font-size: 12px;
        font-weight: 300;
        color: #999CA0;
    }

    .btn-bar {
        display: flex;
        height: 48px;
        width: 100%;
    }

    .btn {
        height: 48px;
        width: 147px;
        border-radius: 6px;
        color: white;
        font-weight: 400;
        font-size: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .black-btn {
        background-color: #444444;
        margin-right: 20px;
    }

    .grey-btn {
        background-color: #999CA0;
        margin-right: 20px;
    }

    .blue-btn {
        background-color: #4E46B4;
        flex: 1;
    }

    .fade-enter-from,
    .fade-leave-to {
        opacity: .0;
        /* transform: rotate3d(0,0,1,60deg); */
    }

    .pop-enter-from,
    .pop-leave-to {
        transform: translateY(20%);
        /* transform: rotate3d(0,0,1,60deg); */
    }

    .input-bar {
        display: flex;
        height: 48px;
        width: 100%;
        margin-bottom: 20px;
    }

    .art-name-input {
        height: 48px;
        font-size: 12px;
        margin-bottom: 20px;
        width: 100%;
        background: #FFFFFF;
        /* Mid-shadow */
        box-shadow: 0px 2px 30px rgba(0, 0, 0, 0.1);
        border-radius: 6px;
    }
</style>