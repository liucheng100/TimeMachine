<template>
    <div class="new-competition">
        <div class="submit-main-picture" @click="upload('main-picture')">
            <img src="@/assets/folderPlus.svg" class="submit-picture" />
            <p class="title">上传主图</p>
            <p class="detail">16:9比例，建议为1920*1080</p>
            <input class="upload-file" type="file" />
        </div>
        <div class="text-input">
            <p class="title">标题</p>
            <input type="text" placeholder="主题名称" class="input-content" />
        </div>
        <div class="text-input">
            <p class="title">副标题</p>
            <input type="text" placeholder="届数与其他信息" class="input-content" />
        </div>
        <div class="text-input">
            <p class="title">赛事投稿时间</p>
            <input type="text" placeholder="格式为YYYY/MM/DD-YYYY/MM/DD，中间无空格" class="input-content" />
        </div>
        <div class="competition-state">
            <div class="state-title">
                <p class="title">赛事状态</p>
                <p class="detail">*在赛事投稿时间结束后会默认进入评审中</p>
            </div>
            <TabMagic :id="2" backColor="transparent" :title_list="['评审中', '已结束', '其他状态']" @tab0Click="state_id = 0"
                @tab1Click="state_id = 1" @tab2Click="state_id = 2" />
        </div>
        <p class="title intro">赛事介绍</p>
        <div class="submit-main-picture" @click="upload('description-picture')">
            <img src="@/assets/folderPlus.svg" class="submit-picture" />
            <p class="title">上传长图</p>
            <p class="detail">请在奖项设置前切图</p>
        </div>
        <div class="medal-setting">
            <TabMagic :id="3" backColor="transparent" :title_list="['单反组', '随手拍组', '短视频组']" @tab0Click="state_part = 0"
                @tab1Click="state_part = 1" @tab2Click="state_part = 2">
                <template v-slot:tab0>
                    <div class="prize-box">
                        <PartPrize v-for="(item, index) in prizes[0]" :key="item.prize_name" :prize_name="item.prize_name"
                            :medal_name="item.medal_name" :medal_member="item.medal_member"
                            @click="prizeSettingOpen(index, 0)"></PartPrize>
                    </div>
                </template>
                <template v-slot:tab1>
                    <div class="prize-box">
                        <PartPrize v-for="item in prizes[1]" :key="item.prize_name" :prize_name="item.prize_name"
                            :medal_name="item.medal_name" :medal_member="item.medal_member"></PartPrize>
                    </div>
                </template>
                <template v-slot:tab2>
                    <div class="prize-box">
                        <PartPrize v-for="item in prizes[2]" :key="item.prize_name" :prize_name="item.prize_name"
                            :medal_name="item.medal_name" :medal_member="item.medal_member"></PartPrize>
                    </div>
                </template>
            </TabMagic>
        </div>
        <div class="submit-main-picture" @click="upload('end-picture')">
            <img src="@/assets/folderPlus.svg" class="submit-picture" />
            <p class="title">上传长图</p>
            <p class="detail">请在奖项设置前切图</p>
        </div>
        
        <button class="submit">提交</button>

        <transition name="fade">
            <div class="mask" v-show="if_mask_layer" @click="if_mask_layer = !if_mask_layer"></div>
        </transition>
        <transition name="pop">
            <div class="medal" v-show="if_mask_layer">
                <div class="text-input">
                    <p class="title pop-title">奖项名称</p>
                    <input type="text" placeholder="如一等奖" class="input-content" v-model="medal_setting.medal_name" />
                </div>
                <div class="text-input">
                    <p class="title pop-title">奖项人数</p>
                    <input type="number" placeholder="只填阿拉伯数字" class="input-content" v-model="medal_setting.medal_member" />
                </div>
                <div class="text-input">
                    <p class="title pop-title">奖品名称</p>
                    <input type="text" placeholder="如DJI Pocket" class="input-content" v-model="medal_setting.prize_name" />
                </div>
                <div class="text-input">
                    <p class="title pop-title">奖品链接</p>
                    <input type="text" placeholder="京东自营链接（选填）" class="input-content" />
                </div>
                <div class="text-input">
                    <p class="title pop-title">奖品图片</p>
                    <div class="submit-sub-picture">
                        <img src="@/assets/folderPlus.svg" class="submit-picture" />
                        <p class="title">上传图片</p>
                    </div>
                </div>
                <button class="submit" @click="ON = !ON">提交</button>
            </div>
        </transition>

        <Pop :ON="ON" :model="0" title="确认要提交奖品吗?" tip="请确认信息无误" :options="{ black: '', grey: '取消', blue: '提交' }"
            @blackClick="0" @greyClick="ON = false" @blueClick="prizeSetting()">
        </Pop>

        <Pop :ON="ON_2" :model="1" title="奖品已提交" tip="请刷新此网页" :options="{ black: '', grey: '', blue: '完成' }" @blackClick="0"
            @greyClick="0" @blueClick="this.ON_2 = !this.ON_2">
        </Pop>
        <div :class="isSafari ? 'footer' : ''"></div>
    </div>
