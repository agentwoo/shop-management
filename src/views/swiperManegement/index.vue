<!-- 轮播图 -->
<script lang='ts' setup>
import { reactive, toRefs, ref, onMounted } from 'vue'
import { getswiperApi } from '@/http/index'
import { errMessage } from '@/utils';
import { Iswiper } from '@/utils/type'

const data = reactive({
    swiper: [] as Iswiper[],
})

onMounted(async () => {
    let res = await getswiperApi()
    if (!res.ok) return res.cc(res.message)
    data.swiper = res.data
})

const onSubmit = () => {
    console.log('--------');
}

</script>

<template>
    <div class="container">
        <el-button type="primary" @click="onSubmit" style="margin-bottom:10px" v-if="data.swiper.length < 5">添加</el-button>
        <el-table :data="data.swiper" style="width: 100%" border>
            <el-table-column prop="swiper_id" label="序列" width="180" />
            <el-table-column prop="swiper_url" label="用户名称" width="180">
                <template #default="scope">
                    <el-image style="width: 120px; height: 70px" :src="scope.row.swiper_url" alt="轮播图"></el-image>
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="120">
                <template #default>
                    <el-button link type="primary" size="small">修改</el-button>
                    <el-button link type="primary" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
</div>
</template>

<style lang='scss' scoped>
.container {
    margin-top: 20px;
    width: 480px;
}
</style>