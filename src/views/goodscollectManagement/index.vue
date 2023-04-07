<!-- 商品收藏管理 -->
<script lang='ts' setup>
import { reactive, toRefs, ref, onMounted } from 'vue'
import { getallcollectgoodsApi } from '@/http/index'
import { errMessage, successMessage } from '@/utils';
import { Icollect } from '@/utils/type'



const data = reactive({
    selectData: {
        goods_title: '',
        user_name: '',
        page: 0,
        count: 0,
    },
    collectgoods: [] as Icollect[],

    // 展示分页数据
    list: [] as Icollect[][],
})


onMounted(async () => {
    let res = await getallcollectgoodsApi()
    if (!res.ok) return errMessage(res.message)
    data.collectgoods = res.data

    // 分页
    data.selectData.count = res.data.length
    sliceList(res.data)
})

// 获取当前分页
const currentChange = (pages: number) => {
    data.selectData.page = pages - 1
}

//截取每页展示的数据量
const sliceList = (arr: Icollect[]) => {
    data.list = []
    for (let index = 0; index < arr.length; index += 5) {
        let newList: any = arr.slice(index, index + 5)
        data.list.push(newList)
    }
}

// 查询商品收藏
const onSubmit = () => {
    if (data.selectData.goods_title.trim() === '' && data.selectData.user_name.trim() === '') {
        return errMessage('请输入用户名或商品名')
    }

    let arr: Icollect[] = []
    if (data.selectData.user_name) {
        arr = data.collectgoods.filter(v => v.collect_user_name.indexOf(data.selectData.user_name) !== -1)
    }
    if (data.selectData.goods_title) {
        arr = (data.selectData.user_name ? arr : data.collectgoods).filter(v => v.goods_title.indexOf(data.selectData.goods_title) !== -1)
    }

    // 重新计算查询后的分页数据
    data.selectData.count = arr.length
    sliceList(arr)
    successMessage('查找成功')
    data.selectData.user_name = ''
    data.selectData.goods_title = ''
}

</script>

<template>
    <div class="container">
        <!-- 搜索框 -->
        <div class="container_search">
            <el-form :inline="true" :model="data.selectData">
                <el-form-item label="用户名">
                    <el-input v-model="data.selectData.user_name" placeholder="请输入关键字" />
                </el-form-item>
                <el-form-item label="商品名">
                    <el-input v-model="data.selectData.goods_title" placeholder="请输入关键字" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <!-- 表格 -->
        <div class="container_form">
            <el-table :data="data.list[data.selectData.page]" style="width: 100%" border>
                <el-table-column prop="collect_id" label="收藏id" width="100" />
                <el-table-column prop="goods_id" label="商品id" width="100" />
                <el-table-column prop="collect_user_name" label="收藏用户" width="100" />
                <el-table-column prop="goods_title" label="商品名称" width="150" />
                <el-table-column prop="goods_title_img" label="商品封面图" width="150">
                    <template #default="scope">
                        <el-image style="width: 50px; height: 50px" :src="scope.row.goods_title_img" alt="轮播图"></el-image>
                    </template>
                </el-table-column>
                <el-table-column prop="goods_desc" label="商品详情" width="250" />
                <el-table-column prop="goods_present_price" label="商品价格" width="100" />
                <el-table-column label="商品收藏时间" width="120">
                    <template #default="scope">
                        <div>{{ scope.row.collect_create_time.slice(0, 10) }}</div>
                    </template>
                </el-table-column>
                <el-table-column label="是否失效" width="100">
                    <template #default="scope">
                        <div v-if="scope.row.goods_status === '1'">
                            <el-tag>未失效</el-tag>
                        </div>
                        <div v-if="scope.row.goods_status === '2'">
                            <el-tag type="danger">已失效</el-tag>
                        </div>
                    </template>
                </el-table-column>
                <!-- <el-table-column fixed="right" label="操作" width="120">
                                            <template #default>
                                                <el-button link type="primary" size="small">查看</el-button>
                                            </template>
                                        </el-table-column> -->
            </el-table>
        </div>
        <!-- 分页 -->
        <el-pagination layout="prev, pager, next" :total="data.selectData.count" :page-size="5"
            @current-change="currentChange" />
    </div>
</template>

<style lang='scss' scoped>
.container {
    &_search {
        margin-top: 10px;
    }

    &_form {
        width: 1170px;
    }
}

:deep(.el-table .cell) {
    text-align: center;
}
</style>