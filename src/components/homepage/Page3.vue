<template>
    <div class="page3">
        <ImgZoom src="https://avatars.githubusercontent.com/u/6" v-model:ON="zoomOn" @update:ON="zoomOn = false">
        </ImgZoom>
        <div class="prize_out">
            <div class="prize">
                <div class="prize_font">一等奖</div>
            </div>
        </div>
        <TabMagic :id="1" :title_list="['单反组', '随手拍组', '短视频组', 'AI组']">
            <template v-slot:tab0>
                <card @click="$router.push({
                    path: '/WorkDetail',
                    query: { workId: i.workId }
                })" v-for="i in prize1List_df" :title=i.title :auth=i.auth :avatar=i.avatar :hot=i.hot :cover=i.cover>
                </card>
            </template>
            <template v-slot:tab1>
                <card @click="$router.push({
                    path: '/WorkDetail',
                    query: { workId: i.workId }
                })" v-for="i in prize1List_ssp" :title=i.title :auth=i.auth :avatar=i.avatar :hot=i.hot :cover=i.cover>
                </card>
            </template>
            <template v-slot:tab2>
                <card @click="$router.push({
                    path: '/WorkDetail',
                    query: { workId: i.workId }
                })" v-for="i in prize1List_dsp" :title=i.title :auth=i.auth :avatar=i.avatar :hot=i.hot :cover=i.cover>
                </card>
            </template>
            <template v-slot:tab3>
                <card @click="$router.push({
                    path: '/WorkDetail',
                    query: { workId: i.workId }
                })" v-for="i in prize1List_ai" :title=i.title :auth=i.auth :avatar=i.avatar :hot=i.hot :cover=i.cover>
                </card>
            </template>
        </TabMagic>
        <div class="prize_out">
            <div class="prize">
                <div class="prize_font">二等奖</div>
            </div>
        </div>
        <TabMagic :id="2" :title_list="['单反组', '随手拍组', '短视频组', 'AI组']">
            <template v-slot:tab0>
                <card @click="$router.push({
                    path: '/WorkDetail',
                    query: { workId: i.workId }
                })" v-for="i in prize2List_df" :title=i.title :auth=i.auth :avatar=i.avatar :hot=i.hot :cover=i.cover>
                </card>
            </template>
            <template v-slot:tab1>
                <card @click="$router.push({
                    path: '/WorkDetail',
                    query: { workId: i.workId }
                })" v-for="i in prize2List_ssp" :title=i.title :auth=i.auth :avatar=i.avatar :hot=i.hot :cover=i.cover>
                </card>
            </template>
            <template v-slot:tab2>
                <card @click="$router.push({
                    path: '/WorkDetail',
                    query: { workId: i.workId }
                })" v-for="i in prize2List_dsp" :title=i.title :auth=i.auth :avatar=i.avatar :hot=i.hot :cover=i.cover>
                </card>
            </template>
            <template v-slot:tab3>
                <card @click="$router.push({
                    path: '/WorkDetail',
                    query: { workId: i.workId }
                })" v-for="i in prize2List_ai" :title=i.title :auth=i.auth :avatar=i.avatar :hot=i.hot :cover=i.cover>
                </card>
            </template>
        </TabMagic>
        <div class="prize_out">
            <div class="prize">
                <div class="prize_font">三等奖</div>
            </div>
        </div>
        <TabMagic :id="3" :title_list="['单反组', '随手拍组', '短视频组', 'AI组']">
            <template v-slot:tab0>
                <card @click="$router.push({
                    path: '/WorkDetail',
                    query: { workId: i.workId }
                })" v-for="i in prize3List_df" :title=i.title :auth=i.auth :avatar=i.avatar :hot=i.hot :cover=i.cover>
                </card>
            </template>
            <template v-slot:tab1>
                <card @click="$router.push({
                    path: '/WorkDetail',
                    query: { workId: i.workId }
                })" v-for="i in prize3List_ssp" :title=i.title :auth=i.auth :avatar=i.avatar :hot=i.hot :cover=i.cover>
                </card>
            </template>
            <template v-slot:tab2>
                <card @click="$router.push({
                    path: '/WorkDetail',
                    query: { workId: i.workId }
                })" v-for="i in prize3List_dsp" :title=i.title :auth=i.auth :avatar=i.avatar :hot=i.hot :cover=i.cover>
                </card>
            </template>
            <template v-slot:tab3>
                <card @click="$router.push({
                    path: '/WorkDetail',
                    query: { workId: i.workId }
                })" v-for="i in prize3List_ai" :title=i.title :auth=i.auth :avatar=i.avatar :hot=i.hot :cover=i.cover>
                </card>
            </template>
        </TabMagic>
        <div class="prize_out">
            <div class="prize">
                <div class="prize_font">优秀奖</div>
            </div>
        </div>
        <TabMagic :id="4" :title_list="['单反组', '随手拍组', '短视频组', 'AI组']">
            <template v-slot:tab0>
                <div class="prize4_card">
                    <cardMini @click="$router.push({
                        path: '/WorkDetail',
                        query: { workId: i.workId }
                    })" :key="idx" v-for="(i, idx) in prize4List_df" :title=i.title :auth=i.auth :avatar=i.avatar
                        :hot=i.hot :cover=i.cover>
                    </cardMini>
                </div>
            </template>
            <template v-slot:tab1>
                <div class="prize4_card">
                    <cardMini @click="$router.push({
                        path: '/WorkDetail',
                        query: { workId: i.workId }
                    })" v-for="i in prize4List_ssp" :title=i.title :auth=i.auth :avatar=i.avatar :hot=i.hot
                        :cover=i.cover>
                    </cardMini>
                </div>
            </template>
            <template v-slot:tab2>
                <div class="prize4_card">
                    <cardMini @click="$router.push({
                        path: '/WorkDetail',
                        query: { workId: i.workId }
                    })" v-for="i in prize4List_dsp" :title=i.title :auth=i.auth :avatar=i.avatar :hot=i.hot
                        :cover=i.cover>
                    </cardMini>
                </div>
            </template>
            <template v-slot:tab3>
                <div class="prize4_card">
                    <cardMini @click="$router.push({
                        path: '/WorkDetail',
                        query: { workId: i.workId }
                    })" v-for="i in prize4List_ai" :title=i.title :auth=i.auth :avatar=i.avatar :hot=i.hot
                        :cover=i.cover>
                    </cardMini>
                </div>
            </template>
        </TabMagic>
    </div>
