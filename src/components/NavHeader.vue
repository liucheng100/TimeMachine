<template>
    <div class="nav-header">
        <div class="group13"></div>
        <BtnMagic @click="ON = !ON" :ON="ON"></BtnMagic>
        <teleport to="body">
            <transition name="navMask">
                <div v-if="ON" class="nav-mask">
                    <div class="container">
                        <transition-group name="navItem" appear>
                            <div :style="{ transitionDelay: (idx + 1) * 0.09 + 's' }" @click="navEvent(i)" class="route-item"
                                :key="idx" v-for="(i, idx) in routeList">
                                {{ i.name }}
                            </div>
                        </transition-group>
                    </div>
                </div>
            </transition>
        </teleport>
    </div>
</template>

<script>
import BtnMagic from '@/components/littleTool/BtnMagic.vue'
import { removeToken } from "@/utils/auth";
export default {
    components: [
        BtnMagic
    ],
    inject: ['globalData'],
    data() {
        return {
            ON: false,
            routeList: [
                {
                    name: '回到主页',
                    path: '/'
                },
                {
                    name: '往届赛事',
                    path: '/preCamps'
                },
                {
                    name: '我的投稿',
                    path: '/myWork'
                },
                {
                    name: '关于天外天',
                    event: () => {
                        let a = document.createElement('a')
                        a.href = 'https://www.twt.edu.cn/'
                        a.target = 'blank'
                        a.click()
                    }
                },
                {
                    name: '天外天新闻网',
                    event: () => {
                        let a = document.createElement('a')
                        a.href = 'https://news.twt.edu.cn'
                        a.target = 'blank'
                        a.click()
                    }
                },
                {
                    name: '退出登陆',
                    event: () => {
                        removeToken();
                        this.globalData.contestId = -1
                        this.$router.push("/login");
                    }
                },
            ]
        }
    },
    watch: {
        $route() {
            this.ON = false
        }
    },
    methods: {
        navEvent(i) {
            if (i.path) {
                this.$router.push(i.path)
                this.ON = false
            } else if (i.event) {
                i.event();
            }
        }
    },

}
</script>


<style scoped>
.nav-header {
    height: var(--nav-height);
    background-color: var(--nav-bgc);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 14px;
    z-index: 999
}

.group13 {
    background: url('../assets/Group13.svg') center center / 100% no-repeat;
    height: 22px;
    width: 22px;
}

.nav-mask {
    font-size: 32px;
    line-height: 44.8px;
    color: #E8E8E8;
    font-weight: 600;
    width: calc(100vw + 1px);
    height: calc(135vh - var(--nav-height));
    background-color: var(--nav-bgc);
    position: fixed;
    top: calc(var(--nav-height) - 1px);
    z-index: 998;
    transition: all .3s;
    -webkit-mask-image: linear-gradient(180deg,
            #000 80%,
            transparent);
}

.container {
    padding-left: 50px;
    padding-top: 61px;
    width: 100%;
    height: calc(100vh - var(--nav-height) + 1px);
    overflow-x: hidden;
}

.navItem-enter-from,
.navItem-leave-to {
    transform: translateX(24vw);
    opacity: .0;
    /* transform: rotate3d(0,0,1,60deg); */
}

.navMask-enter-from,
.navMask-leave-to {
    transform: translateY(-100%);
    opacity: .86;
    /* transform: rotate3d(0,0,1,60deg); */
}

.route-item {
    margin-bottom: 18px;
    transition: all .34s;
}
</style>