<template>
<div class="ov-teachercard">
    <div class="ov-teachercard__up">
        <img class="ov-teacher__up--avatar" :src="avturl.toString()" alt="">
        <span>姓名：{{ data.teacher.name }}   性别：{{ data.teacher.sex }}</span>
        <!-- 删除教师 -->
        <el-button-group class="ml-4">
            <el-button type="danger" @click="delete_teacher">删除</el-button>
            <el-button type="primary" @click="cilck" :icon="lesson_show?ArrowUp:ArrowDown"></el-button>
        </el-button-group>
        <!-- 添加课程 -->
    </div>
    <div class="ov-teachercard__down">
        <!-- 教师简介 -->
        <div class="ov-teachercard__down--description">
            <span>{{ data.teacher.description }}</span>
        </div>
        <Transition>
            <div class="ov-teachercard__down--down" v-show="lesson_show" >
                <el-button style="width: 60px; margin-left: auto;" type="primary" @click="add_lesson_show=true" :icon="Plus"></el-button>
                <el-table :data="data.courses" style="width: 100%">
                    <el-table-column prop="name" label="课程名称"></el-table-column>
                    <el-table-column prop="description" label="课程描述"></el-table-column>
                    <el-table-column prop="price" label="学分"></el-table-column>
                    <el-table-column label="操作">
                        <template #default="scope">
                            <el-button @click="selectCourse(scope.row)" :icon="Select"></el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </Transition>
    </div>
</div>
<el-dialog
    v-model="add_lesson_show"
    title="添加课程"
    width="30%"
    :before-close="()=>{add_lesson_show=false}"
    >
    <el-form label-width="80px">
        <el-form-item label="课程名称">
            <el-input v-model="add_lesson.name"></el-input>
        </el-form-item>
        <el-form-item label="课程描述">
            <el-input v-model="add_lesson.description"></el-input>
        </el-form-item>
        <el-form-item label="学分">
            <el-input v-model="add_lesson.price"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="add_lesson_show=false">取消</el-button>
            <el-button type="primary" @click="addCourse">添加</el-button>
        </el-form-item>

    </el-form>
    </el-dialog>
</template>

<script setup lang='ts'>
import {ref} from 'vue'
import { useStore, type TeacherData, type CourseData } from '@/store/store'
import {Plus,Select,ArrowDown,ArrowUp} from '@element-plus/icons-vue'
// import ElMessage from 'element-plus/lib/components/message/index.js';

let store = useStore()

let props = defineProps<{ data: TeacherData}>()
//如果avt_url为空串，则显示默认头像
let avturl = ref(props.data.teacher.avt_url === "" ? "/face/face.jpg" : props.data.teacher.avt_url)
//判断avt_url是否能正常显示
let img = new Image()
img.src = avturl.toString()
img.onerror = () => {
    avturl.value = "/face/face.jpg"
}
let lesson_show = ref(false)
let add_lesson_show = ref(false)

let add_lesson = ref<CourseData>({
    name: "",
    description: "",
    price: 0,
    teachername: props.data.teacher.name
})

const delete_teacher = ()=>{
    // 将stroe.selectedCourses中的该教师的课程删除
    store.selectedCourses = store.selectedCourses.filter((item)=>item.teachername!==props.data.teacher.name)
    // 将store.teachers中的该教师删除
    store.teachers = store.teachers.filter((item)=>item.teacher.name!==props.data.teacher.name)
}
const cilck = ()=>{console.log(avturl.toString());lesson_show.value=!lesson_show.value;}
const selectCourse = (lesson:CourseData)=>{
    //判断是否已经有lesson了
    console.log(lesson)
    if(store.selectedCourses.find((item)=>item.name===lesson.name)){
        ElMessage.error("已经添加过该课程了")
        return
    }
    store.selectedCourses.push(lesson)
    //添加成功
    ElMessage.success("添加成功")
}
const addCourse = ()=>{
    //判断是否已经有lesson了
    if(store.selectedCourses.find((item)=>item.name===add_lesson.value.name)){
        ElMessage.error("已经添加过该课程了")
        return
    }
    
    //判断是否有空值
    if(add_lesson.value.name===""||add_lesson.value.description===""||add_lesson.value.price===0){
        ElMessage.error("请填写完整信息")
        return
    }
    
    //创建lesson拷贝
    let lesson_copy = JSON.parse(JSON.stringify(add_lesson.value))
    console.log(lesson_copy)
    // store.teachers[props.index].courses.push(lesson_copy)
    //在store.teachers中添加课程
    store.teachers.forEach((item)=>{
        if(item.teacher.name===add_lesson.value.teachername){
            item.courses.push(lesson_copy)
        }
    })


    //还原lesson
    add_lesson.value.name = ""
    add_lesson.value.description = ""
    add_lesson.value.price = 0
    //添加成功
    // alert("添加成功")
    add_lesson_show.value = false
    ElMessage.success("添加成功")
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
        width: 100%;
        img{
            height: 50px;
            border: 1px solid #ccc;
            border-radius: 50%;
            margin: 5px;
        }
        span{
            margin: 0px 10px;
        }
        border-bottom: 1px solid #ccc;
        .el-button-group {
            margin-left: auto;
            
        }
    }
    @include e(down) {
        display: flex;
        flex-direction: column;
        flex: 3;
        // margin: 10px 5px;
        @include m(down) {
            display: flex;
            flex-direction: column;

        }
    }
    
}
</style>