<!-- 订单管理 -->
<script lang='ts' setup>
import { reactive, toRefs, ref, onMounted } from 'vue'
import { getallordergoodsApi } from '@/http/index'
import { errMessage, successMessage } from '@/utils';
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

// 置为已完成
async function finished(item: Iorder) {
    console.log('------', item);

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
                <el-table-column prop="goods_status" label="交易状态" width="100" />
                <el-table-column prop="order_create_time" label="订单创建时间" width="150" />
                <el-table-column fixed="right" label="操作" width="150">
                    <template #default="scope">
                        <el-button link type="primary" size="small" @click="finished(scope.row)">已完成</el-button>
                        <el-button link type="primary" size="small">未完成</el-button>
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