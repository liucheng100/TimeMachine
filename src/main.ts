import { createApp,reactive } from 'vue'
import App from './App.vue'
import router from './router'
import './utils/rem'
import '@/utils/global_styles/main.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import TabMagic from '@/components/TabMagic/TabMagic.vue'
import Pop from '@/components/Pop/Pop.vue'
import Protocol from '@/components/littleTool/Protocol.vue'
import SeasonBtn from '@/components/SeasonBtn.vue'
import ImgZoom from '@/components/ImgZoom/ImgZoom.vue'
import store from './store'
const components = [
  TabMagic,
  Pop,
  Protocol,
  SeasonBtn,
  ImgZoom
]
const app = createApp(App)
components.forEach(item => {
  app.component(item.name,item)
})

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// 全局变量
const globalData = reactive({
  contestId: -1,
  prizes: -1,
})

// 提供全局变量
app.provide('globalData', globalData)
app.use(router)
app.use(store)
app.mount('#app')
