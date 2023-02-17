<!-- 用户管理 -->
<script lang='ts' setup>
import { reactive, toRefs, ref, onMounted } from 'vue'
import { getuserListApi } from '@/http/index'
import { errMessage } from '@/utils/index';
import { IuserList } from '@/utils/type'


const data = reactive({
    selectData: {
        user_name: ''
    },
    tableData: [] as IuserList[]
})


onMounted(async () => {
    let res = await getuserListApi()
    if (!res.ok) return errMessage(res.message)
    data.tableData = res.data
})

const onSubmit = () => {
    console.log('------');
}


</script>

<template>
    <div class="container">
        <!-- 搜索框 -->
        <el-form :inline="true" :model="data.selectData">
            <el-form-item label="用户名">
                <el-input v-model="data.selectData.user_name" placeholder="请输入关键字" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
        </el-form>
        <!-- 表格 -->
        <el-table :data="data.tableData" style="width: 100%" border>
            <el-table-column prop="user_id" label="用户id" width="180" />
            <el-table-column prop="user_name" label="用户名称" width="180" />
            <el-table-column prop="user_img" label="用户头像" width="180">
                <template #default="scope">
                    <el-image style="width: 50px; height: 50px" :src="scope.row.user_img" alt="轮播图"></el-image>
                </template>
            </el-table-column>
            <el-table-column prop="comment" label="备注" width="180" />
            <el-table-column fixed="right" label="操作" width="180">
                <template #default>
                    <el-button link type="primary" size="small">修改密码</el-button>
                    <el-button link type="primary" size="small">启用</el-button>
                    <el-button link type="primary" size="small">停用</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination layout="prev, pager, next" :total="50" />
</div>
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