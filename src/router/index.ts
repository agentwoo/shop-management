import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "test",
        component: () => import("@/views/test.vue"),
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
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router