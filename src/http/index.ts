import http from './http'

interface Idata {
    username: string,
    password: string,
}

// 登录
export const loginApi = (data: Idata): any => http({ url: '/api/my/login', method: 'post', data })
// 修改密码
export const updatepasswodApi = (data: { user_name: string, password: string }): any =>
    http({ url: '/api/my/updatepasswod', method: 'post', data })