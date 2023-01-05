<!-- 登录 -->
<script setup lang="ts">
import { reactive, ref } from 'vue'
import router from '@/router';
import { errMessage, successMessage } from '@/utils';
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
    //     username: data.loginForm.username,
    //     password: data.loginForm.passWord
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
    <div class="login-box">
        <el-form ref="loginFormRef" :model="data.loginForm" status-icon :rules="data.rules" label-width="70px"
            class="loginForm">
            <h2>后台管理系统</h2>
            <el-form-item label="用户名:" prop="username">
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
</template>

<style scoped lang="scss">
.login-box {
    height: 100vh;
    background-color: #5C8ABB;
    box-sizing: border-box;
    padding-top: 200px;

    .loginForm {
        width: 350px;
        padding: 20px;
        background: white;
        border-radius: 20px;
        margin: 0 auto;

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