</template>

<script>
import Card from '@/components/Card/Card.vue'
import { getSrc, uploadFile, } from '@/api/file'
import pubuse from '@/utils/pub-use'
import { getPrized, } from '@/api/work'
import { getPrize, } from '@/api/prize'
export default {
    name: 'page3',
    data() {
        return {
            zoomOn: false,
            prize1List: [],
            prize1List_df: [],
            prize1List_ssp: [],
            prize1List_dsp: [],
            prize1List_ai: [],
            prize2List: [],
            prize2List_df: [],
            prize2List_ssp: [],
            prize2List_dsp: [],
            prize2List_ai: [],
            prize3List: [],
            prize3List_df: [],
            prize3List_ssp: [],
            prize3List_dsp: [],
            prize3List_ai: [],
            prize4List: [],
            prize4List_df: [],
            prize4List_ssp: [],
            prize4List_dsp: [],
            prize4List_ai: [],
        }
    },
    inject: ['globalData'],
    methods: {
        replaceBlob(tarObject, attrList) {
            attrList.forEach(attr => {
                getSrc(tarObject[attr]).then(v => {
                    // console.log(v)
                    tarObject[attr] = v
                    setTimeout(() => {
                        this.$forceUpdate()
                    }, 100);
                })
                tarObject[attr] = pubuse('loading.gif')
            });
        },
        setPrizedArr(works) {
            let arr = []
            for (let i in works) {
                let temp = {}
                temp.workId = works[i].workId
                temp.title = works[i].workTitle
                temp.auth = works[i].makerName
                temp.hot = works[i].views
                temp.avatar = works[i].makerAvatar
                temp.cover = works[i].coverFile
                arr.push(temp)
            }

                return arr
            }
        },
        computed: {
            contestId() {
                return this.globalData.contestId
            }
        },
        watch: {
            contestId(to) {
                if (to !== -1) {
                    getPrized(this.globalData.contestId).then(v => {
                        let data = v.data
                        for (let prizeId in data) {
                            getPrize(prizeId).then(w => {
                                let prizeInfo = w.data
                                if (prizeInfo.contestGroup === 1) {//单反组
                                    if (prizeInfo.prizeName === "一等奖") {
                                        this.prize1List_df = this.setPrizedArr(data[prizeId])
                                        this.prize1List_df.forEach(ele => {
                                            this.replaceBlob(ele, ['cover'])
                                        });
                                    } else if (prizeInfo.prizeName === "二等奖") {
                                        this.prize2List_df = this.setPrizedArr(data[prizeId])
                                        this.prize2List_df.forEach(ele => {
                                            this.replaceBlob(ele, ['cover'])
                                        });
                                    } else if (prizeInfo.prizeName === "三等奖") {
                                        this.prize3List_df = this.setPrizedArr(data[prizeId])
                                        this.prize3List_df.forEach(ele => {
                                            this.replaceBlob(ele, ['cover'])
                                        });
                                    } else if (prizeInfo.prizeName === "优秀奖") {
                                        this.prize4List_df = this.setPrizedArr(data[prizeId])
                                        this.prize4List_df.forEach(ele => {
                                            this.replaceBlob(ele, ['cover'])
                                        });
                                    }
                                } else if (prizeInfo.contestGroup === 2) {//随手拍组
                                    if (prizeInfo.prizeName === "一等奖") {
                                        this.prize1List_ssp = this.setPrizedArr(data[prizeId])
                                        // this.prize1List_ssp = data[prizeId]
                                        this.prize1List_ssp.forEach(ele => {
                                            this.replaceBlob(ele, ['cover'])
                                        });
                                    } else if (prizeInfo.prizeName === "二等奖") {
                                        this.prize2List_ssp = this.setPrizedArr(data[prizeId])
                                        this.prize2List_ssp.forEach(ele => {
                                            this.replaceBlob(ele, ['cover'])
                                        });
                                    } else if (prizeInfo.prizeName === "三等奖") {
                                        this.prize3List_ssp = this.setPrizedArr(data[prizeId])
                                        this.prize3List_ssp.forEach(ele => {
                                            this.replaceBlob(ele, ['cover'])
                                        });
                                    } else if (prizeInfo.prizeName === "优秀奖") {
                                        this.prize4List_ssp = this.setPrizedArr(data[prizeId])
                                        this.prize4List_ssp.forEach(ele => {
                                            this.replaceBlob(ele, ['cover'])
                                        });
                                    }
                                } else if (prizeInfo.contestGroup === 3) {//短视频组
                                    if (prizeInfo.prizeName === "一等奖") {
                                        this.prize1List_dsp = this.setPrizedArr(data[prizeId])
                                        this.prize1List_dsp.forEach(ele => {
                                            this.replaceBlob(ele, ['cover'])
                                        });
                                    } else if (prizeInfo.prizeName === "二等奖") {
                                        this.prize2List_dsp = this.setPrizedArr(data[prizeId])
                                        this.prize2List_dsp.forEach(ele => {
                                            this.replaceBlob(ele, ['cover'])
                                        });
                                    } else if (prizeInfo.prizeName === "三等奖") {
                                        this.prize3List_dsp = this.setPrizedArr(data[prizeId])
                                        this.prize3List_dsp.forEach(ele => {
                                            this.replaceBlob(ele, ['cover'])
                                        });
                                    } else if (prizeInfo.prizeName === "优秀奖") {
                                        this.prize4List_dsp = this.setPrizedArr(data[prizeId])
                                        this.prize4List_dsp.forEach(ele => {
                                            this.replaceBlob(ele, ['cover'])
                                        });
                                    }

                            } else if (prizeInfo.contestGroup === 4) {//AI组
                                if (prizeInfo.prizeName === "一等奖") {
                                    this.prize1List_ai = this.setPrizedArr(data[prizeId])
                                    this.prize1List_ai.forEach(ele => {
                                        this.replaceBlob(ele, ['cover'])
                                    });
                                } else if (prizeInfo.prizeName === "二等奖") {
                                    this.prize2List_ai = this.setPrizedArr(data[prizeId])
                                    this.prize2List_ai.forEach(ele => {
                                        this.replaceBlob(ele, ['cover'])
                                    });
                                } else if (prizeInfo.prizeName === "三等奖") {
                                    this.prize3List_ai = this.setPrizedArr(data[prizeId])
                                    this.prize3List_ai.forEach(ele => {
                                        this.replaceBlob(ele, ['cover'])
                                    });
                                } else if (prizeInfo.prizeName === "优秀奖") {
                                    this.prize4List_ai = this.setPrizedArr(data[prizeId])
                                    this.prize4List_ai.forEach(ele => {
                                        this.replaceBlob(ele, ['cover'])
                                    });
                                }

                            }
                        })
                    }
                })
            }
        },
        prize1List_ssp(to) {
            // console.log(99999, to)
        }
    },
}
</script>


<style scoped>
.page3 {
    width: 100%;
}

.prize_out {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 36.54px;
    width: 100%;
}

.prize {
    height: 36.54px;
    width: 156.54px;
    background: url('../../assets/homepage_page3/prize.svg') center center / 100% no-repeat;
    display: flex;
    justify-content: center;
    align-items: center;
}

.prize_font {
    line-height: 36.54px;
    font-size: 24px
}

.prize4_card {
    width: 100%;
    min-height: 300px;
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    background-color: #fff;
    margin-bottom: 100px;

}
</style>