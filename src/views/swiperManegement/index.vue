<!-- 轮播图 -->
<script lang='ts' setup>
import { reactive, toRefs, ref, onMounted } from 'vue'
import { getswiperApi, addswiperadminApi, delswiperadminApi, updateswiperadminApi } from '@/http/index'
import { delDialog, errMessage, successMessage } from '@/utils';
import { Iswiper } from '@/utils/type'

const data = reactive({
    selectData: {
        count: 0,
        page: 0,
    },
    // 源数据
    swiper: [] as Iswiper[],
    // 展示分页数据
    list: [] as Iswiper[][],
    addswiperForm: false,
    addswiperform: {
        file: ''
    },
    updateswiperForm: false,
    updateswiperform: {
        file: '',
        swiper_id: '',
    }

})

onMounted(async () => {
    let res = await getswiperApi()
    if (!res.ok) return res.cc(res.message)
    data.swiper = res.data

    // 分页
    data.selectData.count = res.data.length
    sliceList(res.data)
})

// 获取当前分页
const currentChange = (pages: number) => {
    data.selectData.page = pages - 1
}
//截取每页展示的数据量
const sliceList = (arr: Iswiper[]) => {
    data.list = []
    for (let index = 0; index < arr.length; index += 5) {
        let newList: any = arr.slice(index, index + 5)
        data.list.push(newList)
    }
}

// 上传图片前验证图片规则
const beforeuploadpicture = (rawFile: any) => {
    if (rawFile.type === 'image/jpeg' || rawFile.type === 'image/jpg' || rawFile.type === 'image/png') {
        if (rawFile.size / 1024 / 1024 > 10) {
            errMessage('图片大小不能超过10mb')
            return false
        }
    } else {
        errMessage('图片格式必须是jpg/jepg/png')
        return false
    }
    return true
}

// 上传图片
async function uploadpicture(item: { ok: boolean, message: string, data: string }) {
    if (!item.ok) return errMessage(item.message)
    if (item.ok) {
        data.addswiperform.file = `http://localhost:3000/api/my/uploads/swiper/${item.data}`
    }
}

// 取消上传
const cancelupload = () => {
    data.addswiperform.file = ''
    data.addswiperForm = false
}

// 添加轮播图--上传至数据库
async function addswiper() {
    let res = await addswiperadminApi({ file: data.addswiperform.file })
    if (!res.ok) return errMessage(res.message)

    data.list[data.selectData.page].push(res.data)
    data.addswiperform.file = ''
    data.addswiperForm = false
    successMessage(res.message)
}

// 删除轮播图
async function delswiper(swiper: Iswiper) {
    let confirm = await delDialog('确定删除', '提示')
    if (!confirm) return
    let res = await delswiperadminApi({ swiper_id: swiper.swiper_id })
    if (!res.ok) return errMessage(res.message)

    let index = data.list[data.selectData.page].findIndex(v => v.swiper_id === swiper.swiper_id)
    if (index === -1) return
    data.list[data.selectData.page].splice(index, 1)
    successMessage(res.message)
}

// 打开修改轮播的弹窗
const updateswiper = (swiper: Iswiper) => {
    data.updateswiperForm = true
    data.updateswiperform.file = swiper.swiper_url
    data.updateswiperform.swiper_id = swiper.swiper_id
    // console.log(swiper.swiper_id);

}
// 取消修改轮播
const cannelupdate = () => {
    data.updateswiperform.file = ''
    data.updateswiperForm = false
}
// 上传图片
async function updatepicture(item: { ok: boolean, message: string, data: string }) {
    if (!item.ok) return errMessage(item.message)
    if (item.ok) {
        data.updateswiperform.file = `http://localhost:3000/api/my/uploads/swiper/${item.data}`
    }
}

// 修改轮播图
async function confirmupdateswiper() {
    let res = await updateswiperadminApi({ file: data.updateswiperform.file, swiper_id: data.updateswiperform.swiper_id })
    if (!res.ok) return errMessage(res.message)


    let index = data.list[data.selectData.page].findIndex(v => v.swiper_id === data.updateswiperform.swiper_id)
    if (index === -1) return

    data.list[data.selectData.page].splice(index, 1, { swiper_id: data.updateswiperform.swiper_id, swiper_url: data.updateswiperform.file })
    data.updateswiperform.file = ''
    data.updateswiperForm = false
    successMessage(res.message)
}


</script>

<template>
    <div class="container">
        <el-button type="primary" @click="data.addswiperForm = true" style="margin-bottom:10px"
            v-if="data.swiper.length < 10">添加</el-button>
        <el-table :data="data.list[data.selectData.page]" style="width: 100%" border>
            <!-- <el-table-column prop="swiper_id" label="轮播图id" width="180" /> -->
            <el-table-column prop="swiper_url" label="轮播图" width="180">
                <template #default="scope">
                    <el-image style="width: 120px; height: 70px" :src="scope.row.swiper_url" alt="轮播图"></el-image>
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="120">
                <template #default="scope">
                    <el-button link type="primary" size="small" @click="updateswiper(scope.row)">修改</el-button>
                    <el-button link type="primary" size="small" @click="delswiper(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination layout="prev, pager, next" :total="data.selectData.count" :page-size="5"
            @current-change="currentChange" />

        <!-- 添加图片弹框 -->
        <el-dialog v-model="data.addswiperForm" title="提示" align-center style="width: 400px;">
            <el-form :model="data.addswiperform" ref="addswiperformRef">
                <el-form-item label="图片:" prop="file" label-width="60px" required :rules="[{
                    required: true,
                    message: '请添加图片',
                    trigger: 'blur',
                },]">
                    <!-- 写死上传路径 -->
                    <el-upload action="/api/my/uploadswiper" class="avatar-uploader" :show-file-list="false"
                        :on-success="uploadpicture" :before-upload="beforeuploadpicture">
                        <img v-if="data.addswiperform.file" :src="data.addswiperform.file" class="avatar" />
                        <el-icon v-else class="avatar-uploader-icon">
                            <Plus />
                        </el-icon>
                    </el-upload>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="cancelupload">取消</el-button>
                    <el-button type="primary" @click="addswiper">
                        确定
                    </el-button>
                </span>
            </template>
        </el-dialog>

        <!-- 修改图片弹框 -->
        <el-dialog v-model="data.updateswiperForm" title="提示" align-center style="width: 400px;">
            <el-form :model="data.updateswiperform" ref="addswiperformRef">
                <el-form-item label="图片:" prop="file" label-width="60px" required :rules="[{
                    required: true,
                    message: '请添加图片',
                    trigger: 'blur',
                },]">
                    <!-- 写死上传路径 -->
                    <el-upload action="/api/my/uploadswiper" class="avatar-uploader" :show-file-list="false"
                        :on-success="updatepicture" :before-upload="beforeuploadpicture">
                        <img v-if="data.updateswiperform.file" :src="data.updateswiperform.file" class="avatar" />
                        <el-icon v-else class="avatar-uploader-icon">
                            <Plus />
                        </el-icon>
                    </el-upload>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="cannelupdate">取消</el-button>
                    <el-button type="primary" @click="confirmupdateswiper">
                        确定
                    </el-button>
                </span>
            </template>
        </el-dialog>





    </div>
</template>

<style lang='scss' scoped>
.container {
    margin-top: 20px;
    width: 300px;
}

:deep(.el-table .cell) {
    text-align: center;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
}

.avatar {
    width: 178px;
    height: 178px;
    text-align: center;
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
}
</style>