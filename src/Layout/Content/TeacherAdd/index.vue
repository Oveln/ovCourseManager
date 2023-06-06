<template>
    <el-dialog
        v-model="imshow"
        title="添加教师"
        :before-close="before_close"
        >
        <el-form 
            :model="teacher.teacher" 
            label-width="120px"
            :label-position="'left'"
            style="margin: 30px;"
            >
            <el-form-item label="姓名">
                <el-input v-model="teacher.teacher.name"></el-input>
            </el-form-item>
            <el-form-item label="性别">
                <el-radio-group v-model="teacher.teacher.sex">
                    <el-radio :label="'男'">男</el-radio>
                    <el-radio :label="'女'">女</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="头像URL">
                <el-input v-model="teacher.teacher.avt_url"></el-input>
            </el-form-item>
            <el-form-item label="介绍">
                <el-input v-model="teacher.teacher.description"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="_click">添加</el-button>
                <!-- 重置按钮 -->
                <el-button @click="teacher.teacher.name = '';teacher.teacher.avt_url = '';teacher.teacher.description = '';teacher.teacher.sex = '男'">重置</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script setup lang='ts'>
import { useStore, type TeacherData, type CourseData } from '@/store/store';
import TeacherList from "../TeacherList/index.vue"
import { reactive } from 'vue';

let props = defineProps<{show:boolean,before_close:()=>void}>()
let imshow = ref(props.show)
watch(()=>props.show,(newval)=>imshow.value = newval)
let store = useStore();
let teacher:TeacherData = reactive({
    teacher: {
        name: '',
        avt_url: '',
        description: '',
        phonenumber: '',
        place: '',
        sex: '男'
    },
    courses: [] as CourseData[]
})
const _click = () => {
    console.log(teacher)
    if(teacher.teacher.name === "" || teacher.teacher.description === "" || teacher.teacher.sex ===""){
        ElMessage.error("请填写完整信息")
        return
    }
    //检查是否有重复的名字
    for(let i = 0;i<store.teachers.length;i++){
        if(store.teachers[i].teacher.name === teacher.teacher.name){
            ElMessage.error("已有重复的名字")
            return
        }
    }
    //创建备份，放入到teachers中
    let teacher_copy = JSON.parse(JSON.stringify(teacher))
    store.teachers.push(teacher_copy)
    
    store.page = TeacherList
    ElMessage.success("请填写完整信息")
    props.before_close()
}
</script>
<style lang='scss' scoped>
@include b(topbar) {
    display: flex;
    flex-direction: row-reverse;
    padding: 10px;
    border-bottom: 1px solid #ccc;
}
</style>