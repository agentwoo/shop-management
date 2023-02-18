<!-- 商品收藏管理 -->
<script lang='ts' setup>
import { reactive, toRefs, ref, onMounted } from 'vue'
import { getallcollectgoodsApi } from '@/http/index'
import { errMessage } from '@/utils';
import { Icollect } from '@/utils/type'



const data = reactive({
    selectData: {
        goods_title: '',
        user_name: '',
    },
    collectgoods: [] as Icollect[]
})


onMounted(async () => {
    let res = await getallcollectgoodsApi()
    if (!res.ok) return errMessage(res.message)
    data.collectgoods = res.data
})

const onSubmit = () => {
    console.log('---------');

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
                <el-form-item label="用户名">
                    <el-input v-model="data.selectData.user_name" placeholder="请输入关键字" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <!-- 表格 -->
        <div class="container_form">
            <el-table :data="data.collectgoods" style="width: 100%" border>
                <el-table-column prop="collect_id" label="收藏id" width="100" />
                <el-table-column prop="goods_id" label="商品id" width="100" />
                <el-table-column prop="goods_title" label="商品名称" width="150" />
                <el-table-column prop="goods_title_img" label="商品封面图" width="150">
                    <template #default="scope">
                        <el-image style="width: 50px; height: 50px" :src="scope.row.goods_title_img" alt="轮播图"></el-image>
                    </template>
                </el-table-column>
                <el-table-column prop="goods_desc" label="商品详情" width="150" />
                <el-table-column prop="goods_present_price" label="商品价格" width="100" />
                <el-table-column prop="collect_user_name" label="收藏用户" width="100" />
                <el-table-column fixed="right" label="操作" width="120">
                    <template #default>
                        <!-- <el-button link type="primary" size="small">修改</el-button> -->
                        <el-button link type="primary" size="small">查看</el-button>
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
    &_search {
        margin-top: 20px;
    }

    &_form {
        width: 970px;
    }
}
</style>