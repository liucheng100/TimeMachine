<template>
    <div class="page2">
        <CardMini
            v-for="i in dataList"
            :title = i.title
            :auth = i.auth
            :avatar = i.avatar
            :hot = i.hot
            :cover = i.cover
            @click="$router.push({
                path: '/WorkDetail',
                query: {workId:13}
            })"
        ></CardMini>
    </div>
</template>

<script>
import CardMini from '@/components/Card/CardMini.vue'
import bus from '@/utils/mitt'
export default {
    name: 'page2',
    props:{
        loadMore:{
            default: false,
            type: Boolean,
        }
    },
    components:[
        CardMini
    ],
    data(){
        return{
            loading: false,
            tabIdx: 0,
            dataList:[
                {
                    title: '城市作画',
                    auth: '城市作画',
                    avatar: '',
                    hot: '1071',
                    cover:'',
                },
                {
                    title: '城市作画',
                    auth: '城市作画',
                    avatar: '',
                    hot: '1071',
                    cover:'',
                },
                {
                    title: '城市作画',
                    auth: '城市作画',
                    avatar: '',
                    hot: '1071',
                    cover:'',
                },
                {
                    title: '城市作画',
                    auth: '城市作画',
                    avatar: '',
                    hot: '1071',
                    cover:'',
                },
                {
                    title: '城市作画',
                    auth: '城市作画',
                    avatar: '',
                    hot: '1071',
                    cover:'',
                },
                {
                    title: '城市作画',
                    auth: '城市作画',
                    avatar: '',
                    hot: '1071',
                    cover:'',
                },
            ]
        }
    },
    watch:{
        loadMore(to){
            if(this.tabIdx==1 && to){
                if(!this.loading){
                    this.loading = true
                    // loadmore here
                    alert('loadMore')
                    this.loading = false
                }
            }
        }
    },
    methods:{
        
    },
    mounted(){
        bus.on('need-tab-idx',(ls)=>{
            if(ls[1]==1){
                this.tabIdx = ls[0]
            }
        })
        
    },

}
</script>


<style scoped>
.page2{
    width: 100%;
    min-height: 300px;
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    background-color: #fff;
}
</style>