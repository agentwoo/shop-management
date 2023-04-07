<!-- 商品分类管理 -->
<script lang='ts' setup>
import { reactive, toRefs, ref, onMounted } from 'vue'
import { getgoodskindApi } from '@/http/index'
import { errMessage, successMessage } from '@/utils';
import { Igoodskinds } from '@/utils/type'
import { addgoodskindApi, editgoodskindtextApi, delgoodskindApi } from '@/http/index'
import { delDialog } from '@/utils/index'

const data = reactive({
    tableData: [] as Igoodskinds[],
    // 添加分类
    addgoodskindForm: false,
    addgoodskindform: {
        text: '',
        value: '',
    },
    // 编辑
    editgoodskindForm: false,
    editgoodskindform: {
        text: '',
        kind_id: 0,
        value: '',
    },

})

// 获取所有商品分类信息
onMounted(async () => {
    let res = await getgoodskindApi()
    if (!res.ok) return errMessage(res.message)
    data.tableData = res.data
})

// 添加分类验证规则
const addgoodskindrules = reactive({
    text: [
        { max: 4, message: '分类名称长度不能超过4个字' },
        { required: true, message: '不能为空', trigger: 'blur' },
    ],
    value: [
        { max: 2, message: '只能输入两位数' },
        { required: true, message: '不能为空', trigger: 'blur' },
    ],
})

let addgoodskindformRef = ref()
//确定添加分类
async function confirmaddgoodskind() {
    const $form = addgoodskindformRef.value
    if (!$form) return
    const valid = await $form.validate()
    if (!valid) return

    let res = await addgoodskindApi({ text: data.addgoodskindform.text, value: Number(data.addgoodskindform.value) })
    if (!res.ok) return errMessage(res.message)

    data.tableData.push({ text: data.addgoodskindform.text, value: data.addgoodskindform.value })
    data.addgoodskindform.text = ''
    data.addgoodskindform.value = ''
    successMessage(res.message)
    data.addgoodskindForm = false
}


// 编辑分类
// 打开弹窗
const edit = (row: { text: string, value: string, kind_id: number }) => {
    // console.log('---', row);
    data.editgoodskindForm = true
    data.editgoodskindform.text = row.text
    data.editgoodskindform.kind_id = row.kind_id
    data.editgoodskindform.value = row.value
}
const editgoodskindrules = reactive({
    text: [
        { max: 4, message: '分类名称长度不能超过4个字' },
        { required: true, message: '不能为空', trigger: 'blur' },
    ],
})
let editgoodskindformRef = ref()
// 修改商品分类
async function confirmeditgoodkind() {
    const $form = editgoodskindformRef.value
    if (!$form) return
    const valid = await $form.validate()
    if (!valid) return

    let res = await editgoodskindtextApi({
        text: data.editgoodskindform.text,
        kind_id: data.editgoodskindform.kind_id,
        value: data.editgoodskindform.value
    })
    if (!res.ok) return errMessage(res.message)

    let index = data.tableData.findIndex(v => v.kind_id === data.editgoodskindform.kind_id)
    if (index === -1) return
    let item = data.tableData.find(v => v.kind_id === data.editgoodskindform.kind_id)
    if (!item) return
    item = { ...item, text: data.editgoodskindform.text }
    data.tableData.splice(index, 1, item)

    successMessage(res.message)

    data.editgoodskindform.text = ''
    data.editgoodskindform.kind_id = 0
    data.editgoodskindForm = false
}


// 删除商品分类
async function deletegoodskind(row: { value: string }) {
    let res = await delDialog('确定删除?', '提示')
    if (!res) return
    if (res) {
        let resmessage = await delgoodskindApi({ value: row.value })
        if (!resmessage.ok) return errMessage(resmessage.message)

        let index = data.tableData.findIndex(v => v.value === row.value)
        if (index === -1) return
        data.tableData.splice(index, 1)
        successMessage(resmessage.message)
    }
}

</script>

<template>
    <div class="container">
        <div v-if="data.tableData.length < 15">
            <el-button type="primary" @click="data.addgoodskindForm = true" style="margin-bottom:10px">添加</el-button>
        </div>
        <el-table :data="data.tableData" style="width: 100%" border>
            <el-table-column prop="value" label="分类值" width="180" />
            <el-table-column prop="text" label="分类" width="180" />
            <el-table-column fixed="right" label="操作" width="120">
                <template #default="scope">
                    <el-button link type="primary" size="small" @click="edit(scope.row)">编辑</el-button>
                    <el-button link type="primary" size="small" @click="deletegoodskind(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>


    <!-- 添加分类弹框 -->
    <el-dialog v-model="data.addgoodskindForm" title="提示" align-center style="width: 400px;">
        <el-form :model="data.addgoodskindform" ref="addgoodskindformRef" :rules="addgoodskindrules">
            <el-form-item label="分类" prop="text" label-width="60px" required>
                <el-input v-model="data.addgoodskindform.text" autocomplete="off" placeholder="请输入分类名称" />
            </el-form-item>
            <el-form-item label="值" prop="value" label-width="60px" required>
                <el-input v-model="data.addgoodskindform.value" type="number" autocomplete="off" placeholder="请输入数字" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="data.addgoodskindForm = false">取消</el-button>
                <el-button type="primary" @click="confirmaddgoodskind">
                    确定
                </el-button>
            </span>
        </template>
    </el-dialog>

    <!-- 编辑--只能修改分类名称 -->
    <el-dialog v-model="data.editgoodskindForm" title="修改分类名称" align-center style="width: 400px;">
        <el-form :model="data.editgoodskindform" ref="editgoodskindformRef" :rules="editgoodskindrules">
            <el-form-item label="分类" prop="text" label-width="60px" required>
                <el-input v-model="data.editgoodskindform.text" autocomplete="off" placeholder="请输入分类名称" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="data.editgoodskindForm = false">取消</el-button>
                <el-button type="primary" @click="confirmeditgoodkind">
                    确定
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<style lang='scss' scoped>
.container {
    width: 480px;
    margin-top: 20px;
}

:deep(.el-table .cell) {
    text-align: center;
}
</style>