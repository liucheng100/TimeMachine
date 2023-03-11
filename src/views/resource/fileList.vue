<template>
    <div class="fileList">
        <!-- 顶部按钮 -->
        <div class="top" v-if="!isAdding">
            <div class="search">
                <input class="search_input" type="text" v-model="searchName">
                <img class="search_btn" src="../../assets/resource/search.png">
            </div>
            <div>
                <select class="select" v-model="column" @click="setColumn" required>
                    <option v-for="col in columns">{{col.name}}</option>
                </select>
            </div>
            <div class="del_file_btn" style="margin-left: 32vw;" @click="addFile">
                <img src="../../assets/resource/plus.svg">
                <div class="del_file_font" style="width: 100px;">添加文件</div>
            </div>
            <div class="del_file_btn">
                <img src="../../assets/resource/del.svg">
                <div class="del_file_font" @click="multipleDelete">删除</div>
            </div>
        </div>
        <!-- 列表 -->
        <el-table :data="tableData" border empty-text="暂无数据" ref="multipleTableRef" v-if="!isAdding"
            @selection-change="handleSelectionChange" style="width: 100%; margin-top: 40px;">
            <el-table-column :resizable="false" min-width="30px" type="selection" align="center" />
            <el-table-column prop="title" label="文件名称" />
            <el-table-column prop="createdTime" label="上传时间" sortable>
                <!-- <template #default="scope">{{scope.row.time.split(".")[0].split("T").join(" ")}}</template> -->
            </el-table-column>
            <el-table-column prop="num" label="文件数量" />
            <el-table-column prop="attachment" label="附件">
                <template #default="scope">
                    <a :href=scope.row.attachment>{{scope.row.name}}</a>
                </template>
            </el-table-column>
            <el-table-column prop="attachment" label="" width="150">
                <template #default="scope">
                    <div style="width:100%;height:30px;display: flex; justify-content: center;">
                        <div class="del_file_btn" style="width:60px;height:30px;" @click="editFile()">
                            <div class="del_file_font">编辑</div>
                        </div>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <!-- 添加文件 -->
        <div v-if="isAdding" class="write">
            <img src="../../assets/resource/back.svg" class="back" @click="back">
            <div class="write_title">
                <div class="write_title_font">标题</div>
                <input type="text" class="write_title_input" v-model="add_title" />
            </div>
            <div class="write_p">
                <div class="write_title_font">所属栏目</div>
                <div>
                    <select class="selectInput" v-model="add_column" required>
                        <option v-for="col in columns">{{col.name}}</option>
                    </select>
                </div>
            </div>
            <div class="write_input_out">
                <div class="write_title_font">内容</div>
                <textarea class="write_input" v-model="add_text"></textarea>
            </div>
            <div class="write_addPic">
                <button>
                    <p>添加文件</p>
                    <img src="../../assets/resource/plus.svg" @change="uploadFile" />
                </button>
                <input type="file" ref="add_file" />
            </div>
            <button class="write_submit" @click="finishAdd">完&#12288;成</button>
        </div>
        <!-- 编辑文件 -->
        <div v-if="isEditing" class="write">
            <img src="../../assets/resource/back.svg" class="back" @click="back">
            <div class="write_title">
                <div class="write_title_font">标题</div>
                <input type="text" class="write_title_input" v-model="edit_title" />
            </div>
            <div class="write_p">
                <div class="write_title_font">所属栏目</div>
                <div>
                    <select class="selectInput" v-model="edit_column" required>
                        <option v-for="col in columns">{{col.name}}</option>
                    </select>
                </div>
            </div>
            <div class="write_input_out">
                <div class="write_title_font">内容</div>
                <textarea class="write_input" v-model="edit_text"></textarea>
            </div>
            <div class="write_addPic">
                <button>
                    <p>添加文件</p>
                    <img src="../../assets/resource/plus.svg" @change="uploadFile_edit" />
                </button>
                <input type="file" ref="edit_file" />
            </div>
            <button class="write_submit" @click="finishEdit">完&#12288;成</button>
        </div>
    </div>
</template>

<script>
    import { computed, ref, watch } from "vue";
    import { ElTable } from 'element-plus';
    import request from "@/utils/pub-use.ts";
    import { getResourceFile, getColumnFile, searchResourceFile, deleteResourceFile, addResourceFile, getColumn } from '@/api/resource.ts';
    export default {
        components: {
        },
        data() {
            return {
                searchName: "",
                column: "",
                columns: [],
                tableData: [],
                multipleSelection: [],
                isAdding: false,
                isEditing: false,
                // 添加文件
                add_title: '',
                add_column: '',
                add_text: '',
                add_filePath: '',
                //编辑文件
                edit_title: '',
                edit_column: '',
                edit_text: '',
                edit_filePath: '',
            };
        },
        created() {
            getColumn().then((v) => {
                let temp = v.data
                function sortRule(a, b) {
                    return a.position - b.position;
                }
                temp.sort(sortRule);
                let columns = []
                for (let i = 0; i < temp.length; i++) {
                    let c = { name: temp[i].name, columnId: temp[i].columnId }
                    columns.push(c)
                }
                this.columns = columns
                this.column = columns[0].name
                this.refresh()
            })
        },
        methods: {
            refresh() {
                let id
                for (let i = 0; i < this.columns.length; i++) {
                    if (this.column === this.columns[i].name) {
                        id = this.columns[i].columnId
                    }
                }
                getColumnFile(id).then(v => {
                    this.tableData = v.data
                })
            },
            setColumn() {
                this.refresh()
            },
            search() {
                searchResourceFile(this.searchName).then(v => {
                    let id
                    for (let j = 0; j < this.columns.length; j++) {
                        if (this.column === this.columns[j].name)
                            id = this.columns[j].columnId
                    }
                    this.tableData = []
                    for (let i = 0; i < v.data.length; i++) {
                        if (id === v.data[i].columnId) {
                            this.tableData.push(v.data[i])
                        }
                    }


                })
            },
            handleSelectionChange(val) {
                console.log(val)
                this.multipleSelection = val;
            },
            multipleDelete() {
                for (let i = 0; i < this.multipleSelection.length; i++) {
                    deleteResourceFile(this.multipleSelection[i].libraryFileId).then((v) => {
                        this.refresh()
                    })
                }
            },
            uploadFile() {
            },
            addFile() {
                this.isAdding = true
            },
            finishAdd() {
                let id
                for (let i = 0; i < this.columns.length; i++) {
                    if (this.add_column === this.columns[i].name) {
                        id = this.columns[i].columnId
                    }
                }
                let params = { "text": this.add_text, "columnId": id, "path": this.add_filePath, "title": this.add_title }
                addResourceFile(params).then(v => {
                    console.log(v)
                    this.refresh()
                    this.isAdding = false
                })
            },
            back() {
                this.isAdding = false
                this.isEditing = false
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

    .select {
        margin-left: 30px;
        font-size: 20px;
        width: 150px;
        height: 40px;
        border-radius: 5px;
        border: solid 2px rgb(244, 243, 243);
        outline-color: rgb(244, 243, 243);

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

    /* 添加文件 */
    .write {
        position: relative;
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

    .back {
        position: absolute;
        top: 40px;
        left: 30px;
        height: 60px;
    }
</style>