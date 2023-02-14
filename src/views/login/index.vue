<!-- 登录 -->
<script setup lang="ts">
import { reactive, ref } from 'vue'
import router from '@/router';
import { errMessage, successMessage } from '@/utils';
import bg from '@/assets/loginbg.png'
import { loginApi } from '@/http/index'

const data = reactive({
    loginForm: {
        username: 'admin11',
        passWord: '123456'
    },
    rules: {
        username: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 24, message: '密码长度需要在6-24之间', trigger: 'blur' }
        ],
        passWord: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 24, message: '密码长度需要在6-24之间', trigger: 'blur' },
        ]
    }
})

const loginFormRef = ref()
async function submitForm() {
    const $form = loginFormRef.value
    if (!$form) return
    const valid = await $form.validate()
    if (!valid) return

    router.push('/home')
    successMessage('登录成功')

    // let res = await loginApi({
    //     username: data.loginForm.username.trim(),
    //     password: data.loginForm.passWord.trim()
    // })
    // if (res.ok) {
    //     router.push('/home')
    //     successMessage('登录成功')


    //     data.loginForm.username = ''
    //     data.loginForm.passWord = ''
    // } else {
    //     errMessage(res.err)
    // }

}
</script>

<template>
    <div class="container">
        <img :src="bg" width="100%" height="100%" />
        <div class="container_title">校园二手交易系统</div>
        <div class="container_content">给学生闲置物品提供最好的解决方式</div>
        <div class="login-box">
            <el-form ref="loginFormRef" :model="data.loginForm" status-icon :rules="data.rules" label-width="70px"
                class="loginForm">
                <h2>后台管理系统登录</h2>
                <el-form-item label="账号:" prop="username">
                    <el-input v-model="data.loginForm.username" autocomplete="off" />
                </el-form-item>
                <el-form-item label="密码:" prop="passWord">
                    <el-input v-model="data.loginForm.passWord" type="password" autocomplete="off" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm()" class="sub-btn">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<style scoped lang="scss">
.container {
    img {
        width: 100%;
        height: 100%;
        z-index: -1;
        position: fixed;
        top: 0px;
        left: 0px;
        bottom: 0px;
        right: 0px;
    }

    &_title {
        font-size: 25px;
        font-weight: 600;
        color: white;
        position: absolute;
        left: 15vw;
        top: 60vh;
    }

    &_content {
        font-size: 15px;
        color: white;
        position: absolute;
        left: 15vw;
        top: 65vh;
    }

    .login-box {
        width: 400px;
        position: relative;
        left: 58vw;
        top: 33vh;

        h2 {
            text-align: center;
            margin-bottom: 15px;
        }

        .sub-btn {
            width: 100%;
        }
    }
}
</style>
