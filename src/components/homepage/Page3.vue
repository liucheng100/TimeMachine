<template>
    <div class="page3">
        <ImgZoom src="https://avatars.githubusercontent.com/u/6" v-model:ON="zoomOn" @update:ON="zoomOn=false">
        </ImgZoom>
        <div class="prize_out">
            <div class="prize">
                <div class="prize_font">一等奖</div>
            </div>
        </div>
        <TabMagic :id="1" sticky="0" :title_list="['单反组','随手拍组','短视频组']" @tab0Click="setPrize1State(0)"
            @tab1Click="setPrize1State(1)" @tab2Click="setPrize1State(2)">
            <template v-slot:tab0>
                <card v-for="i in prize1List" :title=i.title :auth=i.auth :avatar=i.avatar :hot=i.hot :cover=i.cover>
                </card>
            </template>
            <template v-slot:tab1>
                <card v-for="i in prize1List" :title=i.title :auth=i.auth :avatar=i.avatar :hot=i.hot :cover=i.cover>
                </card>
            </template>
            <template v-slot:tab2>
                <card v-for="i in prize1List" :title=i.title :auth=i.auth :avatar=i.avatar :hot=i.hot :cover=i.cover>
                </card>
            </template>
        </TabMagic>
        <div class="prize_out">
            <div class="prize">
                <div class="prize_font">二等奖</div>
            </div>
        </div>
        <TabMagic :id="2" sticky="0" :title_list="['单反组','随手拍组','短视频组']" @tab0Click="setPrize2State(0)"
            @tab1Click="setPrize2State(1)" @tab2Click="setPrize2State(2)">
            <template v-slot:tab0>
                <card v-for="i in prize2List" :title=i.title :auth=i.auth :avatar=i.avatar :hot=i.hot :cover=i.cover>
                </card>
            </template>
            <template v-slot:tab1>
                <card v-for="i in prize2List" :title=i.title :auth=i.auth :avatar=i.avatar :hot=i.hot :cover=i.cover>
                </card>
            </template>
            <template v-slot:tab2>
                <card v-for="i in prize2List" :title=i.title :auth=i.auth :avatar=i.avatar :hot=i.hot :cover=i.cover>
                </card>
            </template>
        </TabMagic>
        <div class="prize_out">
            <div class="prize">
                <div class="prize_font">三等奖</div>
            </div>
        </div>
        <TabMagic :id="3" sticky="0" :title_list="['单反组','随手拍组','短视频组']" @tab0Click="setPrize3State(0)"
            @tab1Click="setPrize3State(1)" @tab2Click="setPrize3State(2)">
            <template v-slot:tab0>
                <div class="prize3_card">
                    <cardMini v-for="i in prize3List" :title=i.title :auth=i.auth :avatar=i.avatar :hot=i.hot
                        :cover=i.cover>
                    </cardMini>
                </div>
            </template>
            <template v-slot:tab1>
                <div class="prize3_card">

                    <cardMini v-for="i in prize3List" :title=i.title :auth=i.auth :avatar=i.avatar :hot=i.hot
                        :cover=i.cover>
                    </cardMini>
                </div>
            </template>
            <template v-slot:tab2>
                <div class="prize3_card">
                    <cardMini v-for="i in prize3List" :title=i.title :auth=i.auth :avatar=i.avatar :hot=i.hot
                        :cover=i.cover>
                    </cardMini>
                </div>
            </template>
        </TabMagic>
    </div>
</template>

