<template>
    <div class="work-detail" 
    :style="{maxHeight: isSafari?'calc(100% - 100px)':''}">
        <div v-if="workData.contestGroup != 3" @click="zoomOn = true" class="cover-box">
            <img class="img" :src="workData.workFile" alt="">
        </div>
        <div v-else class="video-box">
            <video controls muted class="video" :src="videoSrc">
                <!-- <source :src="testVideo" type="video/mp4"> -->
            </video>
            <a :href="videoSrc" class="videoErr">无法播放?点我下载到本地</a>
        </div>
        <div class="info-mask">
            <div class="bar">
                <div class="title">{{ workData.workTitle }}</div>
                <div class="flex">
                    <div class="eye"></div>
                    <div class="info">{{ workData.views }}</div>
                </div>
            </div>
            <div class="bar">
                <div class="flex">
                    <div class="avatar" :style="{ backgroundImage: `url('${workData.makerAvatar}')` }"></div>
                    <div class="info">{{ workData.makerName }}</div>
                </div>
                <div class="groupType info">
                    {{ groupType(workData.contestGroup) }}
                </div>
            </div>
            <div class="psg">
                {{ workData.description }}
            </div>
            <div class="back">
                <div @click="$router.back()" class="flex">
                    <div class="backIcon"></div>
                    <div class="backInfo">返回列表</div>
                </div>
            </div>
        </div>
        <ImgZoom :src="workData.workFile" v-model:ON="zoomOn" @update:ON="zoomOn = false"></ImgZoom>
        <!-- <div :class="isSafari ? 'footer' : ''"></div> -->

    </div>
</template>

<script>
    import { workDetail, } from '@/api/work'
    import { getSrc, uploadFile, concatSrc } from '@/api/file'
    import { isSafari } from '@/utils/common'
    import pubuse from '@/utils/pub-use'
    export default {
        name: 'WorkDetail',
        data() {
            return {
                zoomOn: false,
                workId: -1,
                workData: {},
                testVideo: 'http://photo.twtstudio.com/file/get?path=media/2023_04/265e2dd0-805d-4c28-b9aa-dcc1ec48e8a9.flv',
                testVideo: 'http://photo.twtstudio.com/file/get?path=media/2023_04/c5352d51-e028-4dae-864f-c0161e590181.mp4',
                isSafari: true,
            }
        },
        computed: {
            videoSrc() {
                return concatSrc(this.workData.workFile)
            }
        },
        methods: {
            groupType(i) {
                if (i == 1) return '单反组'
                else if (i == 2) return '随手拍组'
                else if (i == 3) return "短视频组"
                else return "AI组"
            },
            replaceBlob(tarObject, attrList) {
                attrList.forEach(attr => {
                    getSrc(tarObject[attr]).then(v => {
                        // console.log(v)
                        tarObject[attr] = v
                    }).catch(err => {
                        ElMessage.error('图片加载失败')
                    })
                    tarObject[attr] = pubuse('loading.gif')
                });
            }
        },
        mounted() {
            this.isSafari = isSafari()
            // alert(this.$route.query.workId)
            this.workId = this.$route.query.workId
            workDetail(this.workId).then(v => {
                // console.log(71, v)
                if (!v.code) {
                    this.workData = v.data
                    if (this.workData.contestGroup == 3) {
                        ElMessage.info('视频已为您静音')
                    } else {
                        // 如果是图片则解析成blob
                        this.replaceBlob(this.workData, [
                            'workFile'
                        ])
                    }

                }
            })

        },

    }
</script>


<style scoped>
    .work-detail {
        position: relative;
    }

    .cover-box {
        height: calc(100% - 200px);
        width: 100%;
        overflow: hidden;
    }

    .video-box {
        height: calc(100% - 200px);
        width: 100%;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .video {
        width: 100%;
        height: 350px;
        max-height: 30vh;
        background-color: black;
    }

    .img {
        height: 100%;
        width: 100%;
        object-fit: cover;
        background-color: rgb(245, 245, 245);
    }

    .info-mask {
        position: absolute;
        bottom: 0;
        width: 100%;
        min-height: 200px;
        background-color: white;
        padding: 20px 20px 28px 20px;
        display: flex;
        flex-direction: column;
    }

    .bar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
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

    .title {
        font-size: 20px;
        color: rgba(31, 31, 31, 1);
        /* margin-bottom: 10px; */
    }

    .psg {
        font-size: 12px;
        color: rgba(153, 156, 160, 1);
        line-height: 16.8px;
        margin-bottom: 10px;
        flex: 1;
    }

    .back {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        height: 22px;
    }

    .backIcon {
        height: 22px;
        width: 22px;
        background: url('../../assets/backArray.svg') center center / 100% no-repeat;
    }

    .backInfo {
        font-size: 16px;
        color: rgba(78, 70, 180, 1);
        transform: translateY(-.6px);
    }

    .videoErr {
        color: rgba(78, 70, 180, 1);
        background-color: rgb(229, 227, 255);
        padding: 10px 25px;
        border-radius: 6px;
        margin-top: 20px;
        font-size: 16px;
        outline: none;
        text-decoration: none;
    }

    .footer {
        height: 100px;
    }
</style>