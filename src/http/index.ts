import http from './http'

interface Idata {
    username: string,
    password: string,
}

// 登录
export const loginadminApi = (data: Idata): any => http({ url: '/api/my/loginadmin', method: 'post', data })
// 修改密码
export const updatepasswodApi = (data: { user_name: string, password: string }): any =>
    http({ url: '/api/my/updatepasswod', method: 'post', data })

// 获取除管理员外用户列表
export const getuserListApi = (): any => http({ url: '/api/my/getuserList', method: 'get' })
// 修改用户密码
export const updateuserpasswodApi = (data: { user_name: string, password: string }): any =>
    http({ url: '/api/my/updateuserpasswod', method: 'post', data })
// 停用用户
export const disableuserApi = (data: { user_id: number }): any => http({ url: '/api/my/disableuser', method: 'post', data })
// 启用用户
export const enableuserApi = (data: { user_id: number }): any => http({ url: '/api/my/enableuser', method: 'post', data })


// 获取商品分类
export const getgoodskindApi = (): any => http({ url: '/api/my/getgoodskind', method: 'get' })
// 添加商品分类
export const addgoodskindApi = (data: { text: string, value: number }): any => http({ url: '/api/my/addgoodskind', method: 'post', data })
// 修改商品分类名称
export const editgoodskindtextApi = (data: { text: string, kind_id: number, value: string }): any => http({ url: '/api/my/editgoodskindtext', method: 'post', data })
// 删除商品分类
export const delgoodskindApi = (data: { value: string }): any => http({ url: '/api/my/delgoodskind', method: 'post', data })


// 获取轮播图
export const getswiperApi = (): any => http({ url: '/api/my/getswiper', method: 'get' })


// 获取收藏列表
export const getallcollectgoodsApi = (): any => http({ url: '/api/my/getallcollectgoods', method: 'get' })



// 获取订单列表
export const getallordergoodsApi = (): any => http({ url: '/api/my/getallordergoods', method: 'get' })
// 将商品状态设置为未发货
export const updateunsendadminApi = (data: { goods_id: number }): any =>
    http({ url: '/api/my/updateunsendadmin', method: 'post', data })
// 将商品状态设置为已收货
export const updatefinishedadminApi = (data: { goods_id: number }): any =>
    http({ url: '/api/my/updatefinishedadmin', method: 'post', data })
// 将商品状态设置为已发货
export const updatefinishedtradadminApi = (data: { goods_id: number }): any =>
    http({ url: '/api/my/updatefinishedtradadmin', method: 'post', data })




// 获取所有商品
export const getallgoodsadminApi = (): any => http({ url: '/api/my/getallgoodsadmin', method: 'get' })
// 下架商品
export const removegoodsadminApi = (data: { goods_id: number }): any => http({ url: '/api/my/removegoodsadmin', method: 'post', data })