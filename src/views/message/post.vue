<template>
    <div class="fileList">
        <!-- 顶部按钮 -->
        <div class="top" v-if="!isChecking && !isEditing">
            <div class="search">
                <input class="search_input" type="text">
                <img class="search_btn" @click="search" src="../../assets/message/search.png">
            </div>
            <div class="del_file_btn" style="margin-left: 47vw;" @click="edit">
                <img src="../../assets/resource/edit.svg">
                <div class="del_file_font" style="width: 100px; margin-left: 25px;">写信</div>
            </div>
        </div>
        <!-- 列表 -->
        <el-table :data="tableData" border empty-text="暂无数据" ref="multipleTableRef" v-if="!isChecking && !isEditing"
            @selection-change="handleSelectionChange" style="width: 100%; margin-top: 40px;">
            <el-table-column prop="name_post" label="发件人" />
            <el-table-column prop="name_get" label="收件人" />
            <el-table-column prop="title" label="标题" />
            <el-table-column prop="time" label="时间" sortable><template #default="scope">{{
                    scope.row.time.split(".")[0].split("T").join(" ")
                    }}</template></el-table-column>
            <el-table-column prop="attachment" label="" width="200">
                <template #default="scope">
                    <div style="width:100%;display: flex; justify-content: center;">
                        <el-button auto-insert-space @click="check(1)">查看</el-button>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <!-- 写信 -->
        <div v-if="isEditing" class="write">
            <img src="../../assets/resource/cross.svg" class="close" @click="closeEdit">
            <div class="write_title">
                <div class="write_title_font">标题</div>
                <input type="text" class="write_title_input" />
            </div>
            <div class="write_p">
                <div class="write_title_font">对象</div>
                <div>
                    <select class="selectInput" required>
                        <option>全校师生</option>
                    </select>
                </div>
            </div>
            <div class="write_input_out">
                <div class="write_title_font">内容</div>
                <textarea class="write_input"></textarea>
            </div>
            <div class="write_addPic">
                <button>
                    <p>添加文件</p>
                    <img src="../../assets/resource/plus.svg" />
                </button>
                <input type="file" />
            </div>
            <button class="write_submit" @click="closeEdit">发&#12288;送</button>
        </div>
        <!-- 查看 -->
        <div v-if="isChecking" class="check">
            <div class="write_title">
                <div class="check_title_font">发件人</div>
                <div class="check_title_content">{{tableData[this.current].name_post}}</div>
            </div>
            <div class="write_title">
                <div class="check_title_font">标题</div>
                <div>
                    <div class="check_title_content">{{tableData[this.current].title}}</div>
                </div>
            </div>
            <div class="write_input_out">
                <div class="write_title_font">内容</div>
                <div class="write_input">{{current_content}}</div>
            </div>
            <button class="check_close" @click="closeCheck">关&#12288;闭</button>
        </div>
    </div>
</template>

<script>
    import { computed, ref, watch } from "vue";
    import { ElTable } from 'element-plus'
    export default {
        components: {
        },
        data() {
            return {
                tableData: [
                    { name_post: "aa", name_get: "aa", title: "aa", time: "2000-01-01" },
                    { name_post: "bb", name_get: "aa", title: "aa", time: "2000-01-02" },
                    { name_post: "cc", name_get: "aa", title: "aa", time: "2000-01-05" },
                    { name_post: "dd", name_get: "aa", title: "aa", time: "2000-01-04" },
                ],
                multipleSelection: [],
                isChecking: false,
                isEditing: false,
                current: -1,
                current_content: "aaaaaaaaaaaaaaaaaaaaaaaaa"
            };
        },
        methods: {
            search() { },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            edit() {
                this.isEditing = true
            },
            closeEdit() {
                this.isEditing = false
            },
            post() {
                this.closeEdit()
            },
            check(i) {
                this.isChecking = true
                this.current = i
            },
            closeCheck() {
                this.isChecking = false
            }
        },
    };
