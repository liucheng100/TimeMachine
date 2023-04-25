<template>
    <div class="order-select">
        <div class="order-select-box">
            <TabMagic :id="6" sticky="0" :title_list="['最新', '最热']" backColor="transparent" @tab0Click="seasonState = 0"
                @tab1Click="seasonState = 1" @tab2Click="seasonState = 2">
            </TabMagic>
        </div>
    </div>
    <div class="page2">
        <CardMini :key="idx" v-for="(i, idx) in DATA" :title=i.workTitle :auth="i.makerName" :avatar=i.makerAvatar
            :hot=i.views :cover=i.coverFile @click="$router.push({
                    path: '/WorkDetail',
                    query: { workId: i.workId }
                })"></CardMini>
    </div>
</template>

<script>
import CardMini from '@/components/Card/CardMini.vue'
import bus from '@/utils/mitt'
import { getSrc, uploadFile, } from '@/api/file'
import { getAllWorks, getNewWorks, } from '@/api/work'
import pubuse from '@/utils/pub-use'
export default {
    name: 'page2',
    props: {
        loadMore: {
            default: false,
            type: Boolean,
        }
    },
    components: [
        CardMini
    ],
    inject: ['globalData'],
    data() {
        return {
            loading: false,
            loading_: false,
            tabIdx: 0,
            dataList: [],
            dataList_: [],
            pageNum: 1,
            pageNum_: 1,
            pageSize: 10,
            pageSize_: 10,
            orderSelectIndex: 0,
        }
    },
    computed: {
        contestId() {
            return this.globalData.contestId
        },
        DATA() {
            return !this.orderSelectIndex ? this.dataList_ : this.dataList;
        }
    },
    watch: {
        loadMore(to) {
            if (this.tabIdx == 1 && to) {
                if (this.orderSelectIndex == 1) {
                    if (!this.loading) {
                        this.loading = true
                        // loadmore here
                        getAllWorks({
                            contestId: this.globalData.contestId,
                            pageNum: this.pageNum,
                            pageSize: this.pageSize,
                        }).then(v => {
                            // console.log(v)
                            if (!v.code) {
                                this.dataList = this.dataList.concat(v.data)
                                v.data.forEach(ele => {
                                    this.replaceBlob(ele, ['coverFile'])
                                });
                                this.pageNum++;
                            }
                            this.loading = false
                        })
                    }
                } else if (this.orderSelectIndex == 0) {
                    if (!this.loading_) {
                        this.loading_ = true
                        // loadmore here
                        getNewWorks({
                            contestId: this.globalData.contestId,
                            pageNum: this.pageNum_,
                            pageSize: this.pageSize_,
                        }).then(v => {
                            // console.log(v)
                            if (!v.code) {
                                this.dataList_ = this.dataList_.concat(v.data)
                                v.data.forEach(ele => {
                                    this.replaceBlob(ele, ['coverFile'])
                                });
                                this.pageNum_++;
                            }
                            this.loading_ = false
                        })
                    }
                }
            }
        },
        contestId(to) {
            // alert('contestId改变'+to)
            // 初始化
            this.pageNum = this.pageNum_ = 1
            this.loading = this.loading_ = false
            if (to !== -1) {
                // alert('page2 reload'+this.globalData.contestId)
                this.loading = this.loading_ = true
                getAllWorks({
                    contestId: this.globalData.contestId,
                    pageNum: this.pageNum,
                    pageSize: this.pageSize,
                }).then(v => {
                    // console.log(v)
                    if (!v.code) {
                        this.dataList = v.data
                        v.data.forEach(ele => {
                            this.replaceBlob(ele, ['coverFile'])
                        });
                        this.pageNum++;
                    }
                    this.loading = false
                })

                getNewWorks({
                    contestId: this.globalData.contestId,
                    pageNum: this.pageNum_,
                    pageSize: this.pageSize_,
                }).then(v => {
                    // console.log(v)
                    if (!v.code) {
                        this.dataList_ = v.data
                        v.data.forEach(ele => {
                            this.replaceBlob(ele, ['coverFile'])
                        });
                        this.pageNum_++;
                    }
                    this.loading_ = false
                })
            }
        },
    },
    methods: {
        replaceBlob(tarObject, attrList) {
            // console.log(attrList)
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
        }
    },
    mounted() {
        bus.on('need-tab-idx', (ls) => {
            // 11451要和需要谁的id对应
            if (ls[1] == 11451) {
                this.tabIdx = ls[0]
            }
            if (ls[1] == 6) {
                this.orderSelectIndex = ls[0]
            }
        })



    },

}
</script>


<style scoped>
.page2 {
    width: 100%;
    min-height: 300px;
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    background-color: #fff;
}

.order-select {
    width: 100%;
    height: 40px;
    padding: 0 21px;
    display: flex;
    justify-content: flex-end;
    overflow: hidden;
}

.order-select-box {
    width: 100px;
    /* height: 100%; */
    transform: translateY(-4px) scale(.9);
}
</style>