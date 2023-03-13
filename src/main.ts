import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './utils/rem'
import '@/utils/global_styles/main.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import TabMagic from '@/components/TabMagic/TabMagic.vue'
import Pop from '@/components/Pop/Pop.vue'
import Protocol from '@/components/littleTool/Protocol.vue'
import SeasonBtn from '@/components/SeasonBtn.vue'
const components = [
  TabMagic,
  Pop,
  Protocol,
  SeasonBtn
]
const app = createApp(App)

components.forEach(item => {
  app.component(item.name,item)
})

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(router)
app.mount('#app')
