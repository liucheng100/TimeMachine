<template>
    <div class="submit">
        <div class="left-side">
            <div class="title">投稿</div>
            <div class="dad-upload">
                <div @click="upload" class="upload" :style="{ height: xheight ? xheight + 'px' : '' }">
                    <div class="info">
                        <div class="icon"></div>
                        <div class="t1">上传文件</div>
                        <div class="t2">
                            {{ '请保留 EXIF 信息\n\n请确认您上传的作品的著作权为本人所有，\n禁止上传他人作品。\n如有侵权行为，您将承担相应的法律责任。' }}
                        </div>
                    </div>
                    <div v-if="source" class="overCover">
                        <video v-if="contestgroup == 3" :controls="false" muted class="source-img" :src="source" alt=""></video>
                        <img v-else ref="sourceImg" class="source-img" :src="source" alt="">
                        <div v-if="loading" class="mask-1">
                            <div class="loading-icon"></div>
                            <div class="loading-icon load-double"></div>
                        </div>
                        <div @click.stop class="tool-box">
                            <div @click="trashFn" class="trash"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- <TabMagic :id="0" :title_list="['单反组', '随手拍组', '短视频组', 'AI 组']" @tab0Click="formdata.contestGroup = 1"
            @tab1Click="formdata.contestGroup = 2" @tab2Click="formdata.contestGroup = 3"
            @tab3Click="formdata.contestGroup = 4">
        </TabMagic> -->
        <div class="right-side">
            <div class="tab-bar">
                <div class="tab-block-1">
                    <div @click="TabClick(idx + 1)" :class="{ 'tab-item': 1, 'tab-item-active': contestgroup == idx + 1 }"
                        :key="idx" v-for="(title, idx) in ['单反组', '随手拍组', '短视频组', 'AI 组']">
                        {{ title }}
                    </div>
                </div>
                <div class="desc" :style="{
                    left: ((contestgroup - 1) * (100 / 4)) + '%',
                    marginLeft: `calc(50%/${4})`
                }"></div>
            </div>
            <div class="tab tab-0">
                <p class="art-name">作品题目</p>
                <el-input v-model="formdata.workTitle" placeholder="输入作品题目..." class="art-name-input">
                </el-input>
                <p class="art-name">作品介绍</p>
                <el-input type="textarea" maxlength="300" :autosize="{ minRows: 4, maxRows: 20 }" resize="none"
                    v-model="formdata.description" :rows="5" placeholder="输入作品介绍..." class="art-name-textarea">
                </el-input>
            </div>
            <div class="dad-btn">
                <Protocol :ON="ON" @check="ON = !ON" class="proto-pc"></Protocol>
                <div class="sub-btn" @click="submit">
                    提交
                </div>
            </div>
        </div>

        <Pop :ON="pop1" :model="1" title="稿件已提交" tip="稍后请在个人中心查看" :options="{ black: '', grey: '', blue: '完成' }"
            @blackClick="0" @blueClick="$router.back(); pop1 = false">
        </Pop>
        <Pop :ON="pop2" :model="0" title="提交不成功" tip="请检查网络或联系管理员" :options="{ black: '', grey: '', blue: '返回' }"
            @blackClick="0" @blueClick="pop2 = false">
        </Pop>
        <Pop :ON="pop3" :model="0" title="确认要删除作品吗" tip="该操作无法被撤销。" :options="{ black: '删除', grey: '', blue: '取消' }"
            @greyClick="0" @blueClick="pop3 = false" @blackClick="removeWork">
        </Pop>
        <Pop :ON="pop4" :model="0" title="确认要更换作品吗" tip="该操作无法被撤销。" :options="{ black: '更换', grey: '', blue: '取消' }"
            @greyClick="0" @blueClick="pop4 = false" @blackClick="pop4 = false; removeWork(); upload()">
        </Pop>
        <Pop :ON="pop5" :model="0" title="更换类别将清空文件" tip="该操作无法被撤销。" :options="{ black: '确认', grey: '', blue: '取消' }"
            @greyClick="0" @blueClick="pop5 = false"
            @blackClick="pop5 = false; removeWork(); formdata.contestGroup = group_cache">
        </Pop>
    </div>