</template>
<script>
import { isSafari } from "@/utils/common";
export default {
    name: "new-competition",
    data() {
        return {
            ON: false,
            ON_2: false,
            main_picture: undefined,
            heading: "",
            subtitle: "",
            submit_time: "",
            state_id: 0,
            competition_introduction: undefined,
            state_part: 0,
            medal_setting: {
                medal_name: "",
                medal_member: 1,
                prize_name: "",
                prize_link: "",
                id: 0,
                group: 0,
            },
            formdata: [
                {
                    workTitle: "",
                    description: "",
                    workFile: 0,
                    contestGroup: 1,
                    contestId: -1,
                },
                {
                    workTitle: "",
                    description: "",
                    workFile: 0,
                    contestGroup: 1,
                    contestId: -1,
                },
                {
                    workTitle: "",
                    description: "",
                    workFile: 0,
                    contestGroup: 1,
                    contestId: -1,
                },
            ],
            password: "",
            if_mask_layer: false,
            prizes: [
                [
                    { prize_name: "奖品名称", medal_name: "奖项名称", medal_member: 10 },
                    { prize_name: "奖品名称", medal_name: "奖项名称", medal_member: 10 },
                    { prize_name: "奖品名称", medal_name: "奖项名称", medal_member: 10 },
                    { prize_name: "奖品名称", medal_name: "奖项名称", medal_member: 10 },
                ],
                [
                    { prize_name: "奖品名称", medal_name: "奖项名称", medal_member: 10 },
                    { prize_name: "奖品名称", medal_name: "奖项名称", medal_member: 10 },
                    { prize_name: "奖品名称", medal_name: "奖项名称", medal_member: 10 },
                    { prize_name: "奖品名称", medal_name: "奖项名称", medal_member: 10 },
                ],
                [
                    { prize_name: "奖品名称", medal_name: "奖项名称", medal_member: 10 },
                    { prize_name: "奖品名称", medal_name: "奖项名称", medal_member: 10 },
                    { prize_name: "奖品名称", medal_name: "奖项名称", medal_member: 10 },
                    { prize_name: "奖品名称", medal_name: "奖项名称", medal_member: 10 },
                ],
            ],
            isSafari: true,
        };
    },
    methods: {
        prizeSettingOpen(i, group) {
            this.if_mask_layer = !this.if_mask_layer;
            this.medal_setting.id = i;
            this.medal_setting.group = group;
        },
        prizeSetting() {
            this.prizes[this.medal_setting.group][this.medal_setting.id].prize_name =
                this.medal_setting.prize_name;
            this.prizes[this.medal_setting.group][this.medal_setting.id].medal_name =
                this.medal_setting.medal_name;
            this.prizes[this.medal_setting.group][
                this.medal_setting.id
            ].medal_member = this.medal_setting.medal_member;
            this.if_mask_layer = !this.if_mask_layer;
            this.ON = !this.ON;
            this.ON_2 = !this.ON_2;
        },
        uploadMulti(name) {    
            switch (name) {
                case "main-picture": {
                    group = 0;
                }
                case "description-picture": {
                    group = 1;
                }
                case "end-picture": {
                    group = 2;
                }
                default:
            }
        },
        upload_t(i){
            let input = document.createElement('input')
            input.setAttribute('type', 'file')
            input.setAttribute("accept", "image/*")
            input.click()

            input.onchange = (e) => {
                    let file = e.target.files[0]
                    file = new window.File([file], file.name, { type: file.type })
                    let formData = new FormData();
                    formData.append('file', file)
                    let blob = window.URL.createObjectURL(file)
                    this.source = blob

                    uploadFile_t(formData).then(v => {
                        console.log(v);
                        if (!v.code) {
                            ElMessage.success('上传成功')
                            
                                let naturalHeight = this.$refs.sourceImg.naturalHeight
                                let naturalWidth = this.$refs.sourceImg.naturalWidth
                                // console.log(naturalHeight,naturalWidth)
                                let rate = naturalHeight / naturalWidth
                                // follow!
                                let W = this.$refs.sourceImg.offsetWidth
                                this.xheight = rate * W
                                this.formdata.workFile = v.data
                                this.source = concatSrc(v.data)
                        }
                        else {
                            ElMessage.error('上传失败请重试')
                        }
                    }).catch(err => {
                        ElMessage.error('上传失败请重试' + err)
                        console.log(err)
                    })
            }
        },
        removeWork() {
                this.pop3 = false
                this.source = this.xheight = this.formdata.workFile = ''
                this.net_event_id++;
            },
            upload(i) {
                if (this.formdata[i].workFile) {
                    this.pop4 = true
                    return;
                }
                this.save_the_event_id++;
                let input = document.createElement('input')
                input.setAttribute('type', 'file')
                if (this.formdata.contestGroup == 3) {
                    input.setAttribute('accept', "video/*")
                } else {
                    input.setAttribute('accept', "image/*")
                }
                input.click();

                input.onchange = (e) => {
                    // console.log(e.target.files[0])
                    let save_the_event_id = this.net_event_id
                    let file = e.target.files[0]
                    // file = new window.File([file], file.name.slice(0, 9), { type: file.type })
                    file = new window.File([file], file.name, { type: file.type })
                    // alert(file.type)
                    let formData = new FormData();
                    formData.append('file', file)
                    let blob = window.URL.createObjectURL(file)
                    this.source = blob
                    this.loading = true

                    uploadFile_t(formData).then(v => {
                        if (save_the_event_id != this.net_event_id) {
                            return
                        }
                        console.log(v)
                        if (!v.code) {
                            ElMessage.success('上传成功')
                            if (this.contestgroup != 3) {
                                let naturalHeight = this.$refs.sourceImg.naturalHeight
                                let naturalWidth = this.$refs.sourceImg.naturalWidth
                                // console.log(naturalHeight,naturalWidth)
                                let rate = naturalHeight / naturalWidth
                                // follow!
                                let W = this.$refs.sourceImg.offsetWidth
                                this.xheight = rate * W
                                this.formdata.workFile = v.data
                                this.source = concatSrc(v.data)
                                this.loading = false
                            } else {
                                this.formdata.workFile = v.data
                                this.source = concatSrc(v.data)
                                // this.loading = false
                                this.$refs.videoEle.addEventListener('loadeddata', () => {
                                    let naturalHeight = this.$refs.videoEle.videoHeight
                                    let naturalWidth = this.$refs.videoEle.videoWidth
                                    let rate = naturalHeight / naturalWidth
                                    let W = this.$refs.videoEle.offsetWidth
                                    this.xheight = rate * W
                                    setTimeout(() => {
                                        this.loading = false
                                    }, 1000);
                                });
                            }

                        } else {
                            ElMessage.error('上传失败请重试')
                        }
                    }).catch(err => {
                        ElMessage.error('上传失败请重试' + err)
                        console.log(err)
                    })

                }
            }
    },
    mounted() {
        this.isSafari = isSafari();
    },
};
</script>
<style scoped>
.new-competition {
    background: #e5e5e540;
    width: 100%;
}

