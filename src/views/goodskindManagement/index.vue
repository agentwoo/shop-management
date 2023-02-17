<!-- 商品分类管理 -->
<script lang='ts' setup>
import { reactive, toRefs, ref, onMounted } from 'vue'
import { getgoodskindApi } from '@/http/index'
import { errMessage } from '@/utils';
import { Igoodskinds } from '@/utils/type'


const data = reactive({
    tableData: [] as Igoodskinds[]
})

onMounted(async () => {
    let res = await getgoodskindApi()
    if (!res.ok) return errMessage(res.message)
    data.tableData = res.data

})

const onSubmit = () => {
    console.log('-----');

}
</script>

<template>
    <div class="container">
        <div v-if="data.tableData.length < 10">
            <el-button type="primary" @click="onSubmit" style="margin-bottom:10px">添加</el-button>
        </div>
        <el-table :data="data.tableData" style="width: 100%" border>
            <el-table-column prop="value" label="值" width="180" />
            <el-table-column prop="text" label="分类" width="180" />
            <el-table-column fixed="right" label="操作" width="120">
                <template #default>
                    <el-button link type="primary" size="small">编辑</el-button>
                    <el-button link type="primary" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
</div>
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