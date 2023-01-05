import { ElMessage, ElMessageBox } from 'element-plus'

// 删除弹框
export function delDialog(msg: string, title: string): Promise<boolean> {
    return new Promise((resolve) => {
        const opts = {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
        }
        ElMessageBox.confirm(msg, title, opts)
            .then(() => { resolve(true) })
            .catch(() => { resolve(false) })
    })
}

// 成功提示
export function successMessage(msg: string) {
    ElMessage.success(msg)
}

// 错误提示
export function errMessage(msg: string) {
    ElMessage.error(msg)
}

// 邮箱验证规则
export function checkEmail(rule: any, value: string, callback: any) {
    const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
    if (regEmail.test(value)) {
        // 合法的邮箱
        return callback()
    }
    callback(new Error('请输入合法的邮箱'))
}

