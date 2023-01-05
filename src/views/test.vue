<script setup lang="ts">
import { useStore } from "@/store/index"
import { getcatesApi, loginApi } from '@/http/index'
const stores = useStore()

async function getInfo() {
    const res = await getcatesApi()
    console.log(res);
}


async function login() {
    const res = await loginApi({
        username: 'admin11',
        password: '123456',
    })
    if (res.status === 0) {
        localStorage.setItem('gpToken', res.token)
    }
}

</script>
 
<template>
    <h1>{{ stores.name }} helloworld</h1>
    <button @click="getInfo">获取表单信息</button><br>
    <button @click="login">登录</button>
</template>