</template>

<script>
import { uploadFile_t, concatSrc, } from '@/api/file'
import { newWork, } from '@/api/work'
import { contesting, } from '@/api/contest'
import { getToken } from '@/utils/auth'
export default {
    name: 'submit',
    emits: [],
    props: {
    },
    inject: ['globalData'],
    data() {
        return {
            source: '',
            xheight: '',
            loading: false,
            artIntro: '',
            artName: '',
            ON: false,

            formdata: {
                workTitle: '',
                description: '',
                workFile: 0,
                contestGroup: 1,
                contestId: -1,
            },
            group_cache: 0,
            pop1: false,
            pop2: false,
            pop3: false,
            pop4: false,
            pop5: false,
            net_event_id: 0,
        }
    },
    computed: {
        contestgroup() {
            return this.formdata.contestGroup;
        }
    },
    watch: {

    },
    methods: {
        TabClick(group) {
            if ((group == 3 || this.contestgroup == 3) && (group != 3 || this.contestgroup != 3) && this.formdata.workFile) {
                this.pop5 = true
                this.group_cache = group
            } else {
                if (this.loading) {
                    ElMessage.info('上传文件中')
                } else {
                    this.formdata.contestGroup = group
                }
            }
        },
        trashFn() {
            if (this.formdata.workFile) {
                this.pop3 = true
            } else {
                this.removeWork()
            }
        },
        removeWork() {
            this.pop3 = false
            this.source = this.xheight = this.formdata.workFile = ''
            this.loading = false
            this.net_event_id++;
        },
        upload() {
            if (this.loading) {
                ElMessage.info('文件上传中')
                return
            }
            if (this.formdata.workFile) {
                this.pop4 = true
                return
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
                            this.loading = false
                        }

                    } else {
                        ElMessage.error('上传失败请重试')
                    }
                }).catch(err => {
                    ElMessage.error('上传失败请重试' + err)
                })

            }
        },
        submit() {
            if (this.formdata.contestId == -1) {
                ElMessage.warning('无法捕获赛事id,请刷新')
                return
            }
            if (!this.formdata.workTitle) {
                ElMessage.warning('作品名不能为空')
                return
            }
            if (!this.formdata.description) {
                ElMessage.warning('作品详情不能为空')
                return
            }
            if (!this.formdata.workFile) {
                ElMessage.warning('请先上传作品文件')
                return
            }
            if (!this.ON) {
                ElMessage.warning('请勾选隐私政策')
                return
            }
            // if(!this.formdata.contestGroup){
            //     ElMessage.warning('作品名不能为空')
            // return
            // }
            newWork(this.formdata).then(v => {
                console.log(v)
                if (!v.code) {
                    ElMessage.success('发布成功')
                    this.pop1 = true
                } else {
                    ElMessage.error(v.description + v.msg)
                    this.pop2 = true
                }

            }).catch(err => {
                ElMessage.error('出错了')
                this.pop2 = true
            })
        }
    },
    created(){
        if(!getToken()){
            this.$router.push("/PC/homepage");
        }
    },
    mounted() {
        
        // 重新获取contestId
        contesting().then(v => {
            if (!v.code) {
                this.formdata.contestId = v.data.contestId
            } else {
                ElMessage.error(v.msg)
            }
        })
    }

}
</script>


<style scoped>
.submit {
    /* padding: 30px 0px; */
    display:flex;
    flex-direction: row;
    padding-left:15%;
    padding-right:15%;
    justify-content: space-between;
}

.title {
    font-size: 10px;
    color: rgba(31, 31, 31, 1);
    margin-top:5%;
    margin-bottom:5%;
}

.dad-upload {
    width: 100%;
    
}

.upload {
    height: 130px;
    width: 100%;
    background: #FFFFFF;
    box-shadow: 0px 2px 30px rgba(0, 0, 0, 0.1);
    border-radius: 6px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;
    transition: .3s;
    min-height: 100px;
    
}

