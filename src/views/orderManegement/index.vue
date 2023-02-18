<!-- 订单管理 -->
<script lang='ts' setup>
import { reactive, toRefs, ref, onMounted } from 'vue'
import { getallordergoodsApi } from '@/http/index'
import { errMessage } from '@/utils';
import { Iorder } from '@/utils/type'

const data = reactive({
    selectData: {
        goods_title: '',
        user_name: '',
    },
    ordergoods: [] as Iorder[]
})

onMounted(async () => {
    let res = await getallordergoodsApi()
    if (!res.ok) return errMessage(res.message)
    data.ordergoods = res.data
})

const onSubmit = () => {
    console.log('------------');

}


</script>

<template>
    <div class="container">
        <!-- 搜索框 -->
        <div class="container_search">
            <el-form :inline="true" :model="data.selectData">
                <el-form-item label="商品名">
                    <el-input v-model="data.selectData.goods_title" placeholder="请输入关键字" />
                </el-form-item>
                <el-form-item label="买家用户名">
                    <el-input v-model="data.selectData.user_name" placeholder="请输入关键字" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <!-- 表格 -->
        <div class="container_form">
            <el-table :data="data.ordergoods" style="width: 100%" border>
                <el-table-column prop="order_id" label="订单id" width="100" />
                <el-table-column prop="goods_id" label="商品id" width="100" />
                <el-table-column prop="goods_title" label="商品名称" width="100" />
                <el-table-column prop="goods_title_img" label="封面图" width="100">
                    <template #default="scope">
                        <el-image style="width: 50px; height: 50px" :src="scope.row.goods_title_img" alt="封面图"></el-image>
                    </template>
                </el-table-column>
                <el-table-column prop="goods_desc" label="商品详情" width="100" />
                <el-table-column prop="goods_present_price" label="商品价格" width="100" />
                <el-table-column prop="buy_user_name" label="购买用户" width="100" />
                <el-table-column prop="goods_contact" label="卖家联系方式" width="120" />
                <el-table-column prop="goods_status" label="交易状态" width="100" />
                <el-table-column prop="order_create_time" label="订单创建时间" width="150" />
                <el-table-column fixed="right" label="操作" width="150">
                    <template #default>
                        <el-button link type="primary" size="small">已完成</el-button>
                        <el-button link type="primary" size="small">未完成</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- 分页 -->
        <el-pagination layout="prev, pager, next" :total="50" />
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