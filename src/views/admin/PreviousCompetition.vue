<template>
    <div class="homepage" @scroll="scroll">
        <div class="banner">
            <img class="banner-img" src="../../assets/warnCircle.svg" alt="">
            <div class="banner-tip">还有24天截稿</div>
        </div>
        <div class="info">
            <div class="info-left">
                <div class="info-title">觅·新</div>
                <div class="info-tip">第十三届方寸·流年摄影大赛</div>
            </div>
            <SeasonBtn @click.native="!seasonState?ON=true:0" :state="seasonState"></SeasonBtn>
        </div>
        <TabMagic :id="1" sticky="0" :title_list="['赛事介绍','全部作品','获奖作品']" @tab0Click="seasonState=0"
            @tab1Click="seasonState=1" @tab2Click="seasonState=2">
            <template v-slot:tab0>
                <div class="tab-0">
                    <Page1></Page1>
                </div>
            </template>
            <template v-slot:tab1>
                <div class="tab-1">
                    <Page2 :loadMore="byEnd"></Page2>
                </div>
            </template>
            <template v-slot:tab2>
                <div class="tab-2">
                    <Page3></Page3>
                </div>
            </template>
        </TabMagic>
        <Pop :ON="ON" :model="0" title="我们更推荐在PC端投稿作品" tip="以避免在手机上找不到文件。" :options="{black:'',grey:'坚持投稿',blue:'好的'}"
            @blackClick="0" @greyClick="$router.push('/submit')" @blueClick="ON=false">
        </Pop>
    </div>
</template>

<script>
    import Page1 from '@/components/homepage/Page1.vue'
    import Page2 from '@/components/homepage/Page2.vue'
    import Page3 from '@/components/homepage/Page3.vue'
    export default {
        components: [
            Page1, Page2, Page3
        ],
        data() {
            return {
                testList: [],
                ON: false,
                seasonState: 0,
                byEnd: false,
            }
        },
        methods: {
            click1() {
                this.ON = !this.ON
            },
            click2() {
                console.log(9)
            },
            scroll(e) {
                // console.log(e)
                let a = e.target.scrollTop
                let b = e.target.offsetHeight
                let c = e.target.scrollHeight
                let d = c - b - a
                if (d < 50) {
                    this.byEnd = true
                } else {
                    this.byEnd = false
                }
            }
        },
        mounted() {


        },

    }
</script>


<style scoped>
    /* .homepage {} */

    .banner {
        position: relative;
        width: 100%;
        height: 221px;
        overflow: hidden;
        margin-bottom: 20px;
    }

    .banner-img {
        height: 100%;
        width: 100%;
        object-fit: cover;
    }

    .banner-tip {
        font-size: 14px;
        color: white;
        text-shadow: 0 0 1px black;
        position: absolute;
        bottom: 10px;
        right: 19px;
    }

    .info {
        width: 100%;
        height: 56px;
        padding: 0 20px;
        margin-bottom: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .info-left {
        height: 100%;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
        margin-right: 15px;

        overflow: hidden;
    }

    .info-title {
        width: 100%;
        font-size: 24px;
        color: rgba(31, 31, 31, 1);
        font-weight: 500;

        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .info-tip {
        width: 100%;
        font-size: 12px;
        color: rgba(127, 127, 127, 1);

        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
</style>