<script>
    import Card from '@/components/Card/Card.vue'
    export default {
        data() {
            return {
                prize1List: [],
                prize1List_df: [
                    { title: '一等奖1', auth: '城市作画', avatar: '', hot: '1071', cover: '', },
                    { title: '一等奖1', auth: '城市作画', avatar: '', hot: '1071', cover: '', },
                    { title: '一等奖1', auth: '城市作画', avatar: '', hot: '1071', cover: '', },
                    { title: '一等奖1', auth: '城市作画', avatar: '', hot: '1071', cover: '', },
                    { title: '一等奖1', auth: '城市作画', avatar: '', hot: '1071', cover: '', },
                ],
                prize1List_ssp: [
                    { title: '一等奖2', auth: '城市作画', avatar: '', hot: '1071', cover: '', },
                    { title: '一等奖2', auth: '城市作画', avatar: '', hot: '1071', cover: '', },
                    { title: '一等奖2', auth: '城市作画', avatar: '', hot: '1071', cover: '', },
                    { title: '一等奖2', auth: '城市作画', avatar: '', hot: '1071', cover: '', },
                    { title: '一等奖2', auth: '城市作画', avatar: '', hot: '1071', cover: '', },
                ],
                prize1List_dsp: [
                    { title: '一等奖3', auth: '城市作画', avatar: '', hot: '1071', cover: '', },
                    { title: '一等奖3', auth: '城市作画', avatar: '', hot: '1071', cover: '', },
                    { title: '一等奖3', auth: '城市作画', avatar: '', hot: '1071', cover: '', },
                    { title: '一等奖3', auth: '城市作画', avatar: '', hot: '1071', cover: '', },
                    { title: '一等奖3', auth: '城市作画', avatar: '', hot: '1071', cover: '', },
                ],
                prize2List: [],
                prize2List_df: [
                    { title: '二等奖1', auth: '城市作画', avatar: '', hot: '1071', cover: '', },
                    { title: '二等奖1', auth: '城市作画', avatar: '', hot: '1071', cover: '', },
                    { title: '二等奖1', auth: '城市作画', avatar: '', hot: '1071', cover: '', },
                    { title: '二等奖1', auth: '城市作画', avatar: '', hot: '1071', cover: '', },
                    { title: '二等奖1', auth: '城市作画', avatar: '', hot: '1071', cover: '', },
                ],
                prize2List_ssp: [
                    { title: '二等奖2', auth: '城市作画', avatar: '', hot: '1071', cover: '', },
                    { title: '二等奖2', auth: '城市作画', avatar: '', hot: '1071', cover: '', },
                    { title: '二等奖2', auth: '城市作画', avatar: '', hot: '1071', cover: '', },
                    { title: '二等奖2', auth: '城市作画', avatar: '', hot: '1071', cover: '', },
                    { title: '二等奖2', auth: '城市作画', avatar: '', hot: '1071', cover: '', },
                ],
                prize2List_dsp: [
                    { title: '二等奖3', auth: '城市作画', avatar: '', hot: '1071', cover: '', },
                    { title: '二等奖3', auth: '城市作画', avatar: '', hot: '1071', cover: '', },
                    { title: '二等奖3', auth: '城市作画', avatar: '', hot: '1071', cover: '', },
                    { title: '二等奖3', auth: '城市作画', avatar: '', hot: '1071', cover: '', },
                    { title: '二等奖3', auth: '城市作画', avatar: '', hot: '1071', cover: '', },
                ],
                prize3List: [],
                prize3List_df: [
                    { title: '三等奖1', auth: '城市作画', avatar: '', hot: '1071', cover: '', },
                    { title: '三等奖1', auth: '城市作画', avatar: '', hot: '1071', cover: '', },
                    { title: '三等奖1', auth: '城市作画', avatar: '', hot: '1071', cover: '', },
                    { title: '三等奖1', auth: '城市作画', avatar: '', hot: '1071', cover: '', },
                    { title: '三等奖1', auth: '城市作画', avatar: '', hot: '1071', cover: '', },
                    { title: '三等奖1', auth: '城市作画', avatar: '', hot: '1071', cover: '', },
                    { title: '三等奖1', auth: '城市作画', avatar: '', hot: '1071', cover: '', },
                    { title: '三等奖1', auth: '城市作画', avatar: '', hot: '1071', cover: '', },
                    { title: '三等奖1', auth: '城市作画', avatar: '', hot: '1071', cover: '', },
                    { title: '三等奖1', auth: '城市作画', avatar: '', hot: '1071', cover: '', },
                ],
                prize3List_ssp: [
                    { title: '三等奖2', auth: '城市作画', avatar: '', hot: '1071', cover: '', },
                    { title: '三等奖2', auth: '城市作画', avatar: '', hot: '1071', cover: '', },
                    { title: '三等奖2', auth: '城市作画', avatar: '', hot: '1071', cover: '', },
                    { title: '三等奖2', auth: '城市作画', avatar: '', hot: '1071', cover: '', },
                    { title: '三等奖2', auth: '城市作画', avatar: '', hot: '1071', cover: '', },
                    { title: '三等奖1', auth: '城市作画', avatar: '', hot: '1071', cover: '', },
                    { title: '三等奖1', auth: '城市作画', avatar: '', hot: '1071', cover: '', },
                    { title: '三等奖1', auth: '城市作画', avatar: '', hot: '1071', cover: '', },
                    { title: '三等奖1', auth: '城市作画', avatar: '', hot: '1071', cover: '', },
                    { title: '三等奖1', auth: '城市作画', avatar: '', hot: '1071', cover: '', },
                ],
                prize3List_dsp: [
                    { title: '三等奖3', auth: '城市作画', avatar: '', hot: '1071', cover: '', },
                    { title: '三等奖3', auth: '城市作画', avatar: '', hot: '1071', cover: '', },
                    { title: '三等奖3', auth: '城市作画', avatar: '', hot: '1071', cover: '', },
                    { title: '三等奖3', auth: '城市作画', avatar: '', hot: '1071', cover: '', },
                    { title: '三等奖3', auth: '城市作画', avatar: '', hot: '1071', cover: '', },
                    { title: '三等奖1', auth: '城市作画', avatar: '', hot: '1071', cover: '', },
                    { title: '三等奖1', auth: '城市作画', avatar: '', hot: '1071', cover: '', },
                    { title: '三等奖1', auth: '城市作画', avatar: '', hot: '1071', cover: '', },
                    { title: '三等奖1', auth: '城市作画', avatar: '', hot: '1071', cover: '', },
                    { title: '三等奖1', auth: '城市作画', avatar: '', hot: '1071', cover: '', },
                ],
            }
        },
        methods: {
            setPrize1State(i) {
                if (i === 0) {
                    this.prize1List = this.prize1List_df
                } else if (i === 1) {
                    this.prize1List = this.prize1List_ssp
                } else if (i === 2) {
                    this.prize1List = this.prize1List_dsp
                }
            },
            setPrize2State(i) {
                if (i === 0) {
                    this.prize2List = this.prize2List_df
                } else if (i === 1) {
                    this.prize2List = this.prize2List_ssp
                } else if (i === 2) {
                    this.prize2List = this.prize2List_dsp
                }
            },
            setPrize3State(i) {
                if (i === 0) {
                    this.prize3List = this.prize3List_df
                } else if (i === 1) {
                    this.prize3List = this.prize3List_ssp
                } else if (i === 2) {
                    this.prize3List = this.prize3List_dsp
                }
            }

        },
        mounted() {
            this.setPrize1State(0)
            this.setPrize2State(0)
            this.setPrize3State(0)
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

    .prize3_card {
        width: 100%;
        min-height: 300px;
        padding: 10px 20px;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        background-color: #fff;
    }
</style>