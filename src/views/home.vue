<template>
    <div class="home">
        <NavHeader></NavHeader>
        <router-view class="router-view" />
    </div>
</template>

<script>
import NavHeader from '@/components/NavHeader.vue'

export default {
    components:[
        NavHeader
    ],
    data(){
        return{

        }
    },
    methods:{

    },

}
</script>


<style scoped>
.home{
    height: 100vh;
    display: flex;
    flex-direction: column;
}
.router-view{
    flex: 1;
}
</style>