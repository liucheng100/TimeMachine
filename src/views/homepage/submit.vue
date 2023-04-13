<template>
    <div class="submit">
        <div class="title">投稿</div>
        <div class="dad-upload">
            <div @click="upload" class="upload" :style="{ height: xheight ? xheight + 'px' : '' }">
                <div class="info">
                    <div class="icon"></div>
                    <div class="t1">上传文件</div>
                    <div class="t2">
                        {{ '请保留 EXIF 信息\n\n请确认您上传的作品的著作权为本人所有，\n禁止上传他人作品。\n如有侵权行为，您将承担相应的法律责任。' }}
                    </div>
                </div>
                <div v-if="source" class="overCover">
                    <img ref="sourceImg" class="source-img" :src="source" alt="">
                    <div v-if="loading" class="mask-1">
                        <div class="loading-icon"></div>
                        <div class="loading-icon load-double"></div>
                    </div>
                    <div @click.stop class="tool-box">
                        <div @click="trashFn" class="trash"></div>
                    </div>
                </div>
            </div>
        </div>
        <TabMagic :id="0" :title_list="['单反组', '随手拍组', '短视频组','AI 组']" @tab0Click="1" @tab1Click="1" @tab2Click="1"></TabMagic>
        <div class="tab tab-0">
            <p class="art-name">作品题目</p>
            <el-input v-model="artName" placeholder="输入作品题目..." class="art-name-input">
            </el-input>
            <p class="art-name">作品介绍</p>
            <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 20 }" resize="none" v-model="artIntro" :rows="5"
                placeholder="输入作品介绍..." class="art-name-textarea">
            </el-input>
        </div>
        <div class="dad-btn">
            <Protocol :ON="ON" @check="ON = !ON"></Protocol>
            <div class="sub-btn">
                提交
            </div>
        </div>
    </div>
</template>

<script>
import { uploadFile, } from '@/api/file'
export default {
    name: 'submit',
    emits: [],
    props: {
    },
    data() {
        return {
            source: '',
            xheight: '',
            loading: false,
            artIntro: '',
            artName: '',
            ON: false,
        }
    },
    methods: {
        trashFn() {
            this.source = this.xheight = ''
            this.loading = false
        },
        upload() {
            let input = document.createElement('input')
            input.setAttribute('type', 'file')
            input.setAttribute('accept', "image/*")
            input.click();

            input.onchange = (e) => {
                // console.log(e.target.files[0])
                let file = e.target.files[0]
                file = new window.File([file], file.name.slice(0,9), {type: file.type})
                let formData = new FormData();
                formData.append('file', file)
                let blob = window.URL.createObjectURL(file)
                this.source = blob
                this.loading = true

                uploadFile(formData).then(v=>{
                    console.log(typeof v)
                    if(!v.code){
                        let naturalHeight = this.$refs.sourceImg.naturalHeight
                        let naturalWidth = this.$refs.sourceImg.naturalWidth
                        // console.log(naturalHeight,naturalWidth)
                        let rate = naturalHeight / naturalWidth
                        // follow!
                        let W = this.$refs.sourceImg.offsetWidth
                        this.xheight = rate * W


                        this.loading = false
                    }
                })
                setTimeout(() => {
                    let naturalHeight = this.$refs.sourceImg.naturalHeight
                    let naturalWidth = this.$refs.sourceImg.naturalWidth
                    // console.log(naturalHeight,naturalWidth)
                    let rate = naturalHeight / naturalWidth
                    // follow!
                    let W = this.$refs.sourceImg.offsetWidth
                    this.xheight = rate * W


                    this.loading = false
                }, 1000)
            }
        }
    },

}
</script>


<style scoped>
.submit {
    /* padding: 30px 0px; */
}

.title {
    font-weight: 600;
    font-size: 32px;
    color: rgba(31, 31, 31, 1);
    margin-bottom: 17px;
    margin-top: 30px;
    padding: 0 20px;
}

.dad-upload {
    width: 100%;
    padding: 0 20px;
}

.upload {
    height: 353px;
    width: 100%;
    background: #FFFFFF;
    box-shadow: 0px 2px 30px rgba(0, 0, 0, 0.1);
    border-radius: 6px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;
    transition: .3s;
    min-height: 100px;
    margin-bottom: 20px;
}

.info {
    /* height: 108px; */
    /* width: 93px; */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
}

.icon {
    margin-bottom: 10px;
    height: 48px;
    width: 48px;
    background: url('../../assets/folderPlus.svg') center center / 100% no-repeat;
}

.t1 {
    font-size: 20px;
    color: rgba(78, 70, 180, 1);
    margin-bottom: 5px;
}

.t2 {
    font-size: 12px;
    color: rgba(153, 156, 160, 1);
    font-weight: 300;
    white-space: pre;
    text-align: center;
    line-height: 17px;
}

.overCover {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: white;
    overflow: hidden;
}

.source-img {
    object-fit: cover;
    height: 100%;
    width: 100%;
}

.mask-1 {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.39);
}

.loading-icon {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    animation: rotate 1.5s infinite linear;
    height: 32px;
    width: 32px;
    background: url('../../assets/loading.svg') center center / 100% no-repeat;
}

.load-double {
    animation: rotate_rev 1.5s infinite;
    height: 60px;
    width: 60px;
}

.tool-box {
    padding: 0 4px;
    position: absolute;
    bottom: 10px;
    left: 10px;
    height: 38px;
    display: flex;
    border-radius: 6px;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.644);
}

.trash {
    margin: 0 10px;
    height: 24px;
    width: 24px;
    background: url('../../assets/trash2.svg') center center / 100% no-repeat;
}

.refresh {
    margin: 0 10px;
    height: 24px;
    width: 24px;
    background: url('../../assets/refresh.svg') center center / 100% no-repeat;
}

.tab {
    padding: 10px 20px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.art-name {
    margin-bottom: 10px;
    font-size: 20px;
    color: rgba(78, 70, 180, 1);
    width: 100%;
}

.art-name-input {
    height: 48px;
    font-size: 12px;
    margin-bottom: 20px;
    width: 100%;
    background: #FFFFFF;
    /* Mid-shadow */
    box-shadow: 0px 2px 30px rgba(0, 0, 0, 0.1);
    border-radius: 6px;
}

.art-name-textarea {
    font-size: 12px;
    margin-bottom: 20px;
    width: 100%;
    background: #FFFFFF;
    /* Mid-shadow */
    box-shadow: 0px 2px 30px rgba(0, 0, 0, 0.1);
    border-radius: 6px;
}

.sub-btn {
    width: 100%;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(78, 70, 180, 1);
    color: white;
    font-size: 20px;
    margin-top: 20px;
    margin-bottom: 20px;
    border-radius: 6px;
    user-select: none;
}

.dad-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 20px;
}

@keyframes rotate {
    to {
        transform: translate(-50%, -50%) rotate(360deg);
    }
}

@keyframes rotate_rev {
    to {
        transform: translate(-50%, -50%) rotate(-360deg);
    }
}
</style>