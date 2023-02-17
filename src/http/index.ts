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

// 获取除管理员外用户列表
export const getuserListApi = (): any => http({ url: '/api/my/getuserList', method: 'get' })

// 获取商品分类
export const getgoodskindApi = (): any => http({ url: '/api/my/getgoodskind', method: 'get' })

// 获取轮播图
export const getswiperApi = (): any => http({ url: '/api/my/getswiper', method: 'get' })


// 获取收藏列表
export const getallcollectgoodsApi = (): any => http({ url: '/api/my/getallcollectgoods', method: 'get' })

// 获取订单列表
export const getallordergoodsApi = (): any => http({ url: '/api/my/getallordergoods', method: 'get' })

// 获取所有商品
export const getallgoodsadminApi = (): any => http({ url: '/api/my/getallgoodsadmin', method: 'get' })