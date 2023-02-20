<!-- 订单管理 -->
<script lang='ts' setup>
import { reactive, toRefs, ref, onMounted } from 'vue'
import { getallordergoodsApi, updateunsendadminApi, updatefinishedadminApi, updatefinishedtradadminApi } from '@/http/index'
import { delDialog, errMessage, successMessage } from '@/utils';
import { Iorder } from '@/utils/type'

const data = reactive({
    selectData: {
        goods_title: '',
        user_name: '',
        count: 0,
        page: 0,
    },
    // 存储源数据
    ordergoods: [] as Iorder[],

    // 展示分页数据
    list: [] as Iorder[][],
})

onMounted(async () => {
    let res = await getallordergoodsApi()
    if (!res.ok) return errMessage(res.message)
    data.ordergoods = res.data

    // 分页
    data.selectData.count = res.data.length
    sliceList(res.data)
})


// 获取当前分页
const currentChange = (pages: number) => {
    data.selectData.page = pages - 1
}
//截取每页展示的数据量
const sliceList = (arr: Iorder[]) => {
    data.list = []
    for (let index = 0; index < arr.length; index += 6) {
        let newList: any = arr.slice(index, index + 6)
        data.list.push(newList)
    }
}

// 查找
const onSubmit = () => {
    if (data.selectData.goods_title.trim() === '' && data.selectData.user_name.trim() === '') {
        return errMessage('请输入查找的用户或商品标题')
    }

    let arr: Iorder[] = []
    if (data.selectData.user_name) {
        arr = data.ordergoods.filter(v => v.buy_user_name.indexOf(data.selectData.user_name) !== -1)
    }
    if (data.selectData.goods_title) {
        arr = arr.filter(v => v.goods_title.indexOf(data.selectData.goods_title) !== -1)
    }

    // 重新计算查询后的分页数据
    data.selectData.count = arr.length
    sliceList(arr)
    successMessage('查找成功')
    data.selectData.user_name = ''
    data.selectData.goods_title = ''
}

// 设置为已完成
async function unfinished(item: Iorder) {
    let confirm = await delDialog('确定设为未发货?', '提示')
    if (!confirm) return
    let res = await updateunsendadminApi({ goods_id: item.goods_id })
    if (!res.ok) return errMessage(res.message)

    let index = data.list[data.selectData.page].findIndex(v => v.goods_id === item.goods_id)
    if (index === -1) return
    data.list[data.selectData.page].splice(index, 1, { ...item, goods_status: '2' })
    successMessage(res.message)
}

// 设置为已收货
async function finished(item: Iorder) {
    let confirm = await delDialog('确定设为未发货?', '提示')
    if (!confirm) return
    let res = await updatefinishedadminApi({ goods_id: item.goods_id })
    if (!res.ok) return errMessage(res.message)

    let index = data.list[data.selectData.page].findIndex(v => v.goods_id === item.goods_id)
    if (index === -1) return
    data.list[data.selectData.page].splice(index, 1, { ...item, goods_status: '4' })
    successMessage(res.message)
}

// 设置为已发货
async function finishedtrad(item: Iorder) {
    let confirm = await delDialog('确定设为未发货?', '提示')
    if (!confirm) return
    let res = await updatefinishedtradadminApi({ goods_id: item.goods_id })
    if (!res.ok) return errMessage(res.message)

    let index = data.list[data.selectData.page].findIndex(v => v.goods_id === item.goods_id)
    if (index === -1) return
    data.list[data.selectData.page].splice(index, 1, { ...item, goods_status: '3' })
    successMessage(res.message)
}


</script>

<template>
    <div class="container">
        <!-- 搜索框 -->
        <div class="container_search">
            <el-form :inline="true" :model="data.selectData">
                <el-form-item label="买家用户名">
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
                <el-table-column prop="order_id" label="订单id" width="100" />
                <el-table-column prop="buy_user_name" label="购买用户" width="100" />
                <el-table-column prop="goods_id" label="商品id" width="100" />
                <el-table-column prop="goods_title" label="商品名称" width="100" />
                <el-table-column prop="goods_title_img" label="封面图" width="100">
                    <template #default="scope">
                        <el-image style="width: 50px; height: 50px" :src="scope.row.goods_title_img" alt="封面图"></el-image>
                    </template>
                </el-table-column>
                <el-table-column prop="goods_desc" label="商品详情" width="100" />
                <el-table-column prop="goods_present_price" label="商品价格" width="100" />
                <el-table-column prop="goods_contact" label="卖家联系方式" width="120" />
                <el-table-column label="交易状态" width="100">
                    <template #default="scope">
                        <div v-if="scope.row.goods_status === '2'">
                            <el-tag type="info">待发货</el-tag>
                        </div>
                        <div v-if="scope.row.goods_status === '3'">
                            <el-tag type="danger">待收货</el-tag>
                        </div>
                        <div v-if="scope.row.goods_status === '4'">
                            <el-tag>已完成</el-tag>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="订单创建时间" width="150">
                    <template #default="scope">
                        <div>{{ scope.row.order_create_time.slice(0, 10) }}</div>
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="150">
                    <template #default="scope">
                        <div v-if="scope.row.goods_status === '3'" style="text-align: center;">
                            <el-button link type="primary" size="small" @click="unfinished(scope.row)">设为未发货</el-button>
                            <br>
                            <el-button link type="primary" size="small" @click="finished(scope.row)">设为确认收货</el-button>
                        </div>
                        <div v-if="scope.row.goods_status === '2'" style="text-align: center;">
                            <el-button link type="primary" size="small" @click="finishedtrad(scope.row)">设为已发货</el-button>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- 分页 -->
        <el-pagination layout="prev, pager, next" :total="data.selectData.count" :page-size="6"
            @current-change="currentChange" />
    </div>
</template>

<style lang='scss' scoped>
.container {
    margin-top: 20px;

    &_form {
        width: 1220px;
    }
}
</style>