<!-- 用户管理 -->
<script lang='ts' setup>
import { reactive, toRefs, ref, onMounted } from 'vue'
import { getuserListApi, updateuserpasswodApi } from '@/http/index'
import { errMessage, successMessage } from '@/utils/index';
import { IuserList } from '@/utils/type'


const data = reactive({
    selectData: {
        user_name: '',
        page: 0,
        count: 0,
    },
    // 存储数据源
    tableData: [] as IuserList[],

    // 展示分页数据
    list: [] as IuserList[][],

    // 修改用户密码弹窗
    edituserpwdForm: false,
    edituserpwdform: {
        newpwd: '',
        checkpwd: '',
    },
    user_name: '',
})


onMounted(async () => {
    let res = await getuserListApi()
    if (!res.ok) return errMessage(res.message)
    data.tableData = res.data

    // 分页
    data.selectData.count = res.data.length
    sliceList(res.data)
})

// 获取当前分页
const currentChange = (pages: number) => {
    data.selectData.page = pages - 1
}

//截取每页展示的数据量
const sliceList = (arr: IuserList[]) => {
    data.list = []
    for (let index = 0; index < arr.length; index += 6) {
        let newList: any = arr.slice(index, index + 6)
        data.list.push(newList)
    }
}

// 查询数据
const onSubmit = () => {
    if (data.selectData.user_name.trim() === '') return errMessage('请输入用户名')

    let arr: IuserList[] = []
    if (data.selectData.user_name) {
        arr = data.tableData.filter(v => v.user_name.indexOf(data.selectData.user_name) !== -1)
    }

    // 重新计算查询后的分页数据
    data.selectData.count = arr.length
    sliceList(arr)
    data.selectData.user_name = ''
}

// 修改密码
async function changepassword(item: IuserList) {
    data.user_name = item.user_name
    data.edituserpwdForm = true
}
// 新密码验证规则
const checkPassWord = (rule: any, value: string, callback: any) => {
    if (!value.trim()) {
        callback('输入不能为空')
    } else if (value.trim() !== data.edituserpwdform.newpwd.trim()) {
        callback('密码输入不一致')
    } else {
        return callback()
    }
}
const edituserpwdrules = reactive({
    newpwd: [
        { required: true, message: '新密码不能为空', trigger: 'blur' },
        { min: 6, max: 12, message: '密码长度需要在6-12之间', trigger: 'blur' }
    ],
    checkpwd: [
        { required: true, message: '请重新输入密码', trigger: 'blur' },
        { validator: checkPassWord, trigger: 'blur' }
    ],
})
let edituserpwdformRef = ref()
// 提交修改密码
async function confirmedituserpwd() {
    const $form = edituserpwdformRef.value
    if (!$form) return
    const valid = await $form.validate()
    if (!valid) return

    let res = await updateuserpasswodApi(
        {
            user_name: data.user_name,
            password: data.edituserpwdform.checkpwd
        }
    )
    if (!res.ok) return errMessage(res.message)

    successMessage(res.message)
    data.edituserpwdForm = false
    data.edituserpwdform.newpwd = ''
    data.edituserpwdform.checkpwd = ''
}


</script>

<template>
    <div class="container">
        <!-- 搜索框 -->
        <el-form :inline="true" :model="data.selectData">
            <el-form-item label="用户名：">
                <el-input v-model="data.selectData.user_name" placeholder="请输入关键字" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
        </el-form>
        <!-- 表格 -->
        <el-table :data="data.list[data.selectData.page]" style="width: 100%" border>
            <el-table-column prop="user_id" label="用户id" width="180" />
            <el-table-column prop="user_name" label="用户名称" width="180" />
            <el-table-column prop="user_img" label="用户头像" width="180">
                <template #default="scope">
                    <el-image style="width: 50px; height: 50px" :src="scope.row.user_img" alt="轮播图"></el-image>
                </template>
            </el-table-column>
            <el-table-column prop="comment" label="备注" width="180" />
            <el-table-column fixed="right" label="操作" width="180">
                <template #default="scope">
                    <el-button link type="primary" size="small" @click=changepassword(scope.row)>修改密码</el-button>
                    <el-button link type="primary" size="small">启用</el-button>
                    <el-button link type="primary" size="small">停用</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination layout="prev, pager, next" :total="data.selectData.count" :page-size="6"
            @current-change="currentChange" />
    </div>

    <!-- 编辑--只能修改分类名称 -->
    <el-dialog v-model="data.edituserpwdForm" title="修改分类名称" align-center style="width: 400px;">
        <el-form :model="data.edituserpwdform" ref="edituserpwdformRef" :rules="edituserpwdrules">
            <el-form-item label="新密码" prop="newpwd" label-width="80px" required>
                <el-input v-model="data.edituserpwdform.newpwd" type="password" autocomplete="off" placeholder="请输入新密码" />
            </el-form-item>
            <el-form-item label="确定密码" prop="checkpwd" label-width="80px" required>
                <el-input v-model="data.edituserpwdform.checkpwd" type="password" autocomplete="off"
                    placeholder="请重新输入密码" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="data.edituserpwdForm = false">取消</el-button>
                <el-button type="primary" @click="confirmedituserpwd">
                    确定
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<style lang='scss' scoped>
.container {
    width: 900px;
    margin-top: 20px;
}

:deep(.el-table .cell) {
    text-align: center;
}
</style>