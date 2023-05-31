<template>
<div class="ov-teacher_list">
    <ul>
        <li v-for="item in 100">
            <TeacherCard :description=teacher.description :name=teacher.name></TeacherCard>
        </li>
    </ul>
</div>
</template>

<script setup lang='ts'>
import TeacherCard from './TeacherCard.vue';
let teacher = {
    name: 'Oveln',
    description: '55555'
}
</script>
<style lang='scss' scoped>
@include b(teacher_list) {
    height: 100%;
    overflow: auto;
}
ul {
    list-style-type: none;
}
</style>