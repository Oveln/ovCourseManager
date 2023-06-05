<template>
    <div class="ov-menu">
        <div class="ov-menu__item" @click="store.page=TeacherList">教师列表</div>
        <div class="ov-menu__item" @click="store.page=CourseList">课程列表</div>
        <div class='ov-menu__item' @click="store.page=About">关于</div>
    </div>
</template>

<script setup lang='ts'>
import {useStore} from '../../store/store'
import TeacherList from "../Content/TeacherList/index.vue"
import About from "../Content/about/index.vue"
import CourseList from "../Content/CourseList/index.vue"


let store = useStore()

</script>
<style lang='scss' scoped>
@include b(menu) {
    display: flex;
    flex-direction: column;
    min-width: 100px;
    border-right: 1px solid #ccc;
    height: 100%;
    box-shadow: 5px 8px 10px #ccc;
    @include e(item) {
        // width: 100%;
        height: 50px;
        margin: 10px 10px;
        text-align: center;
        line-height: 50px;
        border: 2px solid #ccc;
        border-radius: 5px;
        user-select: none;
        &:hover{
            background-color: #ccc;
        }
        &:last-child{
            margin-top: auto;
        }
    }
    &:hover {
        min-width: 200px;
    }
    transition: 0.5s;
}
// .ov-menu__item:hover {
//     background-color: #ccc;
// }
</style>