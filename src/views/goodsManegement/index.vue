<!-- 商品管理 -->
<script lang='ts' setup>
import { reactive, toRefs, ref, onMounted } from 'vue'
import { getallgoodsadminApi, removegoodsadminApi } from '@/http/index'
import { delDialog, errMessage, successMessage } from '@/utils';
import { Igoods } from '@/utils/type'


const data = reactive({
    selectData: {
        goods_title: '',
        user_name: '',
        page: 0,
        count: 0,
    },
    allgoods: [] as Igoods[],

    // 展示分页数据
    list: [] as Igoods[][],
})


onMounted(async () => {
    let res = await getallgoodsadminApi()
    if (!res.ok) errMessage(res.message)
    data.allgoods = res.data

    // 分页
    data.selectData.count = res.data.length
    sliceList(res.data)

})

// 获取当前分页
const currentChange = (pages: number) => {
    data.selectData.page = pages - 1
}

//截取每页展示的数据量
const sliceList = (arr: Igoods[]) => {
    data.list = []
    for (let index = 0; index < arr.length; index += 6) {
        let newList: any = arr.slice(index, index + 6)
        data.list.push(newList)
    }
}

// 查找商品
const onSubmit = () => {
    if (data.selectData.goods_title.trim() === '' && data.selectData.user_name.trim() === '') {
        return errMessage('请输入商品名或卖家用户名')
    }
    let arr: Igoods[] = []
    if (data.selectData.goods_title) {
        arr = data.allgoods.filter(v => v.goods_title.indexOf(data.selectData.goods_title) !== -1)
    }
    if (data.selectData.user_name) {
        arr = arr.filter(v => v.pub_user.indexOf(data.selectData.user_name) !== -1)
    }

    // 重新计算查询后的分页数据
    data.selectData.count = arr.length
    sliceList(arr)
    successMessage('查找成功！')
    data.selectData.user_name = ''
}

// 下架商品
async function removegoods(goodsitem: Igoods) {
    let confirm = await delDialog('确定下架该商品?', '提示')
    if (!confirm) return
    let res = await removegoodsadminApi({ goods_id: goodsitem.goods_id })
    if (!res.ok) errMessage(res.message)
    successMessage(res.message)

    let index = data.list[data.selectData.page].findIndex(v => v.goods_id === goodsitem.goods_id)
    if (index === -1) return
    data.list[data.selectData.page].splice(index, 1, { ...goodsitem, is_delgoods: '1' })
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
                <el-form-item label="卖家用户名">
                    <el-input v-model="data.selectData.user_name" placeholder="请输入关键字" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <!-- 表格 -->
        <div class="container_form">
            <el-table :data="data.list[data.selectData.page]" style="width: 100%" border>
                <el-table-column prop="goods_id" label="商品id" width="80" />
                <el-table-column prop="pub_user" label="卖家用户名" width="100" />
                <el-table-column prop="goods_title" label="商品名称" width="100" />
                <el-table-column prop="goods_title_img" label="商品封面" width="100">
                    <template #default="scope">
                        <el-image style="width: 50px; height: 50px" :src="scope.row.goods_title_img" alt="封面"></el-image>
                    </template>
                </el-table-column>
                <el-table-column prop="goods_desc" label="商品详情" width="100" />
                <el-table-column prop="goods_present_price" label="现价" width="80" />
                <el-table-column prop="goods_origin_price" label="原价" width="80" />
                <el-table-column prop="goods_views" label="点击量" width="80" />
                <el-table-column prop="goods_contact" label="卖家联系方式" width="160" />
                <el-table-column label="商品展示状态" width="120">
                    <template #default="scope">
                        <div v-if="scope.row.is_delgoods === '0' && scope.row.goods_status === '1'">
                            <el-tag>上架中</el-tag>
                        </div>
                        <div v-if="scope.row.is_delgoods === '0' && scope.row.goods_status !== '1'">
                            <el-tag type="danger">已下架</el-tag>
                        </div>
                        <div v-if="scope.row.is_delgoods === '1'">
                            <el-tag type="danger">已下架</el-tag>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="商品发布时间" width="120">
                    <template #default="scope">
                        <div>{{ scope.row.goods_pub_time.slice(0, 10) }}</div>
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="100">
                    <template #default="scope">
                        <div v-if="scope.row.is_delgoods === '0' && scope.row.goods_status === '1'"
                            style="text-align: center;">
                            <el-button link type="primary" size="small" @click="removegoods(scope.row)">下架商品</el-button>
                        </div>
                        <div v-else style="text-align: center;">-</div>
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