<template>
    <el-dialog
        v-model="imshow"
        title="更新教师信息"
        :before-close="before_close"
        >
        <el-form 
            :model="teacher.teacher" 
            label-width="120px"
            :label-position="'left'"
            style="margin: 30px;"
            >
            <el-form-item label="姓名">
                <!-- <el-input v-model="teacher.teacher.name"></el-input> -->
                <el-select v-model="teacher.teacher.name" filterable placeholder="请选择">
                    <el-option
                        v-for="item in store.teachers"
                        :key = "item.teacher.name"
                        :label="item.teacher.name"
                        :value="item.teacher.name">
                    </el-option>
                </el-select>
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
            <el-form-item label="电话">
                <el-input v-model="teacher.teacher.phonenumber"></el-input>
            </el-form-item>
            <el-form-item label="办公室">
                <el-input v-model="teacher.teacher.place"></el-input>
            </el-form-item>
            <el-form-item label="介绍">
                <el-input v-model="teacher.teacher.description"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="_click">更新</el-button>
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
watch(()=>teacher.teacher.name,(newval)=>{
    console.log(newval)
    for(let i = 0;i<store.teachers.length;i++){
        if(store.teachers[i].teacher.name === newval){
            teacher.teacher = JSON.parse(JSON.stringify(store.teachers[i].teacher))
            teacher.courses = JSON.parse(JSON.stringify(store.teachers[i].courses))

            break
        }
    }
})
const _click = () => {
    console.log(teacher)
    if(teacher.teacher.name === "" || teacher.teacher.description === "" || teacher.teacher.sex ==="" || teacher.teacher.phonenumber === "" || teacher.teacher.place === ""){
        ElMessage.error("请填写完整信息")
        return
    }
    //删除原先的数据
    for(let i = 0;i<store.teachers.length;i++){
        if(store.teachers[i].teacher.name === teacher.teacher.name){
            store.teachers.splice(i,1)
            break
        }
    }
    //创建备份，放入到teachers中
    let teacher_copy = JSON.parse(JSON.stringify(teacher))
    store.teachers.push(teacher_copy)
    
    store.page = TeacherList
    ElMessage.success("更新成功")
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