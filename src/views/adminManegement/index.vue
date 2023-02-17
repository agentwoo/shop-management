<!-- 管理员管理 -->
<script lang='ts' setup>
import { reactive, toRefs, ref } from 'vue'
import { updatepasswodApi } from '@/http/index'
import { useUserStore } from '@/store';
import { errMessage, successMessage } from '@/utils';

const ruleForm = reactive({
    oldpassword: '',
    newpassword: '',
    checkPassWord: '',
})

const checkPassWord = (rule: any, value: string, callback: any) => {
    if (!value.trim()) {
        callback('输入不能为空')
    } else if (value.trim() !== ruleForm.newpassword) {
        callback('密码输入不一致')
    } else {
        return callback()
    }
}

const rules = reactive({
    oldpassword: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, max: 12, message: '密码长度需要在6-12之间', trigger: 'blur' }
    ],
    newpassword: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, max: 12, message: '密码长度需要在6-12之间', trigger: 'blur' }
    ],
    checkPassWord: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { validator: checkPassWord, trigger: 'blur' }
    ],
})

// 获取当前时间戳
let nowtimestamp = new Date().getTime()
// 获取当前用户名
const useStore = useUserStore()
let user_name = useStore.user.user_name

let ruleFormRef = ref()
// 提交更改密码
async function submitForm() {
    const $form = ruleFormRef.value
    if (!$form) return
    const valid = await $form.validate()
    if (!valid) return

    let res = await updatepasswodApi({
        user_name: user_name.trim(),
        password: ruleForm.newpassword.trim()
    })
    if (!res.ok) return errMessage(res.message)
    // 获取用户信息
    useUserStore().user = res.userInfo
    localStorage.setItem('token', JSON.stringify(res.token))
    localStorage.setItem('logintimestamp', JSON.stringify(nowtimestamp))

    successMessage('修改密码成功！')
    ruleForm.oldpassword = ''
    ruleForm.newpassword = ''
    ruleForm.checkPassWord = ''
}

</script>

<template>
    <div class="container">
        <h2>更改密码</h2>
        <div class="container_form">
            <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="120px"
                class="demo-ruleForm">
                <el-form-item label="旧密码" prop="oldpassword" required>
                    <el-input v-model="ruleForm.oldpassword" type="password" autocomplete="off" />
                </el-form-item>
                <el-form-item label="新密码" prop="newpassword" required>
                    <el-input v-model="ruleForm.newpassword" type="password" autocomplete="off" />
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPassWord" required>
                    <el-input v-model="ruleForm.checkPassWord" type="password" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm()" class="btn">提交</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<style lang='scss' scoped>
.container {
    width: 400px;
    margin-top: 30px;

    &_form {
        margin-top: 20px;
        margin-left: -50px;
    }
}

.btn {
    width: 100%;
}
</style>