.info {
    /* height: 108px; */
    /* width: 93px; */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
}

.icon {
   
    height: 10px;
    width: 10px;
    background: url('../../assets/folderPlus.svg') center center / 100% no-repeat;
}

.t1 {
    font-size: 7px;
    color: rgba(78, 70, 180, 1);
    margin-bottom: 5px;
}

.t2 {
    font-size: 4px;
    color: rgba(153, 156, 160, 1);
    font-weight: 300;
    white-space: pre;
    text-align: center;
    line-height: 4px;
}

.overCover {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: white;
    overflow: hidden;
}

.source-img {
    object-fit: cover;
    height: 100%;
    width: 100%;
}

.mask-1 {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.39);
}

.loading-icon {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    animation: rotate 1.5s infinite linear;
    height: 32px;
    width: 32px;
    background: url('../../assets/loading.svg') center center / 100% no-repeat;
}

.load-double {
    animation: rotate_rev 1.5s infinite;
    height: 60px;
    width: 60px;
}

.tool-box {
    padding: 0 1.5px;
    position: absolute;
    bottom: 10px;
    left: 10px;
    height: 38px;
    display: flex;
    border-radius: 6px;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.644);
    border: solid 1px white;
}

.trash {
    margin: 0 10px;
    height: 24px;
    width: 24px;
    background: url('../../assets/trash2.svg') center center / 100% no-repeat;
}

.refresh {
    margin: 0 10px;
    height: 24px;
    width: 24px;
    background: url('../../assets/refresh.svg') center center / 100% no-repeat;
}

.tab {
    margin-top:12%;
    height:80%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.art-name {
    
    font-size: 5px;
    color: rgba(78, 70, 180, 1);
    width: 100%;
    margin-bottom:5px;
}

.art-name-input {
    height: 10px;
    font-size: 4px;
    margin-bottom: 5px;
    width: 100%;
    background: #FFFFFF;
    /* Mid-shadow */
    box-shadow: 0px 2px 30px rgba(0, 0, 0, 0.1);
    
}

.art-name-textarea {
    font-size: 4px;
    margin-bottom: 5px;
    width: 100%;
    background: #FFFFFF;
    /* Mid-shadow */
    box-shadow: 0px 2px 30px rgba(0, 0, 0, 0.1);
    border-radius: 6px;
}

.sub-btn {
    width: 100%;
    height: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(78, 70, 180, 1);
    color: white;
    font-size: 7px;
   
    border-radius: 6px;
    user-select: none;
}

.dad-btn {
    width:100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

@keyframes rotate {
    to {
        transform: translate(-50%, -50%) rotate(360deg);
    }
}

@keyframes rotate_rev {
    to {
        transform: translate(-50%, -50%) rotate(-360deg);
    }
}

.tab-bar {
    display: flex;
    flex-direction: column;
    height: 20px;
    width: 100%;
    position: relative;
   
    
    /* position: sticky; */
    /* top: 0; */
    border-left: solid 5px transparent;
    border-right: solid 5px transparent;
}

.tab-block-1 {
    height: 20px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-top:20%;
}

.tab-item {
    color: #999CA0;
    font-size: 5px;
    font-weight: 400;
    transition: color 0.3s;
    min-width: calc(100%/10);
    /* background-color: red; */
    display: flex;
    align-items: center;
    justify-content: center;
}

.tab-item-active {
    color: #1F1F1F;
    font-weight: 500;
}

.desc {

    width: 5px;
    height: 1px;
    bottom: -10px;
    /* margin-left: calc(100%/6); */
    transform: translateX(-50%);
    position: absolute;
    border-radius: 1px;
    background-color: #4E46B4;
    transition: .4s;
}
.proto-pc{
   transform: scale(.4, .4);
}
.left-side{
    width:45%;
}
.right-side{
    width:45%;
    height:80%;
    display:flex;
    flex-direction: column;
}
</style>