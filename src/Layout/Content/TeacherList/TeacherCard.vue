<template>
<div class="ov-teachercard">
    <div class="ov-teachercard__up">
        <!-- <img class="ov-teacher__up--avatar" :src="avturl.toString()" alt=""> -->
        <el-avatar :size="60" :src="avturl" @error="avatarError">
            <img src="/face/face.jpg" alt=""/>
        </el-avatar>
        <el-descriptions
            class="ov-teachercard__up--info"
            :column='2'
            title="教师信息"
            border
            >
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">
                        <el-icon><User/></el-icon>
                        &nbsp姓名
                    </div>
                </template>
                {{ data.teacher.name }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">
                        <el-icon><Male/></el-icon>
                        <el-icon><Female/></el-icon>
                        &nbsp性别
                    </div>
                </template>
                {{ data.teacher.sex }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">
                        <el-icon><Iphone/></el-icon>
                        &nbsp电话
                    </div>
                </template>
                {{ data.teacher.phonenumber }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">
                        <el-icon><Location/></el-icon>
                        &nbsp办公室
                    </div>
                </template>
                {{ data.teacher.place }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">
                        <el-icon><List /></el-icon>
                        &nbsp简介
                    </div>
                </template>
                {{ data.teacher.description }}
            </el-descriptions-item>
            
        </el-descriptions>
        <!-- 删除教师 -->
        <el-button-group class="ml-4">
            <el-button type="danger" @click="delete_teacher" :icon="Delete"></el-button>
            <el-button type="primary" @click="cilck" :icon="lesson_show?ArrowDown:ArrowUp"></el-button>
        </el-button-group>
        <!-- 添加课程 -->
    </div>
    <div>
    <Transition>
        <div class="ov-teachercard__down" v-show="lesson_show">
                <el-button style="width: 60px; margin-left: auto;" type="primary" @click="add_lesson_show=true" :icon="Plus"></el-button>
                <el-table :data="data.courses" style="width: 100%">
                    <el-table-column prop="name" label="课程名称"></el-table-column>
                    <el-table-column prop="description" label="课程描述"></el-table-column>
                    <el-table-column prop="price" label="学分"></el-table-column>
                    <el-table-column prop="place" label="上课地点"></el-table-column>
                    <el-table-column label="操作">
                        <template #default="scope">
                            <el-button @click="deleteCourse(scope.row)" type="danger" :icon="Delete"></el-button>
                            <el-button @click="selectCourse(scope.row)" type="primary" :icon="Select"></el-button>
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
        <el-form-item label="上课地点">
            <el-input v-model="add_lesson.place"></el-input>
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
import {Plus,Select,ArrowDown,ArrowUp,Delete,User, Male, Female,List,Iphone,Location} from '@element-plus/icons-vue'
// import ElMessage from 'element-plus/lib/components/message/index.js';

let store = useStore()

let props = defineProps<{ data: TeacherData}>()
//如果avt_url为空串，则显示默认头像
let avturl = ref(props.data.teacher.avt_url)
let lesson_show = ref(false)
let add_lesson_show = ref(false)

let add_lesson = ref<CourseData>({
    name: "",
    description: "",
    price: 0,
    place: '',
    teachername: props.data.teacher.name
})
let down_height = ref((40*(props.data.courses.length+2)+32)+'px')

const avatarError = ()=>true

const delete_teacher = ()=>{
    // 将stroe.selectedCourses中的该教师的课程删除
    store.selectedCourses = store.selectedCourses.filter((item)=>item.teachername!==props.data.teacher.name)
    // 将store.teachers中的该教师删除
    store.teachers = store.teachers.filter((item)=>item.teacher.name!==props.data.teacher.name)
}
const cilck = ()=>{
    console.log(document.getElementsByClassName('ov-teachercard__down'))
    console.log(down_height.value)
    lesson_show.value=!lesson_show.value;
}
const deleteCourse = (lesson:CourseData)=>{
    //删除store.selectedCourses中的课程
    store.selectedCourses = store.selectedCourses.filter((item)=>item.name!==lesson.name)
    //删除store.teachers中的课程
    store.teachers.forEach((item)=>{
        if(item.teacher.name===lesson.teachername){
            item.courses = item.courses.filter((item)=>item.name!==lesson.name)
        }
    })
}
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
    if(add_lesson.value.name===""||add_lesson.value.description===""||add_lesson.value.place===""||add_lesson.value.price===0){
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
.cell-item {
    display: flex;
    align-items: center;
}
.v-enter-from,
.v-leave-to {
//   opacity: 0;
  max-height: 0;
}
.v-leave-active,
.v-enter-active{
  transition: all 0.5s ease;
}
// .v-leave-active {
//   transition: opacity 0.5s ease;
// }
.v-enter-to,
.v-leave-from {
//   opacity: 1;
  max-height: v-bind(down_height);
    // max-height: 500px;
}

@include b(teachercard) {
    display: flex;
    flex-direction:column;
    padding: 5px 10px;
    margin: 15px;
    border-radius: 5px;
    border: 1px solid #ccc;
    box-shadow: 5px 8px 10px #ccc;
    transition: 0.5s;
    // width:100%;
    @include e(up) {
        flex: 1;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        // width: 100%;
        padding: 10px 5px;
        @include m(info) {
            margin: 0px 20px;
            width: 60%
        }
        .el-button-group {
            margin-left: auto;
            
        }
    }
    @include e(down) {
        display: flex;
        flex-direction: column;
        flex: 3;
        overflow: hidden;
        // margin: 10px 5px;
    }
    
}
</style>