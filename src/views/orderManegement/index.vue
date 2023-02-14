<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
// import { getList } from '../../http/api';

type TslectData = {
    title: string,
    body: string,
    page: number,
    count: number
}
//选取查询数据
const selectData = ref<TslectData>({
    title: '',
    body: '',
    page: 0,
    count: 0
})

type Tlist = {
    userId: number,
    id: number,
    title: string,
    body: string
}
//展示数据
let list = ref<[Tlist][]>([])

let dataList = ref<Tlist[]>([])//用于存储数据源

onMounted(() => {
    // getList({ page: selectData.value.page }).then(res => {
    //     // console.log(res.data);
    //     selectData.value.count = res.data.length
    //     dataList.value = res.data
    //     sliceList(res.data)
    // })
})

//截取每页展示的数据量
const sliceList = (arr: Tlist[]) => {
    list.value = []
    for (let index = 0; index < arr.length; index += 10) {
        let newList: any = arr.slice(index, index + 10)
        list.value.push(newList)
    }
}

//获取分页页码
const currentChange = (page: number) => {
    selectData.value.page = page - 1
}

//查询
const onSubmit = () => {
    let arr: Tlist[] = dataList.value
    if (selectData.value.title) {
        arr = dataList.value.filter(v => v.title.indexOf(selectData.value.title) != -1)
    }
    if (selectData.value.body) {
        arr = (selectData.value.title ? arr : dataList.value).filter(v => v.body.indexOf(selectData.value.body) != -1)
    }
    selectData.value.count = arr.length
    sliceList(arr)
}

// 删除所选用户
const delOrder = (row: Tlist) => {
    // 删除
    let Lindex = list.value[selectData.value.page].findIndex(v => v.id === row.id)
    list.value[selectData.value.page].splice(Lindex, 1)

    // 变为一维数组
    let newList = list.value.reduce(function (a: any, b: any) {
        return a.concat(b)
    })

    // 修改列表总数
    selectData.value.count -= 1
    // 修改分页视图
    sliceList(newList)
}

//修改
const isShow = ref(false)
type Tactive = {
    title: string,
    body: string
    userId: number,
    id: number
}
let active = ref<Tactive>({
    title: '',
    body: '',
    userId: 0,
    id: 0
})
const updaOrder = (row: Tlist) => {
    active.value = {
        id: row.id,
        userId: row.userId,
        title: row.title,
        body: row.body
    }
    isShow.value = true
}

const dataChange = () => {
    let Lindex = list.value[selectData.value.page].findIndex(v => v.id === active.value.id)
    let obj: Tactive = {
        body: active.value.body,
        id: active.value.id,
        title: active.value.title,
        userId: active.value.userId
    }
    list.value[selectData.value.page].splice(Lindex, 1, obj)

    isShow.value = false
}

</script>
<template>
    <div class="select-box">
        <el-form :inline="true" :model="selectData">
            <el-form-item label="标题">
                <el-input v-model="selectData.title" placeholder="请输入关键字" />
            </el-form-item>
            <el-form-item label="详情">
                <el-input v-model="selectData.body" placeholder="请输入关键字" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="list[selectData.page]" style="width: 100%" border>
            <el-table-column prop="id" label="ID" width="180" />
            <el-table-column prop="title" label="标题" width="180" />
            <el-table-column prop="body" label="详情" width="220" />

            <el-table-column prop="id" label="操作">
                <template #default="scope">
                    <el-button type="text" size="small" @click="delOrder(scope.row)">
                        删除
                    </el-button>
                    <el-button type="text" size="small" @click="updaOrder(scope.row)">
                        修改
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog v-model="isShow" title="修改标题和详情">
            <el-form :model="active">
                <el-form-item label="标题" label-width="120px">
                    <el-input v-model="active.title" autocomplete="off" />
                </el-form-item>
                <el-form-item label="详情" label-width="120px">
                    <el-input v-model="active.body" autocomplete="off" />
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="isShow = false">取消</el-button>
                    <el-button type="primary" @click="dataChange()">
                        确认
                    </el-button>
                </span>
            </template>
        </el-dialog>

        <el-pagination layout="prev, pager, next" :total="selectData.count" @current-change="currentChange" />
    </div>
</template>
<style scoped lang="scss">
.select-box {
    margin-left: 30px;
    margin-top: 30px;
}
</style>
