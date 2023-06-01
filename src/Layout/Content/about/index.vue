<template>
    <div class="ov-aboutbox">
        <h1>
            关于
        </h1>
        <p>
            本页面采用Vue3.3+Typescript编写，使用了pinia作为组件状态管理工具。存储在<a href="https://github.com/Oveln/ovCourseManager">Github</a>，构建方法参考Readme
        </p>
        <p>
            
        </p>
    </div>
</template>

<script setup lang='ts'>
</script>
<style lang='scss' scoped>
@include b(aboutbox) {
    margin: 15px;
    padding: 20px;
    border-radius: 5px;
    border: 1px solid #ccc;
    box-shadow: 5px 8px 10px #ccc;
    h1,p {
        margin: 10px 0px;
    }
}
</style>