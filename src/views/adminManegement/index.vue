<!-- 管理员管理 -->
<script lang='ts' setup>
import { reactive, toRefs, ref } from 'vue'

const ruleForm = reactive({
    pass: '',
    checkPass: '',
    age: '',
})

const validatePass = (rule: any, value: any, callback: any) => {

}
const validatePass2 = (rule: any, value: any, callback: any) => {

}

const rules = reactive({
    pass: [{ validator: validatePass, trigger: 'blur' }],
    checkPass: [{ validator: validatePass2, trigger: 'blur' }],
    // age: [{ validator: checkAge, trigger: 'blur' }],
})

</script>

<template>
    <div>密码设置</div>
    <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="120px" class="demo-ruleForm">
        <el-form-item label="旧密码" prop="pass">
            <el-input v-model="ruleForm.pass" type="password" autocomplete="off" />
        </el-form-item>
        <el-form-item label="新密码" prop="checkPass">
            <el-input v-model="ruleForm.checkPass" type="password" autocomplete="off" />
        </el-form-item>
        <el-form-item label="确认密码" prop="age">
            <el-input v-model.number="ruleForm.age" />
        </el-form-item>
        <el-form-item>
            <!-- <el-button type="primary" @click="submitForm(ruleFormRef)">Submit</el-button>
            <el-button @click="resetForm(ruleFormRef)">Reset</el-button> -->
        </el-form-item>
    </el-form>
</template>

<style lang='scss' scoped>

</style>