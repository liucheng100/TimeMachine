<template>
    <div class="work-detail">
        <div @click="zoomOn=true" class="cover-box">
            <img class="img" src="../../assets/alertCircle.svg" alt="">
        </div>
        <div class="info-mask">
            <div class="title">城市作画</div>
            <div class="bar">
                <div class="flex">
                    <div class="avatar" :style="{ backgroundImage: `url('')` }"></div>
                    <div class="info">城市作画</div>
                </div>
                <div class="flex">
                    <div class="eye"></div>
                    <div class="info">1071</div>
                </div>
            </div>
            <div class="psg">
                城市画作代表了未来摄影的前进方向城市画作代表了未来摄影的前进方向城市画作代表了未来摄影的前进方向城市画作代表了未来摄影的前进方向城市画作代表了未来摄影的前进方向城市画作代表了未来摄影的前进方向。
            </div>
            <div class="back">
                <div @click="$router.back()" class="flex">
                    <div class="backIcon"></div>
                    <div class="backInfo">返回列表</div>
                </div>
            </div>
        </div>
        <ImgZoom
        src="https://avatars.githubusercontent.com/u/6"
        v-model:ON="zoomOn"
        @update:ON="zoomOn=false"
        ></ImgZoom>
    </div>
</template>

<script>
export default {
    name: 'WorkDetail',
    data() {
        return {
            zoomOn: false,
        }
    },
    methods: {

    },
    mounted() {
        console.log(this.$route.query)

    },

}
</script>


<style scoped>
.work-detail {
    position: relative;
}

.cover-box {
    height: calc(100% - 200px);
    width: 100%;
    overflow: hidden;
}

.img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    background-color: rgb(245, 245, 245);
}

.info-mask {
    position: absolute;
    bottom: 0;
    width: 100%;
    min-height: 200px;
    background-color: white;
    padding: 20px 20px 28px 20px;
    display: flex;
    flex-direction: column;
}

.bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
}

.eye {
    height: 13px;
    width: 13px;
    background: url('../../assets/eye.svg') center center / 100% no-repeat;
    margin-right: 5px;
}

.info {
    font-size: 12px;
    font-weight: 300;
    color: rgba(153, 156, 160, 1);
    transform: translateY(-.6px);
}

.flex {
    display: flex;
    align-items: center;
}

.avatar {
    height: 17px;
    width: 17px;
    border-radius: 50%;
    border: solid 1px white;
    box-shadow: 0px 2px 15px rgba(0, 0, 0, 0.1);
    margin-right: 5px;
    background: center center / 100% no-repeat;
    background-color: rgba(217, 217, 217, 1);
}

.title {
    font-size: 20px;
    color: rgba(31, 31, 31, 1);
    margin-bottom: 10px;
}
.psg{
    font-size: 12px;
    color: rgba(153, 156, 160, 1);
    line-height: 16.8px;
    margin-bottom: 10px;
    flex: 1;
}
.back{
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 22px;
}
.backIcon{
    height: 22px;
    width: 22px;
    background: url('../../assets/backArray.svg') center center / 100% no-repeat;
}
.backInfo{
    font-size: 16px;
    color: rgba(78, 70, 180, 1);
    transform: translateY(-.6px);
}
</style>