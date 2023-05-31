<template>
    <div class="ov-content">
        <TeacherList></TeacherList>
    </div>
</template>

<script setup lang='ts'>
import TeacherList from "../../components/TeacherList/index.vue"
</script>
<style lang='scss' scoped>
@include b(content) {
    flex: 1;
    overflow: clip;
}
</style>