import { defineStore } from 'pinia'
import { reactive, toRefs } from 'vue'

// 商品数据
export const useGoodsItemStore = defineStore('goodsItem', () => {
    const state = reactive({

    })
    return {
        ...toRefs(state)
    }
})

// 用户详情
export const useUserStore = defineStore('user', () => {
    const state = reactive({
        user: JSON.parse(localStorage.getItem('userInfo') as string) || {},
        token: JSON.parse(localStorage.getItem('token') as string) || {},
        logintimestamp: JSON.parse(localStorage.getItem('logintimestamp') as string) || ''
    })
    return {
        ...toRefs(state)
    }
})