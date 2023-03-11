<template>
    <div class="columnList">
        <!-- 顶部按钮 -->
        <div class="top">
            <div class="search">
                <input class="search_input" type="text">
                <img class="search_btn" @click="search" src="../../assets/resource/search.png">
            </div>
            <div>
            </div>
            <div class="del_file_btn" style="margin-left: 41.3vw;" @click="addColumn" v-if="!isEdit">
                <img src="../../assets/resource/plus.svg">
                <div class="del_file_font" style="width: 100px;">新建栏目</div>
            </div>
            <div class="del_file_btn" @click="edit" v-if="!isEdit">
                <img src="../../assets/resource/edit.svg">
                <div class="del_file_font" style="width: 100px;">编辑栏目</div>
            </div>
            <div class="del_file_btn" style="margin-left: 41.3vw;" @click="edit" v-if="isEdit">
                <img src="../../assets/resource/tick.svg">
                <div class="del_file_font" style="width: 100px;">完成</div>
            </div>
            <div class="del_file_btn" v-if="isEdit">
                <img src="../../assets/resource/del.svg">
                <div class="del_file_font" style="width: 100px;" @click="multipleDelete">删除</div>
            </div>
        </div>
        <!-- 列表 -->
        <el-table :data="tableData" border empty-text="暂无数据" ref="multipleTableRef"
            @selection-change="handleSelectionChange" style="width: 100%; margin-top: 40px;">
            <el-table-column :resizable="false" min-width="30px" type="selection" align="center" v-if="isEdit" />
            <el-table-column prop="name" label="栏目名称" />
            <el-table-column prop="object" label="推送对象" />
            <el-table-column prop="createdTime" label="创建时间" sortable>
                <!-- <template #default="scope">{{scope.row.time.split(".")[0].split("T").join(" ")}}</template> -->
            </el-table-column>
            <el-table-column prop="num" label="文件数量" />
            <el-table-column prop="attachment" label="">
                <template #default="scope">
                    <a :href=scope.row.attachment>查看文件</a>
                </template>
            </el-table-column>
            <el-table-column prop="attachment" label="" v-if="isEdit" width="200">
                <template #default="scope">
                    <el-button auto-insert-space @click="">查看</el-button>
                    <el-popconfirm title="您确定要删除这个栏目吗？" confirm-button-text="确认" cancel-button-text="取消"
                        @confirm="handleDelete(scope.row.columnId)">
                        <template #reference>
                            <el-button auto-insert-space type="danger">删除</el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <!-- 编辑 -->
        <div v-if="isAdd" class="addColumn">
            <img src="../../assets/resource/cross.svg" class="close" @click="closeAdd">
            <div class="write_title">
                <div class="write_title_font">栏目名称</div>
                <input type="text" v-model="newColumnName" class="write_title_input" />
            </div>
            <button class="write_submit" @click="finishAdd">确&#12288;认</button>
        </div>
    </div>
</template>

<script>
    import { computed, ref, watch } from "vue";
    import { ElTable } from 'element-plus'
    import { getColumn, addColumn, deleteColumn } from '@/api/resource.ts';
    export default {
        components: {
        },
        data() {
            return {
                tableData: [
                ],
                newColumnName: "",
                multipleSelection: [],
                isEdit: false,
                isAdd: false,
            };
        },
        created() {
            this.refresh()
        },
        methods: {
            refresh() {
                getColumn().then((v) => {
                    this.tableData = v.data
                    function sortRule(a, b) {
                        return a.position - b.position; // 如果a>=b，返回自然数，不用交换位置
                    }
                    this.tableData.sort(sortRule);

                    // for (let i = 0; i < v.data.length; i++) {
                    //     let temp = { name: "null", object: "null", createdTime: "2000-01-01", updatedTime: "2000-01-01", num: "0", attachment: "", position: 999 }
                    //     temp.name = v.data[i].name
                    //     // temp.object = v.data[i].object
                    //     temp.createdTime = v.data[i].createdTime
                    //     temp.updatedTime = v.data[i].updatedTime
                    //     temp.name = v.data[i].name
                    //     console.log(v.data[i])
                    //     this.tableData.push(temp)
                    // }
                    // console.log(this.tableData)
                })
            },
            search() { },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            edit() {
                this.isEdit = !this.isEdit
            },
            addColumn() {
                this.isAdd = true
            },
            closeAdd() {
                this.isAdd = false
            },
            finishAdd() {
                this.isAdd = false
                let params = { columnName: this.newColumnName, position: this.tableData.length + 1 }
                addColumn(params).then((v) => {
                    this.refresh()
                    this.newColumnName = ""
                })
            },
            handleDelete(id) {
                deleteColumn(id).then(({ code: code, msg: msg }) => {
                    if (code === 0) {
                        ElMessage.success("删除成功！");
                        this.refresh();
                    } else {
                        ElMessage.error(msg);
                    }
                });
            },
            multipleDelete() {
                for (let i = 0; i < this.multipleSelection.length; i++) {
                    deleteColumn(this.multipleSelection[i].columnId).then((v) => {
                        this.refresh()
                    })
                }
            }
        },
    };
</script>
<style scoped>
    .columnList {
        display: flex;
        position: relative;
        flex-direction: column;
    }

    .top {
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

    /* 编辑栏目 */
    .addColumn {
        position: absolute;
        z-index: 100;
        width: 1200px;
        height: 280px;
        background-color: white;
        top: 10vh;
        left: 10%;
        border-radius: 20px;
        border: 1px solid rgb(228, 72, 80);
    }

    .close {
        height: 30px;
        position: relative;
        top: 15px;
        left: 1150px;
    }

    .write_title {
        margin-left: 50px;
        margin-top: 50px;
        height: 48px;
        width: 1100px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .write_title_font {
        color: #2f2f2f;
        font-size: 20px;
        width: 150px;
    }

    .write_title_input {
        color: #2f2f2f;
        font-size: 18px;
        width: 1080px;
        height: 48px;
        border-radius: 4px;
        border: solid 2px rgb(244, 243, 243);
        outline-color: rgb(199, 36, 47);
    }

    .write_submit {
        margin-top: 80px;
        margin-left: 510px;
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