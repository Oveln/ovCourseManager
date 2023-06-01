<template>
    <div class="ov-box">
        <div>
            <Menu></Menu>
        </div>
        <div class="ov-box__right">
            <!-- <Header></Header> -->
            <Content></Content>
        </div>
    </div>
</template>

<script setup lang='ts'>
import Menu from "./Menu/index.vue"
import Content from "./Content/index.vue"


</script>
<style lang='scss' scoped>
@include b(box) {
    @include bfc;
    display: flex;

    @include e(right) {
        display: flex;
        flex-direction: column;
        flex: 1;
    }
}</style>