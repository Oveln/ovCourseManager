<template>
    <!-- 已选课程的列表 -->
    <div class="ov-courselist">
        <div class="ov-courselist__item">
            <div class="ov-courselist__item--name">课程名称</div>
            <div class="ov-courselist__item--teacher">教师</div>
            <div class="ov-courselist__item--price">学分</div>
            <div class="ov-courselist__item--button">操作</div>
        </div>
        <div class="ov-courselist__item" v-for="course in store.selectedCourses" :key="course.name">
            <div class="ov-courselist__item--name">{{course.name}}</div>
            <div class="ov-courselist__item--teacher">{{store.teachers[course.teacherid].teacher.name}}</div>
            <div class="ov-courselist__item--price">{{course.price}}</div>
            <div class="ov-courselist__item--button">
                <button @click="store.selectedCourses.splice(store.selectedCourses.indexOf(course),1)">删除</button>
            </div>
        </div>
    </div>

</template>

<script setup lang='ts'>
import { useStore } from '@/store/store';

let store = useStore()

</script>
<style lang='scss' scoped>
@include b(courselist) {
    @include bfc;
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 10px;
    @include e(item) {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 10px;
        border: 1px solid #ccc;
        margin-bottom: 10px;
        box-shadow: 0px 0px 10px #ccc;
        border-radius: 10px;
        
        @include m(name) {
            border-right: 1px solid #ccc;
            text-align: center;
            flex: 1;
        }
        @include m(teacher) {
            border-right: 1px solid #ccc;
            text-align: center;
            flex: 1;
        }
        @include m(price) {
            border-right: 1px solid #ccc;
            text-align: center;
            flex: 1;
        }
        @include m(button) {
            text-align: center;
            flex: 1;
            button {
                padding: 10px;
                border-radius: 10%;
                border: none;
                background-color: #ccc;
                &:hover {
                    background-color: #aaa;
                }
            }
        }
    }
}
</style>