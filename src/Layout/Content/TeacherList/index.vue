<template>
<div class="ov-teacher_list">
    <ul>
        <TransitionGroup name="list" tag="ul">
            <li v-for="(item, index) in teachers" :key="index">
                    <TeacherCard :teacher="item.teacher"></TeacherCard>
            </li>
        </TransitionGroup>
    </ul>
</div>
</template>

<script setup lang='ts'>
import TeacherCard from './TeacherCard.vue';
import {ref , reactive} from 'vue'
import { type TeacherData } from '@/Layout/Content/index.vue';

let props = defineProps<{
    teachers: TeacherData[]
}>()

</script>
<style lang='scss' scoped>
@include b(teacher_list) {
    height: 100%;
    overflow: auto;
}
ul {
    list-style-type: none;
}
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>