</script>
<style scoped>
    /* 主页 */
    .fileList {
        display: flex;
        position: relative;
        flex-direction: column;

    }

    .top {
        z-index: 0;
        width: 100vw;
        height: 40px;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
    }

    .search {
        display: flex;
        height: 40px;
        border-radius: 100px;
        border: solid 2px rgb(228, 72, 80);
    }

    .search_input {
        height: 35px;
        width: 300px;
        margin-left: 15px;
        border: none;
        outline: none;
    }

    .search_btn {
        height: 35px;
        width: 35px;
        cursor: pointer;
        line-height: 40px;
        font-size: 16px;
        margin: 1.5px 10px;
        transition: 0.4s;
    }


    .del_file_btn {
        margin-left: 10px;
        transition: 0.4s;
        border-radius: 6px;
        color: white;
        cursor: pointer;
        font-size: 16px;
        background-color: rgb(228, 72, 80);
        height: 40px;
        width: 115px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .del_file_btn:hover {
        background-color: rgba(228, 72, 80, 0.84);
    }

    .del_file_btn img {
        margin-left: 10px;
        height: 20px;
        width: 20px;
    }

    .del_file_font {
        margin-left: 10px;
        width: 50px;
        line-height: 40px;
        height: 40px;
    }

    /* 写信 */
    .close {
        width: 25px;
        position: absolute;
        top: 0;
        right: 15px;
    }

    .write {
        display: flex;
        font-size: 20px;
        font-family: Noto Sans SC-DemiLight, Noto Sans SC;
        font-weight: normal;
        display: flex;
        flex-direction: column;
    }

    .write_p {
        margin-left: 160px;
        margin-top: 28px;
        height: 48px;
        width: 552px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .selectInput {
        font-size: 20px;
        width: 442px;
        height: 48px;
        border-radius: 4px;
        border: solid 2px rgb(244, 243, 243);
        outline-color: rgb(199, 36, 47);
    }

    .write_title {
        margin-left: 160px;
        margin-top: 46px;
        height: 48px;
        width: 1140px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .write_title_font {
        color: #2f2f2f;
        font-size: 20px;
        width: 80px;
    }

    .write_title_input {
        color: #2f2f2f;
        font-size: 18px;
        width: 1030px;
        height: 48px;
        border-radius: 4px;
        border: solid 2px rgb(244, 243, 243);
        outline-color: rgb(199, 36, 47);
    }

    .write_input_out {
        margin-top: 32px;
        margin-left: 160px;
        width: 1140px;
        height: 434px;
        display: flex;

    }

    .write_input {
        position: relative;
        color: #505050;
        font-size: 18px;
        /* margin-top: 44px; */
        margin-left: 30px;
        resize: none;
        width: 1000px;
        height: 100%;
        border-color: rgb(255, 255, 255);
        outline-color: rgb(255, 255, 255);
    }

    .write_addPic {
        cursor: pointer;
        margin-top: 24px;
        margin-left: 160px;
    }

    .write_addPic button {
        pointer-events: none;
        text-align: left;
        display: flex;
        position: absolute;
        align-items: center;
        width: 137px;
        height: 36px;
        /* left: 512px; */
        font-size: 18px;
        z-index: 2;
        color: #FFFFFF;
        background-color: rgb(199, 36, 47);
        border: none;
        border-radius: 10px;
    }

    .write_addPic p {
        margin-left: 16px;
    }

    .write_addPic img {
        width: 24px;
        height: 24px;
        margin-left: 7px;
    }

    .write_addPic input {
        position: absolute;
        margin-top: 2px;
        left: 165px;
        z-index: 1;
        width: 130px;
        height: 33px;
    }

    .write_submit {
        margin-top: 66px;
        margin-left: 640px;
        text-align: center;
        line-height: 24px;
        color: white;
        font-size: 18px;
        height: 48px;
        width: 180px;
        background-color: rgb(199, 36, 47);
        border-radius: 80px;
        border: none;
        cursor: pointer;
    }

    /* 查看 */
    .check {
        display: flex;
        font-size: 20px;
        font-family: Noto Sans SC-DemiLight, Noto Sans SC;
        font-weight: normal;
        display: flex;
        flex-direction: column;
    }

    .check_p {
        margin-left: 160px;
        margin-top: 28px;
        height: 48px;
        width: 552px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .selectInput {
        font-size: 20px;
        width: 442px;
        height: 48px;
        border-radius: 4px;
        border: solid 2px rgb(244, 243, 243);
        outline-color: rgb(199, 36, 47);
    }

    .write_title {
        margin-left: 160px;
        margin-top: 25px;
        height: 48px;
        width: 1140px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .check_title_font {
        color: #2f2f2f;
        font-size: 20px;
        width: 80px;
    }

    .check_title_content {
        line-height: 48px;
        color: #2f2f2f;
        font-size: 18px;
        width: 1030px;
        height: 48px;
    }

    .write_input_out {
        margin-top: 32px;
        margin-left: 160px;
        width: 1140px;
        height: 434px;
        display: flex;

    }

    .write_input {
        position: relative;
        color: #505050;
        font-size: 18px;
        /* margin-top: 44px; */
        margin-left: 30px;
        resize: none;
        width: 1000px;
        height: 100%;
        border-color: rgb(255, 255, 255);
        outline-color: rgb(255, 255, 255);
    }

    .write_addPic {
        cursor: pointer;
        margin-top: 24px;
        margin-left: 160px;
    }

    .write_addPic button {
        pointer-events: none;
        text-align: left;
        display: flex;
        position: absolute;
        align-items: center;
        width: 137px;
        height: 36px;
        /* left: 512px; */
        font-size: 18px;
        z-index: 2;
        color: #FFFFFF;
        background-color: rgb(199, 36, 47);
        border: none;
        border-radius: 10px;
    }

    .write_addPic p {
        margin-left: 16px;
    }

    .write_addPic img {
        width: 24px;
        height: 24px;
        margin-left: 7px;
    }

    .write_addPic input {
        position: absolute;
        margin-top: 2px;
        left: 165px;
        z-index: 1;
        width: 130px;
        height: 33px;
    }

    .check_close {
        margin-top: 66px;
        margin-left: 640px;
        text-align: center;
        line-height: 24px;
        color: white;
        font-size: 18px;
        height: 48px;
        width: 180px;
        background-color: rgb(199, 36, 47);
        border-radius: 80px;
        border: none;
        cursor: pointer;
    }
</style>