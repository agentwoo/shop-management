import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        redirect: '/login'
    },
    {
        path: "/login",
        name: "login",
        component: () => import("@/views/login/index.vue"),
    },
    {
        path: "/home",
        name: "home",
        component: () => import("@/views/home/index.vue"),
        redirect: '/home/generalView',
        children: [
            {
                path: "generalView",
                name: "generalView",
                component: () => import("@/views/generalView/index.vue"),
            },
            {
                path: "userManegement",
                name: "userManegement",
                component: () => import("@/views/userManegement/index.vue"),
            },
            {
                path: "goodsManegement",
                name: "goodsManegement",
                component: () => import("@/views/goodsManegement/index.vue"),
            },
            {
                path: "orderManegement",
                name: "orderManegement",
                component: () => import("@/views/orderManegement/index.vue"),
            },
            {
                path: "adminManegement",
                name: "adminManegement",
                component: () => import("@/views/adminManegement/index.vue"),
            },
            {
                path: "swiperManegement",
                name: "swiperManegement",
                component: () => import("@/views/swiperManegement/index.vue"),
            },
            {
                path: "goodskindManagement",
                name: "goodskindManagement",
                component: () => import("@/views/goodskindManagement/index.vue"),
            },
            {
                path: "goodscollectManagement",
                name: "goodscollectManagement",
                component: () => import("@/views/goodscollectManagement/index.vue"),
            },
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router