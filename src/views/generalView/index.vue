<!-- 概览 -->
<script lang='ts' setup>
import { reactive, toRefs, ref } from 'vue'
import bg from '@/assets/bg.svg'
</script>

<template>
    <div class="container">
        <img :src="bg" alt="背景图片">
        <div>欢迎使用</div>
    </div>
</template>

<style lang='scss' scoped>
.container {
    text-align: center;
    align-items: center;
    font-size: 20px;
    font-weight: 700;

    img {
        margin-top: 100px;
        width: 600px;
    }
}
</style>