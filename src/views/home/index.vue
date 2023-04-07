<!-- 首页 -->
<script lang='ts' setup>
import { reactive, toRefs, ref, computed } from 'vue'
import { useRouter } from 'vue-router';
import { successMessage } from '@/utils';
import { useUserStore } from '@/store/index'
import { delDialog } from '@/utils/index'


const router = useRouter()
const menus = computed(() => {
    return [
        {
            path: '/home/generalView', icon: 'House', title: '欢迎使用',
        },
        {
            path: '/home/goodsManegement', icon: 'Goods', title: '商品管理',
        },
        {
            path: '/home/orderManegement', icon: 'Tickets', title: '商品订单',
        },
        {
            path: '/home/goodscollectManagement', icon: 'Star', title: '商品收藏',
        },
        {
            path: '/home/swiperManegement', icon: 'Picture', title: '轮播图管理',
        },
        {
            path: '/home/goodskindManagement', icon: 'Memo', title: '商品分类',
        },
        {
            path: '/home/userManegement', icon: 'User', title: '用户管理',
        },
        // {
        //     path: '/home/adminManegement', icon: 'Tools', title: '管理员中心',
        // },
    ]
})

async function logout() {
    let res = await delDialog("确定退出登录?", "提示")
    if (!res) return
    localStorage.removeItem('token')
    localStorage.removeItem('userInfo')
    localStorage.removeItem('logintimestamp')
    useUserStore().token = ''
    useUserStore().user = ''
    useUserStore().logintimestamp = ''

    router.replace({
        path: '/login'
    })
    successMessage('退出登录！')
}

</script>

<template>
    <div class="homePage_container">
        <div class="homePage_header">
            <el-row>
                <el-col :span="4">
                    <img :src="useUserStore().user.user_img" alt="管理员头像">
                </el-col>
                <el-col :span="16">
                    <h2>后台管理系统</h2>
                </el-col>
                <el-col :span="4">
                    <div class="homePage_header_btn">
                        <el-button type="primary" text @click="logout">
                            退出登录
                        </el-button>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="homePage_menu">
            <el-menu active-text-color="blue" background-color="#304156" class="el-menu-vertical-demo"
                :default-active="router.currentRoute.value.path" text-color="#fff" router>
                <el-menu-item :index="item.path" v-for="item in menus">
                    <el-icon>
                        <component :is="item.icon"></component>
                    </el-icon>
                    <span>{{ item.title }}</span>
                </el-menu-item>
            </el-menu>
        </div>
        <div class="homePage_content">
            <RouterView></RouterView>
        </div>
    </div>
</template>

<style lang='scss' scoped>
.homePage_container {
    height: 100%;

    .homePage_header {
        height: 70px;
        background-color: #36485F;

        img {
            height: 60px;
            width: 60px;
            border-radius: 50%;
            margin-left: 20px;
            margin-top: 5px;
        }

        h2 {
            color: white;
            text-align: center;
            height: 70px;
            line-height: 70px;
        }

        &_btn {
            height: 70px;
            line-height: 70px;
            text-align: right;
            margin-right: 20px;
        }
    }

    .homePage_menu {
        position: absolute;
        top: 70px;
        left: 0;
        bottom: 0;
        width: 180px;
        background-color: #304156;

        :deep(.el-menu) {
            border-right: none;
        }
    }

    .homePage_content {
        position: absolute;
        top: 70px;
        left: 250px;
        right: 0;
        bottom: 0;
        background-color: white;
    }
}
</style>