.submit-main-picture {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 25vh;
    margin: 2vh;
    background: #ffffff;
    box-shadow: 0 0 1vh 1vh rgba(0, 0, 0, 0.05);
    border-radius: 0.8vh;
}

.submit-sub-picture {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 15vh;
    width: 15vh;
    margin-top: 2vh;
    background: #ffffff;
    box-shadow: 0 0 1vh 1vh rgba(0, 0, 0, 0.05);
    border-radius: 0.8vh;
}

.title {
    color: #4e46b4;
    font-size: 2.8vh;
    margin: 0.6vh;
    margin-top: 0.8vh;
}

.detail {
    color: #999ca0;
    font-size: 0.6vh;
}

.text-input {
    margin: 2vh;
}

.input-content {
    border: 0;
    height: 6vh;
    width: 100%;
    padding: 2vh;
    box-shadow: 0 0 1vh 1vh rgba(0, 0, 0, 0.05);
    border-radius: 0.8vh;
    margin-top: 1vh;
    color: #999ca0;
    font-size: 0.6vh;
}

.competition-state {
    margin: 2vh;
}

.state-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1vh;
}

.intro {
    margin: 2vh;
}

.submit {
    margin: 5%;
    height: 6vh;
    width: 90%;
    border-radius: 0.8vh;
    background: #4e46b4;
    color: white;
    font-size: 2.5vh;
    border: 0;
    margin-top: 0;
}

.mask {
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 30;
    background: rgba(0, 0, 0, 0.2);
}

.medal {
    height: 90%;
    width: 90%;
    background: white;
    position: fixed;
    top: 5%;
    left: 5%;
    z-index: 99999999;
    border-radius: 0.8vh;
}

.pop-title {
    color: #000000;
}

.prize-box {
    display: flex;
    justify-content: space-around;
}

.footer {
    height: 100px;
}
</style>