<template>
<div class="ov-teachercard">
    <div class="ov-teachercard__up">
        <img class="ov-teacher__up--avatar" :src="avturl.toString()" alt="">
        <span>{{ data.teacher.name }}</span>
        <div class="zhanwei">&nbsp</div>
        <!-- 删除教师 -->
        <button @click="delete_teacher">删除教师</button>
        <button @click="cilck">{{ lesson_show?'合上课程':'展开课程'}}</button>
        <!-- 添加课程 -->
    </div>
    <div class="ov-teachercard__down">
        教师介绍：{{ data.teacher.description }}
        <Transition>
            <div v-show="lesson_show" class="ov-teachercard__down--lesson">
                <!-- 课程列表 -->
                <div class="ov-teachercard__down--lesson__item">
                    <div class="ov-teachercard__down--lesson__item--name">课程名称</div>
                    <div class="ov-teachercard__down--lesson__item--description">课程描述</div>
                    <div class="ov-teachercard__down--lesson__item--price">学分</div>
                    <div class="ov-teachercard__down--lesson__item--button">操作</div>
                </div>
                <TransitionGroup name="list">
                    <div class="ov-teachercard__down--lesson__item" v-for="lesson in data.courses" :key="lesson.name">
                        <div class="ov-teachercard__down--lesson__item--name">{{ lesson.name }}</div>
                        <div class="ov-teachercard__down--lesson__item--description">{{ lesson.description }}</div>
                        <div class="ov-teachercard__down--lesson__item--price">{{ lesson.price }}</div>
                        <div class="ov-teachercard__down--lesson__item--button">
                            <button @click="selectCourse(lesson)">选课</button>
                        </div>
                    </div>
                </TransitionGroup>
                <!-- 添加课程 -->
                <div class="ov-teachercard__down--lesson__item">
                    <div class="ov-teachercard__down--lesson__item--name">
                        <input type="text" placeholder="课程名称" v-model="lesson.name" />
                    </div>
                    <div class="ov-teachercard__down--lesson__item--description">
                        <input type="text" placeholder="课程描述" v-model="lesson.description" />
                    </div>
                    <div class="ov-teachercard__down--lesson__item--price">
                        <input type="text" placeholder="学分" v-model="lesson.price" />
                    </div>
                    <div class="ov-teachercard__down--lesson__item--button">
                        <button @click="addCourse">+</button>   
                    </div>
                </div>
            </div>
        </Transition>
    </div>
</div>
</template>

<script setup lang='ts'>
import {ref} from 'vue'
import { useStore, type TeacherData, type CourseData } from '@/store/store';

let store = useStore()

let props = defineProps<{ data: TeacherData, index:number }>()
//如果avt_url为空串，则显示默认头像
let avturl = ref(props.data.teacher.avt_url === "" ? "src/assets/face.jpg" : props.data.teacher.avt_url)
//判断avt_url是否能正常显示
let img = new Image()
img.src = avturl.toString()
img.onerror = () => {
    avturl.value = "src/assets/face.jpg"
}
let lesson_show = ref(false)

let lesson = ref<CourseData>({
    name: "",
    description: "",
    price: 0,
    //props.teacher在store.teacher中的索引
    teacherid: props.index
})

const delete_teacher = ()=>{
    store.teachers.splice(props.index,1)
    alert("删除成功")
}
const cilck = ()=>{console.log(avturl.toString());lesson_show.value=!lesson_show.value;}
const selectCourse = (lesson:CourseData)=>{
    //判断是否已经有lesson了
    if(store.selectedCourses.find((item)=>item.name===lesson.name)){
        alert("已经添加过该课程了")
        return
    }
    store.selectedCourses.push(lesson)
    //添加成功
    alert("添加成功")
}
const addCourse = ()=>{
    //判断是否已经有lesson了
    if(store.teachers[props.index].courses.find((item)=>item.name===lesson.value.name)){
        alert("已经添加过该课程了")
        return
    }
    //判断是否有空值
    if(lesson.value.name===""||lesson.value.description===""||lesson.value.price===0){
        alert("请填写完整信息")
        return
    }
    //创建lesson拷贝
    let lesson_copy = JSON.parse(JSON.stringify(lesson.value))
    console.log(lesson_copy)
    store.teachers[props.index].courses.push(lesson_copy)
    //还原lesson
    lesson.value.name = ""
    lesson.value.description = ""
    lesson.value.price = 0
    //添加成功
    // alert("添加成功")
}
</script>

<style lang='scss' scoped>
.v-enter-from,
.v-leave-to {
  opacity: 0;
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}
.v-enter-to,
.v-leave-from {
  opacity: 1;
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

@include b(teachercard) {
    display: flex;
    flex-direction:column;
    padding: 5px 10px;
    margin: 15px;
    border-radius: 5px;
    border: 1px solid #ccc;
    box-shadow: 5px 8px 10px #ccc;
    @include e(up) {
        flex: 1;
        display: flex;
        align-items: center;
        img{
            height: 50px;
            border: 1px solid #ccc;
            border-radius: 50%;
            margin: 5px;
        }
        span{
            margin: 0px 10px;
        }
        .zhanwei {flex:1;}
        border-bottom: 1px solid #ccc;
        button{
            margin: 0px 10px;
            width: 100px;
            height: 30px;
            border-radius: 5px;
            border: 1px solid #ccc;
            background-color: #fff;
            &:hover{
                background-color: #ccc;
            }
        }
    }
    @include e(down) {
        display: flex;
        flex-direction: column;
        flex: 3;
        // margin: 10px 5px;
        @include m(lesson) {
            margin-top: 10px;
            padding: 0;
            width: 100%;
            border-top: 1px solid #ccc;
            flex: 1;
            @include e(item) {
                display: flex;
                flex-direction: row;
                padding: 5px 10px;
                border-bottom: 1px solid #ccc;
                text-align: center;
                @include m(name) {
                    flex: 1;
                    input {
                        height: 100%;
                        border-radius: 5px;
                        border: 1px solid #ccc;
                        padding: 0 10px;
                        text-align: center;
                    }
                }
                @include m(description) {
                    border-left: 1px solid #ccc;
                    border-right: 1px solid #ccc;
                    padding: 0 10px;
                    flex: 2;
                    input {
                        height: 100%;
                        border-radius: 5px;
                        border: 1px solid #ccc;
                        padding: 0 10px;
                        text-align: center;
                    }
                }
                @include m(price) {
                    flex: 1;
                    input {
                        height: 100%;
                        border-radius: 5px;
                        border: 1px solid #ccc;
                        padding: 0 10px;
                        text-align: center;
                    }
                }
                @include m(button) {
                    flex: 1;
                    button{
                        width: 100px;
                        height: 30px;
                        border-radius: 5px;
                        border: 1px solid #ccc;
                        background-color: #fff;
                        &:hover{
                            background-color: #ccc;
                        }
                    }
                }
            }
        }
    }
    
}
</style>