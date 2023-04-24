<template>
    <div class="tab-magic">
        <div class="tab-bar" :style="{
            background: backColor,
            position: sticky ? 'sticky' : '',
            top: sticky || '',

        }">
            <div class="tab-block-1">
                <div @click="activeIdx = idx; $emit(`tab${idx}Click`)"
                    :class="{ 'tab-item': 1, 'tab-item-active': activeIdx == idx }" :key="idx"
                    v-for="(title, idx) in title_list">
                    {{ title }}
                </div>
            </div>
            <div class="desc" :style="{
                left: (activeIdx * (100 / title_list.length)) + '%',
                marginLeft: `calc(50%/${title_list.length})`
            }"></div>
        </div>
        <div ref="tab" :style="{ height: tabHeight + 'px' }" class="main-container">
            <div ref="tab0" class="tab tab-0" :style="{ transform: `translateX(${100 * (-activeIdx)}%)` }">
                <slot name="tab0"></slot>
            </div>
            <div ref="tab1" class="tab tab-1" :style="{ transform: `translateX(${100 * (-activeIdx)}%)` }">
                <slot name="tab1"></slot>
            </div>
            <div ref="tab2" class="tab tab-2" :style="{ transform: `translateX(${100 * (-activeIdx)}%)` }">
                <slot name="tab2"></slot>
            </div>
            <div ref="tab3" class="tab tab-3" :style="{ transform: `translateX(${100 * (-activeIdx)}%)` }">
                <slot name="tab3"></slot>
            </div>
        </div>
    </div>
</template>

<script>
import bus from '@/utils/mitt'
export default {
    name: 'TabMagic',
    emits: ['tab0Click', 'tab1Click', 'tab2Click', 'tab3Click'],
    props: {
        title_list: {
            type: Array,
            required: true,
        },
        id: {
            type: Number,
            default: 0
        },
        backColor: {
            type: String,
            default: "#fff"
        },
        sticky: {
            type: [String],
            default: '',
        },
        activeIdx: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            // activeIdx: 0,
            observer: null,
            tabHeight: 100,
            cacheTop: [0, 0, 0, 0],
        }
    },
    methods: {
        refreshHeight() {
            let rect = this.$refs['tab' + this.activeIdx].getBoundingClientRect();
            // console.log(rect.height)
            if (rect && rect.height) {
                // console.log(rect.height,this.tabHeight)
                this.tabHeight = rect.height
            }
        }
    },
    watch: {
        activeIdx(to, from) {
            let dom = document.getElementById('homepage')
            if (dom) {
                this.cacheTop[from] = dom.scrollTop
            }
            // setTimeout(() => {
            //     dom.scrollTop = this.cacheTop[to] || 0
            // }, 100);
            // console.log('need-tab-idx', [to, this.id])
            bus.emit('need-tab-idx', [to, this.id])
        }
    },
    mounted() {
        // bus.on('refreshHeight', this.refreshHeight)
        setTimeout(() => {
            this.refreshHeight()
        }, 100);
        let MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver
        this.observer = new MutationObserver((mutationList) => {
            // for (let mutation of mutationList) {
            //     console.log(mutation);
            // }
            let rect = this.$refs['tab' + this.activeIdx].getBoundingClientRect();
            // console.log(rect.height, this.title_list)
            this.tabHeight = rect.height
            setTimeout(() => {
                // bus.emit('refreshHeight')
                this.refreshHeight()
            }, 180)
        })
        this.observer.observe(this.$refs.tab, {
            childList: true,
            attributes: true,
            subtree: true,
        })

    },
    beforeUnmount() {
        if (this.observer) {
            this.observer.disconnect()
            this.observer.takeRecords()
            this.observer = null
        }
        // bus.all.clear();
        // bus.off('refreshHeight', this.refreshHeight)
    },
    activated() {
        this.refreshHeight()
    },
    beforeRouteUpdate(to, from, next) {
        // 对路由变化做出响应...
        // 从本路由切换回本路由其他参数query触发
        // 当前为往届赛事，点击回到主页（当前赛事）时触发
        this.refreshHeight()
        next()
    },

}
</script>


<style scoped>
.tab-magic {
    width: 100%;
}

.tab-bar {
    display: flex;
    flex-direction: column;
    height: 48px;
    width: 100%;
    position: relative;
    background-color: #fff;
    z-index: 99;
    /* position: sticky; */
    /* top: 0; */
    border-left: solid 5px transparent;
    border-right: solid 5px transparent;
}

.tab-block-1 {
    height: 48px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
}

.tab-item {
    color: #999CA0;
    font-size: 16px;
    font-weight: 400;
    transition: color 0.3s;
    min-width: calc(100%/5);
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

    width: 20px;
    height: 2px;
    bottom: 7px;
    /* margin-left: calc(100%/6); */
    transform: translateX(-50%);
    position: absolute;
    border-radius: 1px;
    background-color: #4E46B4;
    transition: .4s;
}

.main-container {
    overflow: hidden;
    width: 100%;
    display: flex;
    align-items: flex-start;
    transition: height .3s;
}

.tab {
    flex-shrink: 0;
    width: 100vw;
    transition: .3s;
}
</style>