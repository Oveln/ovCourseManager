<template>
    <div class="ov-content">
        <Transition>
            <TeacherList v-show="store.page=='teacher_list'" :teacher="store.teachers"></TeacherList>
        </Transition>
        <Transition>
            <TeacherAdd v-show="store.page=='add_teacher'"></TeacherAdd>
        </Transition>
        <Transition>
            <CourseList v-show="store.page=='course_list'"></CourseList>
        </Transition>
        <Transition>
            <About v-show="store.page=='about'"></About>
        </Transition>
    </div>
</template>

<script setup lang='ts'>
import { computed, ref, watch } from "vue";
import TeacherList from "./TeacherList/index.vue"
import TeacherAdd from "./TeacherAdd/index.vue"
import About from "./about/index.vue"
import CourseList from "./CourseList/index.vue"
import { useStore, type TeacherData } from "@/store/store";

let store = useStore()
let teacher = {
    teacher: {
        name: 'Oveln',
        description: '55555'
    }
}

</script>
<style lang='scss' scoped>
@include b(content) {
    flex: 1;
    overflow: clip;
    display: flex;
    flex-direction: column;
    @include e(topbar) {
        display: flex;
        flex-direction: column;
        padding: 10px;
        border-bottom: 1px solid #ccc;
        @include m(button) {
            margin: 0px 10px;
            padding: 5px 10px;
            border-radius: 5px;
            border: 1px solid #ccc;
            background-color: #fff;
            cursor: pointer;
            &:hover {
                background-color: #ccc;
            }
        }
    }
}
.v-enter-from,
.v-leave-to {
  opacity: 0;
}
.v-enter-active
 {
  transition: opacity 0.5s ease;
}
.v-enter-to,
.v-leave-from {
  opacity: 1;
}
</style>