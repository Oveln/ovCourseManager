<template>
    <div>
        <div class="ov-topbar">
            <!-- 返回按钮 -->
                <button class="ov-topbar__button" @click="store.page='teacher_list'">返回</button>
        </div>
        <div class="ov-inputbox">
            <div class="ov-inputbox__item">
                <div class="ov-inputbox__item--label">姓名:</div>
                <input type="text" v-model="teacher.teacher.name">
            </div>
            <div class="ov-inputbox__item">
                <div class="ov-inputbox__item--label">头像URL:</div>
                <input type="text" v-model="teacher.teacher.avt_url">
            </div>
            <div class="ov-inputbox__item">
                <div class="ov-inputbox__item--label">间接:</div>
                <input type="text" v-model="teacher.teacher.description">
            </div>
            <button class="ov-inputbox__button" @click="_click">添加</button>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { useStore, type TeacherData, type CourseData } from '@/store/store';
import { reactive } from 'vue';

let store = useStore();
let teacher:TeacherData = reactive({
    teacher: {
        name: '',
        avt_url: '',
        description: ''
    },
    courses: [] as CourseData[]
})
const _click = () => {
    console.log(teacher)
    if(teacher.teacher.name === "" || teacher.teacher.description === ""){
        alert("请填写完整信息")
        return
    }
    //创建备份，放入到teachers中
    let teacher_copy = JSON.parse(JSON.stringify(teacher))
    store.teachers.push(teacher_copy)
    
    store.page = 'teacher_list'
}
</script>
<style lang='scss' scoped>
@include b(topbar) {
    display: flex;
    flex-direction: row;
    padding: 10px;
    border-bottom: 1px solid #ccc;
    //右对齐
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
@include b(inputbox) {
    display:flex;
    flex-direction: column;
    padding: 50px 50px 0px 50px;
    border-radius: 5px;
    border: 1px solid #ccc;
    box-shadow: 5px 8px 10px #ccc;
    margin: 15px;
    overflow: auto;
    @include e(item) {
        display: flex;
        margin: 5px 0px;
        @include m(label) {
            min-width: 8em;
            
        }
    }
    @include e(button) {
        margin: 20px ;
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
</style>