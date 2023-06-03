<template>
    <div>
        <div class="ov-topbar">
            <button class="ov-topbar__button" @click="store.page='add_teacher'">添加教师</button>
        </div>
        <div class="ov-teacher_list">
            <ul>
                <TransitionGroup name="list" tag="ul">
                    <li v-for="(item, index) in store.teachers" :key="index">
                        <TeacherCard :data="item" :index="index"></TeacherCard>
                    </li>
                </TransitionGroup>
            </ul>
        </div>
    </div>
</template>

<script setup lang='ts'>
import TeacherCard from './TeacherCard.vue';
import { useStore } from '@/store/store';

let store = useStore()

</script>
<style lang='scss' scoped>
@include b(teacher_list) {
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
}
@include b(topbar) {
    display: flex;
    flex-direction: row;
    padding: 10px;
    border-bottom: 1px solid #ccc;
    @include e(button) {
        margin: 0px 10px;
        padding: 5px 10px;
        border-radius: 5px;
        border: 1px solid #ccc;
        background-color: #fff;
        margin-left: auto;
        &:hover {
            background-color: #ccc;
        }
    }
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