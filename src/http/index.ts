import http from './http'

interface Idata {
    username: string,
    password: string,
}

export const getcatesApi = () => http({ url: '/api/my/artcate/cates', method: 'get' })

export const loginApi = (data: Idata): any => http({ url: '/api/aa/login', method: 'post', data })
