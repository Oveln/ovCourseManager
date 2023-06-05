<template>
    <div class="ov-teacherlist">
        <div class="ov-topbar">
            <!-- 导入文件 -->
            <!-- <el-button class="ov-topbar__button" @click="import_show=true">导入信息</el-button> -->
            <el-button class="ov-topbar__button" @click="add_teacher_show=true">添加教师</el-button>
        </div>
        <div class="ov-teacher_list">
        <TransitionGroup name="list" appear tag="ul" mode="out-in">
            <div v-for="item in store.teachers" :key="item.teacher.name">
                <TeacherCard :data="item"></TeacherCard>
            </div>
            <!-- <div v-for="item in 1000">
                {{ item }}
            </div> -->
        </TransitionGroup>
        </div>
        <TeacherAdd :show="add_teacher_show" :before_close="()=>{add_teacher_show=false}"></TeacherAdd>
        <Import :show="import_show" :before_close="()=>{import_show=false}"></Import>

    </div>
</template>

<script setup lang='ts'>
import TeacherCard from './TeacherCard.vue';
import TeacherAdd from "../TeacherAdd/index.vue"
import { useStore } from '@/store/store';

let store = useStore()
let add_teacher_show = ref(false)
let import_show = ref(false)

</script>
<style lang='scss' scoped>
::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}
@include b(teacherlist) {
    display: flex;
    flex-direction: column;
    overflow:hidden;
}
@include b(teacher_list) {
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    overflow-x: hidden;
    scrollbar-width: none; /* Firefox */
}
@include b(topbar) {
    display: flex;
    flex-direction: row-reverse;
    padding: 10px;
    border-bottom: 1px solid #ccc;
    @include e(button) {
        margin: 0px 10px;
        padding: 5px 10px;
        border-radius: 5px;
        border: 1px solid #ccc;
        background-color: #fff;
        // margin-left: auto;
        &:hover {
            background-color: #ccc;
        }
    }
}
ul {
    list-style-type: none;
}

/* 1. 声明过渡效果 */
.list-move,
.list-leave-active {
  transition: all 1s cubic-bezier(0.55, 0, 0.1, 1);
}

/* 2. 声明进入和离开的状态 */
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translate(30px, 0)
}

// .list-leave-active{
//     position:unset;
// }
</style>